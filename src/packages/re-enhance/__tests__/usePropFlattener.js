/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import usePropFlattener from '../usePropFlattener'

test('flattens props', () => {
    const getProps = testWrapper(usePropFlattener('obj'), {
        obj: { a: true, b: false },
    })

    expect(getProps().a).toBe(true)
    expect(getProps().b).toBe(false)
})
