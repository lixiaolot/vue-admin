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

//登出
Mock.mock('/logout','post',()=>{

    return Result

})

//获取菜单
Mock.mock('/sys/menu/nav','get',()=>{
    let nav = [
        {
            title: '系统管理',
            name:'SysMange',
            icon:'el-icon-s-operation',
            component: '',
            path:'',
            children: [
                {
                    title: '用户管理',
                    name:'SysUser',
                    icon:'el-icon-s-custom',
                    path:'/sys/users',
                    component: 'sys/User',
                    children:[]
                },
                {
                    title: '角色管理',
                    name:'SysRole',
                    icon:'el-icon-rank',
                    path:'/sys/roles',
                    component: 'sys/Role',
                    children:[]
                },
                {
                    title: '菜单管理',
                    name:'SysMenu',
                    icon:'el-icon-menu',
                    path:'/sys/menus',
                    component: 'sys/Menu',
                    children:[]
                }
            ]
        },
        {
            title: '系统工具',
            name:'SysTools',
            icon:'el-icon-s-tools',
            component: '',
            path:'',
            children:[
                {
                    title: '数字字典',
                    name:'SysDict',
                    icon:'el-icon-s-order',
                    component: '',
                    path:'/sys/dict',
                    children:[]
                }
            ]
        },
    ]
    let authority = []

    Result.data ={
        nav : nav,
        authority: authority
    }

    return Result
})
