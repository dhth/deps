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
  commitMessageAction: 'update',
  packageRules: [
    {
      description: 'Group non-major Go module updates',
      matchManagers: ['gomod'],
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'go dependencies',
      minimumGroupSize: 2,
      postUpdateOptions: ['gomodTidy'],
    },
    {
      description: 'Group non-major Cargo updates',
      matchManagers: ['cargo'],
      matchUpdateTypes: ['minor', 'patch'],
      groupName: 'cargo dependencies',
      minimumGroupSize: 2,
    },
  ],
    platformCommit: 'enabled',
};

module.exports = config;
