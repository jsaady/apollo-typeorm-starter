
import React, { ComponentType } from 'react';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
type Type<T> = { new(): T }&Function;
type ApplicablePropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : T[K] extends Observable<any> ? never : K }[keyof T];

const internalStorage = new WeakMap<Function, BaseState>();

export class BaseState {
  private readonly observableMap: {
    [K in keyof this]?: BehaviorSubject<this[K]>;
  };

  private _allChanges$: BehaviorSubject<BaseState>;

  get allChanges$(): Observable<BaseState> {
    return this._allChanges$;
  }

  constructor () {
    if (internalStorage.get(this.constructor)) {
      return internalStorage.get(this.constructor);
    } else {
      internalStorage.set(this.constructor, this);
    }

    this._allChanges$ = new BehaviorSubject(this as BaseState);
    this.observableMap = {};
  }

  changesTo$<K extends ApplicablePropertyNames<this>>(attr?: K): Observable<this[K]> {
    return this.observableMap[attr] = (this.observableMap[attr] || new BehaviorSubject(this[attr]));
  }

  set<K extends ApplicablePropertyNames<this>>(attr: K, val: this[K]): this {
    this[attr] = val;
    this.changesTo$(attr);
    setTimeout(() => {
      this.observableMap[attr].next(val);
      this._allChanges$.next(this);
    });
    return this;
  }

  triggerChange<K extends ApplicablePropertyNames<this>>(attr: K): void {
    this.set(attr, this[attr]);
  }
}

export type StateSetter<T> = <P extends keyof T>(prop: P, val: T[P]) => void;
type GenericStateSetter<T, T2, T3, T4, T5, T6, T7, T8, T9> = <A extends T|T2|T3|T4|T5|T6|T7|T8|T9>(state: Type<A>) => <P extends keyof A>(prop: P, val: A[P]) => void;

export type Mapper<T, T2, T3, T4, T5, T6, T7, T8, T9> = <A, P>(state: T, getSetter: GenericStateSetter<T, T2, T3, T4, T5, T6, T7, T8, T9>, lastProps: Partial<P>) => Partial<P>;

type StateTypeArg1<T> = [Type<T>];
type StateTypeArg2<T, T2> = [Type<T>, Type<T2>];
type StateTypeArg3<T, T2, T3> = [Type<T>, Type<T2>, Type<T3>];
type StateTypeArg4<T, T2, T3, T4> = [Type<T>, Type<T2>, Type<T3>, Type<T4>];
type StateTypeArg5<T, T2, T3, T4, T5> = [Type<T>, Type<T2>, Type<T3>, Type<T4>, Type<T5>];
type StateTypeArg6<T, T2, T3, T4, T5, T6> = [Type<T>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>];
type StateTypeArg7<T, T2, T3, T4, T5, T6, T7> = [Type<T>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>, Type<T7>];
type StateTypeArg8<T, T2, T3, T4, T5, T6, T7, T8> = [Type<T>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>, Type<T7>, Type<T8>];
type StateTypeArg9<T, T2, T3, T4, T5, T6, T7, T8, T9> = [Type<T>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>, Type<T7>, Type<T8>, Type<T9>];

type StateTypeArg<T, T2, T3, T4, T5, T6, T7, T8, T9> =
  StateTypeArg1<T>|
  StateTypeArg2<T, T2>|
  StateTypeArg3<T, T2, T3>|
  StateTypeArg4<T, T2, T3, T4>|
  StateTypeArg5<T, T2, T3, T4, T5>|
  StateTypeArg6<T, T2, T3, T4, T5, T6>|
  StateTypeArg7<T, T2, T3, T4, T5, T6, T7>|
  StateTypeArg8<T, T2, T3, T4, T5, T6, T7, T8>|
  StateTypeArg9<T, T2, T3, T4, T5, T6, T7, T8, T9>;


