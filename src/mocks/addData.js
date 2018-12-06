export default {
	addData: opt => {
		let List = JSON.parse(opt.body).params.data;
		let id = parseInt(JSON.parse(opt.body).params.id);
		console.log(List);
		let mockList = List.filter(function(val){
			return val.id!=id;//把这个id对应的对象从数组里删除
		});
		return {
			total: mockList.length,
			items: mockList
		}
	}
}