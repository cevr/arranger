/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import mapProps from '../mapProps'

test('maps props', () => {
    const wrapper = testWrapper(mapProps(({ b }) => ({ b })), {
        a: true,
        b: false,
    })

    expect(wrapper.getProps().a).toBe(undefined) //
    expect(wrapper.getProps().b).toBe(false)
})