type StateArg1<T> = [T];
type StateArg2<T, T2> = [T, T2];
type StateArg3<T, T2, T3> = [T, T2, T3];
type StateArg4<T, T2, T3, T4> = [T, T2, T3, T4];
type StateArg5<T, T2, T3, T4, T5> = [T, T2, T3, T4, T5];
type StateArg6<T, T2, T3, T4, T5, T6> = [T, T2, T3, T4, T5, T6];
type StateArg7<T, T2, T3, T4, T5, T6, T7> = [T, T2, T3, T4, T5, T6, T7];
type StateArg8<T, T2, T3, T4, T5, T6, T7, T8> = [T, T2, T3, T4, T5, T6, T7, T8];
type StateArg9<T, T2, T3, T4, T5, T6, T7, T8, T9> = [T, T2, T3, T4, T5, T6, T7, T8, T9];

type StateArg<T, T2, T3, T4, T5, T6, T7, T8, T9> =
  StateArg1<T>|
  StateArg2<T, T2>|
  StateArg3<T, T2, T3>|
  StateArg4<T, T2, T3, T4>|
  StateArg5<T, T2, T3, T4, T5>|
  StateArg6<T, T2, T3, T4, T5, T6>|
  StateArg7<T, T2, T3, T4, T5, T6, T7>|
  StateArg8<T, T2, T3, T4, T5, T6, T7, T8>|
  StateArg9<T, T2, T3, T4, T5, T6, T7, T8, T9>;
type StateFunc<R, T, T2, T3, T4, T5, T6, T7, T8, T9> = (states: StateArg<T, T2, T3, T4, T5, T6, T7, T8, T9>, getSetter: GenericStateSetter<T, T2, T3, T4, T5, T6, T7, T8, T9>, lastProps: Partial<R>) => Partial<R>;

type StateObs9<R, T, T2, T3, T4, T5, T6, T7, T8, T9> = [
  Observable<T>,
  Observable<T2>,
  Observable<T3>,
  Observable<T4>,
  Observable<T5>,
  Observable<T6>,
  Observable<T7>,
  Observable<T8>,
  Observable<T9>
];

export function withMapState <T, T2 = never, T3 = never, T4 = never, T5 = never, T6 = never, T7 = never, T8 = never, T9 = never> (
  stateArgs: StateTypeArg<T, T2, T3, T4, T5, T6, T7, T8, T9>
) {
  return function <P, R extends Partial<P>> (Component: ComponentType<P>) {
    return function (
      mapper: StateFunc<P, T, T2, T3, T4, T5, T6, T7, T8, T9>
    ) {
      const states = (stateArgs as any) as Type<BaseState>[];
      const mappedStates = states
        .map(State => new State())
        .filter(state => state instanceof BaseState) as (BaseState[] & StateArg<T, T2, T3, T4, T5, T6, T7, T8, T9>);
    
      const stateSet = function <T extends BaseState> (State: Type<T>) {
        const state = new State();
        return function doSet<K extends ApplicablePropertyNames<T>> (key: K, val: T[K]) {
          state.set(key, val);
        }
      } as GenericStateSetter<T, T2, T3, T4, T5, T6, T7, T8, T9>;

      return class extends React.Component {
        private sub: Subscription;
        state: Partial<P> = mapper(mappedStates, stateSet, this.state);
    
        constructor (props: R) {
          super(props);
        }
    
        componentDidMount () {
          const obs = combineLatest(
            ...mappedStates.map(state => state.allChanges$)
          ) as Observable<[T, T2, T3, T4, T5, T6, T7, T8, T9]>;
      
          this.sub = obs.subscribe((newState) => {
            this.setState(mapper(newState, stateSet, this.state));
          });
        }
        render () {
          const { props } = this;
          const allProps = {
            ...props,
            ...this.state
          } as P&R;
          return <Component {...allProps} />;
        }
    
        componentWillUnmount () {
          this.sub.unsubscribe();
        }
      }
    }
  }
}
