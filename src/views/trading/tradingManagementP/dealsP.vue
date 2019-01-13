<template>
    <div id="dealsP">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>P盘交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>P盘成交列表查询</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="对方名称">
                                <el-input v-model="formInline.counterparty"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="成交单号">
                                <el-input v-model="formInline.dealNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="交易标的">
                                <el-select v-model="formInline.brand" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in brands"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="订单状态">
                                <el-select v-model="formInline.type" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in offerStatus"
                                        :key="item"
                                        :value="item"
                                        :label="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="成交日期">
                                <el-date-picker
                                    v-model="formInline.dealDate"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <el-table
                    :data="tableData2.slice((pageNo - 1) * pageSize,pageNo * pageSize)"
                    stripe
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'padding':'4px 2px'}"
                    :height="tableHeight"
                >
                    <el-table-column fixed prop="dealNo" label="成交单号" width="150" align="center"></el-table-column>
                    <el-table-column prop="counterparty" label="对方名称" width="180" align="center"></el-table-column>
                    <el-table-column prop="tradingDate" label="成交时间" width="200" align="center"></el-table-column>
                    <el-table-column prop="brand" label="交易标的" width="130" align="center"></el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="成交数量"
                        width="120"
                        align="center"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column prop="status" label="订单状态" width="120" align="center"></el-table-column>
                    <el-table-column label="操作" width="50" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData2)"
                                type="text"
                                size="small"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="结算确认书" width="118" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData2)"
                                type="text"
                                size="small"
                            >下载</el-button>
                        </template>
                    </el-table-column>
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
    name: "sitedeclareManage",
    data() {
        return {
            formInline: {
                counterparty: "",
                dealNum: "",
                brand: "",
                status: "",
                dealDate: ""
            },
            tableData2: [
                // {
                // 	board: 'A',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '纽曼混合块',
                // 	quantity: 9000,
                // 	price: 1200,
                // 	origin: '巴西',
                // 	dealType: '卖出',
                // 	status: '自动下线'
                // }, {
                // 	board: 'D',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '印度球团',
                // 	quantity: 3000,
                // 	price: 'Platts[Other Binding Terms],62%',
                // 	origin: '印度',
                // 	dealType: '卖出',
                // 	status: '已成交'
                // }, {
                // 	board: 'B',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: 'BRBF粉',
                // 	quantity: 20000,
                // 	price: '520',
                // 	origin: '巴西',
                // 	dealType: '买入',
                // 	status: '已下线'
                // },
                // {
                // 	board: 'A',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '纽曼混合块',
                // 	quantity: 9000,
                // 	price: 1200,
                // 	origin: '巴西',
                // 	dealType: '卖出',
                // 	status: '自动下线'
                // }, {
                // 	board: 'D',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '印度球团',
                // 	quantity: 3000,
                // 	price: 'Platts[Other Binding Terms],62%',
                // 	origin: '印度',
                // 	dealType: '卖出',
                // 	status: '已成交'
                // }, {
                // 	board: 'B',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: 'BRBF粉',
                // 	quantity: 20000,
                // 	price: '520',
                // 	origin: '巴西',
                // 	dealType: '买入',
                // 	status: '已下线'
                // },
                // {
                // 	board: 'A',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '纽曼混合块',
                // 	quantity: 9000,
                // 	price: 1200,
                // 	origin: '巴西',
                // 	dealType: '卖出',
                // 	status: '自动下线'
                // }, {
                // 	board: 'D',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '印度球团',
                // 	quantity: 3000,
                // 	price: 'Platts[Other Binding Terms],62%',
                // 	origin: '印度',
                // 	dealType: '卖出',
                // 	status: '已成交'
                // }, {
                // 	board: 'B',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: 'BRBF粉',
                // 	quantity: 20000,
                // 	price: '520',
                // 	origin: '巴西',
                // 	dealType: '买入',
                // 	status: '已下线'
                // },
                // {
                // 	board: 'A',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '纽曼混合块',
                // 	quantity: 9000,
                // 	price: 1200,
                // 	origin: '巴西',
                // 	dealType: '卖出',
                // 	status: '自动下线'
                // }, {
                // 	board: 'D',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: '印度球团',
                // 	quantity: 3000,
                // 	price: 'Platts[Other Binding Terms],62%',
                // 	origin: '印度',
                // 	dealType: '卖出',
                // 	status: '已成交'
                // }, {
                // 	board: 'B',
                // 	offerTime: '2018-10-10 19:41:56',
                // 	brand: 'BRBF粉',
                // 	quantity: 20000,
                // 	price: '520',
                // 	origin: '巴西',
                // 	dealType: '买入',
                // 	status: '已下线'
                // }
            ],
            brands: this.pubData.brands,
            offerStatus: this.pubData.offerStatus,
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            //分页相关
            pageNo: 1,
            pageSizeList: [10, 20, 30, 40],
            pageSize: 10,
            totalDataNumber: 0,
            //表格高度自适应
            tableHeight: 460
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            var _this = this;
            this.$axios
                .get("data/tradingP")
                .then(function(res) {
                    var tableData = res.data.items;
                    console.log(res.data);
                    _this.tableData2 = tableData; //今日申报
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
                this.tableHeight = 460;
            } else {
                this.tableHeight = 41 * this.totalDataNumber + 50 + "px";
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
.el-form {
    margin-top: 20px;
}
.el-pagination {
    text-align: right;
    margin-top: 10px;
}
</style>