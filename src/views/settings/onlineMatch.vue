<template>
    <div id="onlineMatch">
        <div class="co-wapper">
            <div class="crumbTit">
                <el-col :span="20">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                        <el-breadcrumb-item>在线匹配</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" size="small">匹配列表下载</el-button>
                </el-col>
            </div>
            <div class="searchBox">
                <div class="macthBox">
                    <el-row
                        style="height: 44px;line-height: 44px; background: #ECF5FF;color: #909399;padding-left: 10px;"
                    >
                        <el-col :span="16">已匹配会员</el-col>
                        <el-col :span="4">
                            <el-input size="mini" style="margin-bottom: 10px;"></el-input>
                        </el-col>
                        <el-col :span="3" style="margin-left: 10px;">
                            <el-button size="mini">查询</el-button>
                        </el-col>
                    </el-row>

                    <el-row style="height: 120px;padding: 12px;">
                        <el-col>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                            >全选</el-checkbox>
                            <div style="margin: 10px 0;"></div>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 12px;">
                        <el-col>
                            <el-button size="mini">撤销匹配</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="macthBox">
                    <el-row
                        style="height: 44px;line-height: 44px; background: #ECF5FF;color: #909399;padding-left: 10px;"
                    >
                        <el-col :span="16">未匹配会员</el-col>
                        <el-col :span="4">
                            <el-input size="mini" style="margin-bottom: 10px;"></el-input>
                        </el-col>
                        <el-col :span="3" style="margin-left: 10px;">
                            <el-button size="mini">查询</el-button>
                        </el-col>
                    </el-row>

                    <el-row style="height: 120px;padding: 12px;">
                        <el-col>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                            >全选</el-checkbox>
                            <div style="margin: 10px 0;"></div>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 12px;">
                        <el-col>
                            <el-button size="mini">申请匹配</el-button>
                            <el-button size="mini">黑名单</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="macthBox">
                    <el-row
                        style="height: 44px;line-height: 44px; background: #ECF5FF;color: #909399;padding-left: 10px;"
                    >
                        <el-col :span="16">其他会员匹配请求</el-col>
                        <el-col :span="4">
                            <el-input size="mini" style="margin-bottom: 10px;"></el-input>
                        </el-col>
                        <el-col :span="3" style="margin-left: 10px;">
                            <el-button size="mini">查询</el-button>
                        </el-col>
                    </el-row>

                    <el-row style="height: 120px;padding: 12px;">
                        <el-col>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                            >全选</el-checkbox>
                            <div style="margin: 10px 0;"></div>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 12px;">
                        <el-col>
                            <el-button size="mini">同意</el-button>
                            <el-button size="mini">拒绝</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="macthBox">
                    <el-row
                        style="height: 44px;line-height: 44px; background: #ECF5FF;color: #909399;padding-left: 10px;"
                    >
                        <el-col :span="16">匹配其他会员申请</el-col>
                        <el-col :span="4">
                            <el-input size="mini" style="margin-bottom: 10px;"></el-input>
                        </el-col>
                        <el-col :span="3" style="margin-left: 10px;">
                            <el-button size="mini">查询</el-button>
                        </el-col>
                    </el-row>

                    <el-row style="height: 120px;padding: 12px;">
                        <el-col>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                            >全选</el-checkbox>
                            <div style="margin: 10px 0;"></div>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 12px;">
                        <el-col>
                            <el-button size="mini">撤销申请</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="macthBox">
                    <el-row
                        style="height: 44px;line-height: 44px; background: #ECF5FF;color: #909399;padding-left: 10px;"
                    >
                        <el-col :span="16">黑名单会员</el-col>
                        <el-col :span="4">
                            <el-input size="mini" style="margin-bottom: 10px;"></el-input>
                        </el-col>
                        <el-col :span="3" style="margin-left: 10px;">
                            <el-button size="mini">查询</el-button>
                        </el-col>
                    </el-row>

                    <el-row style="height: 120px;padding: 12px;">
                        <el-col>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                            >全选</el-checkbox>
                            <div style="margin: 10px 0;"></div>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 12px;">
                        <el-col>
                            <el-button size="mini">撤销黑名单</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const cityOptions = [
    "CT1",
    "CT2",
    "CT3",
    "CT4",
    "CT5",
    "CT6",
    "CT7",
    "CT8",
    "CT9",
    "CT10",
    "CT11",
    "CT12",
    "CT13",
    "CT14",
    "CT15",
    "CT16",
    "CT17",
    "CT18",
    "CT19",
    "CT20",
    "CT21",
    "CT22",
    "CT23",
    "CT24"
];
export default {
    data() {
        return {
            checkAll: false,
            checkedCities: ["上海", "北京"],
            cities: cityOptions,
            isIndeterminate: true
        };
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
};
</script>

<style scoped>
.searchBox {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    /*padding: 10px;*/
}
.crumbTit {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
}
.el-breadcrumb {
    height: 50px;
    line-height: 50px;
}
.el-form {
    margin-top: 20px;
}
.el-checkbox + .el-checkbox {
    margin-left: 0px;
}
.el-checkbox {
    width: 100px;
    height: 24px;
    /*margin-right: 25px;*/
}

</style>