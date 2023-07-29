exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['./e2e/**/*.feature'],
    cucumberOpts: {
        require: ['./e2e/out/steps/**/*.steps.js'],
    },
    capabilities: {
        browserName: 'chrome',
    },
    directConnect: true,
}