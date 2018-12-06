<template>
	<div>
		<select name="operatingMoney" class="searchselectinput" style="width: 130px"><option value="">全部</option>
			<option value="1">出金</option>
			<option value="2">入金</option>
			<option value="3">冻结交易服务费</option>
			<option value="4">解冻交易服务费</option>
			<option value="5">扣收交易服务费</option>
			<option value="6">冻结履约保证金</option>
			<option value="7">解冻履约保证金</option>
			<option value="8">支付履约保证金</option>
			<option value="9">收到履约保证金</option>
			<option value="10">冻结其它资金</option>
			<option value="11">解冻其它资金</option>
			<option value="12">扣收会员年费</option>
			<option value="13">扣收席位费</option>
			<option value="14">返还服务费（COREX操作）</option>
			<option value="15">扣收交易服务费（COREX 操作）</option>
			<option value="16">冻结浮动亏损</option>
			<option value="17">解冻浮动亏损</option>
			<option value="18">会员资金划入</option>
			<option value="19">会员资金划出</option>
			<option value="27">冻结风险资金</option>
			<option value="28">解冻风险资金</option>
		</select>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				indexNames: [
					{
						value:'A2000001,2,Platts',
						label:'普氏指数'
					},
					{
						value:'A2000002,3,MBIO',
						label:'MBIO指数'
					},
					{
						value:'A2000060,2,MM',
						label:'MM指数'
					},
					{
						value:'A2000061,2,TA',
						label:'TA指数'
					},
					{
						value:'A2000003,2,TSI',
						label:'TSI指数'
					},
					{
						value:'A2000040,2,Argus',
						label:'Argus指数'
					},
					{
						value:'A2000000,4,COREX',
						label:'COREX基准价'
					},
					{
						value:'A2000004,3,Mysteel',
						label:'Mysteel指数'
					},
					{
						value:'A2000020,2,CSI',
						label:'CSI指数'
					},

				],
				indexFes: [
					{
						value:'62%',
						label:'62%'
					},
					{
						value:'52%',
						label:'52%'
					},
					{
						value:'58%',
						label:'58%'
					},
					{
						value:'65%',
						label:'65%'
					},
					{
						value:'58%(low Al)',
						label:'58%(low Al)'
					},
				],
				settlementBasis: [
					{
						value:'1',
						label:'装港检验值'
					},
					{
						value:'2',
						label:'CIQ检验值'
					},
					{
						value:'5',
						label:'CIQ值为最终值，但装港值与CIQ值差异超过0.5%时取平均'
					},
					{
						value:'3',
						label:'第三方检验值'
					},
					{
						value:'6',
						label:'其他'
					},
				],
				quotationPeriods: [
					{
						value:'1',
						label:'自选周期'
					},
					{
						value:'2',
						label:'B/L ± 天'
					},
					{
						value:'3',
						label:'NOR ± 天'
					},
					{
						value:'4',
						label:'B/L ±月'
					},
					{
						value:'5',
						label:'NOR ± 月'
					},
					{
						value:'6',
						label:'其他约束条款'
					},
				],
				formulas: [
					{
						value:'1',
						label:'公式 1'
					},
					{
						value:'2',
						label:'公式 2'
					},
					{
						value:'3',
						label:'公式 3'
					},
					{
						value:'4',
						label:'公式 4'
					},
					{
						value:'5',
						label:'其他约束条款'
					}
				],
				priceBasis: [
					{
						value:'1',
						label:'装港检验值(%)'
					},
					{
						value:'2',
						label:'基准值(%)'
					}
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
				]
			}
		}
	}
</script>

<style scoped>

</style>