/* eslint-env jest */
import compose from '../compose'

test('compose', () => {
    expect(
        compose(
            num => num * 2,
            num => num - 1,
        )(0),
    ).toBe(-2)
})
