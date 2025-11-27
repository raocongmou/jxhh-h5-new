<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <Scroll class="wrapper">
      <van-tabs v-model:active="tabActive" class="magin-top:20px">
        <van-tab title="主表信息">
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
              <van-col span="16">
                <van-field
                  v-model="formData.poInvoiceNo"
                  readonly
                  required
                  label-width="45"
                  name="编号"
                  label="编号"
                />
              </van-col>
              <van-col span="8">
                <van-field
                  v-model="formData.isSueDate"
                  readonly
                  label-width="40"
                />
              </van-col>
            </van-row>
            <!-- 部门、业务员 -->
            <van-row>
              <van-col span="10">
                <van-field
                  readonly
                  v-model="formData.orgName"
                  label-width="35"
                  name="部门"
                  label="部门"
                  required
                  placeholder="部门"
              /></van-col>

              <van-col span="14">
                <van-field
                  readonly
                  required
                  label-width="51"
                  v-model="formData.employeeName"
                  name="业务员"
                  label="业务员"
                  placeholder="业务员"
                />
              </van-col>
            </van-row>
            <!-- 客户名称 -->
            <van-row>
              <van-col span="24">
                <van-field
                  label-width="68"
                  v-model="formData.coNameE"
                  name="客户名称"
                  label="客户名称"
                  placeholder="客户名称"
                  readonly
                />
              </van-col>
            </van-row>
            <!-- 开票单位 -->
            <van-row>
              <van-col span="24">
                <van-field
                  label-width="68"
                  v-model="formData.vendorName1"
                  name="开票单位"
                  label="开票单位"
                  placeholder="开票单位"
                  readonly
                />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.taxNo"
                  name="税号"
                  label="税号"
                  readonly
                />
              </van-col>
              <van-col span="24">
                <van-field
                  required
                  label-width="88"
                  v-model="formData.bankName"
                  name="开户行名称"
                  label="开户行名称"
                  readonly
                />
              </van-col>
              <van-col span="24">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.accountNo"
                  name="开户行"
                  label="开户行"
                  readonly
                />
              </van-col>
            </van-row>

            <!-- 审批状态、  -->
            <van-row>
              <van-col span="14">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.auditStatusName"
                  name="审批状态"
                  label="审批状态"
                  readonly
                />
              </van-col>
            </van-row>
            <!-- 认证状态  、 认证人 、   认证时间-->
            <van-row>
              <van-col span="10">
                <van-field
                  required
                  readonly
                  label-width="68"
                  v-model="formData.conformName"
                  name="认证状态"
                  label="认证状态"
              /></van-col>
              <van-col span="7">
                <van-field required v-model="formData.empNo1" readonly
              /></van-col>
              <van-col span="7">
                <van-field required readonly v-model="formData.conformDate"
              /></van-col>
            </van-row>
            <!-- 发票号码、发票代码 -->
            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.poInvoiceNo1"
                  name="发票号码"
                  label="发票号码"
                  readonly
                />
              </van-col>

              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.poInvoiceCode"
                  name="发票代码"
                  label="发票代码"
                  readonly
                />
              </van-col>
            </van-row>

            <!-- 执行状态 、 发票日期-->
            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.invoiceType"
                  name="发票类型"
                  label="发票类型"
                  readonly
                />
              </van-col>

              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.invoiceDate"
                  name="发票日期"
                  label="发票日期"
                  readonly
                />
              </van-col>
            </van-row>

            <!-- 发票金额  无税金额  -->
            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.totalPrice"
                  name="发票金额"
                  label="发票金额"
                  readonly
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.totalPriceNt"
                  readonly
                  label-width="68"
                  name="无税金额"
                  label="无税金额"
                  placeholder="无税金额"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.statusName"
                  name="状态"
                  label="状态"
                  readonly
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.flag1"
                  readonly
                  label-width="68"
                  name="核销"
                  label="核销"
                  placeholder="核销"
                />
              </van-col>
            </van-row>
            <!-- 贸易方式 、 业务类型 -->
            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.flag2Name"
                  name="贸易方式"
                  label="贸易方式"
                  readonly
                />
              </van-col>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.contrLdName"
                  name="业务类型"
                  label="业务类型"
                  readonly
                />
              </van-col>
            </van-row>
            <!-- 制证 、 制证日期 -->
            <van-row>
              <van-col span="12">
                <van-field
                  label-width="68"
                  v-model="formData.acctFlag"
                  name="制证"
                  label="制证"
                  readonly
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.acctDate"
                  readonly
                  label-width="68"
                  name="制证日期"
                  label="制证日期"
                  placeholder="制证日期"
                />
              </van-col>
            </van-row>

            <!-- 备注-->
            <van-field
              type="textarea"
              autosize
              v-model="formData.remark"
              name="备注"
              label="备注"
              readonly
            />

            <div v-show="divEmpty" class="empty"></div>
          </van-form>
          <!-- </Scroll> -->
        </van-tab>

        <!-- <ScrollFirst class="wrapper1"> -->
        <van-tab title="发票明细">
          <div class="detail_item">
            <!-- 发票明细 -->
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in formData.poItems"
                :key="index"
                :name="index"
                :title="item.pdtName"
              >
                <van-form>
                  <van-row>
                    <van-col span="24">
                      <van-field
                        label-width="100"
                        v-model="item.pdtName"
                        readonly
                        name="货物或应税劳务名称"
                        label="货物或应税劳务名称"
                        placeholder="货物或应税劳务名称"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        required
                        label-width="68"
                        v-model="item.quantity"
                        readonly
                        name="数量"
                        label="数量"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        label-width="68"
                        v-model="item.uom"
                        readonly
                        name="单位"
                        label="单位"
                        placeholder="单位"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="68"
                        v-model="item.unitPrice"
                        required
                        readonly
                        name="单价"
                        label="单价"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        required
                        v-model="item.totalAmount"
                        readonly
                        label-width="68"
                        name="价税合计"
                        label="价税合计"
                    /></van-col>
                  </van-row>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        v-model="item.atr"
                        readonly
                        label-width="68"
                        name="税率"
                        label="税率"
                    /></van-col>
                    <van-col span="12">
                      <van-field
                        v-model="item.taxAmount"
                        readonly
                        label-width="68"
                        label="税额"
                    /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="24">
                      <van-field
                        v-model="item.chPoInvNo1"
                        readonly
                        label-width="68"
                        name="offerDate"
                        label="原发票号"
                    /></van-col>
                  </van-row>

                  <van-field
                    v-model="item.flag1"
                    readonly
                    label-width="68"
                    name="核销状态"
                    label="核销状态"
                    placeholder="核销状态"
                  />

                  <van-row>
                    <van-col span="12">
                      <van-field
                        v-model="item.quantity1"
                        readonly
                        label-width="68"
                        name="核销数量"
                        label="数量(核销)"
                    /></van-col>
                    <van-col span="12">
                      <van-field
                        v-model="item.amount1"
                        readonly
                        label-width="68"
                        label="金额(核销)"
                    /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12">
                      <van-field
                        v-model="item.taxAmount1"
                        readonly
                        label-width="68"
                        label="税额(核销)"
                    /></van-col>
                    <van-col span="12">
                      <van-field
                        v-model="item.amountNt1"
                        readonly
                        label-width="100"
                        name="核销无税金额"
                        label="无税金额(核销)"
                    /></van-col>
                  </van-row>
                </van-form>
              </van-collapse-item>
            </van-collapse>
            <!-- </div>
        </ScrollFirst> -->
          </div>
        </van-tab>
        <van-tab title="核销明细">
          <div class="detail_item">
            <!-- 发票明细 -->
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in formData.warehsItems"
                :key="index"
                :name="index"
                :title="item.pdtName"
              >
                <van-form>
                  <van-row>
                    <van-col span="24">
                      <van-field
                        label-width="100"
                        v-model="item.orderNo"
                        readonly
                        name="采购合同"
                        label="采购合同"
                        placeholder="采购合同"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                      <van-field
                        label-width="100"
                        v-model="item.refNo"
                        readonly
                        name="供货商合同号"
                        label="供货商合同号"
                        placeholder="供货商合同号"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="100"
                        v-model="item.wareHsNo"
                        readonly
                        name="入库单"
                        label="入库单"
                        placeholder="入库单"
                      />
                    </van-col>

                    <van-col span="12">
                      <van-field
                        v-model="item.orderMid"
                        readonly
                        label-width="68"
                        name="识别码"
                        label="识别码"
                    /></van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                      <van-field
                        required
                        label-width="100"
                        v-model="item.unitPrice"
                        readonly
                        name=""
                        label="单价"
                      />
                    </van-col>
                    <van-col span="24">
                      <van-field
                        required
                        label-width="100"
                        v-model="item.kpQuantity"
                        readonly
                        name=""
                        label="数量(核销)"
                      />
                    </van-col>
                    <van-col span="24">
                      <van-field
                        required
                        label-width="100"
                        v-model="item.amount"
                        readonly
                        name=""
                        label="价税合计(核销)"
                      />
                    </van-col>

                    <van-col span="24">
                      <van-field
                        required
                        label-width="100"
                        v-model="item.amount1"
                        readonly
                        name=""
                        label="无税金额(核销)"
                      />
                    </van-col>

                    <van-col span="24">
                      <van-field
                        required
                        label-width="100"
                        v-model="item.amount2"
                        readonly
                        name=""
                        label="税额(核销)"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                      <van-field
                        v-model="item.specification"
                        readonly
                        label-width="68"
                        name="规格"
                        label="规格"
                    /></van-col>
                    <van-col span="24">
                      <van-field
                        v-model="item.refNo1"
                        readonly
                        label-width="68"
                        name="款号"
                        label="款号"
                    /></van-col>
                    <van-col span="24">
                      <van-field
                        v-model="item.allocateDate"
                        readonly
                        label-width="68"
                        name="核销日期"
                        label="核销日期"
                    /></van-col>
                  </van-row>
                </van-form>
              </van-collapse-item>
            </van-collapse>
            <!-- </div>
        </ScrollFirst> -->
          </div>
        </van-tab>
        <!-- </ScrollFirst> -->
      </van-tabs>
    </Scroll>
  </div>
