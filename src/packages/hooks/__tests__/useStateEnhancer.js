/* eslint-env jest */

import { testWrapper } from '../utils';
import useStateEnhancer from '../useStateEnhancer';

test('usestate', () => {
    const getProps = testWrapper(useStateEnhancer('state', 'setState', 0));

    expect(getProps().state).toEqual(0);
    getProps().setState(1);
    expect(getProps().state).toEqual(1);
});
test('usestate function', () => {
    let called = 0;
    const getProps = testWrapper(
        useStateEnhancer('state', 'setState', () => {
            called += 1;
            return 0;
        }),
    );

    expect(getProps().state).toEqual(0);
    getProps().setState(1);
    expect(getProps().state).toEqual(1);
    expect(called).toEqual(1);
});
