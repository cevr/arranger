export function compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1

export function compose<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T1

export function compose<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T1

export function compose<V0, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0) => T1,
): (x0: V0) => T2
export function compose<V0, V1, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T2
export function compose<V0, V1, V2, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T2

export function compose<V0, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1,
): (x: V0) => T3
export function compose<V0, V1, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T3
export function compose<V0, V1, V2, T1, T2, T3>(
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T3

export function compose<V0, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1,
): (x: V0) => T4
export function compose<V0, V1, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T4
export function compose<V0, V1, V2, T1, T2, T3, T4>(
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T4

export function compose<V0, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1,
): (x: V0) => T5
export function compose<V0, V1, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T5
export function compose<V0, V1, V2, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T5

export function compose<V0, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x: V0) => T1,
): (x: V0) => T6
export function compose<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T6
export function compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T6

export function pipe<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1
export function pipe<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1,
): (x0: V0, x1: V1) => T1
export function pipe<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
): (x0: V0, x1: V1, x2: V2) => T1

export function pipe<V0, T1, T2>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2,
): (x0: V0) => T2
export function pipe<V0, V1, T1, T2>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
): (x0: V0, x1: V1) => T2
export function pipe<V0, V1, V2, T1, T2>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
): (x0: V0, x1: V1, x2: V2) => T2

export function pipe<V0, T1, T2, T3>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
): (x: V0) => T3
export function pipe<V0, V1, T1, T2, T3>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
): (x0: V0, x1: V1) => T3
export function pipe<V0, V1, V2, T1, T2, T3>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
): (x0: V0, x1: V1, x2: V2) => T3

export function pipe<V0, T1, T2, T3, T4>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
): (x: V0) => T4
export function pipe<V0, V1, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
): (x0: V0, x1: V1) => T4
export function pipe<V0, V1, V2, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
): (x0: V0, x1: V1, x2: V2) => T4

export function pipe<V0, T1, T2, T3, T4, T5>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
): (x: V0) => T5
export function pipe<V0, V1, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
): (x0: V0, x1: V1) => T5
export function pipe<V0, V1, V2, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
): (x0: V0, x1: V1, x2: V2) => T5

export function pipe<V0, T1, T2, T3, T4, T5, T6>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
): (x: V0) => T6
export function pipe<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
): (x0: V0, x1: V1) => T6
export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
): (x0: V0, x1: V1, x2: V2) => T6

declare class Spec {
    state: {}
    props: {}
    setState(newState: any | Function): void
    componentDidMount(): void
    componentDidUpdate(previousProps: {}, previousState: {}): void
    componentWillUnmount(): void
    shouldComponentUpdate(nextProps: {}, nextState: {}): boolean
}

declare type UnaryFn<A, R> = (a: A) => R

export function useLifecycle<Props, Enhanced>(
    spec: Spec,
): (props: Props) => Props & Enhanced

export function useContextEnhancer<Props, Enhanced>(
    context: React.Context,
    contextMapper: void | UnaryFn<any, Enhanced>,
): (props: Props) => Props & Enhanced

export function useDefaultProps<Props, Enhanced>(
    defaultProps: Enhanced,
): (props: Props) => Props & Enhanced

export function useHandlers<Props, Handlers>(
    handlers: Handlers,
): (props: Props) => Props & Handlers

export function usePropFlattener<Props, K extends keyof Props>(
    propName: K,
): (props: Props) => Props & K

export function usePropRenamer<T, K extends keyof T>(
    oldName: T,
    newName: string,
): (props: T) => T

export function useProps<Props, Enhanced>(
    createProps: Enhanced | UnaryFn<Props, Enhanced>,
): (props: Props) => Props & Enhanced

export function usePropsMapper<Props, Enhanced>(
    propsMapper: UnaryFn<Props, Enhanced>,
): (props: Props) => Enhanced

export function usePropsOnChange<Props, Enhanced>(
    shouldMapOrKeys: string[] | UnaryFn<Props, Boolean>,
    createProps: UnaryFn<Props, Enhanced>,
): (props: Props) => Props & Enhanced

export function usePropsRenamer<Props, Enhanced>(
    nameMap: UnaryFn<Props, Enhanced>,
): (props: Props) => Props & Enhanced

export function useReducerEnhancer<Props, Action, State>(
    stateName: string,
    dispatchName: string,
    reducer: (state: State, action: Action) => State,
    initialState: State,
    initalAction: Action,
): (props: Props) => Props & State

export function useStateEnhancer<Props, State>(
    stateName: string,
    stateUpdaterName: string,
    initialState: State | UnaryFn<Props, State>,
): (props: Props) => Props & State

interface StateHandlers<State, Props> {
    [key: string]: (
        state: State,
        props: Props,
    ) => (...payload: any[]) => $Shape<State>
}

export function useStateHandlers<State, Props>(
    initialState: State | UnaryFn<Props, State>,
    stateHandlers: StateHandlers,
): (props: Props) => State & Props

export function checkPropTypes<Props>(
    propTypes: React.ReactPropTypes,
    componentName: string,
): (props: Props) => Props

export function useHook<Props, Enhanced>(
    hookMapper: Enhanced | UnaryFn<Props, Enhanced>,
): (props: Props) => Props & Enhanced
