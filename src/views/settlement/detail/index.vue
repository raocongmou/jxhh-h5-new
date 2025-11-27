<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />

    <Scroll class="wrapper">
      <van-tabs v-model:active="tabActive" class="magin-top:20px">
        <van-tab title="主表信息">
          <!-- <Scroll
          class="wrapper"
          :pullup="pullup"
          :elementChangeFlag="elementChangeFlag"
        > -->
          <van-form @submit="onSubmit">
            <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              label-width="68"
              readonly
              required
              placeholder="平台公司"
            />
            <!-- 销售合同号、版本 -->
            <van-row>
              <van-col span="24">
                <van-field
                  v-model="formData.settlementNo"
                  readonly
                  required
                  input-align="right"
                  label-width="68"
                  name="收汇水单"
                  label="收汇水单"
                  placeholder="收汇水单"
                />
              </van-col>
            </van-row>
            <!-- 客户名称 -->
            <van-row>
              <van-col span="24">
                <van-field
                  required
                  label-width="68"
                  input-align="right"
                  v-model="formData.cmpId"
                  name="客户名称"
                  label="客户名称"
                  readonly
                />
              </van-col>
            </van-row>

            <!-- 币种、金额-->
            <van-row>
              <van-col span="12">
                <van-field
                  required
                  readonly
                  label-width="68"
                  v-model="formData.currencyCodeSd"
                  name="结汇币种"
                  label="结汇币种"
                  placeholder=""
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.settlementDate"
                  readonly
                  label-width="68"
                  name="结汇日期"
                  label="结汇日期"
                  placeholder="结汇日期"
                />
              </van-col>
            </van-row>
            <van-field
              required
              label-width="68"
              input-align="right"
              v-model="formData.verifyNo"
              name="付款行"
              label="付款行"
              readonly
            />
            <van-field
              required
              label-width="68"
              input-align="right"
              v-model="formData.settlementBank"
              name="结汇银行"
              label="结汇银行"
              readonly
            />

            <van-field
              required
              label-width="68"
              input-align="right"
              v-model="formData.control2"
              name="水单状态"
              label="水单状态"
              readonly
            />
            <van-field
              required
              label-width="68"
              input-align="right"
              v-model="formData.serialCode"
              name="总帐科目"
              label="总帐科目"
              readonly
            />
            <van-field
              required
              label-width="68"
              input-align="right"
              v-model="formData.applyNo"
              name="申报单号"
              label="申报单号"
              readonly
            />
            <!-- 收款情况、收款金额-->
            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.settlementDate"
                  readonly
                  label-width="68"
                  name="结汇日期"
                  label="结汇日期"
                  placeholder="结汇日期"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.recType"
                  readonly
                  label-width="68"
                  name="收汇类型"
                  label="收汇类型"
                  placeholder="收汇类型"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.sapType"
                  readonly
                  label-width="88"
                  input-align="right"
                  name="SAP接口状态"
                  label="SAP接口状态"
                  placeholder="SAP接口状态"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.sapCreateDate"
                  name="SAP日期"
                  label="SAP日期"
                  readonly
                />
              </van-col> </van-row
            ><van-field
              v-model="formData.sapOrderNo"
              input-align="right"
              readonly
              name="SAP单号"
              label="SAP单号"
              label-width="74"
            />

            <van-field
              v-model="formData.orderDate"
              name="制单日期"
              label="制单日期"
              readonly
            />

            <div v-show="divEmpty" class="empty"></div>
          </van-form>
          <!-- </Scroll> -->
        </van-tab>

        <van-tab title="项目清单">
          <div class="detail_item">
            <!-- 商品明细 -->
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index"
                :title="item.orderNo"
              >
                <van-form>
                  <van-field
                    label-width="68"
                    v-model="item.objectNo"
                    readonly
                    input-align="right"
                    name="单据类型"
                    label="单据类型"
                    placeholder="单据类型"
                  />

                  <van-field
                    label-width="68"
                    v-model="item.baseNum"
                    readonly
                    input-align="right"
                    name="单据号"
                    label="单据号"
                    placeholder="单据号"
                  />
                  <van-field
                    label-width="168"
                    v-model="item.totalMoney"
                    input-align="right"
                    name="发票应收汇金额(原币)"
                    label="发票应收汇金额(原币)"
                    placeholder="发票应收汇金额(原币)"
                  />
                  <van-field
                    label-width="168"
                    v-model="item.settlementMoney"
                    readonly
                    input-align="right"
                    name="发票入帐金额(原币)"
                    label="发票入帐金额(原币)"
                  />

                  <van-field
                    label-width="168"
                    v-model="item.abroadCharge"
                    readonly
                    name="单据类型"
                    input-align="right"
                    label="美元兑原币汇率"
                    placeholder="美元兑原币汇率"
                  />

                  <van-field
                    label-width="168"
                    v-model="item.totalMoneyStat"
                    type="number"
                    :readonly="orderReadOnly"
                    name="发票收汇金额(美元)"
                    label="发票收汇金额(美元)"
                    input-align="right"
                    placeholder="发票收汇金额(美元)"
                  />

                  <van-field
                    label-width="100"
                    v-model="item.accountant"
                    readonly
                    name="财务制证"
                    input-align="right"
                    label="财务制证"
                    placeholder="财务制证"
                  />

                  <van-field
                    label-width="88"
                    v-model="item.exportDate"
                    :readonly="orderReadOnly"
                    input-align="right"
                    name="海关放行日期"
                    label="海关放行日期"
                    placeholder="海关放行日期"
                  />

                  <van-field
                    label-width="128"
                    input-align="right"
                    v-model="item.cfmDate"
                    :readonly="orderReadOnly"
                    name="认领日期"
                    label="认领日期"
                    placeholder="认领日期"
                  />

                  <van-field
                    label-width="128"
                    input-align="right"
                    v-model="item.orderType"
                    :readonly="orderReadOnly"
                    name="贸易方式"
                    label="贸易方式"
                    placeholder="贸易方式"
                  />

                  <van-field
                    label-width="128"
                    input-align="right"
                    v-model="item.cfmDate"
                    :readonly="orderReadOnly"
                    name="认领日期"
                    label="认领日期"
                    placeholder="认领日期"
                  />

                  <van-field
                    v-model="item.amount1"
                    :readonly="orderReadOnly"
                    name="报关金额"
                    label="报关金额"
                    label-width="80"
                    input-align="right"
                    placeholder="报关金额"
                  />
                  <van-field
                    v-model="item.orgNo"
                    readonly
                    input-align="right"
                    label-width="80"
                    name="部门"
                    label="部门"
                    placeholder="部门"
                  />
                  <van-field
                    v-model="item.employeeName"
                    readonly
                    input-align="right"
                    label-width="80"
                    name="业务员"
                    label="业务员"
                    placeholder="业务员"
                  />
                  <van-field
                    v-model="item.invoiceNo"
                    readonly
                    label-width="150"
                    input-align="right"
                    name="单据号"
                    label="单据号"
                    placeholder="单据号"
                  />

                  <van-field
                    v-model="item.verifyNo"
                    :readonly="orderReadOnly"
                    name="收汇核销单号"
                    input-align="right"
                    label="收汇核销单号"
                    placeholder="收汇核销单号"
                  />
                  <van-field
                    v-model="item.khdDoc"
                    :readonly="orderReadOnly"
                    name="付款单据名称"
                    label="付款单据名称"
                    input-align="right"
                    placeholder="付款单据名称"
                  />

                  <van-field
                    v-model="item.orderNo"
                    readonly
                    label-width="150"
                    input-align="right"
                    name="定单号"
                    label="定单号"
                    placeholder="定单号"
                  />
                  <van-field
                    v-model="item.confirm"
                    :readonly="orderReadOnly"
                    name="确认标识"
                    label="确认标识"
                  />
                  <van-field
                    v-model="item.confirmDate"
                    :readonly="orderReadOnly"
                    name="确认日期"
                    label="确认日期"
                  />
                  <van-field
                    v-model="item.confirmNo"
                    :readonly="orderReadOnly"
                    name="确认人"
                    label="确认人"
                  />
                </van-form>
              </van-collapse-item>
            </van-collapse>
            <!-- </div>
        </ScrollFirst> -->
          </div>
        </van-tab>
        <!-- </ScrollFirst> -->

        <van-tab title="实付项目">
          <!-- 商品明细 -->
        </van-tab>

        <van-tab title="附件"> </van-tab>
      </van-tabs>
    </Scroll>
    <!-- </Scroll> -->
    <!-- 侧滑窗口 选择 往来单位 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpVendorSelect
        :employeeNo="employeeNoVendor"
        v-on="{ selectVendorItem: selectVendorItem }"
      />
    </van-popup>
    <!-- 侧滑窗口 选择 业务员-->
    <van-popup
      v-model:show="showEmploeeySelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpEmployeeSelect v-on="{ selectEmployeeItem: selectEmployeeItem }" />
    </van-popup>
    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="showItemPdtSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      :click-overlay="onOver"
      @select="selectItemAction"
      :description="actionDesc"
      :close-on-click-overlay="overlay"
      cancel-text="取消"
    />
    <!-- 时间选择 -->
    <van-calendar v-model:show="selectTimeShow" @confirm="selectDateTime" />
    <!-- <van-area title="选择地区" :area-list="areaList" :columns-num="2" /> -->

    <van-dialog
      v-model:show="isNoInputShow"
      title="生成的销售合同号(可修改)"
      @confirm="confirmIsNo()"
    >
      <van-field label="销售合同号:" v-model="tempIsNo"></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";

