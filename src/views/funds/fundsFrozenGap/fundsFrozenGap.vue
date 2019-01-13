<template>
    <div id="fundsFrozenGap">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资金管理</el-breadcrumb-item>
                <el-breadcrumb-item>P盘冻结资金/缺口明细</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-table
                    :data="tableData.slice((pageNo - 1) * pageSize,pageNo * pageSize)"
                    stripe
                    show-summary
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'padding':'8px'}"
                    :height="tableHeight"
                >
                    <el-table-column prop="dealNo" label="成交单号" width="118" align="center"></el-table-column>
                    <el-table-column label="已冻结金额" width="300" align="center">
                        <el-table-column
                            prop="peormanceBond_A"
                            label="履约保证金冻结"
                            width="150"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="floatingLosses_A"
                            label="浮亏冻结"
                            width="150"
                            align="center"
                        ></el-table-column>
                    </el-table-column>
                    <el-table-column label="应冻结金额" width="300" align="center">
                        <el-table-column
                            prop="peormanceBond_B"
                            label="履约保证金冻结"
                            width="150"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="floatingLosses_B"
                            label="浮亏冻结"
                            width="150"
                            align="center"
                        ></el-table-column>
                    </el-table-column>
                    <el-table-column prop="differential" label="每单应冻结差额" width="120" align="center"></el-table-column>
                    <el-table-column
                        prop="frozenForRiskControl"
                        label="风险资金冻结"
                        width="120"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="gap" label="缺口资金" width="120" align="center"></el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNo"
                    :page-sizes="pageSizeList"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalDataNumber"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                // {
                // 	dealNo:'No.1',
                // 	peormanceBond_A:'3131',
                // 	floatingLosses_A:'4564',
                // 	peormanceBond_B:'6764',
                // 	floatingLosses_B:'676',
                // 	differential:'33',
                // 	frozenForRiskControl:'867',
                // 	gap:'6767'
                // },
                // {
                // 	dealNo:'No.2',
                // 	peormanceBond_A:'8787',
                // 	floatingLosses_A:'55',
                // 	peormanceBond_B:'6546',
                // 	floatingLosses_B:'45',
                // 	differential:'8776',
                // 	frozenForRiskControl:'3343',
                // 	gap:'45'
                // }
            ],
            //分页相关
            pageNo: 1,
            pageSizeList: [10, 20, 30, 40],
            pageSize: 10,
            totalDataNumber: 0,
            //表格高度自适应
            tableHeight: 536
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            var _this = this;
            this.$axios
                .get("data/frozen")
                .then(function(res) {
                    var tableData = res.data.items;
                    console.log(res.data);
                    _this.tableData = tableData; //今日申报
                    _this.totalDataNumber = tableData.length;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            //分页
            this.pageSize = val;
            if (this.totalDataNumber > this.pageSize) {
                this.tableHeight = 536;
            } else {
                this.tableHeight = 41 * this.totalDataNumber + 118 + "px";
            }
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.pageNo = val;
        },
        onSubmit() {
            console.log("submit!");
        }
    }
};
</script>

<style scoped>
.searchBox {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    padding: 10px;
}
.el-breadcrumb {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
}
.el-pagination {
    text-align: right;
    margin-top: 10px;
}
</style>