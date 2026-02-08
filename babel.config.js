module.exports = {
  presets: ['module:@react-native/babel-preset'],
  /**
   * React Native Paper - Bundle size optimization.
   * @see {@link https://oss.callstack.com/react-native-paper/docs/guides/getting-started#bundle-size-optimization} for more information.
   */
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      // Module resolver - Alias for @ imports.
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    /**
     * React Native Reanimated - Worklets configuration.
     * @see {@link https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#dependencies} for more information.
     */
    'react-native-worklets/plugin',
  ],
};