</template>

<script>
import { provide } from "vue";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";

import { dateFormat, moneyFormat } from "@/utils/format";
import { detail } from "@/api/erp.poinvoice.js";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";

import fieldFormData from "./cloumn";

export default {
  name: "Proposal",
  components: {
    NavBar,
    Scroll,
  },
  data() {
    return {
      poInvoiceNo: null,
      formData: {
        orgCoNo: "",
        poNo: "",
        soType: 0,
        payDetail: "", ///账期
        auditStatus: "", // 审批状态
        ordTypNo: "", ///贸易方式
        payMode: "", /// 结算方式
        poStatus: "", ////执行状态
        vendorName: "",
        remark: "", //// 备注
        currencyCode: "", ///币种
        exchRate: 0,
        poDate: "",
      },
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
    console.log("Create方法");

    getOrgList().then((res) => {
      this.orgList.push(...res);
    });

    this.poInvoiceNo = this.$route.query.poInvoiceNo;
    if (this.poInvoiceNo && this.poInvoiceNo !== "") {
      this.loadDetail();
    }
  },

  setup() {
    console.log("setup 生命周期");
    provide("title", "采购发票详情");
  },
  mounted() {
    // 刷新的时候 会进入进入这个生命周期
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

    ///重新加载所有的数据
    loadDetail() {
      detail(this.poInvoiceNo).then((res) => {
        this.formData = res.data;
        this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.setBtnStatus();
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
  .tools-bar-button {
    flex: 1;
    & + .tools-bar-button {
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
