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
  rangeStrategy: 'bump',
  prConcurrentLimit: 1,
  branchConcurrentLimit: 1,
  enabledManagers: ['gomod', 'cargo'],
  vulnerabilityAlerts: {
    enabled: false,
  },
  persistRepoData: true,
  commitMessagePrefix: 'build: ',
  packageRules: [
    {
      description: 'Group non-major Go module updates',
      matchManagers: ['gomod'],
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'go dependencies',
    },
    {
      description: 'Group non-major Cargo updates',
      matchManagers: ['cargo'],
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'cargo dependencies',
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
