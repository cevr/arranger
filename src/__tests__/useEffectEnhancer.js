/* eslint-env jest */
import testWrapper from '../utils/testWrapper'
import useEffectEnhancer from '../useEffectEnhancer'

test('useEffect', () => {
    const fn = jest.fn()
    testWrapper(
        useEffectEnhancer(props => {
            props.func()
        }),
        {
            func: fn,
        },
    )
    expect(fn).toHaveBeenCalledTimes(1)
})
