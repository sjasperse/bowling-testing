module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "mocha",
    testFramework: "mocha",
    transpilers: [],
    mutate: ["src/{,**/}/*.js", "!src/index.js", "!src/{,**/}*.tests.js"],
    mochaOptions: {
      files: ["src/{,**/}/*.tests.js"]
    }
  });
};
