/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useStateHandlers from '../useStateHandlers'

test('useStateHandlers', () => {
    const wrapper = testWrapper(
        useStateHandlers(
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

test('useStateHandlers calling undefined', () => {
    const wrapper = testWrapper(
        useStateHandlers(
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

test('useStateHandlers memo', () => {
    const wrapper = testWrapper(
        useStateHandlers(() => ({ b: false }), {
            handle: () => ({ b }) => ({ b }),
        }),
        {},
    )

    wrapper.getProps().handle({ b: true })
    expect(wrapper.getProps().b).toEqual(true)
})
