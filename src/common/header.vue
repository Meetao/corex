<template>
	<div>
		<!--头部导航条-->
		<div class="header-box">
			<!--顶部栏 begin-->
			<div class="top-nav">
				<div class="co-wapper">
					<div class="top-logo fl">
						<a href=""><img src="../assets/img/logo.png" alt=""></a>
					</div>
					<ul class="top-menu fr">
						<li>
							<span class="split-line"></span>
							<el-dropdown trigger="click" class="top-nav-txt">
                				<span class="el-dropdown-link">其他功能
					<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>黄金糕</el-dropdown-item>
									<el-dropdown-item>狮子头</el-dropdown-item>
									<el-dropdown-item>螺蛳粉</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
							<span class="split-line"></span>
							<el-dropdown trigger="click" class="top-nav-txt">
								<span class="el-dropdown-link">语言
									<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>中文</el-dropdown-item>
									<el-dropdown-item>English</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
							<span class="split-line"></span>
							<el-dropdown trigger="click" class="top-nav-txt">
								<span class="el-dropdown-link">App下载
								  <i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>Android</el-dropdown-item>
									<el-dropdown-item>iOS</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
							<span class="split-line"></span>
							<a href="" class="top-nav-txt">通知
								<el-badge class="item" value="12"></el-badge>
							</a>
						</li>
						<li>
							<a href="" class="top-nav-txt">退出</a>
						</li>
						<li>
							<a href="" class="top-nav-txt">CT19:0006</a>
						</li>

					</ul>
				</div>
			</div>
			<!--顶部栏 end-->

			<!--交易时间 begin-->
			<div class="trading-time">
				<ul>
					<li><span>交易时间 :</span>09:00 - 18:00</li>
					<li><span>交易时间(P) :</span>09:00 - 15:00</li>
					<li><span>系统时间 :</span>{{this.hours+':'+this.minutes+':'+this.seconds}}</li>
				</ul>
			</div>
			<!--交易时间 end-->

			<!--主导肮条 begin-->
			<div class="main-nav">
				<div class="co-wapper">
					<ul class="main-menu">
						<li class="menu-item" @click="toSiteIndex">
							<div class="mm-icon mm-icon-home"></div>
							<span>首页</span>
						</li>
						<li class="menu-item">
							<div class="mm-icon mm-icon-declare"></div>
							<span>交易管理</span>
							<ul class="mm-submenu">
								<li class="sub-item"  @click="toSiteDeclare">
									<span>申报</span>
									<!--<ul class="rt-submenu">-->
										<!--<li><span>A盘申报</span></li>-->
										<!--<li><span>B盘申报</span></li>-->
										<!--<li><span>D盘申报</span></li>-->
										<!--<li><span>P盘申报</span></li>-->
									<!--</ul>-->
								</li>
								<li class="sub-item">
									<span>查询</span>
									<ul class="rt-submenu">
										<li @click="toSitedeclareManage"><span>申报查询</span></li>
										<li @click="toSitedealsManage"><span>成交查询</span></li>
										<li @click="toSiteproductBasisSiteManage"><span>基准价查询</span></li>
										<li @click="toSitedealcontractlistManage"><span>合同列表查询</span></li>
									</ul>
								</li>
								<li class="sub-item">
									<span>P盘交易管理</span>
									<ul class="rt-submenu">
										<li @click="toDealsP"><span>P盘成交列表查询</span></li>
										<li @click="toAppealsP"><span>P盘申诉列表查询</span></li>
									</ul>
								</li>
								<li class="sub-item" @click="toDeposit"><span>保证金管理</span></li>
								<li class="sub-item">
									<span>模板</span>
									<ul class="rt-submenu">
										<li @click="toCreateTemplate"><span>新建模板</span></li>
										<li @click="toModifyTemplate"><span>修改模板</span></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="menu-item">
							<div class="mm-icon mm-icon-money"></div>
							<span>资金管理</span>
							<ul class="mm-submenu">
								<li class="sub-item" @click="toAccountBalance"><span>资金查询</span></li>
								<li class="sub-item" @click="toFundsFrozenGap"><span>P盘冻结资金/缺口明细</span></li>
								<li class="sub-item" @click="toInOutRecords"><span>出入金查询</span></li>
								<li class="sub-item" @click="toStatements"><span>流水账单</span></li>
							</ul>
						</li>
						<li class="menu-item">
							<div class="mm-icon mm-icon-notice"></div>
							<span>在线通知</span>
							<ul class="mm-submenu">
								<li class="sub-item" @click="toCorexNotice"><span>平台通知</span></li>
								<li class="sub-item" @click="toDealsOffers"><span>成交/申报</span></li>
								<li class="sub-item" @click="toAppealNotice"><span>申诉通知</span></li>
								<li class="sub-item" @click="toPricingNotice"><span>点价通知</span></li>
								<li class="sub-item" @click="toLastQuotationalDay"><span>最后点价日</span></li>
								<li class="sub-item" @click="toFundsNotice"><span>资金通知</span></li>
							</ul>
						</li>
						<li class="menu-item">
							<div class="mm-icon mm-icon-setting"></div>
							<span>系统设置</span>
							<ul class="mm-submenu">
								<li class="sub-item" @click="toOperatorInfo"><span>操作员信息</span></li>
								<li class="sub-item" @click="toOnlineMatch"><span>在线匹配</span></li>
								<li class="sub-item" @click="toOnlineMatchLog"><span>在线匹配日志</span></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<!--主导肮条 end-->
		</div>
		<!--轮播图-->
		<el-carousel :interval="5000" indicator-position="none">
			<el-carousel-item v-for="item in 3" :key="item">
				<div></div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	let moment = require("moment");
	export default {
		data() {
			return {
				hours:'',
				minutes:'',
				seconds:''
			}
		},
		mounted(){
			this.Loptime();
		},
		props:[''],
		computed:{},
		methods:{
			getTime(){ //系统时间获取
				this.hours = moment().format('HH');
				this.minutes = moment().format('mm');
				this.seconds = moment().format('ss');
				//console.log(this.hours+':'+this.minutes+':'+this.seconds)
			},
			Loptime(){
				setInterval(this.getTime,1000);
			},
			toSiteIndex(){
				this.$router.push({name:'siteindex'})
			},
			toSiteDeclare(){
				this.$router.push({name:'sitedeclare'})
			},
			toSitedeclareManage(){
				this.$router.push({name:'sitedeclareManage'})
			},
			toSitedealsManage(){
				this.$router.push({name:'sitedealsManage'})
			},
			toSiteproductBasisSiteManage(){
				this.$router.push({name:'siteproductBasisSiteManage'})
			},
			toSitedealcontractlistManage(){
				this.$router.push({name:'sitedealcontractlistManage'})
			},
			toDealsP(){
				this.$router.push({name:'dealsP'})
			},
			toAppealsP(){
				this.$router.push({name:'appealsP'})
			},
			toDeposit(){
				this.$router.push({name:'deposit'})
			},
			toCreateTemplate(){
				this.$router.push({name:'createTemplate'})
			},
			toModifyTemplate(){
				this.$router.push({name:'modifyTemplate'})
			},
			toAccountBalance(){
				this.$router.push({name:'accountBalance'})
			},
			toFundsFrozenGap(){
				this.$router.push({name:'fundsFrozenGap'})
			},
			toInOutRecords(){
				this.$router.push({name:'inOutRecords'})
			},
			toStatements(){
				this.$router.push({name:'statements'})
			},
			toCorexNotice(){
				this.$router.push({name:'corexNotice'})
			},
			toDealsOffers(){
				this.$router.push({name:'DealsOffers'})
			},
			toAppealNotice(){
				this.$router.push({name:'appealNotice'})
			},
			toPricingNotice(){
				this.$router.push({name:'pricingNotice'})
			},
			toLastQuotationalDay(){
				this.$router.push({name:'lastQuotationalDay'})
			},
			toFundsNotice(){
				this.$router.push({name:'fundsNotice'})
			},
			toOperatorInfo(){
				this.$router.push({name:'operatorInfo'})
			},
			toOnlineMatch(){
				this.$router.push({name:'onlineMatch'})
			},
			toOnlineMatchLog(){
				this.$router.push({name:'onlineMatchLog'})
			},


		}
	}
