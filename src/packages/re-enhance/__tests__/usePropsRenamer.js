/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import usePropRenamer from '../usePropsRenamer'

test('branch left', () => {
    const getProps = testWrapper(
        usePropRenamer({ val: 'renamed', val2: 'renamed2' }),
        {
            val: true,
            val2: 0,
            other: false,
        },
    )

    expect(getProps().renamed).toBe(true)
    expect(getProps().renamed2).toBe(0)
    expect(getProps().other).toBe(false)
})
