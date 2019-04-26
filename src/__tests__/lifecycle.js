/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import lifecycle from '../lifecycle'

describe('lifecycle', () => {
    test('onMount', () => {
        const onMount = jest.fn()
        const useEnhancer = lifecycle(({ props }) => ({
            onMount() {
                props.onMount()
            },
        }))
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onMount={onMount} />)
        // mounting is the only way to simulate change with hooks for some reason
        wrapper.mount()
        wrapper.mount()
        expect(onMount).toHaveBeenCalledTimes(1)
    })

    test('onUnmount', () => {
        const onUnmount = jest.fn()
        const useEnhancer = lifecycle(({ props }) => ({
            onUnmount() {
                props.onUnMount()
            },
        }))
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onUnMount={onUnmount} />)
        wrapper.unmount()
        expect(onUnmount).toHaveBeenCalledTimes(1)
    })

    test('onUpdate', () => {
        const onUpdate = jest.fn()
        const useEnhancer = lifecycle(({ props }) => ({
            onUpdate() {
                props.onUpdate()
            },
        }))
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onUpdate={onUpdate} />)
        wrapper.mount()

        expect(onUpdate).toHaveBeenCalled()
    })

    test('shouldUpdate', () => {
        const onUpdate = jest.fn()
        const useEnhancer = lifecycle(({ props, setState, state }) => ({
            onUpdate() {
                props.onUpdate()
                // eslint-disable-next-line
                setState({ test: 'update' })
            },
            shouldUpdate() {
                return state.test !== 'update'
            },
        }))
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onUpdate={onUpdate} />)
        wrapper.mount()
        wrapper.mount()

        expect(onUpdate).toHaveBeenCalledTimes(1)
    })
})
