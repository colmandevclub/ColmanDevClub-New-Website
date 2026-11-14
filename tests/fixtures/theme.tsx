import { createRoot } from 'react-dom/client'
import { Button } from '@/components/ui/button'
import '@/index.css'

// Test-only fixture; the shared application and gallery remain owned by S-0.7-D.
createRoot(document.getElementById('root')!).render(
  <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6 text-start">
    <h1 className="text-2xl font-bold">בדיקת ערכת נושא ומיקוד מקלדת</h1>
    <p className="text-ink-muted">
      צבעים מתוך <bdi>DESIGN §4.2 — R-34 / R-42</bdi>
    </p>
    <section className="flex flex-wrap gap-3 rounded-2xl border border-line bg-surface p-4">
      <Button>ראשי</Button>
      <Button variant="secondary">משני</Button>
      <Button variant="outline">מסגרת</Button>
      <Button variant="ghost">שקוף</Button>
      <Button variant="destructive" aria-invalid="true">
        מחיקה
      </Button>
      <Button variant="link">קישור</Button>
      <Button disabled>מושבת</Button>
    </section>
    <section className="flex flex-wrap gap-3 rounded-xl bg-subtle p-4">
      <span className="rounded-full bg-status-ok px-3 py-1 text-status-ok-foreground">
        תקין
      </span>
      <span className="rounded-full bg-status-warn px-3 py-1 text-status-warn-foreground">
        אזהרה
      </span>
      <span className="rounded-full bg-status-risk px-3 py-1 text-status-risk-foreground">
        בסיכון
      </span>
    </section>
    <section className="rounded-xl bg-ink-band p-4 text-primary-foreground">
      <p className="mb-3">מיקוד על משטח כהה</p>
      <Button data-testid="dark-band">פעולה על רקע כהה</Button>
    </section>
    <section className="flex flex-wrap items-start gap-3 rounded-xl border border-line p-4">
      <div className="overflow-hidden rounded-lg" data-testid="clip">
        <Button data-testid="clipped">מיקוד בתוך אזור חתוך</Button>
      </div>
      <a href="#native" className="text-accent-ink">
        קישור רגיל
      </a>
      <label className="flex flex-col gap-2">
        שדה רגיל
        <input className="rounded-sm border border-input bg-surface px-3 py-2" />
      </label>
    </section>
    <div data-testid="logical" className="ps-6 pe-2">
      ריווח לוגי
    </div>
    <div
      data-testid="muted-surface"
      className="bg-muted text-muted-foreground p-4"
    >
      משטח עדין
    </div>
  </main>,
)
