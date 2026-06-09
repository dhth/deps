# Renovate

This directory holds the central Renovate policy and runner code for fleet-wide dependency maintenance.

## Layout

- `config/` - central Renovate config files used by CI
- `runner/` - TypeScript workload-selection project used by GitHub Actions

## Schedule

- code dependency updates run biweekly by cohort
- GitHub Actions updates run monthly
- code updates and GitHub Actions updates use separate lanes

## Current workflow schedules

- `deps-code.yml`
  - runs at `02:00`, `04:00`, `06:00`, and `08:00` UTC
  - runs on cohort days `1-9` and `15-23`
- `deps-gh-actions.yml`
  - runs at `02:00`, `04:00`, and `06:00` UTC
  - runs monthly on days `25-27`
- `mrj.yml`
  - runs at `03:00`, `05:00`, `07:00`, and `09:00` UTC
  - runs at `03:00`, `05:00`, and `07:00` UTC on the monthly GitHub Actions cohort days

## Runtime model

This setup is intentionally central-only for now.

- target repositories are selected by CI
- Renovate is invoked from GitHub Actions using `renovatebot/github-action`
- the runner project computes selected repos and emits workflow outputs
