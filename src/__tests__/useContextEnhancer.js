/* eslint-env jest */
import useContextEnhancer from '../useContextEnhancer'
import testWrapper, { Context } from '../utils/testWrapper'

test('consumes context', () => {
    const getProps = testWrapper(
        useContextEnhancer(Context, value => ({ value })),
    )
    const getPropsStringMapper = testWrapper(
        useContextEnhancer(Context, 'value'),
    )
    const getPropsNoMapper = testWrapper(useContextEnhancer(Context))

    expect(getProps().value).toBe('test')
    expect(getPropsStringMapper().value).toBe('test')
    expect(getPropsNoMapper().contextValue).toBe('test')
})
