import PropTypes from 'prop-types'

const checkPropTypes = (propTypes, componentName = 'Component') => (
    props = {},
) => {
    PropTypes.checkPropTypes(propTypes, props, 'prop', componentName)
    return { ...props }
}

export default checkPropTypes
