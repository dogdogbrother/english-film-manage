import classes from './index.module.less'
import login_inset from '@/assets/img/login_inset.png'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

interface FormProp {
  useranme: string
  password: string
}
function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormProp>();
  const [data, setData] = useState("");
  function onLogin(form: FormProp) {
    console.log(form);
    navigate('/')
  }
  return <div className={classes.wrap} w-screen h-screen flex items-center justify-center>
    <div bg-white drop-shadow-2xl p-5 flex>
      <img md:block display-none w-105 h-88 m-r-5 src={login_inset} alt="inset" />
      <div flex-1>
        <h2 m-y-8>这是我的logo的地方</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <input spellCheck="false" w-70 h-9 p-x-2 block m-b-1 {...register("useranme", { required: true })} placeholder="First name" />
          <div h-3 m-b-5>
            {errors.useranme && <div text-3 color-red>用户名不合法</div>}
          </div>
          <input spellCheck="false" w-70 h-9 p-x-2 block m-b-1 {...register("password", { required: true })} placeholder="First name" />
          <div h-3 m-b-6>
            {errors.password && <div text-3 color-red>密码不合法</div>}
          </div>
          <input type="submit" value="登 录" w-70 h-10 b-none bg-violet color-white cursor-pointer />
        </form>
      </div>
    </div>
  </div> 
}

export default Login