exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: ['./e2e/**/*.feature'],
    cucumberOpts: {
        require: ['./e2e/out/steps/**/*.steps.js', './e2e/out/hooks/*.hooks.js'],
    },
    capabilities: {
        browserName: 'chrome',
    },
    directConnect: true,
}