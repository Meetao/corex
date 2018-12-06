<template>
	<div id="sitedeclareManage">
		<div class="co-wapper">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>交易管理</el-breadcrumb-item>
				<el-breadcrumb-item>查询</el-breadcrumb-item>
				<el-breadcrumb-item>成交查询</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="searchBox">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="买卖方向">
						<el-select v-model="formInline.type" clearable placeholder="请选择">
							<el-option v-for="item in dealTypes"
									   :key="item.value"
									   :value="item.value"
									   :label="item.text">
							</el-option>
						</el-select>
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
					<el-form-item  label="产地">
						<el-select v-model="formInline.origin" clearable placeholder="请选择">
							<el-option v-for="item in origins"
									   :key="item"
									   :label="item"
									   :value="item">
							</el-option>

						</el-select>
					</el-form-item>
					<el-form-item label="交易标的">
						<el-select v-model="formInline.product" clearable placeholder="请选择">
							<el-option v-for="item in brands"
									   :key="item.value"
									   :label="item.text"
									   :value="item.value">
							</el-option>

						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>

				<el-table :data="tableData2.slice((pageNo - 1) * pageSize,pageNo * pageSize)" stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'4px 2px'}" :height="tableHeight">
					<el-table-column fixed prop="board.value" label="盘面" width="50" align="center"></el-table-column>
					<el-table-column prop="tradingDate" label="成交时间" width="160" align="center"></el-table-column>
					<el-table-column prop="brand" label="交易标的" width="120" align="center"></el-table-column>
					<el-table-column prop="quantity" label="成交数量" width="100" align="center"></el-table-column>
					<el-table-column prop="price" label="成交价格" width="200" align="center"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="origin" label="产地" width="100" align="center"></el-table-column>

					<el-table-column prop="dealType" label="买卖方向" width="100" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="counterparty" label="对方名称" width="100" align="center"></el-table-column>
					<el-table-column  label="详情" width="50" align="center">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, tableData2)" type="text" size="small">
								查看
							</el-button>
						</template>
					</el-table-column>
					<el-table-column label="确认书" width="98" align="center">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope.$index, tableData2)" type="text" size="small">
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
					type:'',
					board:'',
					origin:'',
					product:''
				},
				tableData2: [
					// {
					// 	board: 'A',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '纽曼混合块',
					// 	quantity: 9000,
					// 	price: 1200,
					// 	origin: '巴西',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'D',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '印度球团',
					// 	quantity: 3000,
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	origin: '印度',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'B',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: 'BRBF粉',
					// 	quantity: 20000,
					// 	price: '520',
					// 	origin: '巴西',
					// 	dealType: '买入',
					// 	counterparty: '测试员'
					// },
					// {
					// 	board: 'A',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '纽曼混合块',
					// 	quantity: 9000,
					// 	price: 1200,
					// 	origin: '巴西',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'D',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '印度球团',
					// 	quantity: 3000,
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	origin: '印度',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'B',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: 'BRBF粉',
					// 	quantity: 20000,
					// 	price: '520',
					// 	origin: '巴西',
					// 	dealType: '买入',
					// 	counterparty: '测试员'
					// },
					// {
					// 	board: 'A',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '纽曼混合块',
					// 	quantity: 9000,
					// 	price: 1200,
					// 	origin: '巴西',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'D',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '印度球团',
					// 	quantity: 3000,
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	origin: '印度',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'B',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: 'BRBF粉',
					// 	quantity: 20000,
					// 	price: '520',
					// 	origin: '巴西',
					// 	dealType: '买入',
					// 	counterparty: '测试员'
					// },
					// {
					// 	board: 'A',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '纽曼混合块',
					// 	quantity: 9000,
					// 	price: 1200,
					// 	origin: '巴西',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'D',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: '印度球团',
					// 	quantity: 3000,
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	origin: '印度',
					// 	dealType: '卖出',
					// 	counterparty: '测试员'
					// }, {
					// 	board: 'B',
					// 	tradingDate: '2018-10-10 19:41:56',
					// 	brand: 'BRBF粉',
					// 	quantity: 20000,
					// 	price: '520',
					// 	origin: '巴西',
					// 	dealType: '买入',
					// 	counterparty: '测试员'
					// }

				],
				boards: this.pubData.boards,
				brands: this.pubData.brands,
				dealTypes: this.pubData.dealTypes,
				origins: this.pubData.origins,
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
				this.$axios.get('data/getData')
					.then(function (res) {
						var tableData = res.data.items;
						console.log(res.data);
						_this.tableData2 = tableData;   //今日申报
						_this.totalDataNumber = tableData.length;
					})
					.catch(function (error) {
						console.log(error);
					})
			},
			handleSizeChange(val) {  //分页
				this.pageSize = val;
				if(this.totalDataNumber>this.pageSize){
					this.tableHeight = (41*this.pageSize +50)+'px';
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