/**
 * @param {string|symbol} initialProp
 * @param {string|symbol} renamedProp
 * @returns {Object}
 */
const usePropRenamer = (initialProp, renamedProp) => ({
    [initialProp]: prop,
    ...props
} = {}) => ({
    ...props,
    [renamedProp]: prop,
})

export default usePropRenamer