import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
//import ErpFile from "@/components/ErpFile.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { detail } from "@/api/erp.settlement.js";
import { genarateDocNo } from "@/api/erp.docno.js";

import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";

import fieldFormData from "./cloumn";

export default {
  name: "OrdersDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    //ErpFile,
  },
  data() {
    return {
      docEntry: null,
      formData: {},
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      genarareForm: {
        objectNo: "PM03",
        orgCoNo: "",
      },
      employeeNoVendor: "",
      ///   默认的状态
      editStatus: "view",
      /// 当前单据 是否只读
      orderReadOnly: true,
      /// 当前是哪一个 tab 活跃
      tabActive: 0,
      pullup: false,
      ////  枚举类型的 上滑选项是否 显示
      actionShow: false,
      ////  枚举类型的 上滑选项 集合
      actionItems: [],
      ///   枚举类型的活跃字段
      activeFormFiled: "",
      ///   枚举类型标题说明
      actionDesc: "",
      /// 明细折叠，当前打开的  明细行字段
      pdtItemsActiveIndex: 0,
      /// 联系信息折叠
      contactInfoActiveIndex: 1,
      elementChangeFlag: 0,

      contractTermIndex: 10,
      contractTermIndex1: 11,
      activeNames: 1,
      ////   成本分析，折叠框，默认
      feeAmountActiveIndex: 0,
      orgNo: "",
      activePdtItemIndex: null,
      ////  主表的按钮是否可见
      btnDeleteShow: false,
      btnAddShow: false,
      btnSaveShow: false,
      btnEditShow: false,
      btnAuditShow: false,
      btnCancelAuditShow: false,
      btnSapShow: false,
      btnCancelShow: false,
      ///   侧滑窗口是否显示
      showVendorSelect: false,
      showEmploeeySelect: false,
      showItemPdtSelect: false,
      ////  时间选择
      selectTimeShow: false,
      ////  站位
      divEmpty: true,
      ///销售合同确认框
      isNoInputShow: false,
      tempIsNo: "",
      orgList: [],
      tredeTypeList: [],
      saleTypeList: [],
      recTypeList: [],
      orderModeList: [{ name: "格式合同" }, { name: "非格式合同" }],
      recMethodList: [],
      currencyCodeList: [],
      fileItems: [],
    };
  },
  created() {
    this.docEntry = this.$route.query.docEntry;
    console.log("生命周期【 create 】", this.docEntry);
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });

    getTredeType().then((res) => {
      this.tredeTypeList.push(...res);
    });

    getSaleType().then((res) => {
      this.saleTypeList.push(...res);
    });
    getRecType().then((res) => {
      this.recTypeList.push(...res);
    });
    getRecMethod().then((res) => {
      this.recMethodList.push(...res);
    });
    getCurrencyCode().then((res) => {
      this.currencyCodeList.push(...res);
    });
    if (this.docEntry && this.docEntry > 0) {
      this.loadDetail();
    }
  },

  setup() {
    console.log("生命周期【 setup 】");
    provide("title", "水单详情");
  },
  mounted() {
    // 刷新的时候 会进入进入这个生命周期
    console.log("生命周期【 mounted 】");
  },
  updated() {},
  methods: {
    // 过滤器  数量
    formatterAmount(item) {
      if (!item || item === undefined) {
        return "0.00";
      }
      if (item.includes(",")) {
        return item;
      }
      return moneyFormat(item);
    },
    ///当前页面切换了平台公司
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },

    ///重新加载所有的数据
    loadDetail() {
      detail({ docEntry: this.docEntry }).then((res) => {
        this.formData = res.data;
        this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
      });
    },
  },

  computed: {
    ///// 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCoNo;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgAbbrName;
        }
      }
      return "";
    },
    ///// 计算贸易类型
    computedTrade: function () {
      let tradType = this.formData.orderType;
      for (var i = 0; i < this.tredeTypeList.length; i++) {
        if (this.tredeTypeList[i].tradeTypeNo === tradType) {
          return this.tredeTypeList[i].tradeType;
        }
      }
      return "";
    },

    ///// 计算销售方式
    computedSaleType: function () {
      let saleType = this.formData.saleType;
      for (var i = 0; i < this.saleTypeList.length; i++) {
        if (this.saleTypeList[i].refId == saleType) {
          return this.saleTypeList[i].refValue;
        }
      }
      return "";
    },
  },
};
</script>

