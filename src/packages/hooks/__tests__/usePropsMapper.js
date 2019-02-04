/* eslint-env jest */

import { testWrapper } from '../utils';
import usePropsRenamer from '../usePropsMapper';

test('maps props', () => {
    const getProps = testWrapper(usePropsRenamer(({ b }) => ({ b })), {
        a: true,
        b: false,
    });

    expect(getProps().a).toBe(undefined); //
    expect(getProps().b).toBe(false);
});
