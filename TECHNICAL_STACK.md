
# Technical Stack and Development Process

This document outlines the technical stack, tools, and development process for the API Doc Viewer App.

## Tech Stack

### Frontend
- **Framework:** Next.js (React)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **API Communication:** axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
*   **Database:** **SQLite** (file-based, for initial development).
*   **ORM:** **Prisma** (for type-safe database interactions and migrations).
- **Authentication:** Passport.js with `passport-google-oauth20`
- **API Doc Parsing:** `js-yaml`

### Development Tools
- **Package Manager:** npm
- **Linter:** ESLint
- **Formatter:** Prettier
- **Development Server:** nodemon

## Development Process

### UI Development
We will use Puppeteer to take screenshots of the UI during development. This will allow for a collaborative process where I can analyze the visual output of my code and make adjustments based on that visual feedback.

### Git Workflow
We will follow a feature branch workflow.

1.  **Main Branch (`master`):** This is the main, stable branch. No direct commits are made to it.
2.  **Feature Branches:** For each GitHub Issue, a new branch will be created from `master` (e.g., `feature/01-project-creation`).
3.  **Commits:** Work will be saved in small, atomic commits with clear messages following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
4.  **Pull Requests (PRs):** When a feature is complete, a Pull Request will be opened to merge the feature branch into `master`.
5.  **Senior Engineer Self-Review:** As the lead developer, I will perform a mandatory self-review on every Pull Request before notifying you. The review will be posted as a comment on the PR and will assess:
    - Functionality and Correctness
    - Readability and Maintainability
    - Consistency and Style
    - Security
    - Code Duplication (DRY Principle)
6.  **Self-Correction:** Any issues found during the self-review will be fixed before the PR is marked as ready for final approval.
7.  **Final Approval & Merge:** You will give the final approval for the PR, after which I will merge it into `master`.
8.  **Branch Cleanup:** The feature branch will be deleted after the merge.
