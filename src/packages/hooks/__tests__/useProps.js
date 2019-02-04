/* eslint-env jest */

import { testWrapper } from '../utils';
import useProps from '../useProps';

test('maps props', () => {
    const getProps = testWrapper(useProps(({ b }) => ({ b })), {
        a: true,
        b: false,
    });

    expect(getProps().a).toBe(true);
    expect(getProps().b).toBe(false);
});
