const { buildBaseConfig } = require('./common');

const config = buildBaseConfig();

config.commitMessagePrefix = 'build: ';

config.packageRules = [
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
];

module.exports = config;
