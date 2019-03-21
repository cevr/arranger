/* eslint-env jest */
import useContextEnhancer from '../useContextEnhancer'
import testWrapper, { Context } from '../utils/testWrapper'

test('consumes context', () => {
    const wrapper = testWrapper(
        useContextEnhancer(Context, value => ({ value })),
    )
    const stringWrapper = testWrapper(useContextEnhancer(Context, 'value'))
    const noMapperWrapper = testWrapper(useContextEnhancer(Context))

    expect(wrapper.getProps().value).toBe('test')
    expect(stringWrapper.getProps().value).toBe('test')
    expect(noMapperWrapper.getProps().contextValue).toBe('test')
})
