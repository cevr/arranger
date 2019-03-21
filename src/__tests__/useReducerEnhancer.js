/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useReducerEnhancer from '../useReducerEnhancer'

test('useReducerEnhancer', () => {
    const wrapper = testWrapper(
        useReducerEnhancer(
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

test('useReducerEnhancer memo', () => {
    const wrapper = testWrapper(
        useReducerEnhancer(
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
