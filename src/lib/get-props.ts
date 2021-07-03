import { BaseUpdaters, MapContextToProps } from './types'

export const getProps = <State, Updaters extends BaseUpdaters>(
  prevProps: Partial<State & Updaters>,
  mapContextToProps: MapContextToProps<State, Updaters>,
  state: State,
  updaters: Updaters
): Partial<State & Updaters> => {
  let props: Partial<State & Updaters> = {}
  const context: any = { ...state, ...updaters }
  let hasChanged = false
  if (Array.isArray(mapContextToProps)) {
    mapContextToProps.forEach((prop) => {
      props[prop] = context[prop]
      const oldProp = prevProps[prop]
      if (oldProp === undefined || context[prop] !== oldProp) {
        hasChanged = true
      }
    })
  } else {
    props = mapContextToProps(context) as Partial<State & Updaters>
    let key: keyof Partial<State & Updaters>
    for (key in props) {
      const oldProp = prevProps[key]
      if (!oldProp || props[key] !== oldProp) {
        hasChanged = true
        break
      }
    }
  }
  if (!hasChanged) return prevProps
  return props
}
