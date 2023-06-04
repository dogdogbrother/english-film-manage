import { usePostFetch, useGetFetch } from './fetch'

interface LoginProp {
  username: string
  password: string
}
interface LoginRes {
  username: string
  token: string
  id: string
}
export function login(data: LoginProp) {
  return usePostFetch<LoginRes>({
    url: '/api/manage/user/login',
    data
  })
}
interface InfonRes {
  username: string
  id: string
}
export function getInfo() {
  return useGetFetch<InfonRes>({
    url: '/api/manage/user/info',
  })
}