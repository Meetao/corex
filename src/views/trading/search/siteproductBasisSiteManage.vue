<template>
    <div id="siteproductBasisSiteManage">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>查询</el-breadcrumb-item>
                <el-breadcrumb-item>基准价查询</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-form-item label="品种">
                        <el-select v-model="formInline.type" clearable placeholder="请选择">
                            <el-option
                                v-for="item in brandTypes"
                                :key="item.value"
                                :value="item.value"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产地">
                        <el-select v-model="formInline.origin" clearable placeholder="请选择">
                            <el-option
                                v-for="item in origins"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易标的">
                        <el-select v-model="formInline.product" clearable placeholder="请选择">
                            <el-option
                                v-for="item in brands"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                    :data="tableData3.slice((pageNo - 1) * pageSize,pageNo * pageSize)"
                    stripe
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'padding':'8px'}"
                    :height="tableHeight"
                >
                    <el-table-column fixed prop="brand" label="交易标的" width="250" align="center"></el-table-column>
                    <el-table-column prop="brandType.value" label="品种" width="250" align="center"></el-table-column>
                    <el-table-column prop="CFR" label="CFR（美元/干吨）" width="280" align="center"></el-table-column>
                    <el-table-column
                        prop="onPortPrice"
                        label="现汇含税湿吨车板（元/湿吨）"
                        width="298"
                        align="center"
                    ></el-table-column>
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
                type: "",
                board: "",
                origin: "",
                product: ""
            },
            tableData3: [
                // {
                // 	brand:'PB块',
                // 	brandType:'块矿',
                // 	CFR:84.91,
                // 	onPortPrice:746.00
                // },
                // {
                // 	brand:'纽曼混合块',
                // 	brandType:'块矿',
                // 	CFR:89.09,
                // 	onPortPrice:763.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // },
                // {
                // 	brand:'PB块',
                // 	brandType:'块矿',
                // 	CFR:84.91,
                // 	onPortPrice:746.00
                // },
                // {
                // 	brand:'纽曼混合块',
                // 	brandType:'块矿',
                // 	CFR:89.09,
                // 	onPortPrice:763.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // },
                // {
                // 	brand:'PB块',
                // 	brandType:'块矿',
                // 	CFR:84.91,
                // 	onPortPrice:746.00
                // },
                // {
                // 	brand:'纽曼混合块',
                // 	brandType:'块矿',
                // 	CFR:89.09,
                // 	onPortPrice:763.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // },
                // {
                // 	brand:'FMG块',
                // 	brandType:'粉矿',
                // 	CFR:49.10,
                // 	onPortPrice:428.00
                // }
            ],
            brandTypes: this.pubData.brandTypes,
            brands: this.pubData.brands,
            origins: this.pubData.origins,
            //分页相关
            pageNo: 1,
            pageSizeList: [10, 20, 30, 40],
            pageSize: 10,
            totalDataNumber: 0,
            //表格高度自适应
            tableHeight: 440
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            var _this = this;
            this.$axios
                .get("data/productBasis")
                .then(function(res) {
                    var tableData = res.data.items;
                    console.log(res.data);
                    _this.tableData3 = tableData; //今日申报
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
                this.tableHeight = 440;
            } else {
                this.tableHeight = 40 * this.totalDataNumber + 38 + "px";
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