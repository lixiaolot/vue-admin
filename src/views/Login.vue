<template>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xl="6" :lg="7">
          <h2>欢迎进入后台管理系统</h2>
<!--          <el-image src="https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF"></el-image>-->
          <el-image :src="require('@/assets/logo.png')" style="width: 180px;height: 180px"></el-image>

          <p>测试系统</p>

      </el-col>

      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>

      <el-col :xl="6" :lg="7">

        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username" style="width: 380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input v-model="loginForm.code" style="width: 172px ;float: left"></el-input>
            <el-image :src="captchaImg" class="captchaImg" style="width: 100px; height: 40px"></el-image>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
         code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ],

      },
      captchaImg: null
    };

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login',this.loginForm).then(res =>{

            //获取jwt
            const jwt = res.headers['authorization']

            //将jwt注入token，调用localStorage
            this.$store.commit('SET_TOKEN',jwt)

            this.$router.push('/index')

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha(){

      this.$axios.get('/captcha').then(res =>{


        console.log("/captcha");
        console.log(res);
        this.loginForm.token = res.data.data.token;
        this.captchaImg=res.data.data.captchaImg;
      })
    }
  },
  created() {
    this.getCaptcha();
  }

}
</script>

<style scoped>

  .el-row{
    background-color: #FAFAFA;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
}
 .el-divider{
   height: 250px;

}

 .captchaImg{
   float: left;
   margin-left: 8px;
   border-radius: 4px;
 }


</style>