<template>
    <div id="siteDeclare">
        <div class="co-wapper">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>交易管理</el-breadcrumb-item>
                <el-breadcrumb-item>申报</el-breadcrumb-item>
            </el-breadcrumb>

            <el-form ref="formDate" :model="formData" label-width="110px" size="small">
                <el-form-item label="模板选择">
                    <el-radio
                        v-model="formData.tempOption"
                        v-for="(item,index) in temps"
                        :key="item"
                        :label="index"
                    >{{item}}</el-radio>
                </el-form-item>
                <el-form-item label="申报盘面">
                    <el-radio
                        v-model="formData.board"
                        v-for="item in boards"
                        :value="item.value"
                        :key="item.value"
                        :label="item.value"
                    >{{item.label}}</el-radio>
                </el-form-item>
                <el-form-item label="价格模式">
                    <el-radio v-model="formData.price" label="1">固定定价</el-radio>
                    <el-radio v-model="formData.price" label="2">浮动定价</el-radio>
                    <el-radio v-model="formData.price" label="3">点价</el-radio>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="买卖方向">
                            <el-select v-model="formData.dealType" placeholder="请选择">
                                <el-option label="卖出" value="卖出"></el-option>
                                <el-option label="买入" value="买入"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产地">
                            <el-select v-model="formData.origin" placeholder="请选择">
                                <el-option
                                    v-for="item in origins"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="交货期">
                            <el-select v-model="formData.deliveryPeriod" placeholder="请选择">
                                <el-option
                                    v-for="item in deliveryPeriods"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="交货港口" style="display: none">
                            <el-select v-model="formData.deliveryPorts" placeholder="请选择">
                                <el-option
                                    v-for="item in deliveryPorts"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="formData.deliveryPeriod || '装船期'">
                            <el-date-picker
                                v-model="formData.origin"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="其他约束条款">
                    <el-input
                        style="width: 80%;"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="formData.otherBindingTerms"
                    ></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button @click="dialogFormVisible1 = true">确认匹配</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="运费差">
                            <el-button @click="dialogFormVisible2 = true">填报</el-button>&nbsp;&nbsp;基港：青岛
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--确认匹配弹窗-->
                <el-dialog title="请为此次申报匹配会员" :visible.sync="dialogFormVisible1">
                    <div style="text-align: center;">
                        <el-transfer
                            style="text-align: left; display: inline-block"
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入会员名称"
                            v-model="value2"
                            :data="data2"
                            :titles="['一次匹配会员','二次匹配会员']"
                        ></el-transfer>
                    </div>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button @click="dialogFormVisible1 = true">取 消</el-button>
                        <el-button @click="dialogFormVisible1 = false">确 定</el-button>
                    </div>
                </el-dialog>

                <!--运费差填报弹窗-->
                <el-dialog title="请填写运费差" :visible.sync="dialogFormVisible2">
                    <div style="text-align: center;margin-bottom: 20px;">运费差 （美元/湿吨） [基港：青岛]</div>
                    <el-table
                        :data="tableInit2"
                        border
                        style="width: 100%"
                        size="small"
                        :header-cell-style="{'text-align':'center','background':'#f5f7fa'}"
                    >
                        <el-table-column fixed prop="a" label="港口" align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-select v-model="scope.row.value">
                                        <el-option
                                            v-for="item in deliveryPorts"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.text"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="b" label="增减" align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-select v-model="scope.row.quantity">
                                        <el-option label="增加" value="zengjia"></el-option>
                                        <el-option label="减少" value="jianshao"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column prop="c" label="差值" align="center">
                            <template slot-scope="scope">
                                <el-form-item label-width="0">
                                    <el-input v-model="scope.row.price"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button @click="addFreightDifferential">增 加</el-button>
                        <el-button @click="dialogFormVisible2 = false">确 定</el-button>
                        <el-button @click="dialogFormVisible2 = true">重 置</el-button>
                    </div>
                </el-dialog>

                <!--标的信息填报-->
                <el-table
                    :data="tableInit"
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center','background':'#ecf5ff'}"
                >
                    <el-table-column fixed prop="a" label="交易标的" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item label-width="0">
                                <el-select v-model="scope.row.value" label-width="0">
                                    <el-option
                                        v-for="item in brands"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="b" label="申报数量(湿吨)" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item label-width="0">
                                <el-input v-model="scope.row.quantity"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="c" label="申报价格(美元/干吨)" width="500" align="center">
                        <template slot-scope="scope">
                            <el-form-item label-width="0">
                                <el-input v-model="scope.row.price"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性" align="center">
                        <template>
                            <el-form-item label-width="0">
                                <el-button @click="dialogFormVisible3 = true">填报</el-button>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
                <!--属性填报弹窗-->
                <el-dialog title="请填写报价信息及相关属性信息" :visible.sync="dialogFormVisible3" width="80%">
                    <div class="floatPrice">
                        <div class="floatPrice-tit">定价</div>
                        <div class="part1">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="指数名称" size="small">
                                        <el-select v-model="dialogData.indexName">
                                            <el-option
                                                v-for="item in indexNames"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="粉矿指数铁品位" size="small">
                                        <el-select v-model="dialogData.indexFe">
                                            <el-option
                                                v-for="item in indexFes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="结算依据" size="small">
                                        <el-select v-model="dialogData.settlementBasis">
                                            <el-option
                                                v-for="item in settlementBasis"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="计价周期" size="small">
                                        <el-select v-model="dialogData.quotationPeriod">
                                            <el-option
                                                v-for="item in quotationPeriods"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="16">
                                    <el-form-item label="计价周期" size="small">
                                        <el-date-picker
                                            v-model="dialogData.quotationPeriodDate"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            :picker-options="pickerOptions"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <div class="gongshi">
                            <el-form-item label="指数公式" size="small">
                                <el-select v-model="dialogData.formula">
                                    <el-option
                                        v-for="item in formulas"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <div></div>
                        </div>

                        <div class="part3">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="结算折溢价" size="small">
                                        <el-select v-model="dialogData.settlementPD">
                                            <el-option label="无折溢价" value="1"></el-option>
                                            <el-option label="溢价" value="2"></el-option>
                                            <el-option label="折价" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item size="small" label-width="0">
                                        <el-radio v-model="radio" label="1">固定值</el-radio>
                                        <el-radio v-model="radio" label="2">百分比</el-radio>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label-width="0" size="small">
                                        <el-input>
                                            <template slot="append">美元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="铁品位折溢价" size="small">
                                        <el-select v-model="dialogData.fePD">
                                            <el-option label="无折溢价" value="1"></el-option>
                                            <el-option label="溢价" value="2"></el-option>
                                            <el-option label="折价" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item size="small" label-width="0">
                                        <el-radio v-model="radio" label="1">固定值</el-radio>
                                        <el-radio v-model="radio" label="2">百分比</el-radio>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label-width="0" size="small">
                                        <el-input>
                                            <template slot="append">美元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="开证价格" size="small">
                                        <el-input v-model="dialogData.priceForIssuing">
                                            <template slot="append">美元/千吨</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="properties">
                        <div class="properties-tit">品质指标</div>
                        <div class="part4">
                            <div>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计价基准" size="small">
                                            <el-select v-model="dialogData.priceBasis">
                                                <el-option
                                                    v-for="item in priceBasis"
                                                    :key="item.value"
                                                    :value="item.value"
                                                    :label="item.label"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="margin-left: 80px;">成交价增加(美元/千吨)</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div style="margin-left: 80px;">成交价增加(美元/千吨)</div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="Fe" size="small">
                                            <el-input v-model="dialogData.Fe.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.Fe.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.Fe.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="SiO2" size="small">
                                            <el-input v-model="dialogData.SiO2.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.SiO2.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.SiO2.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="Al2O3" size="small">
                                            <el-input v-model="dialogData.Al2O3.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.Al2O3.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.Al2O3.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="S" size="small">
                                            <el-input v-model="dialogData.S.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.S.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.S.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="P" size="small">
                                            <el-input v-model="dialogData.P.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.P.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.P.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="Moisture" size="small">
                                            <el-input v-model="dialogData.Moisture"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="14">
                                        <div>&nbsp;</div>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button
                                            size="small"
                                            @click="moreProperties = !moreProperties"
                                        >{{moreProperties==false?'+ 更多':'- 隐藏'}}</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-show="moreProperties">
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="Mn" size="small">
                                            <el-input v-model="dialogData.Mn.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.Mn.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.Mn.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="CaO" size="small">
                                            <el-input v-model="dialogData.CaO.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.CaO.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.CaO.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="K2O" size="small">
                                            <el-input v-model="dialogData.K2O.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.K2O.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.K2O.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="MgO" size="small">
                                            <el-input v-model="dialogData.MgO.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.MgO.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.MgO.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="Na2O" size="small">
                                            <el-input v-model="dialogData.Na2O.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.Na2O.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.Na2O.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="TiO2" size="small">
                                            <el-input v-model="dialogData.TiO2.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="+1%" size="small">
                                            <el-input v-model="dialogData.TiO2.b"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="-1%" size="small">
                                            <el-input v-model="dialogData.TiO2.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="LOI" size="small">
                                            <el-input v-model="dialogData.LOI"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="FeO" size="small">
                                            <el-input v-model="dialogData.FeO"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="part5">
                            <div class="fl">粒度</div>
                            <div class="fr">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="+" size="small">
                                            <el-input v-model="dialogData.Size.a"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="mm" size="small">
                                            <el-input v-model="dialogData.Size.b">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="卸率" size="small">
                                            <el-input v-model="dialogData.DischargingRate">
                                                <template slot="append">湿吨/天</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="船长" size="small">
                                            <el-input v-model="dialogData.Length">
                                                <template slot="append">米</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="-" size="small">
                                            <el-input v-model="dialogData.Size.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="mm" size="small">
                                            <el-input v-model="dialogData.Size.d">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="滞期费" size="small">
                                            <el-input v-model="dialogData.Demurrage">
                                                <template slot="append">美元/天</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="船宽" size="small">
                                            <el-input v-model="dialogData.Width">
                                                <template slot="append">米</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="-" size="small">
                                            <el-input v-model="dialogData.Size.e"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="mesh" size="small">
                                            <el-input v-model="dialogData.Size.f">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="速遣费" size="small">
                                            <el-input v-model="dialogData.Dispatch">
                                                <template slot="append">美元/天</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="吃水" size="small">
                                            <el-input v-model="dialogData.Draught">
                                                <template slot="append">米</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">&nbsp;</el-col>
                                    <el-col :span="6">
                                        <el-form-item label="抗压强度" size="small">
                                            <el-input v-model="dialogData.ColdCompression">
                                                <template slot="append">kg min</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">&nbsp;</el-col>
                                    <el-col :span="6">
                                        <el-form-item label="满载吨位" size="small">
                                            <el-input v-model="dialogData.DWTSummer">
                                                <template slot="append">吨</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button @click="dialogFormVisible3 = false">确 定</el-button>
                        <el-button @click="dialogFormVisible3 = true">重 置</el-button>
                    </div>
                </el-dialog>
                <el-form-item label-width="0" style="text-align: center;margin-top: 20px;">
                    <el-button type="primary" @click="declareCommit(formData)">提交</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        const generateData2 = _ => {
            const data = [];
            const cities = [
                "上海",
                "北京",
                "广州",
                "深圳",
                "南京",
                "西安",
                "成都"
            ];
            const pinyin = [
                "shanghai",
                "beijing",
                "guangzhou",
                "shenzhen",
                "nanjing",
                "xian",
                "chengdu"
            ];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                    pinyin: pinyin[index]
                });
            });
            return data;
        };
        return {
            formData: {
                tempOption: "",
                board: "",
                price: "",
                dealType: "",
                origin: "",
                deliveryPeriod: "",
                laycan: "",
                otherBindingTerms: "",
                productData: [
                    {
                        brand: "",
                        quantity: "",
                        price: ""
                    },
                    {
                        brand: "",
                        quantity: "",
                        price: ""
                    },
                    {
                        brand: "",
                        quantity: "",
                        price: ""
                    },
                    {
                        brand: "",
                        quantity: "",
                        price: ""
                    }
                ]
            },
            tableInit: [
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                }
            ],
            tableInit2: [
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                },
                {
                    a: "",
                    b: "",
                    c: ""
                }
            ],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            boards: this.pubData.boards,
            origins: this.pubData.origins,
            deliveryPeriods: this.pubData.deliveryPeriods,
            brands: this.pubData.brands,
            deliveryPorts: this.pubData.deliveryPorts,
            temps: ["无模板", "模板A", "模板B", "模板D", "模板P"],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,
            data2: generateData2(),
            value2: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            //属性填报弹窗内容
            dialogData: {
                indexName: "",
                indexFe: "",
                settlementBasis: "",
                quotationPeriod: "",
                quotationPeriodDate: "",
                formula: "",
                settlementPD: "",
                fePD: "",
                priceForIssuing: "",
                priceBasis: "",
                Fe: { a: "", b: "", c: "" },
                SiO2: { a: "", b: "", c: "" },
                Al2O3: { a: "", b: "", c: "" },
                S: { a: "", b: "", c: "" },
                P: { a: "", b: "", c: "" },
                Moisture: "",
                Mn: { a: "", b: "", c: "" },
                CaO: { a: "", b: "", c: "" },
                K2O: { a: "", b: "", c: "" },
                MgO: { a: "", b: "", c: "" },
                Na2O: { a: "", b: "", c: "" },
                TiO2: { a: "", b: "", c: "" },
                LOI: "",
                FeO: "",
                Size: { a: "", b: "", c: "", d: "", e: "", f: "" },
                DischargingRate: "",
                Demurrage: "",
                Dispatch: "",
                Length: "",
                Width: "",
                Draught: "",
                ColdCompression: "",
                DWTSummer: ""
            },
            radio: "",
            moreProperties: false,
            indexNames: this.pubData.indexNames,
            indexFes: this.pubData.indexFes,
            settlementBasis: this.pubData.settlementBasis,
            quotationPeriods: this.pubData.quotationPeriods,
            formulas: this.pubData.formulas,
            priceBasis: this.pubData.priceBasis
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            var _this = this;
            this.$axios.post("data/templateList").then(res => {
                let data = res.data.items;
                let temps = [];
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var temp = data[i].tempName;
                    temps.push(temp);
                }
                //console.log(temps);
                //q_this.temps = temps;
            });
        },
        declareCommit(opt) {
            //console.log(opt)
            let _this = this;
            this.$axios
                .post("data/addData", {
                    params: {
                        data: opt
                    }
                })
                .then(res => {
                    //console.log(res)
                });
        },
        addFreightDifferential() {
            this.tableInit2.push({
                a: "",
                b: "",
                c: ""
            });
        }
    }
};
</script>

<style scoped>
.el-breadcrumb {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
}
.el-form {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    padding: 30px;
}
div.el-form-item__content {
    margin-left: 120px;
}
.el-form-item__label {
    margin-right: 40px;
}

.el-table__row .cell .el-form-item {
    margin-bottom: 0;
}
.el-form-item {
    margin-bottom: 12px;
}
/*属性信息填报弹窗*/
.floatPrice,
.properties {
    border: 1px solid #cacaca;
    border-bottom: 0;
}
.floatPrice-tit,
.properties-tit {
    background: #f5f7fa;
    height: 30px;
    line-height: 30px;
    margin-bottom: 22px;
}
.gongshi {
    height: 140px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-bottom: 22px;
}
.properties {
    border-bottom: 1px solid #ccc;
}
.part4 {
    border-bottom: 1px solid #ccc;
}
.part5 {
    overflow: hidden;
    padding-top: 22px;
}
.part5 > .fl {
    width: 8%;
    height: 32px;
    text-align: right;
    line-height: 32px;
}
.part5 > .fr {
    width: 92%;
    padding-right: 2%;
}
</style>