<template>
	<div id="box">
		<div style="font-size: 24px;color: white;margin-bottom: 20px">用户打卡记录</div>
		<ul>
			<li v-for="item in clockInfoList">
				<div><span style="width: 80px;display: inline-block">{{item.userName}}</span><span style="margin-left: 20px">{{item.date}}</span>
				</div>
				<div style="color: white">{{item.address}}</div>
			</li>
		</ul>
		<div>
			<!-- 分页控件 layout中的jumper布局有问题，这里没用-->
			<el-pagination
					class="pageView"
					v-if="paginationShow"
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="pageNo"
					:page-size="15"
					layout="total, prev, pager, next"
					:pager-count="11"
					:total="totalCount">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import http from '../../../http/httpRequestUtil'
	import store from '../../../store/index'

	export default {
		name: "UserClockInfo",
		data() {
			return {
				clockInfoList: [],//返回数据——填充到数据列表
				pageSize: store.state.pageSize,//默认的请求pageSize = 15
				pageNo: 1,//当前页码
				totalPage: 0,//总页数
				paginationShow: false,//是否显示分页
				totalCount: 0,//总条数
			}
		},
		methods: {
			//改变每页显示数量时调用
			handleSizeChange(val) {
				this.$nextTick(() =>
					this.getPageData(),
				)
			},
			//点击下一页和点击页码时执行
			handleCurrentChange(val) {
				this.getPageData();
			},
			//获取分页数据totalDataNumber
			getPageData: function () {
				let that = this;
				let reqUrl = "api-common/clock/toAppList?pageSize=" + this.pageSize + "&page=" + parseInt(this.pageNo)
				http.getData(reqUrl, function (clockInfoList, message) {
					console.log(clockInfoList)
					if (clockInfoList != null) {
						that.clockInfoList = clockInfoList.result;
					}
				})
			}
		},
		//进入页面后请求的初始数据
		created: function () {
			let that = this;
			let reqUrl = "api-common/clock/toAppList?pageSize=" + this.pageSize + "&page=1"
			http.getData(reqUrl, function (clockInfoList, message) {
				console.log(clockInfoList)
				if (clockInfoList != null) {
					that.clockInfoList = clockInfoList.result;
					that.totalPage = clockInfoList.totalPage;//设置分页的总页数
					that.totalCount = clockInfoList.totalCount;//设置数据总条数
					if (clockInfoList.totalPage > 1) {//总页数大于1时显示分页
						that.paginationShow = true;
					}
					console.log("总页数：" + that.totalPage)
				}
			})
		}
	}
</script>

<style scoped>
	#box {
		padding: 20px;
	}

	ul {
		padding: 0px;
		list-style-type: none;
	}

	li {
		margin-top: 5px;
		color: yellow;
		font-size: 20px;
		border-bottom: 1px white dashed;
	}

	.pageView {
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}