import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
NProgress.configure({showSpinner:false})


/* 
    router beforeeach，簡單講就是導航守衛，可以用來
    做一些保護，例如未拿到驗證token，就不能往下
*/

router.beforeEach(async(to,from,next)=>{

    NProgress.start()
    console.log('to: '+to.path)
    console.log('from: '+from.path)
    if(store.state.auth_app.login_status){
        next()
    }
    else{
        console.log("請先選取身份")
 
        if(to.path!=='/'){
            next('/')
        }
        else{
            next()
        }
    }


})

router.afterEach(()=>{
    //進度條
    NProgress.done()
})