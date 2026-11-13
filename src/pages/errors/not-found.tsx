import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { NOT_FOUND_CONTENT } from '@/constants/errors'
import { ROUTES } from '@/constants/routes'
import { PAGE_STYLES } from '@/constants/styles'

export function NotFoundPage() {
  return (
    <main className={PAGE_STYLES.NOT_FOUND}>
      <h1 className={PAGE_STYLES.ERROR_TITLE}>{NOT_FOUND_CONTENT.TITLE}</h1>
      <Button asChild>
        <Link to={ROUTES.HOME}>{NOT_FOUND_CONTENT.HOME_LINK}</Link>
      </Button>
    </main>
  )
}
