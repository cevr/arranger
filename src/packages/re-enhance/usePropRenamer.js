/**
 * @param {string|symbol} a
 * @param {string|symbol} b
 * @returns {Object}
 */
const usePropRenamer = (a, b) => ({ [a]: prop, ...props } = {}) => ({
    ...props,
    [b]: prop,
})

export default usePropRenamer
