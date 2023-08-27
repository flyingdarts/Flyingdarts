exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    directConnect: true,
    cucumberOpts: {
        require: ['./e2e/out/steps/**/*.steps.js', './e2e/out/hooks/*.hooks.js'],
    },
    specs: ['./e2e/**/*.feature'],
}