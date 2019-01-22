<template>
	<div id="siteIndex">
		<div id="dealsToday">
			<div class="co-wapper">
				<!--<div>-->
				<!--<div>今日成交</div>-->
				<!--<div>成交查询</div>-->
				<!--</div>-->
				<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="今日成交" name="one">
						<el-table :data="tableData1" stripe style="width: 100%" max-height="250"
								  :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'4px 2px'}">
							<el-table-column fixed prop="board.value" label="盘面" width="60"
											 align="center"></el-table-column>
							<el-table-column prop="origin" label="产地" width="100" align="center"></el-table-column>
							<el-table-column prop="brand" label="交易标的" width="120" align="center"></el-table-column>
							<el-table-column prop="deliveryPeriod" label="交货期" width="180" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="deliveryPort" label="交货地" width="100"
											 align="center"></el-table-column>
							<el-table-column prop="price" label="成交价" width="288" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="quantity" label="成交量(湿吨)" width="100"
											 align="center"></el-table-column>
							<el-table-column fixed="right" label="详情" width="70" align="center">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteRow(scope.$index, tableData1)" type="text"
											   size="small">查看
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="成交查询" name="two">
						<!--条件查询-->
						<el-form :inline="true" class="demo-form-inline" size="mini">
							<el-form-item label="交易盘面">
								<el-select v-model="formInline.board" clearable placeholder="请选择">
									<el-option v-for="item2 in boards" :key="item2.value" :value="item2.value"
											   :label="item2.label"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交易标的">
								<el-select v-model="formInline.brand" clearable placeholder="请选择">
									<el-option v-for="item3 in brands" :key="item3.value" :label="item3.label"
											   :value="item3.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="成交日期">
								<el-date-picker v-model="formInline.tradingDate" type="daterange" align="right"
												unlink-panels range-separator="至" start-placeholder="开始日期"
												end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
						<!--历史成交列表-->
						<el-table :data="tableData3.slice((pageNo - 1) * pageSize,pageNo * pageSize)" stripe
								  style="width: 100%" :height="tableHeight" :header-cell-style="{'text-align':'center'}"
								  :cell-style="{'padding':'4px 2px'}">
							<el-table-column fixed prop="board.value" label="盘面" width="50"
											 align="center"></el-table-column>
							<el-table-column prop="origin" label="产地" width="80" align="center"></el-table-column>
							<el-table-column prop="brand" label="交易标的" width="120" align="center"></el-table-column>
							<el-table-column prop="deliveryPeriod" label="交货期" width="140" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="deliveryPort" label="交货地" width="80"
											 align="center"></el-table-column>
							<el-table-column prop="price" label="成交价" width="200" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="fe" label="Fe(%)" width="60" align="center"></el-table-column>
							<el-table-column prop="quantity" label="成交量(湿吨)" width="100"
											 align="center"></el-table-column>
							<el-table-column prop="tradingDate" label="成交日期" width="168"
											 align="center"></el-table-column>
							<el-table-column label="详情" width="70" align="center">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteRow(scope.$index, tableData3)" type="text"
											   size="small">查看
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--分页-->
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
									   :current-page="pageNo" :page-sizes="pageSizeList" :page-size="pageSize"
									   layout="total, sizes, prev, pager, next, jumper"
									   :total="totalDataNumber"></el-pagination>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<div id="offersToday">
			<div class="co-wapper">
				<el-tabs type="border-card">
					<el-tab-pane label="今日申报">
						<!--条件筛选 begin-->
						<el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
							<el-form-item label="交易类型">
								<el-select v-model="formInline.type" clearable placeholder="请选择">
									<el-option v-for="item in dealTypes" :key="item.value" :label="item.label"
											   :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交易盘面">
								<el-select v-model="formInline.board" clearable placeholder="请选择">
									<el-option v-for="item2 in boards" :key="item2.value" :value="item2.value"
											   :label="item2.label"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交易标的">
								<el-select v-model="formInline.brand" clearable placeholder="请选择">
									<el-option v-for="item3 in brands" :key="item3.value" :label="item3.label"
											   :value="item3.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
						<!--条件筛选 end-->
						<!--今日申报列表 begin-->
						<el-table :data="tableData2" stripe style="width: 100%"
								  :header-cell-style="{'text-align':'center'}" :cell-style="{'padding':'4px 2px'}">
							<el-table-column fixed prop="board.value" label="盘面" width="60"
											 align="center"></el-table-column>
							<el-table-column prop="brand" label="交易标的" width="120" align="center"></el-table-column>
							<el-table-column prop="deliveryPeriod" label="交货期" width="170" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="deliveryPort" label="交货地" width="100"
											 align="center"></el-table-column>
							<el-table-column prop="bidPrice" label="买价" width="220" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="askPrice" label="卖价" width="220" align="center"
											 show-overflow-tooltip></el-table-column>
							<el-table-column prop="quantity" label="申报量(湿吨)" width="100"
											 align="center"></el-table-column>
							<el-table-column fixed="right" label="详情" width="70" align="center">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteRow(scope.$index, tableData2)" type="text"
											   size="small">查看
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--今日申报列表 end-->
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<dialogPage ref="dialogPage1"></dialogPage>
	</div>
</template>

