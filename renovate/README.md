# Renovate

This directory holds the central Renovate policy and runner code for fleet-wide dependency maintenance.

## Layout

- `config/` - runner/admin Renovate config used by CI
- `presets/` - shared repo-level Renovate presets extended by managed repos
- `runner/` - TypeScript workload-selection project used by GitHub Actions

## Orchestration

1. GitHub Actions workflows run on a specific schedule
2. The runner code decides which repositories are part of that run; Renovate runs for this selection
3. Each target repo's Renovate config extends shared presets from this repo
4. Renovate resolves the shared presets together with the target repo's local config and runs with that final result

The shared presets live centrally, but are consumed remotely by the repositories being maintained.

## Cohorts

Repos are updated in cohorts instead of all at once.

- each repo is assigned specific update days
- Renovate only runs for the repos in the cohort for that day
- this keeps dependency bumps isolated to predictable windows
- it reduces churn from fast-moving dependencies that would otherwise keep opening fresh PRs
- it avoids creating one fleet-wide spike of dependency work

The main goal behind this is to batch dependency maintenance so that a repo is worked through on its assigned days instead of generating a steady stream of updates throughout the month.

## Preset model

Managed repos can extend multiple presets. A typical repo config looks like:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "local>dhth/deps//renovate/presets/default",
    "local>dhth/deps//renovate/presets/go",
    "local>dhth/deps//renovate/presets/gh-actions"
  ]
}
```
