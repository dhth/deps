function parseRepositories() {
  return (process.env.RENOVATE_REPOSITORIES || '')
    .split(',')
    .map((repo) => repo.trim())
    .filter(Boolean);
}

const repositories = parseRepositories();

if (repositories.length === 0) {
  throw new Error('RENOVATE_REPOSITORIES must be set to a comma-separated OWNER/REPO list.');
}

const config = {
  platform: 'github',
  repositories,
  onboarding: false,
  requireConfig: 'ignored',
  dependencyDashboard: false,
  timezone: 'UTC',
  labels: ['dependencies'],
  branchPrefix: 'renovate/',
  prConcurrentLimit: 1,
  branchConcurrentLimit: 1,
  vulnerabilityAlerts: {
    enabled: true,
  },
  persistRepoData: true,
  commitMessagePrefix: 'build: ',
  packageRules: [
    {
      description: 'Code lane does not manage GitHub Actions updates.',
      matchManagers: ['github-actions'],
      enabled: false,
    },
    {
      description: 'Group all non-major dependency updates into one PR.',
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'non-major updates',
    },
  ],
};

if (process.env.RENOVATE_DRY_RUN) {
  config.dryRun = process.env.RENOVATE_DRY_RUN;
}

if (process.env.RENOVATE_GIT_AUTHOR) {
  config.gitAuthor = process.env.RENOVATE_GIT_AUTHOR;
}

if (process.env.RENOVATE_PLATFORM_COMMIT) {
  config.platformCommit = process.env.RENOVATE_PLATFORM_COMMIT;
}

module.exports = config;
