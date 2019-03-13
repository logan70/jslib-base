const path = require('path')

module.exports = {
  //  The root of the directory containing package.json
  rootDir: path.resolve(__dirname, '../../'),
  // A list of paths to directories that Jest should use to search for files in.
  roots: [
    path.resolve(__dirname, '../../')
  ],
  transform: {
    // support typescript and es6+ syntax
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  // The pattern or patterns Jest uses to detect test files.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  // An array of file extensions your modules use. Jest will look for in left-to-right order.
  moduleFileExtensions: ["js", "ts", "jsx", "tsx"],
  // Indicates whether each individual test should be reported during the run. 
  verbose: true
}