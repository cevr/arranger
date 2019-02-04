/* eslint-env jest */
import { testWrapper } from '../utils/';
import useContext from '../useContext';
import { Context } from '../utils/testWrapper';

test('consumes context', () => {
    const getProps = testWrapper(useContext(Context, value => ({ value })));
    const getPropsNoMapper = testWrapper(useContext(Context));
    expect(getProps().value).toBe('test');
    expect(getPropsNoMapper().contextValue).toBe('test');
});
