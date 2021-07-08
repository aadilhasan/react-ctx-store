import React from 'react'
export interface BaseStore {
  [key: string]: any
}

export interface BaseUpdaters<Store = BaseStore> {
  [key: string]: (...rest: any) => Partial<Store> | Promise<Partial<Store>>
}

export type CustomContext<S, U> = React.Context<{
  store: S
  updaters: U
}>

type DropFirst<T extends any[]> = T extends [any, ...infer U] ? U : T

type Params<F extends (...args: any) => any> = DropFirst<Parameters<F>>

type UpdatersWithoutStoreArgument<C extends BaseUpdaters> = {
  [key in keyof C]: (...args: Params<C[keyof C]>) => Partial<BaseStore>
}

export type MapContextToProps<
  Store extends BaseStore,
  Updaters extends BaseUpdaters
> =
  | ((context: Store & UpdatersWithoutStoreArgument<Updaters>) => {
      [key: string]: any
    })
  | Array<keyof Store | keyof Updaters>
