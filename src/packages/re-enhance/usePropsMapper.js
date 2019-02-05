/**
 * @param {Function} fn
 * @returns {Object}
 */
const usePropsRenamer = fn => (props = {}) => fn(props)

export default usePropsRenamer
