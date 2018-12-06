import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import siteindex from '@/views/siteindex/siteindex'
//申报
import sitedeclare from '@/views/trading/offer/sitedeclare'
//查询
import sitedeclareManage from '@/views/trading/search/sitedeclareManage'
import sitedealsManage from '@/views/trading/search/sitedealsManage'
import siteproductBasisSiteManage from '@/views/trading/search/siteproductBasisSiteManage'
import sitedealcontractlistManage from '@/views/trading/search/sitedealcontractlistManage'
//P盘交易管理
import dealsP from '@/views/trading/tradingManagementP/dealsP'
import appealsP from '@/views/trading/tradingManagementP/appealsP'
//保证金管理
import deposit from '@/views/trading/deposit/deposit'
//模板
import createTemplate from '@/views/trading/template/createTemplate'
import modifyTemplate from '@/views/trading/template/modifyTemplate'
//资金管理
import accountBalance from '@/views/funds/accountBalance/accountBalance'
import fundsFrozenGap from '@/views/funds/fundsFrozenGap/fundsFrozenGap'
import inOutRecords from '@/views/funds/inOutRecords/inOutRecords'
import statements from '@/views/funds/statements/statements'

//在线通知
import corexNotice from '@/views/notice/corexNotice'
import DealsOffers from '@/views/notice/DealsOffers'
import appealNotice from '@/views/notice/appealNotice'
import pricingNotice from '@/views/notice/pricingNotice'
import lastQuotationalDay from '@/views/notice/lastQuotationalDay'
import fundsNotice from '@/views/notice/fundsNotice'
//系统设置
import operatorInfo from '@/views/settings/operatorInfo'
import onlineMatch from '@/views/settings/onlineMatch'
import onlineMatchLog from '@/views/settings/onlineMatchLog'
//详情弹出框
import dialogPage from '@/common/dialogPage'
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/siteindex/siteindex',
			name: 'siteindex',
			component: siteindex
		},
		{
			path: '/trading/offer/sitedeclare',
			name: 'sitedeclare',
			component: sitedeclare
		},
		{
			path: '/trading/search/sitedeclareManage',
			name: 'sitedeclareManage',
			component: sitedeclareManage
		},
		{
			path: '/trading/search/sitedealsManage',
			name: 'sitedealsManage',
			component: sitedealsManage
		},
		{
			path: '/trading/search/siteproductBasisSiteManage',
			name: 'siteproductBasisSiteManage',
			component: siteproductBasisSiteManage
		},
		{
			path: '/trading/search/sitedealcontractlistManage',
			name: 'sitedealcontractlistManage',
			component: sitedealcontractlistManage
		},
		{
			path: '/trading/tradingManagementP/dealsP',
			name: 'dealsP',
			component: dealsP
		},
		{
			path: '/trading/tradingManagementP/appealsP',
			name: 'appealsP',
			component: appealsP
		},
		{
			path: '/trading/deposit/deposit',
			name: 'deposit',
			component: deposit
		},
		{
			path: '/trading/template/createTemplate',
			name: 'createTemplate',
			component: createTemplate
		},
		{
			path: '/trading/template/modifyTemplate',
			name: 'modifyTemplate',
			component: modifyTemplate
		},
		{
			path: '/funds/accountBalance/accountBalance',
			name: 'accountBalance',
			component: accountBalance
		},
		{
			path: '/funds/fundsFrozenGap/fundsFrozenGap',
			name: 'fundsFrozenGap',
			component: fundsFrozenGap
		},
		{
			path: '/funds/inOutRecords/inOutRecords',
			name: 'inOutRecords',
			component: inOutRecords
		},
		{
			path: '/funds/statements/statements',
			name: 'statements',
			component: statements
		},
		{
			path: '/notice/corexNotice',
			name: 'corexNotice',
			component: corexNotice
		},
		{
			path: '/notice/DealsOffers',
			name: 'DealsOffers',
			component: DealsOffers
		},
		{
			path: '/notice/appealNotice',
			name: 'appealNotice',
			component: appealNotice
		},
		{
			path: '/notice/pricingNotice',
			name: 'pricingNotice',
			component: pricingNotice
		},
		{
			path: '/notice/lastQuotationalDay',
			name: 'lastQuotationalDay',
			component: lastQuotationalDay
		},
		{
			path: '/notice/fundsNotice',
			name: 'fundsNotice',
			component: fundsNotice
		},
		{
			path: '/settings/operatorInfo',
			name: 'operatorInfo',
			component: operatorInfo
		},
		{
			path: '/settings/onlineMatch',
			name: 'onlineMatch',
			component: onlineMatch
		},
		{
			path: '/settings/onlineMatchLog',
			name: 'onlineMatchLog',
			component: onlineMatchLog
		},
		{
			path: '/common/dialogPage',
			name: 'dialogPage',
			component: dialogPage
		}

	]
})
