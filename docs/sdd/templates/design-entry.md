<!-- Use the parts you need. Each goes into the matching § of the owning epic's docs/specs/<epic>/design.md (shared parts, such as T-xx rows and the §8 data model, into docs/specs/core/design.md), then add the R-IDs to the §15 traceability table in core. -->

### Technical decision (§2 table row)

| T-xx | **<Decision>** | <Reason> | <Alternatives considered> | R-xx |

### Endpoint (§6.2 table row)

| METHOD | `/path/:id` | <Access: role + scope, e.g. "Mentor of the year, Admin"> | R-xx.y |

- Request schema: `<SchemaName>` in `src/schemas/<domain>.ts`
- Response: `<DTO>`; fields dropped per role: <none | which, for whom>
- Policy: `<policyFn>(user, …)` in `src/policies/`
- Errors: <which codes from §6.1 and when>

### Data model (§8 table row)

| **<collection>** | `<field>` (<type>), … | <indexes> | R-xx |

### Derived value (§8, computed, never stored)

- **<Name> (R-xx.y):** <formula or rule>. <Edge cases: empty, first time, boundaries>.

### Screen (§4.1 table row)

| `/route` | <Screen> (Claude Design board: <name>) | <Access> | R-xx |

### Open item (§17 table row)

| O-x | **<Question>** — waiting on <who> | <Options> | <What it blocks> |

<!-- Bump the Design version in docs/specs/README.md and add a row to docs/specs/CHANGELOG.md. -->
