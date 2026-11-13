// @vitest-environment node
import { RuleTester } from 'eslint'
import { describe, it } from 'vitest'
import rule from './no-physical-direction.js'

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
})

ruleTester.run('no-physical-direction', rule, {
  valid: [
    '<div className="ms-4 me-2 ps-4 pe-2 start-0 end-0 text-start" />',
    'cn("flex", { "md:ms-4": active })',
    'const label = "email-address copyright left right"',
    'const classes = `flex ${active ? "ps-2" : "pe-2"} md:-ms-4`',
    '<div className="border-l-2 rounded-r-lg" />',
  ],
  invalid: [
    ...['ml', 'mr', 'pl', 'pr', 'left', 'right'].map((prefix) => ({
      code: `<div className="${prefix}-4" />`,
      errors: [{ messageId: 'physicalDirection' }],
    })),
    {
      code: 'cn("flex", "md:hover:-ml-4", { "focus:!pr-2": active })',
      errors: Array(2).fill({ messageId: 'physicalDirection' }),
    },
    {
      code: 'const classes = `flex ${active ? "block" : "hidden"} [&>svg]:mr-2`',
      errors: [{ messageId: 'physicalDirection' }],
    },
    {
      code: 'cva("", { variants: { size: { sm: "pl-[12px] right-0!" } } })',
      errors: Array(2).fill({ messageId: 'physicalDirection' }),
    },
    {
      code: 'const classes = "ml-" + spacing',
      errors: [{ messageId: 'physicalDirection' }],
    },
  ],
})
