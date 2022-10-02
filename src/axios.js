import axios from "axios";
import router from "@/router";
import Element from "element-ui";




// axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout:5000,
    headers: {
        'Content-type': "application/json;charset=utf-8"
    }

    })
//拦截器
request.interceptors.request.use(config =>{
//    对请求头进行拦截，1.jwt
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
}),

//    对返回结果进行分装
request.interceptors.response.use(response =>{
    let res = response.data

    if(res.code ===200){
        return response
    }else {
        Element.Message.error(res.msg? res.msg: '系统异常')
        //返回拒绝信息
        return Promise.reject(response.data.msg)
    }
},error => {

                if (error.response.data){
                    error.message = error.response.data.msg
                }

                if (error.response.status ===401){
                    router.push("/login")
                }

                Element.Message.error(error.message,{duration:3000})

    return Promise.reject( error.message)
    }


)

export default request