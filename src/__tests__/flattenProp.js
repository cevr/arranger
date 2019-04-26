/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import flattenProp from '../flattenProp'

test('flattens props', () => {
    const wrapper = testWrapper(flattenProp('obj'), {
        obj: { a: true, b: false },
    })

    expect(wrapper.getProps().a).toBe(true)
    expect(wrapper.getProps().b).toBe(false)
})
