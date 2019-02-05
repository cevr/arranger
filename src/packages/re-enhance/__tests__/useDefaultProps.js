/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useDefaultProps from '../useDefaultProps'

test('default props without prop', () => {
    const getProps = testWrapper(
        useDefaultProps({
            val: false,
        }),
        {},
    )

    expect(getProps().val).toBe(false)
})

test('default props useprop', () => {
    const getProps = testWrapper(
        useDefaultProps({
            val: false,
        }),
        { val: true },
    )

    expect(getProps().val).toBe(true)
})
