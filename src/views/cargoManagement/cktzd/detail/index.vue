<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        v-show="btnSaveShow"
        size="small"
        class="tools-bar-button"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
      <!-- @touchstart="handleUpdate" -->
      <van-button
        v-show="btnCancelShow"
        size="small"
        class="tools-bar-button"
        type="warning"
        color="#e8c048"
        @click="mainBtnClickCancel"
        >取消</van-button
      >
      <van-button
        v-show="btnAddShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        @click="mainBtnClickAdd"
        >新增</van-button
      >
      <van-button
        v-show="btnEditShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >修改</van-button
      >
      <van-button
        v-show="btnDeleteShow"
        size="small"
        class="tools-bar-button"
        type="danger"
        color="#e85452"
        @click="mainBtnClickDelete"
        >删除</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnAuditShow"
        color="#1fa2e8"
        @click="mainBtnClickAudit"
        >提交审批</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnCancelAuditShow"
        color="#e8c048"
        @click="mainBtnClickCancelAudit"
        >撤销审批</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnSapShow"
        @click="mainBtnClickSap"
        >提交SAP</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnPdfView"
        @click="mainBtnClickPDFView"
        >预览</van-button
      >
    </div>

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <div class="scroll-wrap-main-table">
          <!-- <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main"> -->
          <van-form label-width="110" ref="vanFormRef">
            <van-group-cell @click="handVanGroupCell">
              <van-field
                v-model="computedOrgCo"
                name="平台公司"
                label="平台公司"
                readonly
                required
                placeholder="平台公司"
                @click="ClickField"
              />
              <RcmSelect
                :select-label="'statusName'"
                :select-value="'statusCode'"
                :valueKey="'statusName'"
                :options="adtStatusList"
                :label="'审批状态'"
                :placeholder="'审批状态'"
                :readonly="true"
                :btnStatus="editStatus"
                :field="formData.adtStatus"
                @click="ClickField"
              />
              <van-field
                v-model="formData.wareHsW"
                readonly
                label="(字)"
                placeholder="(字)"
                @click="ClickField"
              />
              <van-field
                v-model="formData.wareHsNo"
                readonly
                label="号"
                placeholder="号"
                @click="ClickField"
              />
              <van-field
                v-model="formData.wareHsClss"
                readonly
                label="单据类型"
                placeholder="单据类型"
                @click="ClickField"
              />
              <van-field
                v-model="formData.wareDate"
                readonly
                label="制单日期"
                placeholder="系统生成，无需录入"
                @click="ClickField"
              />
              <van-field
                v-model="formData.empName"
                readonly
                label="制单人"
                placeholder="制单人"
                @click="ClickField"
              />
              <van-field
                v-model="formData.baseNum"
                readonly
                placeholder="点击左侧选择"
                @click="ClickField"
              >
                <template #label>
                  <van-button
                    type="primary"
                    @click="baseNumClick"
                    :disabled="baseNumDis"
                    size="small"
                  >
                    调整出库单
                  </van-button>
                </template>
              </van-field>
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="objectNoList"
                :label="'贸易方式'"
                :placeholder="'贸易方式'"
                :readonly="true"
                :isRightArrow="true"
                :field="formData.objectNo"
                @click="ClickField"
              />
              <van-field
                v-model="formData.expNoticNo"
                readonly
                required
                label="合同号"
                placeholder="系统生成，无需录入"
                @click="ClickField"
              />
              <van-field
                v-model="formData.custName"
                readonly
                label="客户"
                placeholder="客户"
                @click="ClickField"
              />
              <van-field
                v-model="formData.wareLoc"
                readonly
                label="仓库"
                placeholder="仓库"
                @click="ClickField"
              />
              <van-field
                v-model="formData.outDate"
                readonly
                label="出库日期"
                placeholder="出库日期"
                @click="dateTimeFieldClick('outDate')"
              />
              <van-field
                v-model="formData.recQnttyPiece"
                readonly
                label="数量"
                placeholder="数量"
                @click="ClickField"
              />
              <van-field
                v-model="formData.quantityD"
                readonly
                label="调整差异(数量)"
                placeholder="调整差异(数量)"
                @click="ClickField"
              />
              <RcmSelect
                :select-label="'currencyName'"
                :select-value="'currencyCode'"
                :valueKey="'currencyName'"
                :options="currencyCodeList"
                :label="'币别'"
                :placeholder="'币别'"
                :readonly="true"
                :isRightArrow="true"
                :field="formData.currencyCode"
              />
              <van-field
                v-model="formData.exchangRt"
                :readonly="true"
                label="兑CNY汇率"
                placeholder="兑CNY汇率"
              />
              <van-field
                v-model="formData.rpAmount"
                readonly
                label="应收金额"
                placeholder="应收金额"
                @click="ClickField"
              />
              <van-field
                v-model="formData.amountD"
                readonly
                label="调整差异(金额)"
                placeholder="调整差异(金额)"
                @click="ClickField"
              />
              <van-field
                v-model="formData.orgName"
                readonly
                label="部门"
                placeholder="部门"
                @click="ClickField"
              />
              <van-field
                v-model="formData.employeeName"
                readonly
                label="业务员"
                placeholder="业务员"
                @click="ClickField"
              />
              <van-field
                v-model="formData.tzFlag"
                :readonly="orderReadOnly"
                label="状态"
                placeholder="状态"
              />
              <van-field
                v-model="formData.recieveDate"
                readonly
                label="验收日期"
                placeholder="验收日期"
                @click="ClickField"
              />
              <van-field
                v-model="formData.rpDate"
                label="应收日期"
                placeholder="应收日期"
                is-link
                readonly
                @click="dateTimeFieldClick('rpDate')"
              />
              <van-field
                v-model="formData.sapStatus"
                readonly
                label="SAP状态"
                placeholder="SAP状态"
                @click="ClickField"
              />
              <van-field
                v-model="formData.sapVouNo"
                readonly
                label="SAP交货单号"
                placeholder="SAP交货单号"
                @click="ClickField"
              />
              <van-field
                v-model="formData.sapCreateDate"
                readonly
                label="SAP创建日期"
                placeholder="SAP创建日期"
                @click="ClickField"
              />
              <van-field
                v-model="formData.remark"
                :readonly="orderReadOnly"
                label="备注"
                placeholder="备注"
              />
              <!-- <van-field
                v-model="formData.refNo"
                label="客户合同号"
                placeholder="客户合同号"
                :readonly="orderReadOnly"
              />
              <van-field
                v-model="formData.custNo"
                readonly
                label="客户号"
                placeholder="客户号"
                @click="ClickField"
              />
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="flag5List"
                :label="'来源'"
                :placeholder="'来源'"
                readonly
                :isRightArrow="true"
                :field="formData.flag5"
                @click="ClickField"
              /> -->
            </van-group-cell>
          </van-form>
          <!-- </Scroll> -->
        </div>
      </van-tab>
      <van-tab title="出库商品">
        <div class="detail_item">
          <!-- <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelPdtAction()"
              style="magin-right: 10px"
              >撤销所有商品操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddPdtItem"
              style="magin-right: 10px"
              >新增商品</van-button
            >
          </div> -->
          <van-collapse
            v-model="pdtItemsActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <Scroll
              class="wrappers-goods-detail wrappers"
              wrapper="goodsDetailRef"
              v-if="formData.items.length"
              ref="goodsDetail"
            >
              <div>
                <van-collapse-item
                  v-for="(item, index) in formData.items"
                  :key="index"
                  :name="index"
                  :title="item.pdtName"
                >
                  <van-form label-width="110">
                    <van-field
                      v-model="item.pdtVndNo"
                      readonly
                      name="产品号"
                      label="产品号"
                      placeholder="产品号"
                    />
                    <van-field
                      v-model="item.specification"
                      readonly
                      label="规格型号"
                      placeholder="规格型号"
                    />
                    <van-field
                      v-model="item.uom"
                      readonly
                      label="单位"
                      placeholder="单位"
                    />
                    <van-field
                      v-model="item.amountPs"
                      type="number"
                      readonly
                      label="装箱率"
                      placeholder="装箱率"
                    />
                    <van-field
                      v-model="item.outFQnttyItem1"
                      readonly
                      label="出库件数"
                      placeholder="出库件数"
                    />
                    <van-field
                      v-model="item.outFQnttyPiece1"
                      :readonly="item.contrl === 'HD'"
                      label="出库数量"
                      placeholder="出库数量"
                      @change="(e) => outFQnttyPiece1Change(e, item, index)"
                    />
                    <van-field
                      v-model="item.hsdj"
                      readonly
                      label="销售单价"
                      placeholder="销售单价"
                    />
                    <van-field
                      v-model="item.transferAmountOut"
                      readonly
                      label="销售金额"
                      placeholder="销售金额"
                    />
                    <van-field
                      v-model="item.pdtNameE"
                      readonly
                      label="英文品名"
                      placeholder="英文品名"
                    />
                    <!-- <van-field
                      v-model="item.orderNo"
                      readonly
                      label="采购定单"
                      placeholder="采购定单"
                    /> -->
                    <!-- <van-field
                      v-model="item.orderMid"
                      readonly
                      label="识别码"
                      placeholder="识别码"
                    /> -->
                    <!-- <van-field
                      v-model="item.invoiceNo"
                      readonly
                      label="进口发票"
                      placeholder="进口发票"
                    /> -->
                    <van-field
                      v-model="item.unitCost"
                      readonly
                      label="含税成本价"
                      placeholder="含税成本价"
                    />
                    <!-- <van-field
                      v-model="item.wareHsNo2"
                      readonly
                      label="入库单"
                      placeholder="入库单"
                    /> -->
                    <van-field
                      v-model="item.lotNo"
                      readonly
                      label="批号"
                      placeholder="批号"
                    />
                    <van-field
                      v-model="item.unitCostNT"
                      readonly
                      label="无税成本价"
                      placeholder="无税成本价"
                    />
                    <van-field
                      v-model="item.amntRMB1"
                      readonly
                      label="含税金额"
                      placeholder="含税金额"
                    />
                    <van-field
                      v-model="item.amntRMBNT1"
                      readonly
                      label="无税金额"
                      placeholder="无税金额"
                    />
                    <van-field
                      v-model="item.atr"
                      readonly
                      label="增值税率(%)"
                      placeholder="增值税率(%)"
                    />
                    <!-- <van-field
                      v-model="item.originalCountry"
                      readonly
                      label="原产地"
                      placeholder="原产地"
                    />
                    <van-field
                      v-model="item.pManuFactory"
                      readonly
                      label="生产厂家"
                      placeholder="生产厂家"
                    /> -->
                    <van-field
                      v-model="item.sapUnit"
                      readonly
                      label="SAP计量单位"
                      placeholder="SAP计量单位"
                    />
                    <van-field
                      v-model="item.sapPrice"
                      readonly
                      label="sap销售单价"
                      placeholder="sap销售单价"
                    />
                    <van-field
                      v-model="item.sapUnitRate"
                      readonly
                      label="SAP转换比"
                      placeholder="SAP转换比"
                    />
                    <van-field
                      v-model="item.sapQty"
                      readonly
                      label="sap应入数量"
                      placeholder="sap应入数量"
                    />
                    <van-field
                      v-model="item.sapQty1"
                      readonly
                      label="sap实入数量"
                      placeholder="sap实入数量"
                    />
                    <!-- <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deletePdtItem(index)">
                        删除
                      </van-button>
                    </div> -->
                  </van-form>
                </van-collapse-item>
                <div class="empty"></div>
              </div>
            </Scroll>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="附件">
        <Scroll class="wrappers-file wrappers" wrapper="fileRef" ref="file">
          <div>
            <div class="update-load">
              <div class="update-btn">
                <van-uploader :after-read="uploadFile" class="class_uploader">
                  <van-button
                    icon="plus"
                    type="primary"
                    color="#1fa2e8"
                    size="small"
                    class="width:100%"
                    >上传文件</van-button
                  >
                </van-uploader>
              </div>
              <div class="update-tip">
                <span> 目前只支持图片、PDF文件预览。 </span>
                <span> 如需预览其他格式文件请登录PC端查看 </span>
              </div>
            </div>
            <div
              v-for="(item, index) in formData.fileItems"
              :key="index"
              class="fileFromClass"
            >
              <van-form :v-model="item">
                <van-row>
                  <van-col span="14"
                    ><van-field
                      label="文件名称"
                      label-width="68"
                      readonly
                      v-model="item.fileName"
                  /></van-col>
                  <van-col span="10"
                    ><van-field
                      label="文件类型"
                      label-width="68"
                      readonly
                      v-model="item.type"
                  /></van-col>
                </van-row>
                <van-row>
                  <van-col span="24"
                    ><van-field
                      label="说明"
                      v-model="item.fileDesc"
                      :readonly="orderReadOnly"
                      label-width="34"
                    /> </van-col
                ></van-row>
                <van-row>
                  <div class="list_bt">
                    <van-button
                      type="success"
                      round
                      color="#1fa2e8"
                      text="预览附件"
                      @click="downFileItem(index)"
                    />
                    <van-button
                      type="error"
                      round
                      color="#e85452"
                      text="删除"
                      @click="deleteFileItem(index)"
                    />
                  </div>
                </van-row>
              </van-form>
            </div>
          </div>
        </Scroll>
      </van-tab>
      <van-tab title="审批进度">
        <div class="detail_item">
          <Scroll
            class="wrappers-status-detail wrappers"
            wrapper="oaStatusRef"
            v-if="oaStatusArr.length"
            ref="oaStatus"
          >
            <div>
              <van-steps direction="vertical" :active="0">
                <van-step v-for="item in oaStatusArr" :key="item.pkId">
                  <p>{{ item.makeTime }}</p>
                  <p>
                    {{ item.sysNote }}&nbsp;&nbsp;{{ item.userName }}&nbsp;{{
                      item.auditStatus
                    }}
                  </p>
                  <p>{{ item.auditRemark }}</p>
                </van-step>
              </van-steps>
            </div>
          </Scroll>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 选择出库单 -->
    <van-popup
      v-model:show="showCKD"
      position="bottom"
      :style="{ height: '83%', width: '100%' }"
    >
      <RcmDialog
        v-bind="CKD"
        v-on="{
          handleMutiSelectGoods: selectCKD,
          handleValueConversion: handleValueConversion,
        }"
      />
    </van-popup>
    <!-- 侧滑窗口 选择 业务员-->
    <!-- <van-popup
      v-model:show="showEmploeeySelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
      >
      <ErpEmployeeSelect
        :showEmployee="showEmploeeySelect"
        v-on="{ selectEmployeeItem: selectEmployeeItem }"
      />
    </van-popup> -->
    <!-- 侧滑窗口，选择明细的商品 -->
    <!-- <van-popup
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
    </van-popup> -->

    <!-- 下滑弹窗 主要是一些配置项 -->
    <!-- <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      @select="selectItemAction"
      :description="actionDesc"
      cancel-text="取消"
    /> -->
    <van-calendar
      :min-date="new Date(1900, 0, 1)"
      v-model:show="selectTimeShow"
      @confirm="selectDateTime"
    />

    <!-- <van-dialog
      v-model:show="isNoInputShow"
      title="生成的销售合同号(可修改)"
      @confirm="confirmIsNo()"
    >
      <van-field label="销售合同号:" v-model="tempIsNo"></van-field>
    </van-dialog> -->

    <van-dialog
      v-model:show="undoApplyShow"
      title="撤销原因"
      @confirm="doCancelApply"
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
import RcmDialog from "./components/RcmDialog";
import { CKD } from "../config/dialogParam";
import { dateFormat, moneyFormat, rMoneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import {
  getWareHouseInfo,
  addWareHouse,
  updateWareHouse,
  delWareHouse,
  apply,
  ckTz,
  undoApply,
} from "@/api/cargoManagement/cktzd";
import { listOaStatus } from "@/api/erp.oa.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload, down } from "@/api/erp.file.js";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";
import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
} from "@/utils/erp.base.data.js";
import fieldFormData from "./cloumn";
import { getCookie } from "@/utils/user.setting";

