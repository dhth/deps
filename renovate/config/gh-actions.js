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
  requireConfig: 'required',
  dependencyDashboard: false,
  timezone: 'UTC',
  persistRepoData: true,
  commitMessagePrefix: 'ci: ',
  commitMessageAction: 'update',
  enabledManagers: ['github-actions'],
  platformCommit: 'enabled',
};

module.exports = config;
