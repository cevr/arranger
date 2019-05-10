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
    const wrapper = testWrapper(
        makeStateHandlers(() => ({ b: false }), {
            handle: () => ({ b }) => ({ b }),
        }),
        {},
    )

    wrapper.getProps().handle({ b: true })
    expect(wrapper.getProps().b).toEqual(true)
})
