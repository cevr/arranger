/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import defaultProps from '../defaultProps'

test('default props without prop', () => {
    const wrapper = testWrapper(
        defaultProps({
            val: false,
        }),
        {},
    )

    expect(wrapper.getProps().val).toBe(false)
})

test('default props useprop', () => {
    const wrapper = testWrapper(
        defaultProps({
            val: false,
        }),
        { val: true },
    )

    expect(wrapper.getProps().val).toBe(true)
})
