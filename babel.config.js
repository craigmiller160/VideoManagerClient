// Currently only used for ESLint and ignored by legacy build system
const baseConfig = require('@craigmiller160/babel-config');
const reactConfig = require('@craigmiller160/babel-config-react');
const configMerge = require('@craigmiller160/config-merge');

module.exports = configMerge(baseConfig, reactConfig);