/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import useLifecycle from '../useLifecycle';

describe('useLifecycle', () => {
    test('componentDidMount', () => {
        const onMount = jest.fn();
        function Component(props) {
            useLifecycle({
                componentDidMount() {
                    this.props.onMount();
                },
            })(props);
            return null;
        }
        const wrapper = mount(<Component onMount={onMount} />);
        //mounting is the only way to simulate change with hooks for some reason
        wrapper.mount();
        wrapper.mount();
        expect(onMount).toHaveBeenCalledTimes(1);
    });

    test('componentWillUnmount', () => {
        const onUnMount = jest.fn();
        function Component(props) {
            useLifecycle({
                componentWillUnmount() {
                    this.props.onUnMount();
                },
            })(props);
            return null;
        }
        const wrapper = mount(<Component onUnMount={onUnMount} />);
        wrapper.unmount();
        expect(onUnMount).toHaveBeenCalledTimes(1);
    });

    test('componentDidUpdate', () => {
        const onUpdate = jest.fn();
        function Component(props) {
            useLifecycle({
                componentDidUpdate() {
                    this.props.onUpdate();
                },
            })(props);
            return null;
        }
        const wrapper = mount(<Component onUpdate={onUpdate} />);
        wrapper.mount();

        expect(onUpdate).toHaveBeenCalled();
    });

    test('shouldComponentUpdate', () => {
        const onUpdate = jest.fn();
        function Component(props) {
            useLifecycle({
                componentDidUpdate() {
                    this.props.onUpdate();
                    this.setState({ test: 'update' });
                },
                shouldComponentUpdate(_, nextState) {
                    return nextState.test !== 'update';
                },
            })(props);
            return null;
        }
        const wrapper = mount(<Component onUpdate={onUpdate} />);
        wrapper.mount();
        wrapper.mount();

        expect(onUpdate).toHaveBeenCalledTimes(1);
    });
});
