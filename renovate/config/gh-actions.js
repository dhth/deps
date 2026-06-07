const { buildBaseConfig } = require('./common');

const config = buildBaseConfig();

config.commitMessagePrefix = 'ci: ';

config.enabledManagers = ['github-actions'];
config.packageRules = [
  {
    description: 'Group all GitHub Actions updates into one PR.',
    matchManagers: ['github-actions'],
    groupName: 'github actions',
  },
  {
    description: 'Ignore generated Rust release workflows.',
    matchManagers: ['github-actions'],
    matchFileNames: ['.github/workflows/release.yml'],
    enabled: false,
  },
];

module.exports = config;
