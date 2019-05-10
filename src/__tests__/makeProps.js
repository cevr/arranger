/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import makeProps from '../makeProps'

test('maps props', () => {
    const wrapper = testWrapper(makeProps(({ b }) => ({ b })), {
        a: true,
        b: false,
    })

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(false)
})
