import Mock from 'mockjs'
import PubData from "./PubData";
function myFunction(begin,end){
	let num = Math.round(Math.random()*(end-begin)+begin);
	return num;
}
const List = [];
const count = myFunction(10,20);
const getList = function (obj) {
	for (let i = 0; i < count; i++) {
		List.push(Mock.mock(obj))
	}
	return List;
};

let template = {
	'id|+1':1,
	'dealNo|+1':1,
	'dealType|1':PubData._dealTypes,  //买卖方向
	'board|1': PubData.boards,    //盘面
	'origin|1': PubData.origins,   //产地
	'brand|1': PubData._brands,    //交易标的
	'deliveryPeriod': '@date("yyyy-MM-dd")'+' ~ '+'@date("yyyy-MM-dd")',    //交货期
	'deliveryPort|1': PubData._deliveryPorts,               //交货地
	'price|55-83.2': 0,                                      //成交价
	'bidPrice|55-83.2': 0,                                      //买价
	'askPrice|55-83.2': 0,                                      //卖价
	'quantity|5000-1000000':0,                               //成交量 or 申报量
	'fe|50-70.2': 0,                                         //Fe
	'offerDate': '@date("yyyy-MM-dd HH:mm:ss")',    //申报日期
	'tradingDate': '@date("yyyy-MM-dd HH:mm:ss")',    //成交日期
	'status|1':PubData.status,                         //订单状态
	'counterparty':'@cname',                           //交易对方名称

};

let template2 = {                 //查询-基准价查询
	'brand|1': PubData._brands,    //交易标的
	'brandType|1':PubData.brandTypes,                  //标的品种
	'CFR|55-83.2':0,                                   //标的基准价
	'onPortPrice|300-800':0,                           //现汇含税湿吨车板
};
let template3 = {
	'board|1': PubData.boards,    //盘面
	'contractName|1': '@cname', //合同名称
	'effectiveDate': '@date("yyyy-MM-dd")',
};
let template4 = {                      //P盘成交列表
	'dealNo|+1':1,
	'board|1': PubData._boards,    //盘面
	'brand|1': PubData._brands,    //交易标的
	'price|55-83.2': 0,                                      //成交价
	'quantity|5000-1000000':0,                               //成交量 or 申报量
	'tradingDate': '@date("yyyy-MM-dd HH:mm:ss")',    //成交日期
	'status|1':PubData.offerStatus,                         //订单状态
	'counterparty':'@cname',                           //交易对方名称


};
let template5 = {                      //P盘申诉列表
	'dealNo|+1':1,
	'board|1': PubData._boards,    //盘面
	'brand|1': PubData._brands,    //交易标的
	'price|55-83.2': 0,                                      //成交价
	'quantity|5000-1000000':0,                               //成交量 or 申报量
	'tradingDate': '@date("yyyy-MM-dd HH:mm:ss")',    //成交日期
	'appealDate': '@date("yyyy-MM-dd HH:mm:ss")',    //申诉日期
	'appealer': '@cname',                            //申诉方
	'cause': '@cname',                            //申诉原因
	'status|1': PubData.offerStatus,                         //订单状态
	'counterparty':'@cname',                           //交易对方名称
};
let template6 = {                      //保证金管理
	'dealNo|+1':1,
	'dealType|1':PubData._dealTypes,  //买卖方向
	'status|1': PubData.status,                         //订单状态
	'counterparty':'@cname',                           //交易对方名称
};

let template7 = {                      //通知
	'date|+1':'@date("yyyy-MM-dd HH:mm:ss")',
	'title|1-10': '@cword',  //买卖方向
	'status|1': ['未读','已读'],                         //订单状态
};

let template8 = {                      //P盘冻结资金
	'dealNo|+1':1,
	'peormanceBond_A|1000-9999':0,
	'floatingLosses_A|1000-9999':0,
	'peormanceBond_B|1000-9999':0,
	'floatingLosses_B|1000-9999':0,
	'differential|1000-9999':0,
	'frozenForRiskControl|1000-9999':0,
	'gap|1000-9999':0,
};

let template9 = {                      //模板列表
	'id|+1':1,
	'tempName|3-7':'@cword',
	'board|1': PubData.boards,    //盘面
	'brand|1': PubData._brands,    //交易标的
	'createDate': '@date("yyyy-MM-dd HH:mm:ss")',    //创建日期

};
export default {
	getData: () => {
		let mockList = getList(template);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	productBasis: () => {
		let mockList = getList(template2);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	contractList: () => {
		let mockList = getList(template3);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	tradingP: () => {
		let mockList = getList(template4);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	appealsP: () => {
		let mockList = getList(template5);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	deposit: () => {
		let mockList = getList(template6);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	notice: () => {
		let mockList = getList(template7);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	frozen: () => {
		let mockList = getList(template8);
		return {
			total: mockList.length,
			items: mockList
		}
	},
	templateList: () => {
		let mockList = getList(template9);
		return {
			total: mockList.length,
			items: mockList
		}
	},


	addData: opt => {
		let obj = JSON.parse(opt.body).params.data;
		console.log(obj);
		let mockList = getList(template).concat(obj);
		console.log(mockList)
		return {
			total: mockList.length,
			items: mockList
		}
	}
}