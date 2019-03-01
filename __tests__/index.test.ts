import loganUmdName from '../src/index'

describe('测试函数测试(ts)', () => {
  it('测试', () => {
    (<any>expect(loganUmdName.test('Hello World!'))).toBe('Hello World!')
  })
})