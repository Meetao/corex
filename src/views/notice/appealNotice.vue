<template>
    <div id="appealNotice">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>在线通知</el-breadcrumb-item>
                <el-breadcrumb-item>申诉通知</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="searchBox">
                <el-form :inline="true" class="demo-form-inline" size="small">
                    <el-form-item label="标题">
                        <el-input v-model="formInline.title" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker
                            v-model="formInline.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
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
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column prop="date" label="发布时间" width="250" align="center"></el-table-column>
                    <el-table-column prop="title" label="标题" width="250" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" width="230" align="center"></el-table-column>
                    <el-table-column label="附件" width="298" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small"
                            >下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="readedBtn">
                    <el-button size="small">设为已读</el-button>
                    <el-button size="small">全部已读</el-button>
                </div>
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
            formInline: {
                title: "",
                date: ""
            },
            tableData: [
                {
                    date: "2018-06-30 14:07:13",
                    title: "notice1",
                    status: "未读"
                },
                {
                    date: "2018-09-30 15:25:22",
                    title: "notice2",
                    status: "已读"
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
                .get("data/notice")
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
.readedBtn {
    margin: 20px;
}
</style>