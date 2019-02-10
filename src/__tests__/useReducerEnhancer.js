/* eslint-env jest */

import testWrapper from '../utils/testWrapper'
import useReducerEnhancer from '../useReducerEnhancer'

test('useReducerEnhancer', () => {
    const getProps = testWrapper(
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

    expect(getProps().state).toEqual({ count: 0 })
    getProps().dispatch({ type: 'INCREMENT' })
    expect(getProps().state).toEqual({ count: 1 })
})

test('useReducerEnhancer memo', () => {
    const getProps = testWrapper(
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

    expect(getProps().state).toEqual({ count: 0 })
    getProps().dispatch({ type: 'INCREMENT' })
    expect(getProps().state).toEqual({ count: 1 })
})
