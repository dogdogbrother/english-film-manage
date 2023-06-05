import queryString, { StringifiableRecord } from 'query-string'
function getToken() {
  return localStorage.getItem('token')
}
interface FetchProp {
  url: string,
  query?: StringifiableRecord
  data?: object
} 
export function useGetFetch<ResProp = any>(config: FetchProp) {
  const { url, query = {} } = config
  const api = queryString.stringifyUrl({url, query})
  return fetch(api, {
    headers: new Headers({
      'Authorization': `Bearer ${getToken()}`
    })
  }).then(res => {
    const { status } = res
    if (status >= 200 && status < 300) {
      return res.json() as ResProp
    } else if (status === 401) {
      if (!res.url.includes('/user/info')) {
        return Promise.reject('未登录~')
      }
      return Promise.reject('未登录~')
    } else {
      // toast.error('网络错误')
      return Promise.reject(res)
    }
  })
}

export function usePostFetch<ResProp = any>(config: FetchProp) {
  const { url, data = {} } = config
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    })
  }).then(res => {
    console.log(res);
    const { status } = res
    if (status >= 200 && status < 300) {
      if (status === 200) {
        return res.json() as ResProp
      }
      return res.text() as any
    }
    return res.text().then(res => {
      return Promise.reject(res)
    })
  })
}