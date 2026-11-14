import { writeFileSync } from 'node:fs'
import { expect, test, type Locator } from '@playwright/test'

async function textContrast(locator: Locator) {
  return locator.evaluate((element) => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const context = canvas.getContext('2d')!
    context.fillStyle = '#fff'
    context.fillRect(0, 0, 1, 1)
    const ancestors: Element[] = []
    for (let node: Element | null = element; node; node = node.parentElement)
      ancestors.unshift(node)
    for (const node of ancestors) {
      context.fillStyle = getComputedStyle(node).backgroundColor
      context.fillRect(0, 0, 1, 1)
    }
    const background = context.getImageData(0, 0, 1, 1).data
    context.fillStyle = getComputedStyle(element).color
    context.fillRect(0, 0, 1, 1)
    const foreground = context.getImageData(0, 0, 1, 1).data
    const luminance = (rgb: Uint8ClampedArray) =>
      [0.2126, 0.7152, 0.0722].reduce((sum, weight, index) => {
        const channel = rgb[index] / 255
        return (
          sum +
          weight *
            (channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4)
        )
      }, 0)
    const values = [luminance(foreground), luminance(background)]
    return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)
  })
}

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/fixtures/theme.html')
  await expect(page.getByRole('heading')).toBeVisible()
})

test('R-34: existing Button consumes the approved theme, with RTL and semantic aliases intact', async ({
  page,
}, testInfo) => {
  const primary = page.getByRole('button', { name: 'ראשי', exact: true })
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(250, 250, 251)',
  )
  await expect(primary).toHaveCSS('background-color', 'rgb(107, 91, 168)')
  await expect(primary).toHaveCSS('border-radius', '16px')
  await expect(page.getByText('צבעים מתוך', { exact: false })).toHaveCSS(
    'color',
    'rgb(94, 90, 107)',
  )
  await expect(page.getByTestId('muted-surface')).toHaveCSS(
    'background-color',
    'rgb(244, 243, 246)',
  )
  await expect(page.getByTestId('logical')).toHaveCSS(
    'padding-inline-start',
    '24px',
  )
  await expect(page.getByTestId('logical')).toHaveCSS(
    'padding-inline-end',
    '8px',
  )
  await expect(page.locator('html')).toHaveCSS('direction', 'rtl')
  await testInfo.attach('R-34 theme from DESIGN §4.2', {
    body: await page.screenshot({
      path: testInfo.outputPath('R-34-theme.png'),
      fullPage: true,
    }),
    contentType: 'image/png',
  })
})

test('R-42: rendered enabled Button variants meet text contrast before and during hover', async ({
  page,
}, testInfo) => {
  const evidence: { variant: string | null; normal: number; hover: number }[] =
    []
  for (const button of await page.locator('button:not(:disabled)').all()) {
    const normal = await textContrast(button)
    await button.hover()
    // Measure the settled interactive state rather than a transition frame.
    await button.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    )
    const hover = await textContrast(button)
    expect(normal).toBeGreaterThanOrEqual(4.5)
    expect(hover).toBeGreaterThanOrEqual(4.5)
    evidence.push({
      variant: await button.getAttribute('data-variant'),
      normal,
      hover,
    })
    await page.mouse.move(0, 0)
  }
  const report = JSON.stringify(evidence, null, 2) + '\n'
  writeFileSync(testInfo.outputPath('R-42-contrast.json'), report)
  await testInfo.attach('R-42 rendered contrast ratios', {
    body: report,
    contentType: 'application/json',
  })
})

test('R-42: Tab and Shift+Tab show focus on primitives and native controls, skipping disabled buttons', async ({
  page,
}, testInfo) => {
  const targets = await page.locator('button:not(:disabled), a, input').all()
  for (const target of targets) {
    await page.keyboard.press('Tab')
    await expect(target).toBeFocused()
    await expect(target).toHaveCSS('outline-style', 'solid')
    await expect(target).toHaveCSS('outline-width', '2px')
    await expect(target).toHaveCSS('outline-offset', '-2px')
    await expect(target).toHaveCSS('outline-color', 'rgb(90, 75, 148)')
    await expect(target).toHaveCSS(
      'box-shadow',
      'rgb(255, 255, 255) 0px 0px 0px 4px inset',
    )
    if ((await target.getAttribute('data-testid')) === 'dark-band') {
      await page.screenshot({
        path: testInfo.outputPath('R-42-dark-band-focus.png'),
        fullPage: true,
      })
    }
  }
  for (const target of targets.slice(0, -1).reverse()) {
    await page.keyboard.press('Shift+Tab')
    await expect(target).toBeFocused()
  }
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    ),
  )
  await testInfo.attach('R-42 keyboard focus', {
    body: await page.screenshot({
      path: testInfo.outputPath('R-42-keyboard-focus.png'),
      fullPage: true,
    }),
    contentType: 'image/png',
  })
})

test('R-42 negative: overflow clipping, hover, active and invalid states cannot hide keyboard focus', async ({
  page,
}, testInfo) => {
  const clipped = page.getByTestId('clipped')
  for (let index = 0; index < 8; index++) await page.keyboard.press('Tab')
  await expect(clipped).toBeFocused()
  await clipped.hover()
  await page.keyboard.down('Space')
  await expect(clipped).toHaveCSS('outline-style', 'solid')
  await page.keyboard.up('Space')
  await clipped.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
  )
  const pixels = await clipped.screenshot({
    path: testInfo.outputPath('R-42-clipped-focus.png'),
  })
  const strokes = await page.evaluate(async (base64) => {
    const image = new Image()
    image.src = `data:image/png;base64,${base64}`
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')!
    context.drawImage(image, 0, 0)
    return [1, 3].map((y) => [
      ...context.getImageData(Math.floor(image.width / 2), y, 1, 1).data,
    ])
  }, pixels.toString('base64'))
  expect(strokes).toEqual([
    [90, 75, 148, 255],
    [255, 255, 255, 255],
  ])
  await testInfo.attach('R-42 clipped focus pixels', {
    body: pixels,
    contentType: 'image/png',
  })
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Shift+Tab')
  const invalid = page.getByRole('button', { name: 'מחיקה', exact: true })
  await expect(invalid).toBeFocused()
  await expect(invalid).toHaveCSS('outline-color', 'rgb(90, 75, 148)')
  await expect(invalid).toHaveCSS(
    'box-shadow',
    'rgb(255, 255, 255) 0px 0px 0px 4px inset',
  )
})

test('R-42: system focus outline survives forced colors when shadows are suppressed', async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.keyboard.press('Tab')
  const primary = page.getByRole('button', { name: 'ראשי', exact: true })
  await expect(primary).toBeFocused()
  await expect(primary).toHaveCSS('outline-style', 'solid')
  await expect(primary).toHaveCSS('outline-width', '2px')
  await expect(primary).toHaveCSS('box-shadow', 'none')
  expect(
    await primary.evaluate((element) => getComputedStyle(element).outlineColor),
  ).not.toBe('rgba(0, 0, 0, 0)')
})
