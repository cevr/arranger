/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import usePropFlattener from '../usePropFlattener'

test('flattens props', () => {
    const wrapper = testWrapper(usePropFlattener('obj'), {
        obj: { a: true, b: false },
    })

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(false)
})
