<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="基础信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form>
            <van-field
              v-model="formData.pdtNo1"
              readonly
              label-width="120"
              name="商品编码"
              label="商品编码"
            />
            <van-field
              v-model="formData.pdtcodeC"
              readonly
              label-width="120"
              name="海关编码"
              label="海关编码"
            />
            <van-field
              v-model="formData.licensNo"
              readonly
              label-width="120"
              name="附加码"
              label="附加码"
            />
            <van-field
              v-model="formData.inputDate"
              readonly
              label-width="120"
              name="登记日期"
              label="登记日期"
            />

            <van-field
              v-model="formData.pdtNameC"
              readonly
              label-width="120"
              name="品名(中文)"
              label="品名(中文)"
            />
            <van-field
              v-model="formData.pdtNameE"
              readonly
              label-width="120"
              name="品名(英文)"
              label="品名(英文)"
            />

            <van-field
              v-model="formData.specificationC"
              readonly
              label-width="120"
              name="商品规格(中文)"
              label="商品规格(中文)"
            />
            <van-field
              v-model="formData.specificationE"
              readonly
              label-width="120"
              name="商品规格(英文)"
              label="商品规格(英文)"
            />
            <van-field
              v-model="formData.packColor"
              readonly
              label-width="120"
              name="证件名称"
              label="证件名称"
            />
            <van-field
              v-model="formData.hl"
              readonly
              label-width="120"
              name="含量"
              label="含量(%)"
            />
            <van-field
              v-model="formData.licensclass"
              readonly
              label-width="120"
              name="登记证类型"
              label="登记证类型"
            />
            <RcmSelect
              :select-label="'label'"
              :select-value="'value'"
              :valueKey="'label'"
              :options="impExpList"
              :label="'采购标识'"
              :name="'采购标识'"
              :placeholder="'采购标识'"
              :isRightArrow="true"
              :field="formData.impExp"
            />
            <van-field
              v-model="formData.fl1"
              readonly
              label-width="120"
              name="第一级分类"
              label="第一级分类"
            />

            <van-field
              v-model="formData.fl2"
              readonly
              label-width="120"
              name="第二级分类"
              label="第二级分类"
            />

            <van-field
              v-model="formData.fl3"
              readonly
              label-width="120"
              name="第三级分类"
              label="第三级分类"
            />

            <van-field
              v-model="formData.fl4"
              readonly
              label-width="120"
              name="第四级分类"
              label="第四级分类"
            />

            <van-field
              v-model="formData.fl5"
              readonly
              label-width="120"
              name="第五级分类"
              label="第五级分类"
            />
            <van-field
              v-model="formData.descriptionE"
              readonly
              label-width="120"
              name="商品说明(英文)"
              label="商品说明(英文)"
            />
            <van-field
              v-model="formData.descriptionC"
              readonly
              label-width="120"
              name="商品说明(中文)"
              label="商品说明(中文)"
            />

            <van-field
              v-model="formData.sbys"
              readonly
              label-width="120"
              name="申报要素"
              label="申报要素"
            />

            <van-field
              v-model="formData.remark"
              readonly
              label-width="120"
              name="备注"
              label="备注"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="销售信息">
        <div class="detail_item">
          <Scroll
            class="wrappers-goods-detail wrappers"
            wrapper="goodsDetailRef"
            v-if="formData.items.length"
            ref="goodsDetail"
          >
            <div>
              <van-form @submit="onSubmit">
                <!-- 销售合同号、版本 -->
                <van-field
                  v-model="formData.pdtNo1"
                  readonly
                  label-width="120"
                  name="商品编码"
                  label="商品编码"
                />

                <van-field
                  v-model="formData.pdtNameC"
                  readonly
                  label-width="120"
                  name="品名(中文)"
                  label="品名(中文)"
                />
                <van-field
                  v-model="formData.pdtNameE"
                  readonly
                  label-width="120"
                  name="品名(英文)"
                  label="品名(英文)"
                />
                <van-field
                  v-model="formData.unitStdPrice"
                  readonly
                  label-width="120"
                  name="国外销售价"
                  label="国外销售价(USD)"
                />
                <van-field
                  v-model="formData.unitCostM"
                  readonly
                  label-width="120"
                  name="国内销售价(RMB)"
                  label="国内销售价(RMB)"
                />
                <van-field
                  v-model="formData.unitStdCost"
                  readonly
                  label-width="120"
                  name="国内采购价(RMB)"
                  label="国内采购价(RMB)"
                />
                <van-field
                  v-model="formData.atr"
                  readonly
                  label-width="120"
                  name="增值税税率(%)"
                  label="增值税税率(%)"
                />
                <van-field
                  v-model="formData.dtra"
                  readonly
                  label-width="120"
                  name="增值税退税率(%)"
                  label="增值税退税率(%)"
                />
                <van-field
                  v-model="formData.trc"
                  readonly
                  label-width="120"
                  name="消费税税率(%)"
                  label="消费税税率(%)"
                />
                <van-field
                  v-model="formData.dtrc"
                  readonly
                  label-width="120"
                  name="消费税退税率(%)"
                  label="消费税退税率(%)"
                />
                <van-field
                  v-model="formData.trcst"
                  readonly
                  label-width="120"
                  name="关税税率(%)"
                  label="关税税率(%)"
                />
                <van-field
                  v-model="formData.othertaxrate"
                  readonly
                  label-width="120"
                  name="其它税率(%)"
                  label="其它税率(%)"
                />
                <van-field
                  v-model="formData.uom"
                  readonly
                  label-width="120"
                  name="销售单位"
                  label="销售单位"
                />
                <van-field
                  v-model="formData.sapunit"
                  readonly
                  label-width="120"
                  name="SAP计量单位"
                  label="SAP计量单位"
                />
                <van-field
                  v-model="formData.sapunitRate"
                  readonly
                  label-width="120"
                  name="SAP转换比"
                  label="SAP转换比"
                />
              </van-form>
            </div>
          </Scroll>
        </div>
      </van-tab>

      <van-tab title="包装信息">
        <div class="detail_item">
          <Scroll
            class="wrappers-goods-detail wrappers"
            wrapper="goodsDetailRef"
            v-if="formData.items.length"
            ref="goodsDetail"
          >
            <div>
              <van-form @submit="onSubmit">
                <van-field
                  v-model="formData.uom1"
                  readonly
                  label-width="120"
                  name="包装单位"
                  label="包装单位"
                />
                <van-field
                  v-model="formData.amountPs"
                  readonly
                  name="装箱率"
                  label="装箱率"
                  label-class="lable-class"
                  label-width="120"
                />
                <van-field
                  v-model="formData.amountps1"
                  readonly
                  label-class="lable-class"
                  label-width="120"
                  name="20'GP装柜量"
                  label="20'GP装柜量"
                />
                <van-field
                  v-model="formData.amountPs2"
                  readonly
                  label-class="lable-class"
                  label-width="120"
                  name="40'GP装柜量"
                  label="40'GP装柜量"
                />
                <van-field
                  v-model="formData.amountPs3"
                  readonly
                  label-class="lable-class"
                  label-width="120"
                  name="40'HQ装柜量"
                  label="40'HQ装柜量"
                />

                <van-field
                  v-model="formData.amountflag"
                  readonly
                  name="默认装柜尺寸"
                  label="默认装柜尺寸"
                  label-class="lable-class"
                  label-width="120"
                />
                <van-field
                  v-model="formData.colorC"
                  readonly
                  type="textarea"
                  name="商品包装描述"
                  label="商品包装描述"
                  label-class="lable-class"
                  label-width="120"
                />
                <van-field
                  v-model="formData.measureUOM"
                  readonly
                  name="包装单位：长、宽、高"
                  label="包装单位：长、宽、高"
                  label-class="lable-class"
                  label-width="180"
                />
                <van-field
                  v-model="formData.length"
                  readonly
                  label-width="180"
                  name="长"
                  label="长"
                />
                <van-field
                  v-model="formData.width"
                  readonly
                  label-width="180"
                  name="宽"
                  label="宽"
                />
                <van-field
                  v-model="formData.height"
                  readonly
                  name="高"
                  label="高"
                  label-width="180"
                />
                <van-field
                  v-model="formData.lengthRate"
                  readonly
                  label-class="lable-class"
                  label-width="180"
                  name="标准转换比"
                  label="标准转换比"
                />
                <van-field
                  v-model="formData.volumeUOM"
                  name="包装单位：体积"
                  label="包装单位：体积"
                  readonly
                  label-width="180"
                />
                <van-field
                  v-model="formData.volume"
                  readonly
                  label-class="lable-class"
                  label-width="180"
                  name="体积"
                  label="体积"
                />
                <van-field
                  v-model="formData.volumeRate"
                  readonly
                  label-width="180"
                  name="标准转换比"
                  label="标准转换比"
                />

                <van-field
                  v-model="formData.weightUOM"
                  readonly
                  name="包装单位：重量"
                  label="包装单位：重量"
                  label-class="lable-class"
                  label-width="180"
                />
                <van-field
                  v-model="formData.grossWeight"
                  readonly
                  label-width="180"
                  name="毛重"
                  label="毛重"
                />
                <van-field
                  v-model="formData.netWeight"
                  readonly
                  label-width="180"
                  name="净重"
                  label="净重"
                />
                <van-field
                  v-model="formData.weightRate"
                  readonly
                  label-class="lable-class"
                  label-width="180"
                  name="标准转换比"
                  label="标准转换比"
                />
                <!-- 销售合同号、版本 -->
              </van-form>
              <div class="empty"></div>
            </div>
          </Scroll>
        </div>
        <!-- </Scroll> -->
      </van-tab>

      <van-tab title="销售组织">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <!-- 商品明细 -->

          <Scroll
            class="wrappers-goods-detail wrappers"
            wrapper="goodsDetailRef"
            v-if="formData.items.length"
            ref="goodsDetail"
          >
            <div>
              <template v-for="(item, index) in formData.items" :key="index">
                <van-form>
                  <van-col span="24">
                    <van-field
                      label="销售组织名称"
                      v-model="item.unitname"
                      label-width="105"
                    ></van-field>
                  </van-col>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="105"
                        v-model="item.unitcode"
                        readonly
                        name="销售组织代码"
                        label="销售组织代码"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        label-width="105"
                        v-model="item.jhgc"
                        name="交货工厂代码"
                        label="交货工厂代码"
                        readonly
                      />
                    </van-col>
                  </van-row>
                </van-form>
              </template>
            </div>
          </Scroll>
        </div>
        <!-- </Scroll> -->
      </van-tab>
    </van-tabs>
    <!-- 侧滑窗口 选择 往来单位 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpVendorSelect
        :showVendor="showVendorSelect"
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
      <ErpEmployeeSelect
        :showEmployee="showEmploeeySelect"
        v-on="{ selectEmployeeItem: selectEmployeeItem }"
      />
    </van-popup>
    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="showItemPdtSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        :showItemPdt="showItemPdtSelect"
        ref="productRef"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      @select="selectItemAction"
      :description="actionDesc"
      cancel-text="取消"
    />
    <!-- :close-on-click-overlay="overlay" -->
    <!-- :click-overlay="onOver" -->
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

    <van-dialog
      v-model:show="undoApplyShow"
      title="撤销原因"
      @confirm="doCancelApply()"
      show-cancel-button
    >
      <van-field
        type="textarea"
        v-model="cancelReason"
        class="border-bottom: 1px solid rgb(134, 154, 232);"
      ></van-field>
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

