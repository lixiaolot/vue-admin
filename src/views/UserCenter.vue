<template>
  <div style="text-align: center;">
  <h2>您好，{{ userInfo.username }}</h2>

  <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px">
    <el-form-item label="旧密码" prop="currentPass">
      <el-input type="password" v-model="passForm.currentPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('passForm')">提交</el-button>
      <el-button @click="resetForm('passForm')">重置</el-button>
    </el-form-item>


  </el-form>
</div>
</template>

<script>
export default {
  name: "UserCenter",
  data(){
    var validatePass =(rule,value,callback) =>{
      if (value=== ''){
        callback(new Error("请再次输入密码"));
      }else if (value !== this.passForm.password){
        callback(new Error("两次输入密码不一致"));
      }else {
        callback();
      }
    }
    return{

      userInfo:{

      },
      passForm:{
        currentPass: "",
        password: "",
        checkPass:""
      },
      rules:{
        password: [
          {require: true,message:"请输入新密码",trigger:'blur'},
          {min: 6,max: 12,message: "长度在6-12个字符",trigger:'blur'}
        ],
        currentPass: [
          {require: true,message:"请输入当前密码",trigger:'blur'},
        ],
        checkPass: [
          {require: true,validator: validatePass,trigger:'blur'},
        ],
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      this.$axios.get("/userInfo").then(res=> {
        this.userInfo = res.data.data
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this =this
          this.$axios.post('/sys/user/updatePass',this.passForm).then(res =>{

            _this.$alert(res.data.msg,'提示',{
              confirmButtonText: '确定',
              callback: action => {
                this.$refs[formName].resetFields();
              }
            });

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 420px;
  margin: 50px auto;
}


</style>