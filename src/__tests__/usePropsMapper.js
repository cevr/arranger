/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import usePropsRenamer from '../usePropsMapper'

test('maps props', () => {
    const wrapper = testWrapper(usePropsRenamer(({ b }) => ({ b })), {
        a: true,
        b: false,
    })

    expect(wrapper.getProps().a).toBe(undefined) //
    expect(wrapper.getProps().b).toBe(false)
})
