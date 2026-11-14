# Spec-Driven Development (SDD) at ColmanDevClub

We write down **what** before **how**, and **how** before code. Each stage produces a document, and every piece of a stage traces back to the one before it by ID. Reviewers can then ask one question about any line of code: _which requirement is this for?_

```
REQUIREMENTS ──► DESIGN ──► TASKS ──► Jira story ──► branch + code + tests ──► PR
   R-xx.y         T-xx, §       S-#.#      KAN-<n>        KAN-<n>-<slug>            KAN-<n>
   (what/why)     (how)         (plan)     (the ticket)   (one story per branch)    (review + merge)
```

| Stage           | Document                     | Answers                                                 | Unit and ID                                                    | Template                                     |
| --------------- | ---------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| 1. Requirements | `docs/specs/REQUIREMENTS.md` | What must the system do, for whom, and why?             | Requirement `R-xx` with EARS criteria `R-xx.y`; decision `Dxx` | [requirement.md](templates/requirement.md)   |
| 2. Design       | `docs/specs/DESIGN.md`       | How do we build it: endpoints, data, policies, screens? | Section `§n`; technical decision `T-xx`; open item `O-x`       | [design-entry.md](templates/design-entry.md) |
| 3. Tasks        | `docs/specs/TASKS.md`        | In which order, in which pieces?                        | Epic `E#`, story `S-#.#`                                       | [story.md](templates/story.md)               |
| 4. Code         | the repos                    | The working feature                                     | Jira `KAN-<n>`, branch `KAN-<n>-<slug>`                        | —                                            |
| 5. PR           | GitHub                       | Is it done and correct?                                 | PR titled `KAN-<n> …`                                          | [pr-template.md](templates/pr-template.md)   |

## The rules

1. **Requirements say what, never how.** No routes, collections or libraries in REQUIREMENTS. Acceptance criteria use EARS (below).
2. **Everything traces.** A design element names the R-IDs it serves. A story names its R/T IDs and DESIGN sections. A test name starts with the criterion ID. Anything that traces to nothing is either cut or added to the requirements first.
3. **IDs are stable.** A removed ID is retired, never reused. New items take the next free number.
4. **Scope changes start at the top.** A new behaviour goes into REQUIREMENTS first, then DESIGN, then TASKS. A small fix to a lower doc can ride in the feature's PR. A new requirement needs an approval from a lead.
5. **Docs move with the code.** If your PR changes an endpoint, a field, a rule or a decision, the matching doc changes in the same PR, with a version bump and a changelog row.
6. **Gaps found while coding go back into the spec.** When the spec is silent ("what happens on the first visit?"), decide, write the decision down (a `D`/`T` row or a DESIGN note), then code it. See the worked example.

## EARS in one minute

Every acceptance criterion is one of five sentence shapes. Each shape tells you what kind of test to write.

| Shape                                     | Use for              | Test shape                                             |
| ----------------------------------------- | -------------------- | ------------------------------------------------------ |
| `THE SYSTEM SHALL …`                      | Always true          | Assert in the normal case                              |
| `WHEN <trigger>, THE SYSTEM SHALL …`      | Reaction to an event | Fire the trigger, assert the reaction                  |
| `WHILE <state>, THE SYSTEM SHALL …`       | True during a state  | Enter the state, assert; leave it, assert the opposite |
| `IF <condition>, THEN THE SYSTEM SHALL …` | Error or edge case   | Create the bad condition, assert the handling          |
| `WHERE <option>, THE SYSTEM SHALL …`      | Optional feature     | Enable the option, assert                              |

## A story, start to finish

1. **Pick** a story from the sprint in Jira (`KAN-<n>`). Read its R-IDs in REQUIREMENTS and the DESIGN sections it names.
2. **Check the spec.** If anything is unclear or missing, settle it now: ask a lead, then write the answer into the spec. This step costs minutes; finding the gap in review costs days.
3. **Branch** `KAN-<n>-<slug>` from `main`.
4. **Test first where you can:** one test per acceptance criterion, named by its ID.
5. **Build** until the tests pass. API: schema → policy → service → route → OpenAPI registration. Web: schema copy → feature hook → screen, with loading and empty states.
6. **Update the docs** that your change touches.
7. **Open the PR** with the template. CI green, one lead approves, you merge.

## Worked example

[example-R-20.4.md](example-R-20.4.md) runs one real feature, "new since your last visit", through every stage, including a spec gap found while designing.
