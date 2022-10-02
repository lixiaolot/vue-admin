const  Mock = require("mockjs")

const Random = Mock.Random

let Result = {
    code: 200,
    msg: "操作成功",
    data: null
}

//获取验证码
Mock.mock('/captcha','get',()=>{

    Result.data = {
        token :Random.string(32),
        captchaImg: Random.dataImage('100x30',"p7n5w")
    }

    return Result
})

//登录
Mock.mock('/login','post',()=>{
//    mock无法将jwt数据传入header



    return Result

})

//获取用户信息
Mock.mock('/userInfo','get',()=>{
    Result.data = {
        id : "1",
        username: "李小龙",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"

    }



    return Result

})

