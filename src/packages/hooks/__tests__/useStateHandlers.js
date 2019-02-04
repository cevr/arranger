/* eslint-env jest */

import { testWrapper } from '../utils';
import useStateHandlers from '../useStateHandlers';

test('usestate handlers', () => {
    const getProps = testWrapper(
        useStateHandlers(
            { b: false },
            {
                handle: () => ({ b }) => ({ b }),
            },
        ),
        {},
    );

    getProps().handle({ b: true });
    expect(getProps().b).toEqual(true);
});

test('usestate handlers calling undefined', () => {
    const getProps = testWrapper(
        useStateHandlers(
            { b: false },
            {
                handle: () => () => undefined,
            },
        ),
        {},
    );

    getProps().handle();
    expect(getProps().b).toEqual(false);
});

test('usestate handlers memo', () => {
    const getProps = testWrapper(
        useStateHandlers(() => ({ b: false }), {
            handle: () => ({ b }) => ({ b }),
        }),
        {},
    );

    getProps().handle({ b: true });
    expect(getProps().b).toEqual(true);
});
