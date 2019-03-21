/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useProps from '../useProps'

test('maps props', () => {
    const wrapper = testWrapper(useProps(({ b }) => ({ b })), {
        a: true,
        b: false,
    })

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(false)
})
