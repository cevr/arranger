/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import makeRef from '../makeRef'

test('makeRef', () => {
    const wrapper = testWrapper(makeRef('ref', 0))

    expect(wrapper.getProps().ref.current).toEqual(0)
    wrapper.getProps().ref.current = 1
    expect(wrapper.getProps().ref.current).toEqual(1)
})
