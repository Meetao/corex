<template>
    <div id="accountBalance">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资金管理</el-breadcrumb-item>
                <el-breadcrumb-item>资金查询</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'padding':'5px'}"
                >
                    <el-table-column fixed prop="title" label width="300" align="center"></el-table-column>
                    <el-table-column prop="CNYAccount" label="人民币账户(元)" width="390" align="center"></el-table-column>
                    <el-table-column prop="USDAccount" label="美元账户(美元)" width="388" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    title: "账户余额",
                    CNYAccount: 2000000.12,
                    USDAccount: 123456.78
                },
                {
                    title: "可用资金",
                    CNYAccount: 2000000.12,
                    USDAccount: 123456.78
                },
                {
                    title: "履约保证金冻结",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "浮动亏损冻结",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "风险资金冻结",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "交易服务费冻结",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "其他资金冻结",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "缺口资金",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "当日入金",
                    CNYAccount: 0,
                    USDAccount: 0
                },
                {
                    title: "当日出金",
                    CNYAccount: 0,
                    USDAccount: 0
                }
            ]
        };
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
</style>