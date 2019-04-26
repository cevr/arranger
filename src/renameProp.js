/**
 * @param {string|symbol} initialProp
 * @param {string|symbol} renamedProp
 * @returns {Object}
 */
const renameProp = (initialProp, renamedProp) => ({
    [initialProp]: prop,
    ...props
} = {}) => ({
    ...props,
    [renamedProp]: prop,
})

export default renameProp
