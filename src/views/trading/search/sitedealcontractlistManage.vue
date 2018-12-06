<template>
	<div id="sitedealcontractlistManage">
		<div class="co-wapper">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>交易管理</el-breadcrumb-item>
				<el-breadcrumb-item>查询</el-breadcrumb-item>
				<el-breadcrumb-item>合同列表查询</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="searchBox">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="合同名称">
						<el-input v-model="formInline.contractName"></el-input>
					</el-form-item>
					<el-form-item label="盘面">
						<el-select v-model="formInline.board" clearable placeholder="请选择">
							<el-option v-for="item in boards"
									   :key="item.value"
									   :value="item.value"
									   :label="item.text">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>

				<el-table :data="tableData.slice((pageNo - 1) * pageSize,pageNo * pageSize)" stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'4px 2px'}" :height="tableHeight">
					<el-table-column fixed prop="board.value" label="交易盘面" width="250" align="center"></el-table-column>
					<el-table-column prop="contractName" label="合同名称" width="250" align="center"></el-table-column>
					<el-table-column prop="effectiveDate" label="生效时间" width="280" align="center"></el-table-column>
					<el-table-column label="操作" width="298" align="center">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
								下载
							</el-button>
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
						:total="totalDataNumber">
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
					contractName:'',
					board:''
				},
				tableData: [
					// {
					// 	board:'国际在途A',
					// 	contractName:'中文名合同',
					// 	effectiveDate:'2018-06-30',
					// },
					// {
					// 	board:'国际保税B',
					// 	contractName:'英文名合同',
					// 	effectiveDate:'2018-09=-30',
					// }
				],
				boards: this.pubData.boards,
				//分页相关
				pageNo:1,
				pageSizeList:[10, 20, 30, 40],
				pageSize: 10,
				totalDataNumber:0,
				//表格高度自适应
				tableHeight:460
			}
		},
		created(){
			this.getTableData();
		},
		methods:{
			getTableData(){
				var _this = this;
				this.$axios.get('data/contractList')
					.then(function (res) {
						var tableData = res.data.items;
						console.log(res.data);
						_this.tableData = tableData;   //今日申报
						_this.totalDataNumber = tableData.length;
					})
					.catch(function (error) {
						console.log(error);
					})
			},
			handleSizeChange(val) {  //分页
				this.pageSize = val;
				if(this.totalDataNumber>this.pageSize){
					this.tableHeight = 460;
				}else{
					this.tableHeight = (41*this.totalDataNumber +50)+'px';
				}
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.pageNo = val;
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