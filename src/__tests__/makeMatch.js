/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import makeMatch from '../makeMatch'

test('matches', () => {
    const wrapper = testWrapper(makeMatch(({ a, b }) => ({ a, b })), {
        a: true,
        b: false,
    })

    const match = wrapper.getProps().match

    expect(match({ a: () => 'component' })).toBe('component')
    expect(match({ b: () => 'should be null' })).toBe(null)
})
