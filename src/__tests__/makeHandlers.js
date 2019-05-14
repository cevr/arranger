/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import makeHandlers from '../makeHandlers'

test('makeHandlers', () => {
    let result = null
    const wrapper = testWrapper(
        makeHandlers({
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
