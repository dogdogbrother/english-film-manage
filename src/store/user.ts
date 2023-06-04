import { makeObservable, observable, action } from "mobx"

class UserStore {
  username = ''
  token = ''
  id = ''
  constructor() {
    makeObservable(this, {
      username: observable,
      id: observable,
      setUsername: action,
      setToken: action,
      setId: action,
      logout: action
    })
  }
  setUsername = (username: string) => {
    this.username = username
  }
  setToken = (token: string) => {
    localStorage.setItem('token', token)
    this.token = token
  }
  setId = (id: string) => {
    this.id = id
  }
  logout = async () => {
    this.username = ''
    this.token = ''
    this.id = ''
    return new Promise((res) => res(undefined))
  }
}
export default new UserStore()