/**
 * @param {Object} useDefaultProps
 * @returns {Object}
 */
const useDefaultProps = useDefaultProps => (props = {}) => ({
    ...useDefaultProps,
    ...props,
});

export default useDefaultProps;
