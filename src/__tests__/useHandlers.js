/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useHandlers from '../useHandlers'

test('usehandlers', () => {
    let result = null
    const wrapper = testWrapper(
        useHandlers({
            handle: ({ a }) => ({ b }) => (result = { a, b }),
        }),
        { a: true },
    )

    wrapper.getProps().handle({ b: true })
    expect(result).toEqual({ a: true, b: true })
    wrapper.updateProps({ a: false })
    wrapper.getProps().handle({ b: false })
    expect(result).toEqual({ a: false, b: false })
})

test('usehandlers memo', () => {
    let result = null
    let called = 0
    const wrapper = testWrapper(
        useHandlers(() => {
            called += 1
            return {
                handle: ({ a }) => ({ b }) => (result = { a, b }),
            }
        }),
        { a: true },
    )

    wrapper.getProps().handle({ b: true })
    expect(called).toBe(1)
    expect(result).toEqual({ a: true, b: true })
})