import { pdtInfo } from "@/api/erp.pdt.js";

export default {
  name: "InlandSaleDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    //ErpFile,
  },
  watch: {
    tabActive: {
      handler(oldVal, newVal) {
        // if(oldVal === 0 && newVal === undefined) {
        //   this.$nextTick(_ => {
        //     this.$refs.main.refresh();
        //   })
        // }

        if (newVal === 0) {
          this.$refs.main.refresh();
        }
        // else if(newVal === 1) {
        //   this.$refs.goods.refresh();
        // }

        // else if(newVal === 2) {
        //   this.$nextTick(_ => {
        //   this.$refs.contact.refresh();
        //   })
        // }
        else if (newVal === 3) {
          this.$refs.file.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      // 采购类型
      impExpList: [
        {value: "E", label: "自制生产"},
        {value: "F", label: "外部采购"},
        {value: "X", label: "两种类型采购"},
      ],
      tileName: "商品信息详情",
      pdtID: null,
      docentry: null,
      //isNotAddStatus: true,
      formData: {},
      oldFormData: {},
      sendFomData: {},
      oaStatusArr: [],
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
      goodsItemActIndex: 0,
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
      /// 取消审批原因框
      undoApplyShow: false,
      tempIsNo: "",
      cancelReason: "",
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
    document.title = this.$route.matched[0].meta.name;
    provide("title", this.tileName);
    this.pdtID = this.$route.query.pdtID;
    this.loadDetail();
  },
  mounted() {},
  methods: {
    collapseChange(name) {
      if (name === 3) {
        this.$nextTick((_) => {
          // this.$refs.contact.refresh();
        });
      }
    },
    onClickTab(title) {
      console.log(title);
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      }
      // else if(title === 1) {
      //   this.$nextTick(_ => {
      //     this.$refs.goods.refresh();
      //   })
      // }
      // else if(title === 2) {
      //   this.$nextTick(_ => {
      //     this.$refs.contact.refresh();
      //   })
      // }
      else if (title === 3) {
        this.$nextTick((_) => {
          this.$refs.file.refresh();
        });
      }
    },
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
      pdtInfo({ pdtId: this.pdtID })
        .then((res) => {
          this.formData = res.data;
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },

    goodsItemColl(index) {
      if (index || index === 0) {
        console.log("商品展开", index);
        this.goodsItemActIndex = index;
      }
      //console.log("商品展开-", index);
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
  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.14667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.84rem;
    background-color: #fff;
    .textarea {
      border-bottom: 1px solid rgb(134, 154, 232);
    }
  }
  textarea.van-field__control {
    border: 1px solid rgb(134, 154, 232);
    padding-left: 9px;
  }
}
.textarea_1 {
  background-color: #fff;
  padding-left: 15px;
}
.class_textarea {
  border: 1px;
}
.delete-button {
  height: 100%;
}
.empty {
  background: transparent;
  height: 140px;
}
.percent {
  height: 100%;
  padding-top: 10px;
  font-size: 14px;
  background: #fff;
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
.wrappers {
  background-color: #eeeeee;
  height: calc(100vh - 90.93px);
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
      }
    }
  }
}
.wrappers-contact {
  height: calc(100vh - 194.43px);
}
.wrappers-goods-detail {
  height: calc(100vh - 95.93px);
}
.wrappers-status-detail {
  height: calc(100vh - 137.93px);
  background-color: #ffffff;
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
.oa-status-item {
  background-color: #1fa2e8;
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

// .van-cell {
//     position: relative;
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: flex;
//     box-sizing: border-box;
//     width: 100%;
//     padding: 0.2rem 0.3rem;
//     overflow: hidden;
//     color: #323233;
//     font-size: 0.37333rem;
//     line-height: 0.64rem;
//     background-color: #fff;
// }

// .van-field__label {
//     -webkit-box-flex: 0;
//     -webkit-flex: none;
//     flex: none;
//     box-sizing: border-box;
//     width: 5.2em;
//     margin-right: 0.12rem;
//     color: #646566;
//     text-align: left;
//     word-wrap: break-word;
// }
</style>
