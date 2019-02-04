import { useEffect } from 'react';
import { useLegacyState, usePrevious } from './utils';

/**
 * Note: shouldComponentUpdate does not prevent rerenders
 * @param {{componentDidMount: (), componentWillUnmount: Function, componentDidUpdate: Function, shouldComponentUpdate: Function}} spec
 * @returns {Object}
 */
const useLifecycle = spec => (props = {}) => {
    const [state, setState] = useLegacyState({});

    const self = { props, state, setState };
    const previousProps = usePrevious(props) || {};
    const previousState = usePrevious(state) || {};
    const shouldUpdate = spec.shouldComponentUpdate
        ? spec.shouldComponentUpdate.call({ props: previousProps, state: previousState }, props, state)
        : true;

    useEffect(() => {
        spec.componentDidMount && spec.componentDidMount.call(self);
        return () => {
            spec.componentWillUnmount && spec.componentWillUnmount.call({ props, state });
        };
    }, []);

    useEffect(() => {
        shouldUpdate && spec.componentDidUpdate && spec.componentDidUpdate.call(self, previousProps, previousState);
    });

    return { ...props, ...state };
};

export default useLifecycle;
