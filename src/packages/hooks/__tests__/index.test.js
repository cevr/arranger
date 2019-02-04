/* eslint-env jest */
import * as exported from '..';

test('exports expected', () => {
    expect(Object.keys(exported)).toEqual([
        'compose',
        'pipe',
        'useContext',
        'useDefaultProps',
        'useHandlers',
        'useLifecycle',
        'usePropFlattener',
        'usePropRenamer',
        'useProps',
        'usePropsMapper',
        'usePropsOnChange',
        'usePropsRenamer',
        'useReducerEnhancer',
        'useStateEnhancer',
        'useStateHandlers',
    ]);
});
