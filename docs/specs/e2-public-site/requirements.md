# E2 Public site — Requirements

> [README](../README.md) · [requirements](requirements.md) · [design](design.md) · [tasks](tasks.md)
>
> Owns: R-01, R-02, R-03, R-05, R-06. Rules for every feature (roles, permissions, UX, non-functional): [core/requirements.md](../core/requirements.md).

### A. Public features

#### R-01 Club presentation — **Must**

_As a guest, I want to understand what the club is and why to join, so that I can decide to apply._

1. THE SYSTEM SHALL present the club's identity, the kinds of things members build, and a call to join.
2. WHEN a guest chooses to join, THE SYSTEM SHALL lead them to assessment-day registration (R-04).

#### R-02 Project showcase — **Must**

_As a guest, I want to see what members built, so that I trust the club gives real experience._

1. THE SYSTEM SHALL display a selected set of past club projects (D12).
2. THE SYSTEM SHALL show each project's name, description, visual, technologies, and its code and live links when they exist.
3. IF a project has no visual, THEN THE SYSTEM SHALL show a designed placeholder.
4. WHERE the showcase advances automatically, THE SYSTEM SHALL let the user pause it and navigate it manually.

#### R-03 Mentors directory — **Must**

_As a guest, I want to see who the mentors are, so that I know who I'll learn from._

1. THE SYSTEM SHALL show the mentors grouped by Academic Year (newest first), plus a group for legacy mentors.
2. THE SYSTEM SHALL show each mentor's photo (or a fallback when there's none), name, title, and professional links when they exist.
3. WHEN the Admin assigns a mentor to a year (R-15), THE SYSTEM SHALL include that mentor in that year's group.

#### R-05 Navigation & community links — **Must**

1. THE SYSTEM SHALL use the navigation and design of the chosen Claude Design artifact (D18) on every page.
2. WHEN a user activates any join entry point, THE SYSTEM SHALL lead them to assessment-day registration, which shows the no-upcoming-assessment-day state when applicable (R-04.8).
3. THE SYSTEM SHALL link to the club's social and community channels.

#### R-06 Discoverability — **Must**

1. THE SYSTEM SHALL provide a site-wide title, description and social-share preview image that link-preview services can read without running client-side scripts (D25).
2. THE SYSTEM SHALL set a distinct browser-tab title for each page.
