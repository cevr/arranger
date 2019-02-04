import { useMemo } from 'react';

import usePrevious from './utils/usePrevious';

/**
 *
 * @param {any} shouldMapOrKeys
 * @param {Function} createProps
 * @returns {Object}
 */
const usePropsOnChange = (shouldMapOrKeys, createProps) => (props = {}) => {
    const previousProps = usePrevious(props);

    const keys = Array.isArray(shouldMapOrKeys)
        ? shouldMapOrKeys.map(key => props[key])
        : shouldMapOrKeys(props, previousProps)
        ? undefined
        : [];

    const mappedProps = useMemo(() => createProps(props), keys);

    return {
        ...props,
        ...mappedProps,
    };
};

export default usePropsOnChange;
