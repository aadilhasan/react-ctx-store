import { BaseUpdaters, MapContextToProps } from './types'
export const getProps = <Store, Updaters extends BaseUpdaters>(
  prevProps: Partial<Store & Updaters>,
  mapContextToProps: MapContextToProps<Store, Updaters>,
  store: Store,
  updaters: Updaters
): Partial<Store & Updaters> => {
  let props: Partial<Store & Updaters> = {}
  const context: any = { ...store, ...updaters }
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
    props = mapContextToProps(context) as Partial<Store & Updaters>
    let key: keyof Partial<Store & Updaters>
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
