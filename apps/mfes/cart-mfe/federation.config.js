const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const { skipSharedModules } = require('../../skip-shared-modules');

module.exports = withNativeFederation({

  name: 'cart-mfe',

  exposes: {
    './Component': './apps/mfes/cart-mfe/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: skipSharedModules

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

});
