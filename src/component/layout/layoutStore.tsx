import { makeObservable, observable, action } from "mobx"

class LayoutStore {
  collapsed = false  // aside的收缩状态
  constructor() {
    makeObservable(this, {
      collapsed: observable,
      setCollapsed: action
    })
  }
  setCollapsed= (state: boolean) => {
    this.collapsed = state
  }
}
export default new LayoutStore()