<style scoped lang="less">
::v-deep {
  .van-tab--active {
    color: #1fa2e8;
    font-weight: 900;
    //background-color: darkseagreen;
  }
}
.empty {
  background: transparent;
  height: 1000px;
}
.percent {
  height: 100%;
  padding-top: 10px;
  font-size: 14px;
  background: #fff;
}
.van-field__label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  box-sizing: border-box;
  width: 6.2em;
  margin-right: 0.12rem;
  color: #646566;
  text-align: left;
  word-wrap: break-word;
}
.pdt_bt {
  // display: flex;
  height: 35px;
  width: 100%;
  button {
    float: right;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.copy {
  width: 100%;
  display: flex;
  button {
    flex: 1;
    height: 27px;
    margin: 0 17px;
  }
}
.wrapper {
  background-color: #eeeeee;
  height: calc(100vh - 151.47px);
  width: 100%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 95vw;
      margin: 10px auto;
      border-radius: 5px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      .contact-number,
      .company-money {
        margin-left: 20px;
        span {
        }
      }
    }
  }
}
.fileFromClass {
  margin-top: 15px;
}
.class_uploader {
  width: 400%;
  height: 40px;

  button {
    height: 35px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
}
.list_bt {
  width: 100%;
  display: flex;
  background-color: white;
  margin-bottom: 10px;
  button {
    flex: 1;
    height: 30px;
    margin: 0 17px;
  }
}
.wrapper1 {
  background-color: #eeeeee;
  height: 100px;
  width: 100%;
  overflow: hidden;
  .content {
    div {
      display: flex;
      flex-direction: column;
      width: 95vw;
      margin: 10px auto;
      border-radius: 5px;
      font-size: 14px !important;
      background-color: #fff;
      color: #777777;
      overflow: hidden;
      .contact-number,
      .company-money {
        margin-left: 20px;
        span {
        }
      }
    }
  }
}

.tools-bar {
  display: flex;
  padding: 8px;
  .tools-bar-button {
    flex: 1;
    & + .tools-bar-button {
      margin-left: 5px;
      margin-right: 5px;
      //margin-bottom: 10px;
      //margin-top: 5px;
    }
  }
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
