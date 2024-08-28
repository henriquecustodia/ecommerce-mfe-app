const skipSharedModules = [
  'rxjs/ajax',
  'rxjs/fetch',
  'rxjs/testing',
  'rxjs/webSocket',

  '@nestjs/core',
  '@nestjs/platform-express',
  '@nestjs/common',
];

module.exports = { skipSharedModules };
