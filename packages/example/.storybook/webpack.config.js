const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');
module.exports = ({ config }) => {
  const eslintIndex = config.module.rules.findIndex(({ use = []}) => use.find(({ loader = '' }) => loader.includes('eslint-loader')));
  config.module.rules.splice(eslintIndex, 1);
  config.module.rules.push({
    test: /\.tsx?$/,
    include: [SRC_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './tsconfig.json',
        },
      },
      { loader: require.resolve('react-docgen-typescript-loader') },
    ],
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/addon-storysource/loader'),
      options: { parser: 'typescript' },
    }],
    enforce: 'pre',
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
