/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import makeStateHandlers from '../makeStateHandlers'

test('makeStateHandlers', () => {
    const wrapper = testWrapper(
        makeStateHandlers(
            { b: false },
            {
                handle: () => ({ b }) => ({ b }),
            },
        ),
        {},
    )

    wrapper.getProps().handle({ b: true })
    expect(wrapper.getProps().b).toEqual(true)
})

test('makeStateHandlers calling undefined', () => {
    const wrapper = testWrapper(
        makeStateHandlers(
            { b: false },
            {
                handle: () => () => undefined,
            },
        ),
        {},
    )

    wrapper.getProps().handle()
    expect(wrapper.getProps().b).toEqual(false)
})

test('makeStateHandlers memo', () => {
    let called = 0
    const wrapper = testWrapper(
        makeStateHandlers(
            () => {
                called++
                return { b: false }
            },
            {
                handle: () => ({ b }) => ({ b }),
            },
            { memo: true },
        ),
        {},
    )

    wrapper.getProps().handle({ b: true })
    expect(wrapper.getProps().b).toEqual(true)
    expect(called).toBe(1)
    wrapper.getProps().handle({ b: false })
    expect(wrapper.getProps().b).toEqual(false)
    expect(called).toBe(1)
})
