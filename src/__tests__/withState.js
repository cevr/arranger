/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import withState from '../withState'

test('usestate', () => {
    const wrapper = testWrapper(withState('state', 'setState', 0))

    expect(wrapper.getProps().state).toEqual(0)
    wrapper.getProps().setState(1)
    expect(wrapper.getProps().state).toEqual(1)
})

test('initializer is called once', () => {
    let called = 0
    const wrapper = testWrapper(
        withState('state', 'setState', () => {
            called++
            return 0
        }),
    )

    expect(wrapper.getProps().state).toBe(0)
    wrapper.getProps().setState(1)
    expect(called).toBe(1)
    expect(wrapper.getProps().state).toBe(1)
    expect(called).toBe(1)
})
