/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import renameProps from '../renameProps'

test('renames props', () => {
    const wrapper = testWrapper(
        renameProps({ val: 'renamed', val2: 'renamed2' }),
        {
            val: true,
            val2: 0,
            other: false,
        },
    )

    expect(wrapper.getProps().renamed).toBe(true)
    expect(wrapper.getProps().renamed2).toBe(0)
    expect(wrapper.getProps().other).toBe(false)
})
