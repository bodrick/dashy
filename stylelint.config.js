module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-html',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'selector-max-id': null,
    'selector-no-qualifying-type': null,
    'selector-max-compound-selectors': null,
    'max-nesting-depth': null,
  },
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
};
