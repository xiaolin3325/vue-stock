<template>
  <div>
    <div>
      <div>
        <el-row>
          <span class="demonstration" style="padding: 0 10px">交易日期</span>
          <el-date-picker style="padding: 0 10px" v-model="tradedate" align="right" type="date"
            value-format="yyyy-MM-dd" placeholder="选择日期" @change="changeDate">
          </el-date-picker>
          <el-input v-model="filter" placeholder="所属版块" style="width: 150px; padding: 0 10px"></el-input>
          <el-checkbox v-model="isshit">不含ST</el-checkbox>
          <el-checkbox v-model="type" style="padding: 0 10px">跌停板</el-checkbox>
          <el-button @click="load">查询</el-button>
          <el-button @click="sync">同步涨跌停数据</el-button>
          <el-button @click="update">同步补充数据</el-button>
          <el-button @click="deletebydate">删除当天数据</el-button>
        </el-row>
      </div>
    </div>
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%" max-height="735px" ref="table">
        <el-table-column fixed prop="tradedate" label="日期" width="120" sortable>
        </el-table-column>
        <el-table-column prop="code" label="股票代码">
        </el-table-column>
        <el-table-column prop="name" label="股票名称">
        </el-table-column>
        <el-table-column prop="continuity" label="连板数" width="100" sortable>
        </el-table-column>
        <el-table-column prop="continuity7" label="20天N板" width="120" sortable>
        </el-table-column>
        <el-table-column prop="ztdate" label="涨停时间" width="120" sortable>
        </el-table-column>

        <el-table-column prop="close" label="收盘价" width="80">
        </el-table-column>
        <el-table-column prop="pchchange" label="涨跌幅" width="120">
        </el-table-column>
        <el-table-column prop="amount" label="成交额" width="140" :formatter="stateFormat">
        </el-table-column>
        <el-table-column prop="amplitude" label="振幅" width="80">
        </el-table-column>
        <el-table-column prop="turnover" label="换手率" width="80">
        </el-table-column>
        <el-table-column prop="fivechange" label="五日涨跌幅" width="100">
        </el-table-column>
        <el-table-column prop="belong" label="所属版块" width="140">
        </el-table-column>
        <el-table-column prop="mark" label="备注" width="100">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="股票信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px">
        <el-form-item label="所属版块">
          <el-input v-model="form.belong" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.mark" autocomplete="off"></el-input>
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
  created() {
    this.load();
    this.loading = false;
  },
  methods: {
    stateFormat(row, column, cellValue) {
      if (cellValue) {
        cellValue += "";
        if (!cellValue.includes(".")) cellValue += ".";
        return cellValue
          .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ",";
          })
          .replace(/\.$/, "");
      }
    },
    load() {
      axios
        .get("/stock/gethotpage", {
          params: {
            tradedate: this.tradedate,
            isshit: this.isshit,
            type: this.type,
            page: this.currentPage,
            size: this.pageSize,
            filter: this.filter,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    handleNew() {
      axios.post("/stock/update", this.form).then((res) => {
        console.log(res);
      });
      this.dialogFormVisible = false;
    },
    changeDate() {
      this.load();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.load();
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.scrollTop = 0;
      });
    },
    sync() {
      console.log(this.tradedate.replace(/-/g, ''));
      axios.get("/stock/zt/" + this.tradedate.replace(/-/g, '')).then((res) => {
        console.log(res);
      });
      axios.get("/stock/dt/" + this.tradedate.replace(/-/g, '')).then((res) => {
        console.log(res);
      });
    },
    update() {
      axios
        .get("/stock/updatetc?type=dt&tradedate=" + this.tradedate.replace(/-/g, ''))
        .then((res) => {
          console.log(res);
        });
      axios
        .get("/stock/updatetc?type=zt&tradedate=" + this.tradedate.replace(/-/g, ''))
        .then((res) => {
          console.log(res);
        });
    },
    deletebydate() {
      axios.delete("/stock/delete?tradedate=" + this.tradedate).then((res) => {
        console.log(res);
        this.load()
      });
    },
    getyyyyMMdd() {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();
      String(curr_month).length < 2
        ? (curr_month = "0" + curr_month)
        : curr_month;
      String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
      var yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
      return yyyyMMdd;
    },
    getyyyyMMdd2() {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();
      String(curr_month).length < 2
        ? (curr_month = "0" + curr_month)
        : curr_month;
      String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
      var yyyyMMdd = curr_year + "-" + curr_month + "-" + curr_date;
      return yyyyMMdd;
    },
    cancel() {
      this.dialogFormVisible = false;
      this.form = {};
    },
    edit(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tradedate: this.getyyyyMMdd2(), //new Date().toLocaleDateString(),
      loading: true,
      isshit: true,
      type: false,
      today: this.getyyyyMMdd(),
      filter: "",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {},
    };
  },
};
</script>
