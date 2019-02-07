import React from 'react'
import { mount } from 'enzyme'

export const Context = React.createContext()

export default function(enhancer, propsIn) {
    let propsOut = null

    function Factory(props) {
        propsOut = enhancer(props)
        return null
    }

    const Component = (
        <Context.Provider value="test">
            {React.createElement(Factory, propsIn)}
        </Context.Provider>
    )

    mount(Component)

    return () => propsOut
}