</script>
<style scoped>
	.header-box {
		width: 100%;
		height: 290px;
		position: relative;
		z-index: 10;
	}

	/*头部导航条*/
	.top-nav {
		height: 50px;
		line-height: 50px;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.top-menu > li {
		float: right;
		color: #fff;
		cursor: pointer;
	}

	.top-menu > li:hover {
		background-color: #F49648;
	}

	.top-nav-txt {
		padding: 0 15px;
	}

	.split-line {
		width: 1px;
		height: 16px;
		background-color: #fff;
		overflow: hidden;
		position: absolute;
		top: 17px;
	}

	.item {
		margin-top: -20px;
	}

	.el-dropdown {
		color: #fff;
	}

	/*交易时间*/
	.trading-time {
		width: 200px;
		height: 90px;
		color: #fff;
		font-size: 12px;
		border-radius: 10px;
		position: absolute;
		top: 80px;
		right: 20%;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.trading-time li {
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
	}

	.trading-time li span {
		display: inline-block;
		width: 80px;
		text-align: right;
		margin-right: 5px;
	}

	/*主导航条*/
	.main-nav {
		width: 100%;
		height: 82px;
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		font-size: 18px;
	}

	.main-menu .menu-item {
		float: left;
		width: 20%;
		height: 82px;
		text-align: center;
	}

	.main-nav .menu-item:hover {
		background-color: #F49648;
	}

	.main-nav .menu-item:hover > .mm-submenu {
		display: block;
	}

	.mm-icon {
		width: 30px;
		height: 30px;
		line-height: 30px;
		margin: 10px auto;
		background: url("../assets/img/home.svg") no-repeat center center;
		background-size: 30px 30px;
	}

	.mm-icon-declare {
		background-image: url("../assets/img/declare.svg");
	}

	.mm-icon-money {
		background-image: url("../assets/img/money.svg");
	}

	.mm-icon-notice {
		background-image: url("../assets/img/notice.svg");
	}

	.mm-icon-setting {
		background-image: url("../assets/img/setting.svg");
	}

	/*主导航栏下l拉菜单*/
	.mm-submenu {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: none;
		position: relative;
		top: 14px;
		border: 1px solid rgb(172, 172, 172);
	}

	.sub-item {
		width: 100%;
		height: 50px;
		line-height: 50px;
		position: relative;
		border: 1px solid rgb(172, 172, 172);
	}

	.sub-item:hover {
		background-color: #F49648;
	}

	.sub-item:hover > .rt-submenu {
		display: block;
	}

	.rt-submenu {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: none;
		position: absolute;
		top: 0;
		left: 220px;
		border: 1px solid rgb(172, 172, 172);
	}

	.rt-submenu > li {
		border: 1px solid rgb(172, 172, 172);
	}

	.rt-submenu li:hover {
		background-color: #F49648;
	}

	/*背景图轮播*/
	.el-carousel {
		width: 100%;
		height: 300px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.el-carousel__item {
		background: url("../assets/img/bgimg.jpg") no-repeat;
	}

	.el-carousel__item:nth-child(3) {
		background: url("../assets/img/bg01.jpg") no-repeat;
	}

	.el-carousel__item:nth-child(5) {
		background: url("../assets/img/bg02.jpg") no-repeat;
	}

	.el-carousel__indicators {
		bottom: 100px;
	}
</style>
