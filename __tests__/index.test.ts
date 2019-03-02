import umdName from '../src/index'

describe('单元测试(ts)', () => {
  it('1加2等于3', () => {
    expect(umdName.add(1, 2)).toEqual(3)
  })
})