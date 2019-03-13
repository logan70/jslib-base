import { add, test } from '../src/index'

describe('单元测试(ts)', () => {
  it('1加2等于3', () => {
    expect(add(1, 2)).toEqual(3)
  })
  it('test', () => {
    expect(test()).toBe('test')
  })
})