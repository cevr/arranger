/* eslint-env jest */
import PropTypes from 'prop-types'

import testWrapper from '../utils/testWrapper'
import usePropTypes from '../usePropTypes'

test('checks proptypes', () => {
    const propTypes = {
        a: PropTypes.string,
        b: PropTypes.number,
        c: PropTypes.bool,
        d: PropTypes.object,
        e: PropTypes.array,
    }
    const propsValid = {
        a: 'test',
        b: 0,
        c: true,
        d: {},
        e: [],
    }

    const propsInvalid = {
        a: 1,
        b: '1',
        c: 'a',
        d: [],
        e: {},
    }
    const mockFn = jest.fn()
    const error = global.console.error
    global.console.error = mockFn
    testWrapper(usePropTypes(propTypes), propsValid)
    expect(mockFn).not.toHaveBeenCalled()
    testWrapper(usePropTypes(propTypes), propsInvalid)
    expect(mockFn).toHaveBeenCalled()
    global.console.error = error
})
