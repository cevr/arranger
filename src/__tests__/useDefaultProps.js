/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useDefaultProps from '../useDefaultProps'

test('default props without prop', () => {
    const wrapper = testWrapper(
        useDefaultProps({
            val: false,
        }),
        {},
    )

    expect(wrapper.getProps().val).toBe(false)
})

test('default props useprop', () => {
    const wrapper = testWrapper(
        useDefaultProps({
            val: false,
        }),
        { val: true },
    )

    expect(wrapper.getProps().val).toBe(true)
})