<script>
	import dialogPage from "@/common/dialogPage";

	export default {
		components: {
			dialogPage
		},
		data() {
			return {
				tableData1: [
					// {
					// 	board: 'A',
					// 	origin: '澳大利亚',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	price: 1200,
					// 	quantity:9000
					// }, {
					// 	board: 'D',
					// 	origin: '印度',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	quantity:3000
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	price: 520,
					// 	quantity:20000
					// }
				],
				tableData2: [
					// {
					// 	board: 'A',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	bid: 1200,
					// 	ask:'',
					// 	quantity:9000
					// }, {
					// 	board: 'D',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	bid: '',
					// 	ask:'Platts[Other Binding Terms],62%',
					// 	quantity:3000
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	bid: 'Platts[Other Binding Terms],62%',
					// 	ask:'',
					// 	quantity:20000
					// },
					// {
					// 	board: 'A',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	bid: 1200,
					// 	ask:'',
					// 	quantity:9000
					// }, {
					// 	board: 'D',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	bid: '',
					// 	ask:'Platts[Other Binding Terms],62%',
					// 	quantity:3000
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	bid: 'Platts[Other Binding Terms],62%',
					// 	ask:'',
					// 	quantity:20000
					// }
				],
				tableData3: [
					// {
					// 	board: 'A',
					// 	origin: '澳大利亚',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	price: 1200,
					// 	fe: 63.1,
					// 	quantity:9000,
					// 	tradingDate: '2018-10-11 10:22:43'
					// }, {
					// 	board: 'D',
					// 	origin: '印度',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	fe: 65,
					// 	quantity:3000,
					// 	tradingDate: '2018-10-10 19:41:56'
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	price: 520,
					// 	fe:61.5,
					// 	quantity:20000,
					// 	tradingDate: '2018-10-10 09:50:35'
					// },
					// {
					// 	board: 'A',
					// 	origin: '澳大利亚',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	price: 1200,
					// 	fe: 63.1,
					// 	quantity:9000,
					// 	tradingDate: '2018-10-11 10:22:43'
					// }, {
					// 	board: 'D',
					// 	origin: '印度',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	fe: 65,
					// 	quantity:3000,
					// 	tradingDate: '2018-10-10 19:41:56'
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	price: 520,
					// 	fe:61.5,
					// 	quantity:20000,
					// 	tradingDate: '2018-10-10 09:50:35'
					// },
					// {
					// 	board: 'A',
					// 	origin: '澳大利亚',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	price: 1200,
					// 	fe: 63.1,
					// 	quantity:9000,
					// 	tradingDate: '2018-10-11 10:22:43'
					// }, {
					// 	board: 'D',
					// 	origin: '印度',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	fe: 65,
					// 	quantity:3000,
					// 	tradingDate: '2018-10-10 19:41:56'
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	price: 520,
					// 	fe:61.5,
					// 	quantity:20000,
					// 	tradingDate: '2018-10-10 09:50:35'
					// },
					// {
					// 	board: 'A',
					// 	origin: '澳大利亚',
					// 	brand: '纽曼混合块',
					// 	deliveryPeriod: '2018-10-16 ~ 2018-10-26',
					// 	deliveryPort: '鲅鱼圈港',
					// 	price: 1200,
					// 	fe: 63.1,
					// 	quantity:9000,
					// 	tradingDate: '2018-10-11 10:22:43'
					// }, {
					// 	board: 'D',
					// 	origin: '印度',
					// 	brand: '印度球团',
					// 	deliveryPeriod: 'Other Binding Terms',
					// 	deliveryPort: '',
					// 	price: 'Platts[Other Binding Terms],62%',
					// 	fe: 65,
					// 	quantity:3000,
					// 	tradingDate: '2018-10-10 19:41:56'
					// }, {
					// 	board: 'B',
					// 	origin: '巴西',
					// 	brand: 'BRBF粉',
					// 	deliveryPeriod: '-',
					// 	deliveryPort: '曹妃甸港',
					// 	price: 520,
					// 	fe:61.5,
					// 	quantity:20000,
					// 	tradingDate: '2018-10-10 09:50:35'
					// }
				],
				boards: this.pubData.boards,
				brands: this.pubData.brands,
				dealTypes: this.pubData.dealTypes,
				activeName: "one",
				formInline: {
					type: "",
					board: "",
					brand: "",
					tradingDate: ""
				},
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
					.get("data/getData")
					.then(function (res) {
						var tableData = res.data.items;
						console.log(res.data);
						_this.tableData1 = tableData.slice(0, 3); //今日成交
						for (var i = 0; i < tableData.length; i++) {
							if (tableData[i].dealType == "买入") {
								tableData[i].askPrice = "";
							} else if (tableData[i].dealType == "卖出") {
								tableData[i].bidPrice = "";
							}
						}
						_this.tableData2 = tableData; //今日申报
						_this.tableData3 = tableData; //成交查询
						_this.totalDataNumber = tableData.length;
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			handleSizeChange(val) {
				//分页
				// console.log(`每页 ${val} 条`);
				this.pageSize = val;
				if (this.totalDataNumber > this.pageSize) {
					this.tableHeight = 41 * this.pageSize + 50 + "px";
				} else {
					this.tableHeight = 41 * this.totalDataNumber + 50 + "px";
				}

				//this.getTableData();
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.pageNo = val;
				//this.getTableData();
			},
			handleClick(tab, event) {
				//tab页切换
				//document.getElementById("offersToday").style.display = "none"
				//console.log(tab.index);
				var _val = tab.index;
				if (_val == 0) {
					document.getElementById("offersToday").style.display = "block";
				} else {
					document.getElementById("offersToday").style.display = "none";
				}
			},
			onSubmit() {
				this.$refs.dialogPage1.dialogVisible = true;
			}
		}
	};
</script>
<style scoped>
	#siteIndex {
		width: 100%;
	}

	#dealsToday {
		width: 100%;
		margin-top: 30px;
	}

	#offersToday {
		width: 100%;
		margin-top: 30px;
	}

	.el-pagination {
		text-align: right;
		margin-top: 10px;
	}
</style>
