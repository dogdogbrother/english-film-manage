import { makeObservable, observable, action } from "mobx"

class LayoutStore {
  isShrink = false  // aside的收缩状态
  constructor() {
    makeObservable(this, {
      isShrink: observable,
      setShrink: action
    })
  }
  setShrink = (state: boolean) => {
    this.isShrink = state
  }
}
export default new LayoutStore()