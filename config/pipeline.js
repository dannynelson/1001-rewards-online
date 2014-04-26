module.exports = {
  dist: ".tmp/public",

  vendor: [
    'bower_components/angular/angular.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-ui-utils/modules/route/route.js',
    'bower_components/socket.io-client/dist/socket.io.min.js',
    'bower_components/sails.io.js/dist/sails.io.js',
    'bower_components/angular-sails/dist/angular-sails.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/moment/moment.js',
    'bower_components/angular-moment/angular-moment.js',
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',

    'bower_components/ng-table/ng-table.js',
    'bower_components/moment/min/moment.min.js'
  ],

  ngMock: ["bower_components/angular-mocks/angular-mocks.js"],

  index: {
    html: "scripts/index.html",
    js: "scripts/index.js",
    less: "scripts/index.less"
  },

  app: {
    js: "scripts/**/!(index|*unit|*e2e).js",
    html: "scripts/**/!(index).html",
    less: "scripts/**/!(less)/**/!(index|bundle).less"
  },

  test: {
    unit: "scripts/{states,common}/**/*.unit.js",
    e2e: "scripts/states/**/*.e2e.js"
  }

};
