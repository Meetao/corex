<template>
	<div id="dialogPage">
		<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="70%"
				center>
			<div></div>
			<!--<span>需要注意的是内容是默认不居中的</span>-->
			<!--<span slot="footer" class="dialog-footer">-->
				<!--<el-button @click="dialogVisible = false">取 消</el-button>-->
				<!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  			<!--</span>-->
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				dialogVisible:false
			}
		}
	}
</script>

<style scoped>

</style>