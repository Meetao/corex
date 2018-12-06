import Mock from 'mockjs'
import getData from './getData.js'
import deleteData from './deleteData.js'
import addData from './addData.js'


Mock.mock("data/getData",getData.getData);
Mock.mock("data/productBasis",getData.productBasis);
Mock.mock("data/contractList",getData.contractList);
Mock.mock("data/tradingP",getData.tradingP);
Mock.mock("data/appealsP",getData.appealsP);
Mock.mock("data/deposit",getData.deposit);
Mock.mock("data/notice",getData.notice);
Mock.mock("data/frozen",getData.frozen);
Mock.mock("data/templateList",getData.templateList);

Mock.mock("data/deleteData",deleteData.deleteData);
Mock.mock("data/addData",getData.addData);

export default Mock