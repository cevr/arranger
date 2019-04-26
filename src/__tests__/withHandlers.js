/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import withHandlers from '../withHandlers'

test('withHandlers', () => {
    let result = null
    const wrapper = testWrapper(
        withHandlers({
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

test('withHandlers memo', () => {
    let result = null
    let called = 0
    const wrapper = testWrapper(
        withHandlers(() => {
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