export default {
  name: "InlandSaleDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    RcmDialog,
    //ErpFile,
  },
  watch: {
    tabActive: {
      handler(oldVal, newVal) {
        if (newVal === 0 || oldVal === 0) {
          this.$nextTick((_) => {
            // this.$refs.main.refresh();
          });
        }
        // else if (newVal === 3) {
        //   this.$refs.file.refresh();
        // }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      flag5List: [
        // 数据来源
        { value: 0, label: "出库单" },
        { value: 1, label: "结算单" },
        { value: 2, label: "调拨单" },
      ],
      // 备份日期格式字段
      copyField: {
        prepayDateTime: "",
        signDate: "",
        msd: "",
        outDate: "",
      },
      CKD: CKD,
      showCKD: false,
      objectNo: "PM03",
      tileName: "销售合同详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
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
      btnPdfView: false,
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
      adtStatusList: JSON.parse(this.$route.query.adtStatusList),
      currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      objectNoList: [
        { value: "N", label: "内贸" },
        { value: "G", label: "进口" },
        { value: "T", label: "转口" },
        { value: "E", label: "出口" },
      ],
      objectNo3List: [
        { refValueCode: "PM03", refValue: "销售合同" },
        { refValueCode: "SD01", refValue: "出口发票" },
        { refValueCode: "SM07", refValue: "转口销售" },
      ],
      // currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      fileItems: [],
      wareDate: "",
    };
  },
  setup() {
    provide("title", "出库调整单详情");
  },
  created() {
    this.docentry = this.$route.query.docEntry;
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
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    } else {
      this.addOrder();
    }
    this.setBtnStatus();
  },
  mounted() {
    this.setBtnStatus();
  },
  methods: {
    outFQnttyPiece1Change(
      e,
      {
        amountPs,
        outFQnttyItem1,
        wareHsMid1,
        unitCost,
        hsdj,
        amntRmb,
        amntRmbNt,
        transferAmountOut,
        sapUnitRate,
        unitCostNt,
      },
      index
    ) {
      let outFQnttyPiece1 = e.target.value;
      if (amountPs) {
        this.formData.items[index].outFQnttyItem1 = outFQnttyPiece1 / amountPs;
      }
      if (sapUnitRate) {
        this.formData.items[index].sapQty = outFQnttyPiece1 / sapUnitRate;
        this.formData.items[index].sapQty1 = this.formData.items[index].sapQty;
      }
      // this.formData.items[index].sapQty1 = this.formData.items[index].sapQty;
      let oldOutFQnttyPiece1 = 0;
      let oldOutFQnttyItem1 = 0;
      // 取红单的数量
      const hdItem = this.formData.items.find(
        (item) => item.wareHsMid1 === wareHsMid1 && item.contrl === "HD"
      );
      if (hdItem) {
        oldOutFQnttyPiece1 = hdItem.outFQnttyPiece1;
        oldOutFQnttyItem1 = hdItem.outFQnttyItem1;
      }
      // 调整数量 = 调整前数量 - 调整后数量
      let tzSl = 0 - Number(outFQnttyPiece1) - Number(oldOutFQnttyPiece1);
      let tzJs = 0 - Number(outFQnttyItem1) - Number(oldOutFQnttyItem1);
      // 数量是否变化的标志
      if (tzSl != 0) {
        this.formData.items[index].flag2 = 1;
      } else {
        this.formData.items[index].flag2 = 0;
      }
      // 计算当前行的金额
      let unitCost1 = 0;
      let unitCostNt1 = 0;
      let price1 = 0;
      if (unitCost) {
        unitCost1 = Number(rMoneyFormat(unitCost));
      }
      if (unitCostNt) {
        unitCostNt1 = Number(rMoneyFormat(unitCostNt));
      }
      if (hsdj) {
        price1 = Number(rMoneyFormat(hsdj));
      }
      let amount = Number(outFQnttyPiece1 * unitCost1).toFixed(2);
      let amountNt = Number(outFQnttyPiece1 * unitCostNt1).toFixed(2);
      let rpAmount = Number(outFQnttyPiece1 * price1).toFixed(2);
      this.formData.items[index].amntRmb = moneyFormat(amount);
      this.formData.items[index].amntRmbNt = moneyFormat(amountNt);
      this.formData.items[index].transferAmountOut = moneyFormat(rpAmount);
      this.computeTotal();
    },
    // 计算主表amntRmb
    computeTotal() {
      let outFQnttyIiece1 = 0;
      let hdOutFQnttyIiece1 = 0;
      let amount = 0;
      let hdAmount = 0;
      let flag2 = 0;

      this.formData.items.forEach((item) => {
        if (item.contrl === "HD") {
          hdOutFQnttyIiece1 =
            Number(hdOutFQnttyIiece1) + Number(item.outFQnttyPiece1);
          hdAmount =
            Number(hdAmount) + Number(rMoneyFormat(item.transferAmountOut));
        }
        if (item.contrl === "LD") {
          outFQnttyIiece1 =
            Number(outFQnttyIiece1) + Number(item.outFQnttyPiece1);
          amount =
            Number(amount) + Number(rMoneyFormat(item.transferAmountOut));
          if (item.flag2 == 1) {
            flag2 = 1;
          }
        }
      });
      let quantityD = (
        Number(outFQnttyIiece1) + Number(hdOutFQnttyIiece1)
      ).toFixed(2);
      let amountD = (Number(amount) + Number(hdAmount)).toFixed(2);
      this.formData.flag2 = flag2;
      this.formData.recQnttyPiece = Number(outFQnttyIiece1).toFixed(2);
      this.formData.quantityD = Number(quantityD).toFixed(2);
      this.formData.amountD = moneyFormat(amountD);
      this.formData.rpAmount = moneyFormat(amount);
    },
    // 点击整个表单任意位置时，不能录入时给出提示
    handVanGroupCell() {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "只读状态不允许编辑!",
        });
        return;
      }
    },
    /***
     * 此函数主要解决子组件内部可能有些数据不符合界面展示要求,
     * 需要在外部来进行处理再传回子组件来渲染，
     * 将子组件的状态取过来进行格式转化后，执行回调传过去
     */
    handleValueConversion(fieldArr, data, fun) {
      let filterData = [];
      data.forEach((item) => {
        fieldArr.forEach(({ enName }) => {
          this.objectNo3List.forEach(({ refValue, refValueCode }) => {
            if (item[enName] === refValueCode) {
              item[enName] = refValue;
              filterData.push(item);
            }
          });
        });
      });
      fun(filterData);
    },
    // 选择出库单
    selectCKD(row) {
      this.handleCkTz(row.wareHsId);
      this.showCKD = false;
    },
    formatHandler() {
      //如果出库商品清单存在数据，进行格式化处理
      if (this.formData.items && this.formData.items.length) {
        this.formData.items.forEach((item) => {
          //应出件数
          // item.outQnttyItem1 = Number(item.outQnttyItem1).toFixed(4);
          // 装箱率处理
          item.amountPs = Number(item.amountPs).toFixed(4);
          // 应出数量处理
          item.inQnttyPiece = Number(item.inQnttyPiece).toFixed(4);
          // 销售单价
          item.hsdj = Number(item.hsdj).toFixed(4);
          // 销售金额
          item.transferAmountOut = moneyFormat(
            Number(item.transferAmountOut).toFixed(2)
          );
          // 增值税率(%)
          item.atr = Number(item.atr).toFixed(3);
          // SAP转换比
          item.sapUnitRate = Number(item.sapUnitRate).toFixed(2);
          // SAP应出数量
          item.sapQty = Number(item.sapQty).toFixed(4);
          // SAP实出数量
          item.sapQty1 = Number(item.sapQty1).toFixed(4);
        });
      }
    },
    handleCkTz(wareHsId) {
      if (wareHsId) {
        ckTz({ wareHsId }).then((res) => {
          if (res.data) {
            let fieldArr = ["outDate"];
            res.data.exchangRt = Number(res.data.exchangRt).toFixed(4);
            this.formatFieldDate("VIEW", fieldArr, res.data);
            this.copyField["outDate"] = res.data.outDate;
            res.data.recQnttyPiece = Number(res.data.recQnttyPiece).toFixed(2);
            for (let key in this.formData) {
              this.formData[key] = res.data[key];
            }
            // 主从表数据初始化格式处理
            this.formatHandler();
            res.data.items.forEach((item, index) => {
              this.formData.items[index].inQnttyPiece = moneyFormat(
                Number(item.inQnttyPiece)
              );
              this.formData.items[index].hsdj = moneyFormat(Number(item.hsdj));
              this.formData.items[index].sapPrice = moneyFormat(
                Number(item.sapPrice)
              );
              this.formData.items[index].sapQty = moneyFormat(
                Number(item.sapQty)
              );
              this.formData.items[index].sapQty1 = moneyFormat(
                Number(item.sapQty1)
              );
            });
          }
        });
      }
    },
    // 调整出库单点击
    baseNumClick(e) {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "只读状态不允许编辑!",
        });
        return;
      }
      // 取消冒泡行为
      e.cancelBubble = true;
      this.showCKD = true;
    },
    ClickField() {
      Notify({
        type: "warning",
        message: "只读状态不允许编辑!",
      });
      return;
    },
    changeRcmSelect({ value }, field) {
      this.formData[field] = value;
    },
    getStatus(value, field) {
      if (field === "adtStatus") {
        this[`${field}List`].forEach((item) => {
          if (item.statusCode === value) {
            value = item.statusName;
          }
        });
      } else {
        this[`${field}List`].forEach((item) => {
          if (item.value == value) {
            value = item.label;
          }
        });
      }
      return value;
    },
    collapseChange(name) {
      if (name === 3) {
        this.$nextTick((_) => {
          // this.$refs.contact.refresh();
        });
      }
    },
    onClickTab(title) {
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
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    doChangeEmployee(item) {
      this.formData.items = [];
      this.formData.vendorName = "";
      this.formData.vendorNo = "";
      this.formData.employeeName = item.userName;
      this.formData.employeeNo = item.userNo;
      this.formData.orgNo = item.orgNo;
      this.formData.orgName = item.orgName;
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    selectEmployeeItem(item) {
      let userNo = item.userNo;
      if (!this.formData.employeeNo || userNo === this.formData.employeeNo) {
        this.formData.employeeName = item.userName;
        this.formData.employeeNo = item.userNo;
        this.formData.orgNo = item.orgNo;
        this.formData.orgName = item.orgName;
      } else if (this.formData.employeeNo) {
        Dialog.confirm({
          title: "修改业务员",
          message: "该操作将会重置你所选择的往来单位以及商品明细,是否继续?",
        })
          .then((res) => {
            this.doChangeEmployee(item);
          })
          .catch((res) => {});
      }
      this.showEmploeeySelect = false;
    },
    /// form表单中触发  选择业务员的按钮
    mainSelecteEmployee() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.showEmploeeySelect = true;
    },
    /// 弹窗中用户选择了某一个往来单位
    selectVendorItem(item) {
      this.showVendorSelect = false;
      this.formData.vendorName = item.coNameC;
      this.formData.vendorNo = item.vendorNo1;
      this.formData.orgNo = item.orgNo;
      this.formData.orgName = item.unitName4;
      ///往来单位的 数据 需要处理进 联系信息中

      for (let i = 0; i < this.formData.contactItems.length; i++) {
        if (this.formData.contactItems[i].controlA === "V") {
          this.formData.contactItems[i].addr = item.addr2;
          this.formData.contactItems[i].city = item.city;
          this.formData.contactItems[i].zipCode = item.zipCode;
          this.formData.contactItems[i].title = item.title;
          this.formData.contactItems[i].contact = item.contact;
          this.formData.contactItems[i].fax = item.fax;
          this.formData.contactItems[i].email = item.email;
          this.formData.contactItems[i].addr = item.addr2;
        }
      }
    },
    // form表单中触发  选择往来单位的按钮
    mainSelectVendor() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      //
      this.employeeNoVendor = this.formData.employeeNo;
      if (
        !this.employeeNoVendor ||
        this.employeeNoVendor === "" ||
        this.employeeNoVendor === undefined
      ) {
        Notify({ type: "danger", message: "请先选择业务员" });
        return;
      }

      // 选择往来单位
      this.showVendorSelect = true;
    },
    /// 选择了某一个时间
    selectDateTime(val) {
      // if (this.activeFormFiled === "msd") {
      //   this.formData.msd = dateFormat(val);
      // } else if (this.activeFormFiled === "prepayDateTime") {
      //   this.formData.prepayDateTime = dateFormat(val);
      // } else if (this.activeFormFiled === "signDate") {
      //   this.formData.signDate = dateFormat(val);
      // }
      this.formData[this.activeFormFiled] = dateFormat(val);
      this.copyField[this.activeFormFiled] = dateFormat(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      );
      this.activeFormFiled = "";
      this.selectTimeShow = false;
    },
    //// 时间字段 点击了
    dateTimeFieldClick(item) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activeFormFiled = item;
      this.selectTimeShow = true;
    },
    ///  选择 下拉的逻辑
    // selectItemAction(item) {
    //   if (this.activeFormFiled === "tradType") {
    //     this.formData.tradType = item.code;
    //   } else if (this.activeFormFiled === "saleType") {
    //     this.formData.saleType = item.code;
    //   } else if (this.activeFormFiled === "orderMode") {
    //     this.formData.orderMode = item.name;
    //   } else if (this.activeFormFiled === "payMode") {
    //     this.formData.payMode = item.name;
    //   } else if (this.activeFormFiled === "outType") {
    //     this.formData.outType = item.name;
    //   } else if (this.activeFormFiled === "currencyCode") {
    //     this.formData.currencyCode = item.code;
    //   }
    //   this.actionShow = false;
    //   this.activeFormFiled = "";
    // },
    /////主表选择了一些枚举类型的数据，下方弹窗
    // mainFieldClick(fieldName) {
    //   if (this.orderReadOnly) {
    //     Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
    //     return;
    //   }
    //   this.activeFormFiled = fieldName;
    //   // 根据 当前字段 重置 reset
    //   // this.resetActionItems(fieldName);
    //   this.actionShow = true;
    // },
    /// 主表的枚举项处理
    // resetActionItems(filedName) {
    //   this.actionItems = [];
    //   if (filedName === null || filedName === "") {
    //     return;
    //   }
    //   if (filedName === "tradType") {
    //     this.actionDesc = "请选择贸易方式";
    //     for (let index = 0; index < this.tredeTypeList.length; index++) {
    //       let item = { name: "", code: "" };
    //       item.name = this.tredeTypeList[index].tradeType;
    //       item.code = this.tredeTypeList[index].tradeTypeNo;
    //       this.actionItems[index] = item;
    //     }
    //   } else if (filedName === "orderMode") {
    //     this.actionDesc = "请选择合同类型";
    //     this.actionItems.push(...this.orderModeList);
    //   } else if (filedName === "saleType") {
    //     this.actionDesc = "请选择销售类型";
    //     for (let index = 0; index < this.saleTypeList.length; index++) {
    //       let item = { name: "", code: "" };
    //       item.name = this.saleTypeList[index].refValue;
    //       item.code = this.saleTypeList[index].refId;
    //       this.actionItems[index] = item;
    //     }
    //   } else if (filedName === "payMode") {
    //     this.actionDesc = "请选择收款模式";
    //     for (let index = 0; index < this.recTypeList.length; index++) {
    //       let item = { name: "", code: "" };
    //       item.name = this.recTypeList[index].refValue;
    //       /// item.code = this.saleTypeList[index].refId;
    //       this.actionItems[index] = item;
    //     }
    //   } else if (filedName === "outType") {
    //     this.actionDesc = "请选择收款方式";
    //     for (let index = 0; index < this.recMethodList.length; index++) {
    //       let item = { name: "", code: "" };
    //       item.name = this.recMethodList[index].refValue;
    //       /// item.code = this.saleTypeList[index].refId;
    //       this.actionItems[index] = item;
    //     }
    //   } else if (filedName === "currencyCode") {
    //     this.actionDesc = "请选择币种";
    //     for (let index = 0; index < this.currencyCodeList.length; index++) {
    //       let item = { name: "", code: "" };
    //       item.name =
    //         this.currencyCodeList[index].currencyName +
    //         "-" +
    //         this.currencyCodeList[index].currencyCode;
    //       item.code = this.currencyCodeList[index].currencyCode;
    //       /// item.code = this.saleTypeList[index].refId;
    //       this.actionItems[index] = item;
    //     }
    //   }
    // },

    //////   当前详情是否可以修改
    getOrderCanEdit() {
      let docEntry = this.formData.wareHsId;
      if (!docEntry) {
        return 0;
      }

      let auditstatu = this.formData.auditStatu;
      if (!auditstatu && (auditstatu === "Y" || auditstatu === "S")) {
        return 0;
      }

      return 1;
    },

    /// 设置 按钮的状态
    setBtnStatus() {
      // 当前 页面的编辑状态 editStatus  考虑  add  edit  view
      if (this.editStatus === "add") {
        this.btnSaveShow = true;
        this.btnCancelShow = true;

        this.btnAddShow = false;
        this.btnEditShow = false;
        this.btnAuditShow = false;
        this.btnSapShow = false;
        this.btnCancelAuditShow = false;
        this.btnDeleteShow = false;

        this.orderReadOnly = false;
      } else if (this.editStatus === "view") {
        this.btnPdfView = true;
        this.orderReadOnly = true;
        this.btnAddShow = true;
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        /////
        this.btnSapShow = false;
        let auditStatu = this.formData.adtStatus;
        if (auditStatu === "D") {
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
        } else if (auditStatu === "S") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = true;
        } else if (auditStatu === "Y") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = true;
          this.btnSapShow = true;
        } else if (auditStatu === "SU") {
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        } else if (auditStatu === "UN" || auditStatu === "N") {
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        }
      } else if (this.editStatus === "edit") {
        /// 修改状态下，只有删除和保存
        this.btnSaveShow = true;
        this.btnCancelShow = true;
        this.orderReadOnly = false;
        this.btnAddShow = false;
        this.btnDeleteShow = false;
        this.btnAuditShow = false;
        this.btnCancelAuditShow = false;
        this.btnSapShow = false;
      }
    },

    ////主表新增一个新的单据
    addOrder() {
      this.tabActive = 0;
      // 这里不能直接给空对象  会使内部的所有属性都丢失；
      // this.formData = {};
      for (const key in this.formData) {
        this.formData[key] = null;
      }
      this.formData.items = [];
      this.formData.filterFileItems = [];
      this.formData.filterItems = [];
      this.formData.filterM1Items = [];
      this.formData.filterTzItems = [];
      this.formData.m1Items = [];
      this.formData.tzItems = [];
      this.formData.fileItems = [];
      // 避免保存时取不到原始值
      this.wareDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
      this.formData.wareDate = dateFormat(new Date(), "yyyy-MM-dd");
      this.formData.getDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
      this.formData.enterMan = 0;
      this.formData.empNo = getCookie("loginInfo").userNo;
      this.formData.empName = getCookie("loginInfo").realName;

      // 平台公司名称获取
      this.formData.orgCoNo = getCookie("loginInfo").orgCoNo;
      this.formData.orgNo = getCookie("loginInfo").orgNo;
      this.formData.adtStatus = "D";
      // this.formData.auditStatusName = "未申请审批";
      this.formData.currencyCode = "CNY";
      this.formData.exchangRt = Number(1).toFixed(4);
      this.formData.wareHsType = 1;
      this.formData.wareHsW = "出";
      this.formData.accontrol = "0";
      this.formData.wareHsCode = "10";
      this.formData.wareHsClss = "销售出库调整";
      this.formData.accAdtId = 0;
      this.formData.soType = 0;
      this.formData.cFlag = 0;
      this.formData.flag5 = 0;
      this.editStatus = "add";
      this.setBtnStatus();
    },
    // 获取OA 审批数据
    loadOaStatus() {
      const { wareHsId, expNoticNo } = this.formData;
      listOaStatus("PM48", wareHsId, expNoticNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();
        })
        .catch((res) => {});
    },
    formatFieldDate(type, fieldArr, data) {
      if (type === "VIEW") {
        fieldArr.forEach((item) => {
          data[item] = dateFormat(data[item], "yyyy-MM-dd");
          // 改赋值运算是用来处理保存时可以真实地记录下完整的时间戳
          // this.copyField[item] = dateFormat(data[item], "yyyy-MM-dd HH:mm:ss");
        });
      } else {
        fieldArr.forEach((item) => {
          data[item] = this.copyField[item];
        });
      }
    },
    ///重新加载所有的数据
    loadDetail() {
      getWareHouseInfo({ wareHsId: this.docentry })
        .then((res) => {
          this.copyField.outDate = res.data.outDate;
          res.data.exchangRt = Number(res.data.exchangRt).toFixed(4);
          res.data.outFQnttyIiece1 = Number(res.data.outFQnttyIiece1).toFixed(
            2
          );
          res.data.recQnttyPiece = Number(res.data.recQnttyPiece).toFixed(2);
          res.data.quantityD = Number(res.data.quantityD).toFixed(2);
          res.data.rpAmount = moneyFormat(res.data.rpAmount);
          res.data.amountD = moneyFormat(res.data.amountD);
          res.data.items.forEach((item, index) => {
            item.outFQnttyPiece1 = Number(item.outFQnttyPiece1).toFixed(2);
          });
          let fieldArr = ["outDate"];
          this.formatFieldDate("VIEW", fieldArr, res.data);
          this.wareDate = res.data.wareDate;
          res.data.wareDate = dateFormat(res.data.wareDate, "yyyy-MM-dd");

          this.formData = res.data;
          this.fileItems = this.formData.fileItems;
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          const itemsFieldArr = [
            "transferAmountOut",
            "inQnttyPiece",
            "hsdj",
            "sapPrice",
            "sapQty",
            "sapQty1",
          ];
          this.formatField("Money", itemsFieldArr);
          this.loadOaStatus();
          this.setBtnStatus();
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },

    //// 选择商品名称
    itemSelectPdt(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activePdtItemIndex = index;

      this.orgNo = this.formData.orgNo;
      if (!this.orgNo) {
        return;
      }
      this.showItemPdtSelect = true;
    },
    /// 弹窗中用户选择了某一个商品
    selectItemProduct(item) {
      if (this.activePdtItemIndex === -1) {
        let newRow = {
          pdtNo: item.pdtNo,
          pdtNameC: item.pdtNameC,
          sapUnit: item.sapUnit,
          sapUnitRate: item.sapUnitRate,
          spec: item.specificationE,
          uom: item.uom,
          hl: item.hl,
          atr: item.atr,

          // quantity: 0.0,
          // unitPrice: 0.0,
          // amount: 0.0,
        };
        this.formData.items.push(newRow);
        this.pdtItemsActiveIndex = this.formData.items.length - 1;
        //        console.info("this.formData.items.length", this.formData.items.length);

        const height = window.innerHeight;
        const searchBarHeight = this.formData.items.length * 35;
        //this.$refs.wrappersGoodsDetail.style.height = `calc(${height}px - ${searchBarHeight}px )`;
        //this.showItemPdtSelect = false;
      } else {
        this.formData.items[this.activePdtItemIndex].pdtNo = item.pdtNo;
        this.formData.items[this.activePdtItemIndex].pdtNameC = item.pdtNameC;
        this.formData.items[this.activePdtItemIndex].uom = item.uom;
        this.formData.items[this.activePdtItemIndex].sapUnit = item.sapUnit;
        this.formData.items[this.activePdtItemIndex].sapUnitRate =
          item.sapUnitRate;
        this.formData.items[this.activePdtItemIndex].spec = item.specificationE;
        this.formData.items[this.activePdtItemIndex].hl = item.hl;
        this.formData.items[this.activePdtItemIndex].atr = item.atr;
        // this.formData.items[this.activePdtItemIndex].quantity = 0.0;
        // this.formData.items[this.activePdtItemIndex].unitPrice = 0.0;
        // this.formData.items[this.activePdtItemIndex].amount = 0.0;
      }

      this.showItemPdtSelect = false;
    },
    ///   新增商品信息
    handleAddPdtItem() {
      // this.$nextTick(_ => {
      // this.$refs.goods.refresh();
      // })
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      ///       先要选择商品
      this.orgNo = this.formData.orgNo;
      if (!this.orgNo) {
        Notify({ type: "danger", message: "请先选择部门及业务员信息" });
        return;
      }
      // this.$refs.productRef.loadData();\

      this.showItemPdtSelect = true;
      this.activePdtItemIndex = -1;
    },
    /// 撤销所有商品的操作
    handleCancelPdtAction() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.oldFormData) {
        // 需要判断
        Dialog.confirm({
          title: "取消所有的商品操作",
          message: "当前操作将不会保存您对商品的修改!",
        })
          .then(() => {
            this.formData.items = JSON.parse(
              JSON.stringify(this.oldFormData.items)
            );
            this.pdtItemsActiveIndex = 0;
          })
          .catch(() => {});
      }
    },

    ////  成本分析数据的初始化
    initAmountFeeList() {
      this.formData.objectItems = [];
      this.formData.objectItems.push({
        objName: "运费",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "保险费",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "佣金",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "折扣",
        objField: "otherfee",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "其他",
        objField: "otherfee",
        objValue: 0.0,
      });

      this.formData.objectItems.push({
        objName: "预付银行利息",
        objField: "finf",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "应收银行利息",
        objField: "finf",
        objValue: 0.0,
      });
      this.formData.objectItems.push({
        objName: "承兑贴息",
        objField: "finf",
        objValue: 0.0,
      });
    },

    mainBtnClickAdd() {
      this.addOrder();
    },
    mainBtnClickEdit() {
      let canEdit = this.getOrderCanEdit();
      if (canEdit) {
        this.editStatus = "edit";
        this.setBtnStatus();
      }
    },
    mainBtnClickDelete() {
      Dialog.confirm({
        title: `确定删除当前销售合同吗?`,
        message: `合同【${this.formData.expNoticNo}】一旦删除，则无法恢复!`,
      })
        .then(() => {
          delWareHouse({ wareHsId: this.formData.wareHsId })
            .then((res) => {
              if (res.code === 1) {
                Notify({ type: "success", message: "删除成功!" });
                // 返回
                this.$router.go(-1); //返回上一层
              } else {
                Notify({ type: "danger", message: "删除单据失败!" + res.msg });
              }
            })
            .catch((res) => {
              Notify({ type: "danger", message: "删除单据失败!" + res });
            });
        })

        .catch(() => {});
    },
    /////保存之前的操作 数据校验
    checkSaveFormData() {
      /// 业务员判断
      // let temp = this.formData.employeeNo;
      // if (!temp) {
      //   Notify({ type: "warning", message: "业务员尚未录入!" });
      //   return 0;
      // }
      // /// 往来单位
      // temp = this.formData.custName;
      // if (!temp) {
      //   Notify({ type: "warning", message: "往来单位尚未录入!" });
      //   return 0;
      // }
      // /// 币种
      // temp = this.formData.currencyCode;
      // if (!temp) {
      //   Notify({ type: "warning", message: "币种尚未录入!" });
      //   return 0;
      // }
      // //贸易方式
      // temp = this.formData.objectNo;
      // if (!temp) {
      //   Notify({ type: "warning", message: "贸易方式尚未录入!" });
      //   return 0;
      // }
      ///明细必须有
      // if (!this.formData.items || this.formData.items.length == 0) {
      //   Notify({ type: "warning", message: "尚未录入商品明细!" });
      //   return 0;
      // }
      //  对明细进行验证
      // for (let index = 0; index < this.formData.items.length; index++) {
      //   const itemPdt = this.formData.items[index];
      //   if (!itemPdt.pdtNo1) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未选择销售商品!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.quantity || Number(itemPdt.quantity) <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未录入数量!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.unitPrice || itemPdt.unitPrice <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细尚未录入单价!`,
      //     });
      //     return 0;
      //   }
      //   if (!itemPdt.sapUnitRate || itemPdt.sapUnitRate <= 0) {
      //     Notify({
      //       type: "warning",
      //       message: `第${index + 1}行明细的sap转换比为空!`,
      //     });
      //     return 0;
      //   }
      //   this.formData.items[index].groupNo = (index + 1) * 10;
      // }

      return 1;
    },
    /////保存之前的操作
    beforeDoSave() {
      // let check = this.checkSaveFormData();
      // if (!check) {
      //   return 0;
      // }
      // this.sendFomData = this.formData;
      // var splitCode = ",";
      // let tempvar = this.sendFomData.quantity;
      // if (tempvar.includes(splitCode)) {
      //   tempvar = tempvar.replace(splitCode, "");
      // }
      // this.sendFomData.quantity = tempvar.replace(splitCode, "");
      // return 1;
    },
    formatField(type, items) {
      for (const key of items) {
        for (const index in this.formData.items) {
          this.formData.items[index][key] =
            type === "Number"
              ? rMoneyFormat(this.formData.items[index][key])
              : moneyFormat(this.formData.items[index][key]);
        }
      }
    },
    mainBtnClickSave() {
      // let check = this.beforeDoSave();
      // if (!check) {
      //   return;
      // }
      this.formData.items.forEach((item, index) => {
        this.formData.items[index].outFQnttyItem1 =
          this.formData.items[index].outFQnttyPiece1 /
          this.formData.items[index].amountPs;
      });
      this.formData.rpAmount = rMoneyFormat(this.formData.rpAmount);
      this.formData.amountD = rMoneyFormat(this.formData.amountD);
      this.formData.exchangRt = Number(this.formData.exchangRt).toFixed(4);
      const itemsFieldArr = [
        "transferAmountOut",
        "inQnttyPiece",
        "hsdj",
        "sapPrice",
        "sapQty",
        "sapQty1",
      ];
      this.formatField("Number", itemsFieldArr);
      const fieldArr = ["outDate"];
      this.formatFieldDate("SAVE", fieldArr, this.formData);
      this.formData.wareDate = this.wareDate;
      this.formData.outDate = this.copyField.outDate;
      if (this.formData.wareHsId) {
        updateWareHouse(this.formData)
          .then((res) => {
            if (res.code === 1) {
              this.doAfterSave(res);
              this.docentry = res.data.wareHsId;
              this.loadDetail();
              Notify({
                type: "success",
                message: "出库调整单修改成功!",
              });
            } else {
              Notify({
                type: "danger",
                message: "出库调整单修改失败!",
              });
            }
          })
          .catch((res) => {
            Notify({
              type: "danger",
              message: "修改失败!",
            });
          });
        return;
      } else {
        addWareHouse(this.formData)
          .then((res) => {
            if (res.code === 1) {
              this.doAfterSave(res);
              this.docentry = res.data.wareHsId;
              this.loadDetail();
              Notify({
                type: "success",
                message: "新增出库调整单成功!",
              });
            } else {
              Notify({
                type: "danger",
                message: "新增出库调整单失败!",
              });
            }
          })
          .catch((_) => {
            Notify({
              type: "danger",
              message: "新增出库调整单失败!",
            });
          });
      }
      // this.doInsertIeInlandSale();
    },
    ///// 保存之后的操作
    doAfterSave(res) {
      if (res) {
        this.formData = res.data;
        this.docentry = this.formData.docEntry;
        this.formData.contactItems = res.data.contactItems;
        this.formData.items = res.data.items;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.sendFomData = {};
        this.editStatus = "view";
        this.setBtnStatus();
        return;
      }
    },
    //// 实际上是insert 的操作
    // doInsertIeInlandSale() {
    //   this.genarareForm.orgCoNo = getDefaultOrgCoNo();
    //   genarateDocNo(this.genarareForm)
    //   .then((res) => {
    //     this.tempIsNo = res.data;
    //     this.isNoInputShow = true;
    //     this.docentry = res.data.wareHsId;
    //     this.loadDetail();
    //   })
    //   .catch((res) => {
    //     Notify({
    //       type: "error",
    //       message: "创建销售合同号错误：" + res.message,
    //     });
    //     return;
    //   });
    // },
    ///// 撤销审批
    doCancelApply() {
      undoApply({
        wareHsId: this.formData.wareHsId,
        cancelReason: this.cancelReason,
      })
        .then((res) => {
          Notify({ type: "success", message: "申请撤销成功!" });
          this.editStatus = "view";
          this.loadDetail();
        })
        .catch((res) => {
          Notify({ type: "danger", message: "撤销审批失败:" + res });
        });
    },
    /////用户确认了销售合同号  insert 逻辑的延续
    confirmIsNo() {
      this.sendFomData.isNo = this.tempIsNo;
      save(this.sendFomData)
        .then((res) => {
          this.doAfterSave(res);
        })
        .catch((res) => {
          Notify({ type: "error", message: "保存单据出错:" + res.message });
        });
    },
    mainBtnClickAudit() {
      apply({ wareHsId: this.formData.wareHsId })
        .then((res) => {
          if (res.code === 1) {
            Notify({ type: "success", message: "提交审批成功!" });
            this.loadDetail();
            this.tabActive = 0;
          } else {
            Notify({ type: "danger", message: "提交审批失败!" + res.msg });
          }
        })
        .catch((res) => {
          Notify({ type: "danger", message: "提交审批失败!" + res });
        });
    },
    mainBtnClickCancelAudit() {
      //undoApply
      this.undoApplyShow = true;
    },
    mainBtnClickSap() {
      applySap({ docEntry: this.formData.docEntry })
        .then((res) => {
          Notify({ type: "success", message: "提交SAP成功!" });
          this.loadDetail();
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },
    //实际的取消操作
    doCancelOrder() {
      if (this.oldFormData.wareHsId) {
        this.formData = this.oldFormData;
        this.orderReadOnly = true;
        this.loadDetail();
        this.editStatus = "view";
        this.setBtnStatus();
      } else {
        this.$router.go(-1);
      }
    },
    //点击取消按钮
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
        .then(() => {
          this.doCancelOrder();
        })
        .catch(() => {});
    },

    /// 模板预览
    mainBtnClickPDFView() {
      let keyValue = this.formData.wareHsId;
      let keyName = "docEntry";
      let moduleName = "d_pm48_jxhh";
      // let moduleName = "d_pm07_jxhh";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
        },
      });
    },
    downFileItem(index) {
      //if (this.formData.fileItems[index].objId) {
      let pkid = this.formData.fileItems[index].pkId;
      this.$router.push({
        path: "/pdf",
        query: { pkId: pkid },
      });
      // } else {
      //   Notify({ type: "warn", message: "当前附件尚未保存,无法预览!" });
      // }
    },
    deleteFileItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前附件吗?",
      })
        .then(() => {
          this.doDeleteFileItem(index);
        })
        .catch((res) => {});
    },
    doDeleteFileItem(index) {
      if (this.formData.fileItems[index].objId) {
        // 是原有的
        var len = this.formData.filterFileItems.length;
        this.formData.filterFileItems[len] = this.formData.fileItems[index];
      }
      this.formData.fileItems.splice(index, 1);
    },
    // 删除明细
    deletePdtItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
        return;
      }

      Dialog.confirm({
        title: "提示",
        message: "确认删除当前商品吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index);
        })
        .catch((res) => {});
    },

    doDeletePdtItem(index) {
      if (this.formData.items[index].isMid) {
        // 是原有的
        var len = this.formData.filterItems.length;
        this.formData.filterItems[len] = this.formData.items[index];
      }
      this.formData.items.splice(index, 1);
      this.computeAllQuantiy();
      this.computeAllAmount();
    },

    changePdtItemNum(index, changeField) {
      let quantity = this.formData.items[index].quantity;
      let unitPrice = this.formData.items[index].unitPrice;
      let amount = this.formData.items[index].amount;
      let sapUnitRate = this.formData.items[index].sapUnitRate;
      let sapQtty = this.formData.items[index].sapQtty;
      let sapPrice = this.formData.items[index].sapPrice;
      ///   改变的数量，重新计算 单价 或者 金额
      if (changeField === "quantity") {
        if (unitPrice && unitPrice > 0) {
          this.formData.items[index].amount = quantity * unitPrice;
          this.computeAllAmount();
        } else if (amount) {
          this.formData.items[index].unitPrice = amount / quantity;
          this.formData.items[index].sapPrice =
            (amount / quantity) * sapUnitRate;
        }
        if (sapUnitRate && sapUnitRate > 0) {
          ///重新计算 sap的销售数量
          this.formData.items[index].sapQtty = quantity / Number(sapUnitRate);
        }
        this.computeAllQuantiy();
      }
      //// 单价的修改
      else if (changeField === "unitPrice") {
        ///// 该表的是 单价，
        if (quantity && quantity > 0) {
          this.formData.items[index].amount = quantity * unitPrice;
          this.computeAllAmount();
        } else if (amount) {
          this.formData.items[index].quantity = amount / unitPrice;
        }
        if (sapUnitRate && sapUnitRate > 0) {
          ///重新计算 sap的销售数量
          this.formData.items[index].sapPrice = unitPrice * Number(sapUnitRate);
        }
      }
      //// sap单价的修改  ,
      else if (changeField === "sapPrice") {
        this.formData.items[index].unitPrice = sapPrice / Number(sapUnitRate);
        if (amount && amount > 0) {
          this.formData.items[index].sapQtty = amount / sapPrice;
          this.formData.items[index].quantity =
            amount / (sapPrice / Number(sapUnitRate));
          this.computeAllQuantiy();
        } else {
          // 不存在金额，则计算金额 sap 销售单价 sap 单位
          if (sapQtty && sapQtty > 0) {
            this.formData.items[index].amount = sapPrice * sapQtty;
            this.computeAllAmount();
          }
        }
      }
      //// sapQtty sap 数量的修改
      else if (changeField === "sapQtty") {
        this.formData.items[index].quantity = sapQtty * Number(sapUnitRate);
        if (sapPrice && sapPrice > 0) {
          this.formData.items[index].amount = sapQtty * sapPrice;
          this.computeAllAmount();
        }
        this.computeAllQuantiy();
      }
      //// 金额的修改
      else if (changeField === "amount") {
        if (quantity && quantity > 0) {
          /// 数量存在，  计算 单价 以及sap 单价
          this.formData.items[index].unitPrice = amount / quantity;
          this.formData.items[index].sapPrice =
            (amount / quantity) * sapUnitRate;
        }

        this.computeAllAmount();
      }
    },

    ///   预收款比列 计算
    changePreProPortion() {
      let totalIsValue = Number(this.formData.totalIsValue);
      let rate = Number(this.formData.preProportion);
      if (totalIsValue && rate) {
        ///   修改预收款比例
        this.formData.preSum = (totalIsValue * rate) / 100;
      }
    },
    /// 重新计算主表的总数量
    computeAllQuantiy() {
      let quantity = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];

        if (element && element.quantity) {
          quantity = quantity + Number(element.quantity);
        }
      }
      this.formData.quantity = quantity;
    },
    ///  重新计算主表的总金额
    computeAllAmount() {
      let amount = 0;
      for (let index = 0; index < this.formData.items.length; index++) {
        const element = this.formData.items[index];
        if (element && element.amount) {
          amount = amount + Number(element.amount);
        }
      }
      this.formData.totalIsValue = amount;
      this.changePreProPortion();
    },

    uploadFile(file) {
      //文件读取完毕。执行 上传文件的操作
      const form = new FormData();
      // 文件对象
      //form.append("file", file.content);
      form.append("file", file.file);
      upload(form)
        .then((res) => {
          let resFileList = res.data;
          if (resFileList && resFileList.length > 0) {
            let newFileItem = {
              fileDesc: resFileList[0].fileName,
              fileName: resFileList[0].fileName,
              pkId: resFileList[0].fileId,
            };
            if (
              !this.formData.fileItems ||
              this.formData.fileItems.length === 0
            ) {
              this.formData.fileItems = [];
            }
            let len = this.formData.fileItems.length;
            this.formData.fileItems[len] = newFileItem;
            //// 是否直接关联 文件
            this.updateFileAfter(newFileItem);
          }
        })
        .catch();
    },
    updateFileAfter(fileItem) {
      //let aduitStatus = this.form
      let auditStatu = this.formData.auditStatu;
      if (this.orderReadOnly) {
        let fileList = [];
        fileList[0] = fileItem;
        let tempForm = {
          docEntry: this.formData.docEntry,
          isNo: this.formData.isNo,
          fileItems: fileList,
        };
        updateFile(tempForm).then((res) => {});
        return;
      }
    },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.goodsItemActIndex = index;
      }
    },
  },
  computed: {
    baseNumDis() {
      if (this.editStatus === "add" && !this.formData.wareHsId) {
        return false;
      } else {
        return true;
      }
    },
    // 计算高度
    goodsDetailHeight: function () {
      /// const height = window.innerHeight;
      let goodsItemActIndex = this.goodsItemActIndex;
      if (goodsItemActIndex || goodsItemActIndex === 0) {
        //长度
        let len = this.formData.items.length;

        /// 商品明细展开行 序号
        //let
        let bflen = goodsItemActIndex + 1;
        let aftlen = -1;
        let bfh = bflen * 35;
        let afth = aftlen * 35;

        const searchBarHeight = 1 * 35;
        //  可视高度    -  上部分 固定栏的高度
        return `calc(100vh  - 137.93px + ${bfh}px  +  ${afth}px -  ${searchBarHeight}px`;
      } else {
        return `calc(100vh  - 137.93px - 35px`;
      }
    },
    ///// 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCoNo;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgName;
        }
      }
      return "";
    },
    ///// 计算贸易类型
    computedTrade: function () {
      let tradType = this.formData.tradType;
      for (var i = 0; i < this.tredeTypeList.length; i++) {
        if (this.tredeTypeList[i].tradeTypeNo === tradType) {
          return this.tredeTypeList[i].tradeType;
        }
      }
      return "";
    },

    ///// 计算销售类型
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
  .scroll-wrap-main-table {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 3.7rem);
    overflow: auto;
  }
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
.update-load {
  width: 100%;
  flex: display;

  .update-btn {
    width: 30%;
  }
  .update-tip {
    margin-top: 10px;
    width: 69%;
    font-size: 12px;
    color: red;
    margin-left: 20px;
    .span {
      color: red;
    }
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
  height: calc(100vh - 137.93px);
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
  height: calc(100vh - 172.93px);
}
.wrappers-status-detail {
  height: calc(100vh - 137.93px);
  background-color: #ffffff;
}
.wrappers-file-detail {
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
