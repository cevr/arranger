/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import makeMemo from '../makeMemo'

test('makeMemo', () => {
    const fn = jest.fn()
    const useEnhancer = makeMemo(
        props => () => ({ a: fn(props.name) || 'test' }),
        ['name'],
    )
    let enhancedProps
    function Component(props) {
        enhancedProps = useEnhancer(props)
        return null
    }
    const wrapper = mount(<Component name="Sam" />)
    // mounting is the only way to simulate change with hooks for some reason
    wrapper.render()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('Sam')
    expect(enhancedProps.a).toBeDefined()
    wrapper.setProps({ name: 'Foo' })
    wrapper.render()
    expect(fn).toHaveBeenCalledTimes(2)
})
