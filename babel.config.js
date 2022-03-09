module.exports = api => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./app']
        }
      ],
      [
        'babel-plugin-inline-import',
        {
          extensions: ['.svg']
        }
      ]
    ]
  };
};
