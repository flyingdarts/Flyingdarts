// "use strict";
// module.exports = function(config) {
//     config.set({

//         frameworks: ["jasmine", "karma-typescript"],

//         module: "ES2020",

//         files: [
//             { pattern: "src/**/*.spec.ts" }
//         ],

//         preprocessors: {
//             "src/**/*.spec.ts": ["karma-typescript"]
//         },

//         reporters: ["dots", "karma-typescript"],

//         karmaTypescriptConfig: {
//             tsconfig: "./tsconfig.spec.json"
//         },

//         browsers: ["ChromeHeadless"],

//         singleRun: true
//     });
// };

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-webpack"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false,
      zone: "ProxyZone"
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
