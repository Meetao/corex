<template>
    <div id="onlineMatchLog">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>在线匹配日志</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-form-item label="匹配会员名称">
                        <el-input v-model="formInline.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="匹配会员日期">
                        <el-date-picker v-model="formInline.date" type="date" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-table
                    :data="tableData.slice((pageNo - 1) * pageSize,pageNo * pageSize)"
                    stripe
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'padding':'4px 2px'}"
                    :height="tableHeight"
                >
                    <el-table-column prop="operationFrom" label="操作会员" width="150" align="center"></el-table-column>
                    <el-table-column prop="operation" label="操作" width="150" align="center"></el-table-column>
                    <el-table-column prop="operationTo" label="操作对象" width="150" align="center"></el-table-column>
                    <el-table-column prop="operationResult" label="操作结果" width="150" align="center"></el-table-column>
                    <el-table-column prop="operator" label="操作员" width="150" align="center"></el-table-column>
                    <el-table-column prop="operationDate" label="操作日期" width="150" align="center"></el-table-column>
                    <el-table-column label="操作" width="确认书" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
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
                    :total="tableData.length"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                name: "",
                date: ""
            },
            tableData: [
                {
                    operationFrom: "CT16",
                    operation: "申请匹配",
                    operationTo: "测试员",
                    operationResult: "申请中",
                    operator: "0002",
                    operationDate: "2018-06-30"
                },
                {
                    operationFrom: "CT13",
                    operation: "申请匹配",
                    operationTo: "测试员",
                    operationResult: "申请中",
                    operator: "0002",
                    operationDate: "2018-06-30"
                },
                {
                    operationFrom: "CT8",
                    operation: "线下匹配",
                    operationTo: "测试员",
                    operationResult: "已匹配",
                    operator: "COREX",
                    operationDate: "2018-06-29"
                },
                {
                    operationFrom: "CT16",
                    operation: "申请匹配",
                    operationTo: "测试员",
                    operationResult: "申请中",
                    operator: "0002",
                    operationDate: "2018-06-30"
                },
                {
                    operationFrom: "CT13",
                    operation: "申请匹配",
                    operationTo: "测试员",
                    operationResult: "申请中",
                    operator: "0002",
                    operationDate: "2018-06-30"
                },
                {
                    operationFrom: "CT8",
                    operation: "线下匹配",
                    operationTo: "测试员",
                    operationResult: "已匹配",
                    operator: "COREX",
                    operationDate: "2018-06-29"
                }
            ],
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
            status: [
                {
                    label: "未读",
                    value: "1"
                },
                {
                    label: "已读",
                    value: "2"
                }
            ],
            //分页相关
            pageNo: 1,
            pageSizeList: [10, 20, 30, 40],
            pageSize: 10,
            totalDataNumber: 0,
            //表格高度自适应
            tableHeight: 460
        };
    },
    methods: {
        handleSizeChange(val) {
            //分页
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
.readedBtn {
    margin: 20px;
}
</style>