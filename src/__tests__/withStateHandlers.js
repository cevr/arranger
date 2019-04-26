/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import withStateHandlers from '../withStateHandlers'

test('withStateHandlers', () => {
    const wrapper = testWrapper(
        withStateHandlers(
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

test('withStateHandlers calling undefined', () => {
    const wrapper = testWrapper(
        withStateHandlers(
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

test('withStateHandlers memo', () => {
    const wrapper = testWrapper(
        withStateHandlers(() => ({ b: false }), {
            handle: () => ({ b }) => ({ b }),
        }),
        {},
    )

    wrapper.getProps().handle({ b: true })
    expect(wrapper.getProps().b).toEqual(true)
})
