/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import makeEffect from '../makeEffect'
import makeState from '../makeState'
import pipe from '../pipe'

test('useEffect', () => {
    const func = jest.fn()
    const useEnhancer = pipe(
        makeState('test', 'updateTest', 0),
        makeEffect(
            props => {
                props.func()
            },
            ['func', 'test'],
        ),
    )
    function Component(props) {
        useEnhancer(props)
        return null
    }
    const wrapper = mount(<Component func={func} />)
    // mounting is the only way to simulate change with hooks for some reason
    wrapper.mount()
    wrapper.mount()
    expect(func).toHaveBeenCalledTimes(1)
})
