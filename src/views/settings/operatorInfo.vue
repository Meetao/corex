<template>
	<div id="operatorInfo">
		<div class="co-wapper">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>操作员信息</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="searchBox">
				<el-form :model="form" label-width="150px" style="margin-left: 200px;">
					<el-form-item label="盘面实时提示信息">
						<el-radio-group v-model="form.name">
							<el-radio label="接收"></el-radio>
							<el-radio label="不接收"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="姓名">
						<el-col :span="12">
							<el-input v-model="form.name" clearable></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="电话">
						<el-col :span="12">
							<el-input v-model="form.name" clearable></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-col :span="12">
							<el-input v-model="form.name" clearable></el-input>
						</el-col>
					</el-form-item>
					<div class="changePwd" v-show="changePwd">
						<el-form-item label="原密码">
							<el-col :span="12">
								<el-input v-model="form.name" clearable></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="新密码">
							<el-col :span="12">
								<el-input v-model="form.name" clearable></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="新密码确认">
							<el-col :span="12">
								<el-input v-model="form.name" clearable></el-input>
							</el-col>
						</el-form-item>
					</div>

					<el-form-item>
						<el-button type="primary" v-show="!changePwd" @click="changePwd=true">修改密码</el-button>
						<el-button type="primary" @click="onSubmit">修改</el-button>
						<el-button type="primary" @click="onSubmit">重置</el-button>
					</el-form-item>

				</el-form>

			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				form: {
					name:'',
					date:''
				},
				changePwd:false
			}
		},
		methods:{
			handleSizeChange(val) {  //分页
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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
</style>