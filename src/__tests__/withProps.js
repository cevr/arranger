/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import withProps from '../withProps'

test('maps props', () => {
    const wrapper = testWrapper(withProps(({ b }) => ({ b })), {
        a: true,
        b: false,
    })

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(false)
})
