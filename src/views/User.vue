<template>
  <div>
    <div style="padding: 10px 0">
      <el-input
        style="width: 200px"
        class="ml-5"
        suffix-icon="el-icon-search"
        placeholder="请输入名称"
        v-model="userName"
      ></el-input>
      <el-input
        style="width: 200px"
        class="ml-5"
        suffix-icon="el-icon-search"
        placeholder="请输入昵称"
        v-model="nickName"
      ></el-input>
      <el-button type="primary" class="ml-5" @click="load">搜索</el-button>
      <el-button type="primary" class="ml-5" @click="reset">重置</el-button>
    </div>

    <div style="padding: 10px 0">
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增
        <li class="el-icon-circle-plus-outline"></li
      ></el-button>
      <el-button type="danger"
        >批量删除
        <li class="el-icon-remove-outline"></li
      ></el-button>
      <el-button type="primary"
        >导入
        <li class="el-icon-circle-plus-outline"></li
      ></el-button>
      <el-button type="primary"
        >导出
        <li class="el-icon-circle-plus-outline"></li
      ></el-button>
    </div>

    <el-table :data="tableData" border stripe header-cell-class-name="'headbg'">
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="280">
      </el-table-column>

      <el-table-column prop="nickname" label="呢称" width="280">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="350"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"> </el-table-column>
      <el-table-column prop="address" label="地址" width="280">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="warning" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除此用户吗？"
            @confirm="handleDelete(scope.row)"
            >>
            <el-button type="danger" slot="reference" class="ml-5"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleNew">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      userName: "",
      nickName: "",
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      // fetch("http://localhost/user/page?pageNum="+ this.pageNum +"&pageSize="+ this.pageSize + "&userName=" + this.userName + "&nickName=" + this.nickName).then(res => res.json()).then(res => {
      //   this.tableData = res.records
      //   this.total = res.total
      // })
      axios
        .get("/user/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            userName: this.userName,
            nickName: this.nickName,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
          // console.log(res.data.records);
        });
    },
    reset() {
      this.userName = "";
      this.nickName = "";
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },
    handleDelete(row) {
      axios.delete("/user/" + row.id).then((res) => {
        if (res) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error({ message: "删除失败" });
        }
        this.load();
      });
    },
    handleNew() {
      axios.post("/user", this.form).then((res) => {
        if (res) {
          this.$message.success({ message: "添加成功" });
          this.form = {};
          this.dialogFormVisible = false;

          this.load();
        } else {
          this.$message.error({ message: "添加失败" });
        }
      });
    },
    edit(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
      this.form = {};
    },
  },
};
</script>

<style>
.headbg {
  color: rgb(214, 181, 181) !important;
}
</style>
