/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import useLifecycle from '../useLifecycle'

describe('useLifecycle', () => {
    test('componentDidMount', () => {
        const onMount = jest.fn()
        const useEnhancer = useLifecycle({
            componentDidMount() {
                this.props.onMount()
            },
        })
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

    test('componentWillUnmount', () => {
        const onUnMount = jest.fn()
        const useEnhancer = useLifecycle({
            componentWillUnmount() {
                this.props.onUnMount()
            },
        })
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onUnMount={onUnMount} />)
        wrapper.unmount()
        expect(onUnMount).toHaveBeenCalledTimes(1)
    })

    test('componentDidUpdate', () => {
        const onUpdate = jest.fn()
        const useEnhancer = useLifecycle({
            componentDidUpdate() {
                this.props.onUpdate()
            },
        })
        function Component(props) {
            useEnhancer(props)
            return null
        }
        const wrapper = mount(<Component onUpdate={onUpdate} />)
        wrapper.mount()

        expect(onUpdate).toHaveBeenCalled()
    })

    test('shouldComponentUpdate', () => {
        const onUpdate = jest.fn()
        const useEnhancer = useLifecycle({
            componentDidUpdate() {
                this.props.onUpdate()
                // eslint-disable-next-line
                this.setState({ test: 'update' })
            },
            shouldComponentUpdate(_, nextState) {
                return nextState.test !== 'update'
            },
        })
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
