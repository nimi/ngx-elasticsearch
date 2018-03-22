const testWebpackConfig = require('./webpack.test');
var path = require("path");
const basePath = process.cwd();

// Karma configuration here
module.exports = function (config) {
  const conf = { codeCoverage: false }

  // if(needsJunit){
  //   config.set({
  //     junitReporter: {
  //       outputDir: path.join(process.env.CIRCLE_TEST_REPORTS || '$CIRCLE_TEST_REPORTS', "karma", "junit.xml"),
  //       useBrowserName: false // add browser name to report and classes names
  //     }
  //   })
  // }

  const basePath = __dirname;
  config.set({
    basePath: basePath,
    frameworks: ['jasmine' ],// '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter'),
      // require('@angular/cli/plugins/karma')
    ],
    files: [ 
      { pattern: './angular-test.js', watched: false } 
    ],
    preprocessors: { 
      './angular-test.js': ['webpack', 'sourcemap'] 
    },
    webpack: testWebpackConfig({ env: 'test' }),
    coverageIstanbulReporter: {
      reports: [ 'html', 'cobertura' ],
      dir: './coverage',
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    junitReporter: {
      outputDir: './coverage/junit/',
      suite: 'Karma Unit Tests'
    },
    reporters: config.codeCoverage
      ? ['progress', 'coverage-istanbul', 'junit']
      : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });

};