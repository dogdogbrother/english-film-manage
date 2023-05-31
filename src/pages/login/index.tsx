import classes from './index.module.less'
import login_inset from '@/assets/img/login_inset.png'

function Login() {
  return <div className={classes.wrap} w-screen h-screen flex items-center justify-center>
    <div md:w-180 w-85 md:h-120 h-100 bg-black drop-shadow-2xl p-5 flex>
      <img flex-1 src={login_inset} alt="inset" />
      <div>1</div>
    </div>
  </div> 
}

export default Login