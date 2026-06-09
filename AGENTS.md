## Summary
- `deps` is the central dependency-maintenance repo for @dhth's GitHub repositories
- It orchestrates Renovate runs across managed repositories and then uses `mrj` to merge eligible dependency PRs
- Shared dependency-update policy lives here; managed repos consume it through small repo-local Renovate configs

## Dependency Maintenance Model
- `renovate/` owns centralized dependency-update policy (read `renovate/README.md for more details`)
- `renovate/config/` contains config used by GitHub Actions
- `renovate/presets/` contains shared presets extended by managed repos
- Managed repos keep small repo-local Renovate config, typically at `.github/renovate.json`

## mrj
- mrj is a tool written by @dhth for merging dependency upgrade PRs in their repos
- `mrj.toml` lists the repos that `mrj` may merge in this fleet

## Renovate + mrj
- Renovate runs for a cohort on a specific day; cohort selection is done by `renovate/runner`
- `mrj` runs after Renovate and merges eligible dependency PRs
- Both run several times within a time block (defined by the workflow schedules) in order to bump all or most dependencies for repos in the cohort
- Keep the Renovate and `mrj` models aligned: if a repo is added to Renovate cohorts, check whether it should also be present in `mrj.toml`

## Key Conventions
- Prefer centralized policy in `renovate/presets/`
- Put repo-specific exceptions in the target repo's Renovate config, not in runner config
- Keep `renovate/config/` focused on orchestration/runtime concerns, not shared repo policy
