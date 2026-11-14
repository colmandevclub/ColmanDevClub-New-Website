<!-- Copy into docs/specs/REQUIREMENTS.md §5 under the right group. Take the next free R number; never reuse a retired one. -->

#### R-xx <Short name> — **Must**

_As a <role>, I want <capability>, so that <benefit>._

1. THE SYSTEM SHALL <always-true behaviour>.
2. WHEN <trigger>, THE SYSTEM SHALL <reaction>.
3. WHILE <state>, THE SYSTEM SHALL <behaviour during the state>.
4. IF <error or edge condition>, THEN THE SYSTEM SHALL <handling>.
5. WHERE <optional feature is present>, THE SYSTEM SHALL <behaviour>.

<!--
Checklist before you add it:
- Says WHAT and WHY only: no routes, collections, libraries or page layout (those go to DESIGN).
- Each criterion is one testable sentence in an EARS shape; delete the shapes you don't need.
- Roles use the names from REQUIREMENTS §3 (Guest, Applicant, Member, Mentor, Admin). Update the §3 permission table if access changes.
- A decision that shaped it gets a row in §1.4 (next free Dxx) and is referenced in the criterion, e.g. "(D16)".
- Add a changelog row and bump the version.
-->
