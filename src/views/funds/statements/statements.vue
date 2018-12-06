<template>
	<div id="statements">
		<div class="co-wapper">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>资金管理</el-breadcrumb-item>
				<el-breadcrumb-item>流水账单</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="searchBox">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-row>
						<el-col :span="8">
							<el-form-item label="审核状态">
								<el-select v-model="formInline.status" clearable placeholder="请选择">
									<el-option v-for="item in status"
											   :key="item.value"
											   :label="item.label"
											   :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="操作方式">
								<el-select v-model="formInline.operation" clearable placeholder="请选择">
									<el-option v-for="item in operations"
											   :key="item.value"
											   :label="item.label"
											   :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="币种">
								<el-select v-model="formInline.CNY_USD" clearable placeholder="请选择">
									<el-option v-for="item in currency"
											   :key="item.value"
											   :label="item.label"
											   :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="20">
							<el-form-item label="起止日期">
								<el-date-picker
										v-model="formInline.date"
										type="daterange"
										align="right"
										unlink-panels
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										:picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-col>
					</el-row>



				</el-form>

				<el-table :data="tableData2.slice((pageNo - 1) * pageSize,pageNo * pageSize)" stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'8px'}" :height="tableHeight">
					<el-table-column fixed prop="date" label="日期" width="150" align="center"></el-table-column>
					<el-table-column prop="summary" label="摘要" width="180" align="center"></el-table-column>
					<el-table-column prop="CNY_USD" label="币种" width="100" align="center"></el-table-column>
					<el-table-column prop="amount" label="金额" width="150" align="center"></el-table-column>
					<el-table-column prop="status" label="审核状态" width="150" align="center"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="reffrenceNum" label="关联申报/成交" width="220" align="center"></el-table-column>
					<el-table-column prop="operator" label="操作员" width="128" align="center"></el-table-column>
				</el-table>
				<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="pageNo"
						:page-sizes="pageSizeList"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="tableData2.length">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				formInline: {
					status:'',
					operation:'',
					CNY_USD:'',
					date:'',
				},
				tableData2: [
					{
						date: '2018-07-20',
						summary: '入金',
						CNY_USD: '人民币',
						amount: 123.00,
						status: '审核通过',
						reffrenceNum: '',
						operator: 'COREX',
					}, {
						date: '2018-07-19',
						summary: '入金',
						CNY_USD: '人民币',
						amount: 123.00,
						status: '已审核',
						reffrenceNum: '',
						operator: 'COREX',
					},{
						date: '2018-06-27',
						summary: '解冻履约保证金',
						CNY_USD: '人民币',
						amount: 44936.10,
						status: '审核通过',
						reffrenceNum: 'SP201806261403550764',
						operator: 'COREX',
					},{
						date: '2018-06-27',
						summary: '解冻交易服务费',
						CNY_USD: '人民币',
						amount: 22000.00,
						status: '审核通过',
						reffrenceNum: 'SP201806261403550764',
						operator: 'COREX',
					},{
						date: '2018-06-26',
						summary: '冻结履约保证金',
						CNY_USD: '人民币',
						amount: 44936.10,
						status: '审核通过',
						reffrenceNum: 'SP201806261403550764',
						operator: '541469_0002',
					},{
						date: '2018-06-26',
						summary: '冻结交易服务费',
						CNY_USD: '人民币',
						amount: 123.00,
						status: '审核通过',
						reffrenceNum: 'SP201806261403550764',
						operator: '541469_0002',
					},{
						date: '2018-06-26',
						summary: '出金',
						CNY_USD: '人民币',
						amount: 10000000.00,
						status: '审核通过',
						reffrenceNum: '',
						operator: 'COREX',
					}
				],
				status:[
					{
						label:'审核中',
						value:'1'
					},
					{
						label:'审核通过',
						value:'2'
					},
					{
						label:'审核未通过',
						value:'3'
					},
					{
						label:'已审核',
						value:'4'
					},
				],
				operations:[
					{
						label:'出金',
						value:'1'
					},
					{
						label:'入金',
						value:'2'
					},
					{
						label:'冻结交易服务费',
						value:'3'
					},
					{
						label:'解冻交易服务费',
						value:'4'
					},
					{
						label:'扣收交易服务费',
						value:'5'
					},
					{
						label:'冻结履约保证金',
						value:'6'
					},
					{
						label:'解冻履约保证金',
						value:'7'
					},
					{
						label:'支付履约保证金',
						value:'8'
					},
					{
						label:'收到履约保证金',
						value:'9'
					},
					{
						label:'冻结其它资金',
						value:'10'
					},
					{
						label:'解冻其它资金',
						value:'11'
					},
					{
						label:'扣收会员年费',
						value:'12'
					},
					{
						label:'扣收席位费',
						value:'13'
					},
					{
						label:'返还服务费（COREX操作）',
						value:'14'
					},
					{
						label:'扣收交易服务费（COREX 操作）',
						value:'15'
					},
					{
						label:'冻结浮动亏损',
						value:'16'
					},
					{
						label:'解冻浮动亏损',
						value:'17'
					},
					{
						label:'会员资金划入',
						value:'18'
					},
					{
						label:'会员资金划出',
						value:'19'
					},
					{
						label:'冻结风险资金',
						value:'27'
					},{
						label:'解冻风险资金',
						value:'28'
					}
				],
				currency:[
					{
						label:'人民币',
						value:'CNY'
					},
					{
						label:'美元',
						value:'USD'
					}
				],
				offerStatus:['点价中','点价完成','申诉中','资金不足','强制冻结','订单结束'],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
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
			},
			onSubmit() {
				console.log('submit!');
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
	.el-form{
		margin-top: 20px;
	}
	.el-pagination{
		text-align: right;
		margin-top: 10px;
	}
</style>