#!/usr/bin/env node

const path = require('path');
const karma = require('karma');

const karmaConfig = karma.config.parseConfig(
  path.resolve(__dirname, '../test-utils/karma.conf.js')
);

const server = new karma.Server(karmaConfig, exitCode => {
  console.log('Karma has exited with ' + exitCode);
  process.exit(exitCode);
});

server.start();