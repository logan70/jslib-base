import { add } from '../src/index.js'

describe('单元测试(js)', () => {
  it('1加2等于3', () => {
    expect(add(1, 2)).toEqual(3)
  })
})