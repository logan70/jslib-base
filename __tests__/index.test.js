import loganUmdName from '../src/index.js'

describe('测试函数测试(js)', () => {
  it('测试', () => {
    expect(loganUmdName.test('Hello World!')).toBe('Hello World!')
  })
})