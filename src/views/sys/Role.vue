<template>
  <div>
    <el-form :inline="true"  >
      <el-form-item>
        <el-input
            v-model="searchForm.name"
            placeholder="名称"
            clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getRoleList()" type="primary" plain round >搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="dialogVisible = true">新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-popconfirm title="确定进行批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" round slot="reference" :disabled="isDel">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>


    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <el-table-column
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>

      <el-table-column
          prop="code"
          label="唯一编码"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="remark"
          label="描述"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="statu"
          label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="orderNum"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="确定删除此条记录吗？"  @confirm="delHandle(scope.row.id)">
              <el-button type="text" style="color: red" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>

    </el-table>


      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :current-page="current"
          :page-size="size"
          :total="total">
      </el-pagination>

    <!--    新增的对话框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">立即创建</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Role",
  data(){
    return{
      searchForm: {},
      isDel: true,
      editFormRules: {
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        statu: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      tableData: [],
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 0,
      dialogVisible:false,
      editForm:{}
    }
  },
  methods:{
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
      //按钮状态
      this.isDel =  val.length == 0
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {
      this.resetForm('editForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    getRoleList(){
      console.log("获取列表")
      this.$axios.get("/sys/role/list",{
        params:{
          name: this.searchForm.name,
          current: this.current,
          size:this.size
        }
      }).then(res =>{
        this.tableData = res.data.data.records
        this.size=res.data.data.size
        this.current=res.data.data.current
        this.total=res.data.data.total

      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/role/' + (this.editForm.id?'update' : 'save'),this.editForm)
              .then(res =>{
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.getRoleList()
                  }
                });
                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    permHandle(id){
      this.permDialogVisible = true
      this.$axios.get("/sys/role/info").then( res =>{
        this.$refs.permTree.setCheckedKeys([res.data.data.menuIds]);
        this.permForm =res.data.data
      })

    },

    editHandle(id){
      this.$axios.get('/sys/role/info'+ id).then( res =>{
        this.editForm = res.data.data
        console.log(this.editForm )
        this.dialogVisible = true
      })
    },
    delHandle(id){

      var ids =[]



      if(id){
        ids.push(id)
      }else{
        this.multipleSelection.forEach( row =>{
          ids.push(row.id)
        })
      }

      console.log(ids)
      this.$axios.post("/sys/role/delete"+ ids).then(res =>
      {
        this.$message({
          message: '恭喜你，删除成功！',
          type: 'success',
          onClose: ()=>{
            this.getRoleList()
          }
        });

      })
    },
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style scoped>
.el-pagination{
  float: right;
  margin-top: 22px;
}

</style>