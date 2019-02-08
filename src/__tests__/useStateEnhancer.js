/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useStateEnhancer from '../useStateEnhancer'

test('usestate', () => {
    const getProps = testWrapper(useStateEnhancer('state', 'setState', 0))

    expect(getProps().state).toEqual(0)
    getProps().setState(1)
    expect(getProps().state).toEqual(1)
})

test('initializer is called once', () => {
    let called = 0
    const getProps = testWrapper(
        useStateEnhancer('state', 'setState', () => {
            called++
            return 0
        }),
    )

    expect(getProps().state).toBe(0)
    getProps().setState(1)
    expect(called).toBe(1)
    expect(getProps().state).toBe(1)
    expect(called).toBe(1)
})
