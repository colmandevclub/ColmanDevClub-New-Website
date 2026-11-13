import { HOME_CONTENT } from '@/constants/home'
import { SITE } from '@/constants/site'
import { PAGE_STYLES } from '@/constants/styles'

export function HomePage() {
  return (
    <main className={PAGE_STYLES.HOME}>
      <p className={PAGE_STYLES.BRAND}>
        <bdi>{SITE.NAME}</bdi>
      </p>
      <h1 className={PAGE_STYLES.HOME_TITLE}>{HOME_CONTENT.TITLE}</h1>
      <p className={PAGE_STYLES.HOME_DESCRIPTION}>{HOME_CONTENT.DESCRIPTION}</p>
    </main>
  )
}
