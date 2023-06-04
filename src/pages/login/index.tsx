import classes from './index.module.less'
import login_inset from '@/assets/img/login_inset.png'
import { useForm, Controller } from "react-hook-form"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Input, Button, message } from 'antd'
import { login } from '@/api/user'
import UserStore from '@/store/user'

interface FormProp {
  username: string
  password: string
}
function Login() {
  const navigate = useNavigate()
  const { setUsername, setToken, setId } = UserStore
  const { control, handleSubmit, formState: { errors } } = useForm<FormProp>();
  const [ loading, setLoading ] = useState(false);
  function onLogin(form: FormProp) {
    setLoading(true)
    login(form).then(res => {
      const { token, username, id } = res
      setUsername(username)
      setToken(token)
      setId(id)
      navigate('/home')
      message.success('登录成功')
    }).finally(() => setLoading(false))
  }
  return <div className={classes.wrap} w-screen h-screen flex items-center justify-center>
    <div bg-white drop-shadow-2xl p-5 flex>
      <img md:block display-none w-105 h-88 m-r-5 src={login_inset} alt="inset" />
      <div flex-1>
        <h2 m-y-8>这是我的logo的地方</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <Controller
            rules={{ required: true }} 
            control={control} 
            name="username" 
            render={({ field }) => <Input spellCheck="false" h-11 status={errors.username && 'error'} m-b-1 {...field} placeholder='请输入用户名' />}/>
          <div h-3 m-b-4>
            {errors.username && <div text-3 color-red>用户名不合法</div>}
          </div>
          <Controller 
            rules={{ required: true }} 
            control={control} 
            name="password" 
            render={({ field }) => <Input.Password spellCheck="false" style={{height: '44px'}} status={errors.password && 'error'} {...field} placeholder='请输入密码' />}/>
          <div h-3 m-b-7 m-t-1>
            {errors.password && <div text-3 color-red>密码不合法</div>}
          </div>
          <Button htmlType="submit" type='primary' loading={loading} w-70 h-10 b-none color-white>登 录</Button>
        </form>
      </div>
    </div>
  </div> 
}

export default Login