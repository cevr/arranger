/* eslint-env jest */

import { testWrapper } from '../utils';
import useHandlers from '../useHandlers';

test('usehandlers', () => {
    let result = null;
    const getProps = testWrapper(
        useHandlers({
            handle: ({ a }) => ({ b }) => (result = { a, b }),
        }),
        { a: true },
    );

    getProps().handle({ b: true });
    expect(result).toEqual({ a: true, b: true });
});

test('usehandlers memo', () => {
    let result = null;
    let called = 0;
    const getProps = testWrapper(
        useHandlers(() => {
            called += 1;
            return {
                handle: ({ a }) => ({ b }) => (result = { a, b }),
            };
        }),
        { a: true },
    );

    getProps().handle({ b: true });
    expect(called).toBe(1);
    expect(result).toEqual({ a: true, b: true });
});
