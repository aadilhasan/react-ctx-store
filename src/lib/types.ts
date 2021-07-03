import React from 'react'
export interface BaseState {
  [key: string]: any
}

export interface BaseUpdaters<State = BaseState> {
  [key: string]: (...rest: any) => Partial<State>
}

export type CustomContext<S, U> = React.Context<{
  state: S
  updaters: U
}>

type DropFirst<T extends any[]> = T extends [any, ...infer U] ? U : T

type Params<F extends (...args: any) => any> = DropFirst<Parameters<F>>

type UpdatersWithoutStateArgument<C extends BaseUpdaters> = {
  [key in keyof C]: (...args: Params<C[keyof C]>) => Partial<BaseState>
}

export type MapContextToProps<
  State extends BaseState,
  Updaters extends BaseUpdaters
> =
  | ((context: State & UpdatersWithoutStateArgument<Updaters>) => {
      [key: string]: any
    })
  | Array<keyof State | keyof Updaters>
