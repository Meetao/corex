<template>
	<div id="inOutRecords">
		<div class="co-wapper">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>资金管理</el-breadcrumb-item>
				<el-breadcrumb-item>出入金查询</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="searchBox">
				<el-table :data="tableData.slice((pageNo - 1) * pageSize,pageNo * pageSize)" stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'8px'}" :height="tableHeight">
					<el-table-column prop="code" label="会员编号" width="118" align="center"></el-table-column>
					<el-table-column prop="name" label="会员名称" width="150" align="center"></el-table-column>
					<el-table-column prop="in_out" label="出/入金" width="150" align="center"></el-table-column>
					<el-table-column prop="CNY_USD" label="币种" width="150" align="center"></el-table-column>
					<el-table-column prop="amount" label="金额" width="150" align="center"></el-table-column>
					<el-table-column prop="status" label="审核状态" width="120" align="center"></el-table-column>
					<el-table-column prop="applyDate" label="申请日期" width="120" align="center"></el-table-column>
					<el-table-column prop="processDate" label="复核日期" width="120" align="center"></el-table-column>
				</el-table>
				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="pageNo"
						:page-sizes="pageSizeList"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.length">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tableData:[
					{
						code:'541469',
						name:'测试员',
						in_out:'入金',
						CNY_USD:'人民币',
						amount:123.00,
						status:'审核通过',
						applyDate:'2018-07-19',
						processDate:'2018-07-20'
					},
					{
						code:'541469',
						name:'测试员',
						in_out:'出金',
						CNY_USD:'美元',
						amount:200000.00,
						status:'审核中',
						applyDate:'2018-07-25',
						processDate:''
					},
				],
				//分页相关
				pageNo:1,
				pageSizeList:[10, 20, 30, 40],
				pageSize: 10,
				totalDataNumber:0,
				//表格高度自适应
				tableHeight:440
			}
		},
		methods:{
			handleSizeChange(val) {  //分页
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style scoped>
	.searchBox{
		border: 1px solid #dcdfe6;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
		padding: 10px;
	}
	.el-breadcrumb{
		height: 50px;
		line-height: 50px;
		padding-left: 30px;
	}
	.el-pagination{
		text-align: right;
		margin-top: 10px;
	}
</style>