/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import withReducer from '../withReducer'

test('withReducer', () => {
    const wrapper = testWrapper(
        withReducer(
            'state',
            'dispatch',
            (state, action) => {
                switch (action.type) {
                    case 'INCREMENT':
                        return { count: state.count + 1 }
                    default:
                        return state
                }
            },
            { count: 0 },
        ),
        {},
    )

    expect(wrapper.getProps().state).toEqual({ count: 0 })
    wrapper.getProps().dispatch({ type: 'INCREMENT' })
    expect(wrapper.getProps().state).toEqual({ count: 1 })
})

test('withReducer memo', () => {
    const wrapper = testWrapper(
        withReducer(
            'state',
            'dispatch',
            (state, action) => {
                switch (action.type) {
                    case 'INCREMENT':
                        return { count: state.count + 1 }
                    default:
                        return state
                }
            },
            () => ({ count: 0 }),
        ),
        {},
    )

    expect(wrapper.getProps().state).toEqual({ count: 0 })
    wrapper.getProps().dispatch({ type: 'INCREMENT' })
    expect(wrapper.getProps().state).toEqual({ count: 1 })
})
