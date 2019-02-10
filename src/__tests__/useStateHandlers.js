/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useStateHandlers from '../useStateHandlers'

test('useStateHandlers', () => {
    const getProps = testWrapper(
        useStateHandlers(
            { b: false },
            {
                handle: () => ({ b }) => ({ b }),
            },
        ),
        {},
    )

    getProps().handle({ b: true })
    expect(getProps().b).toEqual(true)
})

test('useStateHandlers calling undefined', () => {
    const getProps = testWrapper(
        useStateHandlers(
            { b: false },
            {
                handle: () => () => undefined,
            },
        ),
        {},
    )

    getProps().handle()
    expect(getProps().b).toEqual(false)
})

test('useStateHandlers memo', () => {
    const getProps = testWrapper(
        useStateHandlers(() => ({ b: false }), {
            handle: () => ({ b }) => ({ b }),
        }),
        {},
    )

    getProps().handle({ b: true })
    expect(getProps().b).toEqual(true)
})
