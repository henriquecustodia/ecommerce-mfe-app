const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation/config');

const { skipSharedModules } = require('../../skip-shared-modules');

module.exports = withNativeFederation({
  name: 'ecommerce-shell',

  exposes: {
    './Component': './apps/shells/ecommerce-shell/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

  skip: skipSharedModules,

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});
