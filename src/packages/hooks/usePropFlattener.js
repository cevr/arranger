/**
 * @param {string|symbol} propName
 * @returns {Object}
 */
const usePropFlattener = propName => (props = {}) => ({
    ...props,
    ...props[propName],
});

export default usePropFlattener;
