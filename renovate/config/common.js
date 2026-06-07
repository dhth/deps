const path = require('node:path');

function parseRepositories() {
  return (process.env.RENOVATE_REPOSITORIES || '')
    .split(',')
    .map((repo) => repo.trim())
    .filter(Boolean);
}

function buildBaseConfig() {
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

  return config;
}

module.exports = {
  buildBaseConfig,
  parseRepositories,
  repoRoot: path.resolve(__dirname, '..'),
};
