module.exports = {
  // jest寻找的根路径，例如 "<rootDir>/__tests__"
  "roots": [
    "<rootDir>"
  ],
  // ts-jest用于支持typescript, babel-jest用于支持ES6模块化语法
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  // 测试文件匹配正则
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  // 测试文件内可省略的文件后缀
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  // 显示测试内容
  "verbose": true,
  // 收集测试覆盖率
  // collectCoverage: true
}