const babelConfig = require('@craigmiller160/babel-config');
const reactConfig = require('@craigmiller160/babel-config-react');
const configMerge = require('@craigmiller160/config-merge');

module.exports = configMerge(babelConfig, reactConfig);
