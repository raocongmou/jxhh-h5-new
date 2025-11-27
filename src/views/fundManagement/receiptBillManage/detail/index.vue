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
        v-show="btnEditShow"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >认领</van-button
      >
    </div>

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="收款信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form ref="collectionRef" label-width="100">
            <van-cell-group @click="vanCellGroupBtn">
              <van-field
                v-model="computedOrgCo"
                name="平台公司"
                label="平台公司"
                readonly
                placeholder="平台公司"
              />
              <van-field
                v-model="formData.raNo"
                readonly
                name="收款单号"
                label="收款单号"
              />
              <van-field
                v-model="formData.raClass"
                readonly
                name="收款类型"
                label="收款类型"
              />
              <van-field
                v-model="formData.issueDate"
                name="制单日期"
                label="制单日期"
                placeholder="系统生成，无需录入"
                readonly
              />
              <van-field
                v-model="formData.empName"
                name="制单人"
                label="制单人"
                readonly
              />
              <van-field
                v-model="formData.paymentCo"
                name="付款公司"
                label="付款公司"
                placeholder="系统生成，无需录入"
                readonly
              />
              <van-field
                v-model="formData.payMode"
                name="付款方式"
                label="付款方式"
                readonly
              />
              <RcmSelect
                :select-label="'currencyName'"
                :select-value="'currencyCode'"
                :valueKey="'currencyName'"
                :options="currencyCodeList"
                :label="'币种'"
                :placeholder="'币种'"
                :readonly="true"
                :field="formData.currencyCode"
              />
              <van-field
                v-model="formData.exchRate"
                name="CNY汇率"
                label="CNY汇率"
                readonly
                :formatter="(value) => Number(value).toFixed(4)"
              />
              <van-field
                readonly
                v-model="formData.amntFeeSum"
                name="金额"
                label="金额"
              />
              <van-field
                readonly
                v-model="formData.amntFeeASum"
                name="金额(CNY)"
                label="金额(CNY)"
              />
              <van-field
                v-model="formData.amount"
                name="领用金额"
                label="领用金额"
                readonly
              />
              <van-field
                v-model="formData.amountYe"
                name="未领余额"
                label="未领余额"
                readonly
              />
              <van-field
                v-model="formData.bankName1"
                :rules="rules.bankName1Rule"
                name="bankName1"
                label="收款行"
                readonly
              />
              <van-field
                v-model="formData.acountNo1"
                name="收款账号"
                label="收款账号"
                readonly
              />
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="comformList"
                :label="'确认标识'"
                :placeholder="'确认标识'"
                :readonly="true"
                :field="formData.comform"
              />
              <van-field
                v-model="formData.recDate"
                name="确认日期"
                label="确认日期"
                readonly
              />
              <van-field
                readonly
                v-model="formData.acctorName1"
                name="财务"
                label="财务"
              />
              <van-field
                type="textarea"
                autosize
                rows="1"
                v-model="formData.commentF"
                name="收款说明"
                label="收款说明"
                readonly
              />
              <van-field
                v-model="formData.sapType"
                name="SAP接口状态"
                label="SAP接口状态"
                readonly
              />
              <van-field
                v-model="formData.sapYear"
                name="SAP年度"
                label="SAP年度"
                readonly
              />
              <van-field
                v-model="formData.sapOrderNo"
                name="SAP凭证号"
                label="SAP凭证号"
                readonly
              />
              <van-field
                v-model="formData.sapCreateDate"
                name="SAP创建日期"
                label="SAP创建日期"
                readonly
              />
              <!--  -->
              <!-- <van-field
                v-model="formData.ticketNo"
                name="票据号"
                label="票据号"
                readonly
              /> -->
              <!-- <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="acctFlagList"
                :label="'财务制证'"
                :placeholder="'财务制证'"
                :readonly="true"
                :field="formData.acctFlag"
              />
              <van-field
                v-model="formData.acctMan"
                name="修改人"
                label="修改人"
                readonly
              />
              <van-field
                v-model="formData.acctFlag2"
                name="资金复核"
                label="资金复核"
                readonly
              />
              <van-field
                v-model="formData.acctorNo2"
                name="复核人"
                label="复核人"
                readonly
              /> -->
              <!-- <van-field
                v-model="formData.refNo"
                name="总账科目"
                label="总账科目"
                readonly
              />
              <RcmSelect
                :select-label="'label'"
                :select-value="'value'"
                :valueKey="'label'"
                :options="discountFlagList"
                :label="'贴现'"
                :placeholder="'贴现'"
                :readonly="true"
                :field="formData.discountFlag"
              />
              <van-field
                v-model="formData.discountDate"
                name="贴现日期"
                label="贴现日期"
                readonly
              /> -->
            </van-cell-group>
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="收款项目">
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelChange('items')"
              style="magin-right: 10px"
              >撤销所有清单操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddDetailItem"
              style="magin-right: 10px"
              >新增清单</van-button
            >
          </div>
          <!-- 商品明细 -->
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
                  :title="getTitle(item, index)"
                >
                  <van-form label-width="100">
                    <RcmSelect
                      :select-label="'refValue'"
                      :select-value="'acctCode'"
                      :valueKey="'refValue'"
                      :options="costFeeList"
                      :label="'分类'"
                      :placeholder="'分类'"
                      :readonly="true"
                      :field="item.control"
                    />
                    <van-field
                      required
                      v-model="item.itemType"
                      readonly
                      is-link
                      name="收款项目"
                      label="收款项目"
                      placeholder="收款项目"
                      @click="itemSelectDetail(index, 'itemType')"
                    />
                    <van-field
                      required
                      :readonly="orderReadOnly"
                      v-model="item.amntFeeSum"
                      name="收款金额"
                      label="收款金额"
                      placeholder="收款金额"
                    />

                    <!-- <van-field
                      required
                      v-model="item.objectNo"
                      readonly
                      name="业务单据类型"
                      label="业务单据类型"
                      placeholder="请选择业务单据类型"
                      @click="itemSelectDetail(index, 'objectNo')"
                      is-link
                    /> -->
                    <RcmSelect
                      :select-label="'name'"
                      :select-value="'code'"
                      :valueKey="'name'"
                      :options="objectNoList"
                      :label="'业务单据类型'"
                      :name="'业务单据类型'"
                      :placeholder="'业务单据类型'"
                      :readonly="orderReadOnly"
                      :isRightArrow="true"
                      :field="item.objectNo"
                      @change="
                        ({ label, value }) =>
                          changeRcmSelect({ label, value }, 'objectNo', index)
                      "
                    />
                    <van-field
                      v-model="item.impNoticNo"
                      :readonly="orderReadOnly && item.objectNo !== 'OTHER'"
                      name="业务单据"
                      label="业务单据"
                      :placeholder="
                        item.objectNo !== 'OTHER'
                          ? '请选择业务单据'
                          : '请录入业务单据'
                      "
                      @click="itemSelectOrder(index)"
                      :is-link="item.objectName !== '其他'"
                    />

                    <van-field
                      v-model="item.refNo"
                      readonly
                      name="客户合同号"
                      label="客户合同号"
                      placeholder="客户合同号"
                    />

                    <van-field
                      v-model="item.employeeName"
                      readonly
                      name="业务员"
                      label="业务员"
                      placeholder="业务员"
                    />

                    <van-field
                      v-model="item.orgName"
                      readonly
                      name="部门"
                      label="部门"
                      placeholder="部门"
                    />

                    <van-field
                      v-model="item.empName"
                      readonly
                      name="领用人"
                      label="领用人"
                      placeholder="领用人"
                    />

                    <!-- <van-field
                      v-model="item.payNo"
                      readonly
                      name="付款单号"
                      label="付款单号"
                    /> -->

                    <!-- <van-field
                      v-model="item.payDate"
                      is-link
                      readonly
                      name="付款时间"
                      label="付款时间"
                    /> -->

                    <van-field
                      v-model="item.commentC"
                      :readonly="orderReadOnly"
                      type="textarea"
                      autosize
                      rows="1"
                      name="备注"
                      label="备注"
                      placeholder="备注"
                    />

                    <van-field
                      v-model="item.sapOrderNo"
                      readonly
                      name="SAP凭证号"
                      label="SAP凭证号"
                      placeholder="SAP凭证号"
                    />

                    <van-field
                      v-model="item.sapYear"
                      readonly
                      name="SAP会计年度"
                      label="SAP会计年度"
                      placeholder="SAP会计年度"
                    />

                    <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deleteDetailItem(index)"
                        >删除</van-button
                      >
                    </div>
                  </van-form>
                </van-collapse-item>
                <div class="empty"></div>
              </div>
            </Scroll>
          </van-collapse>
        </div>
        <!-- </Scroll> -->
      </van-tab>
      <van-tab title="票据明细">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <!-- <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelChange('noteItems')"
              style="magin-right: 10px"
              >撤销操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddNoteItem"
              style="magin-right: 10px"
              >新增票据明细</van-button
            >
          </div> -->
          <!-- 商品明细 -->
          <van-collapse
            v-model="pdtItemsActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <Scroll
              class="wrappers-goods-detail wrappers"
              wrapper="goodsDetailRef"
              v-if="formData.noteItems.length"
              ref="goodsDetail"
            >
              <div>
                <van-collapse-item
                  v-for="(item, index) in formData.noteItems"
                  :key="index"
                  :name="index"
                  :title="'票据号码：' + item.docNo"
                >
                  <van-form label-width="100">
                    <van-field
                      required
                      readonly
                      v-model="item.docNo"
                      name="票据号码"
                      label="票据号码"
                      placeholder="请录入票据号码"
                    />
                    <van-field
                      v-model="item.amount"
                      required
                      readonly
                      name="票据金额"
                      label="票据金额"
                      placeholder="请录入票据金额"
                    />
                    <van-field
                      v-model="item.docDate"
                      readonly
                      name="出票日期"
                      label="出票日期"
                      placeholder="系统生成，无需录入"
                    />

                    <van-field
                      v-model="item.dueDate"
                      readonly
                      name="到期日期"
                      label="到期日期"
                      placeholder="系统生成，无需录入"
                    />

                    <van-field
                      v-model="item.issueBank"
                      readonly
                      name="出票行"
                      label="出票行"
                      placeholder="请输入出票行"
                    />

                    <van-field
                      v-model="item.drawer"
                      readonly
                      name="出票人"
                      label="出票人"
                      placeholder="请输入出票人"
                    />
                    <van-field
                      v-model="item.preNote"
                      readonly
                      name="票据前手"
                      label="票据前手"
                      placeholder="请输入票据前手"
                    />

                    <!-- <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deleteNoteItem(index)"
                        >删除</van-button
                      >
                    </div> -->
                  </van-form>
                </van-collapse-item>
                <div class="empty"></div>
              </div>
            </Scroll>
          </van-collapse>
        </div>
        <!-- </Scroll> -->
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
                      readonly
                      v-model="item.fileName"
                  /></van-col>
                  <van-col span="10"
                    ><van-field label="文件类型" readonly v-model="item.type"
                  /></van-col>
                </van-row>
                <van-row>
                  <van-col span="24"
                    ><van-field
                      label="说明"
                      v-model="item.fileDesc"
                      :readonly="orderReadOnly"
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
    </van-tabs>

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
    <!-- 收款项目清单-销售合同 -->
    <van-popup
      v-model:show="isShowInlandSaleDialog"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <InlandSaleDialog
        :showInlandSale="showInlandSale"
        :vendorNo="vendorNo"
        v-on="{ selectInlandSale: selectInlandSale }"
      />
    </van-popup>
    <!-- 收款项目清单-采购合同 -->
    <van-popup
      v-model:show="isShowPurchaseOrderDialog"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <PurchaseOrderDialog
        :vendorNo="vendorNo"
        :showPurchaseOrder="showPurchaseOrder"
        v-on="{ selectPurchaseOrder: selectPurchaseOrder }"
      />
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
import InlandSaleDialog from "../components/InlandSaleDialog.vue";
import PurchaseOrderDialog from "../components/PurchaseOrderDialog.vue";
import {
  detail,
  updateReceiptBill,
} from "@/api/fundManagement/receiptBillManage";
import { upload } from "@/api/erp.file.js";
import { getCurrencyCodeList } from "@/api/common";
import { getOrgList } from "@/utils/erp.org.js";
import { getRe02CopstFee } from "@/utils/erp.base.data.js";
import { isCanAddItems, customFormat } from "../methods/common-methods";
import fieldFormData from "./cloumn";
import { dateFormat } from "@/utils/format";
import { moneyFormat, rMoneyFormat } from "../../../../utils/format";

export default {
  name: "InlandSaleDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    InlandSaleDialog,
    PurchaseOrderDialog,
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
      issueDate: "",
      recDate: "",
      vendorNo: "",
      docDateList: [],
      dueDateList: [],
      acctFlagList: [
        { value: "1", label: "已制证" },
        { value: "0", label: "未制证" },
      ],
      discountFlagList: [
        { label: "是", value: "Y" },
        { label: "否", value: "N" },
      ],
      comformList: [
        { label: "已确认", value: "Y" },
        { label: "未确认", value: "N" },
      ],
      currencyCodeList: [],
      // 采购合同
      showPurchaseOrder: false,
      isShowPurchaseOrderDialog: false,
      currentIndex: null, //当前收款项目清单索引
      isShowInlandSaleDialog: false,
      showInlandSale: false,
      objectNo: "PM03",
      tileName: "收款领用详情",
      docentry: null,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      baseDetail: fieldFormData().baseDetail,
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
      activeTableName: "",
      activeTableIndex: -1,
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
      currencyCodeList: [],
      fileItems: [],
      ///  收款分类
      skflItems: [
        { code: 1, name: "货款" },
        { code: 0, name: "费用" },
      ],
      objectNoList: [
        { code: "PM03", name: "销售合同" },
        // { code: "SM14", name: "进口定单" },
        // { code: "SM17", name: "进口发票" },
        { code: "PM02", name: "内采合同" },
        { code: "OTHER", name: "其他" },
      ],
      costFeeList: [],
      rules: {
        bankName1Rule: [
          // { required: true, message: "付款行不能为空!" }
        ],
      },
      validateField1: [
        { enField: "control", cnField: "分类" },
        { enField: "itemType", cnField: "收款项目" },
        { enField: "amntFeeSum", cnField: "收款金额" },
        { enField: "objectNo", cnField: "业务单据类型" },
        // { enField: "objectName", cnField: "业务单据类型" },
        { enField: "impNoticNo", cnField: "业务单据" },
      ],
      validateField2: [
        { enField: "control", cnField: "分类" },
        { enField: "itemType", cnField: "收款项目" },
        { enField: "amntFeeSum", cnField: "收款金额" },
        { enField: "objectNo", cnField: "业务单据类型" },
        // { enField: "objectName", cnField: "业务单据类型" },
      ],
    };
  },
  created() {
    document.title = this.$route.matched[0].meta.name;
    provide("title", this.tileName);

    this.docentry = this.$route.query.docEntry;
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });
    getRe02CopstFee().then((res) => {
      this.costFeeList.push(...res);
    });
    getCurrencyCodeList().then((res) => {
      this.currencyCodeList.push(...res.data);
    });
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    }
  },
  mounted() {
    this.setBtnStatus();
  },
  methods: {
    getTitle(item, index) {
      if (this.formData.items.length > 1) {
        return (
          index +
          1 +
          "." +
          (item.itemType ? item.itemType : "") +
          "-" +
          (item.objectName ? item.objectName : "") +
          "：" +
          item.impNoticNo
        );
      } else {
        // return (item.itemType?item.itemType:'');
        return (
          (item.itemType ? item.itemType : "") +
          "-" +
          (item.objectName ? item.objectName : "") +
          "：" +
          item.impNoticNo
        );
      }
    },
    changeRcmSelect({ label, value }, field, index) {
      this.formData.items[index][field] = value;
      if (field === "objectNo") {
        this.formData.items[index].objectNo = value;
        this.formData.items[index].impNoticNo = "";
        this.formData.items[index].employeeName = "";
        this.formData.items[index].employeeNo = "";
        this.formData.items[index].orgNo = "";
        this.formData.items[index].orgName = "";
      }
    },
    // 是否允许当前数据可以修改
    vanCellGroupBtn() {
      Notify({
        type: "warning",
        message: "该界面不支持修改功能!",
      });
      return;
    },
    // 选择收款项目清单-采购合同
    selectPurchaseOrder(item) {
      if (this.currentIndex !== null) {
        this.formData.items[this.currentIndex].employeeName = item.employeeName;
        this.formData.items[this.currentIndex].impNoticNo = item.poNo;
        this.formData.items[this.currentIndex].employeeNo = item.employeeNo;
        this.formData.items[this.currentIndex].orgNo = item.orgNo;
        this.formData.items[this.currentIndex].orgName = item.orgName;
        this.isShowPurchaseOrderDialog = false;
      }
    },
    // 选择收款项目清单-销售合同
    selectInlandSale(item) {
      if (this.currentIndex !== null) {
        this.formData.items[this.currentIndex].employeeName = item.employeeName;
        this.formData.items[this.currentIndex].impNoticNo = item.isNo;
        this.formData.items[this.currentIndex].employeeNo = item.employeeNo;
        this.formData.items[this.currentIndex].orgNo = item.orgNo;
        this.formData.items[this.currentIndex].orgName = item.orgName;
        this.isShowInlandSaleDialog = false;
      }
    },
    ///当前页面切换了平台公司
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },

    // 新增收款项目清单
    handleAddDetailItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可新增！" });
        return;
      }
      // 解决业务单据类型为其他时，字段业务单据不进行校验的bug
      const items = this.formData.items;
      const hasOther = items.filter((item) => item.objectNo === "OTHER");
      const hasOtherIndex = items.findIndex(
        (item) => item.objectNo === "OTHER"
      );
      const hasnotOther = items.filter((item) => item.objectNo !== "OTHER");
      const isReturn1 = isCanAddItems(
        this.validateField2,
        hasOther,
        hasOtherIndex
      );
      if (isReturn1) return;
      const isReturn2 = isCanAddItems(this.validateField1, hasnotOther);
      if (isReturn2) return;
      const baseDetail = Object.assign({}, this.baseDetail);
      items.push(baseDetail);
    },
    //撤销所有的项目清单操作
    handleCancelDetailAction() {},
    // 删除项目清单
    deleteDetailItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除！" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除收款项目清单吗?",
      })
        .then(() => {
          if (this.formData.items[index].docEntry) {
            // 是原有的
            var len = this.formData.filterItems.length;
            this.formData.filterItems[len] = this.formData.items[index];
          }
          this.formData.items.splice(index, 1);
        })
        .catch((res) => {});
    },
    //新增一个票据明细
    handleAddNoteItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可新增！" });
        return;
      }
      let newRow = {};
      this.formData.noteItems.push(newRow);
    },
    // 撤销所有的操作
    handleCancelChange(detail) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.oldFormData) {
        // 需要判断
        Dialog.confirm({
          title: "取消所有的明细操作",
          message: "当前操作将不会保存您对明细的修改!",
        })
          .then(() => {
            this.formData[detail] = JSON.parse(
              JSON.stringify(this.oldFormData[detail])
            );
            this.pdtItemsActiveIndex = 0;
          })
          .catch(() => {});
      }
    },
    // 删除票据明细
    deleteNoteItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除！" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除票据明细吗?",
      })
        .then(() => {
          if (this.formData.noteItems[index].docNo) {
            // 是原有的
            var len = this.formData.filterNoteItems.length;
            this.formData.filterNoteItems[len] = this.formData.noteItems[index];
          }
          this.formData.noteItems.splice(index, 1);
        })
        .catch((res) => {});
    },
    allComputed(data) {
      data.amount = data.items.reduce((pre, { amntFeeSum }) => {
        return Number(pre) + Number(amntFeeSum);
      }, 0);
      data.amountYe = Number(data.amntFeeSum) - Number(data.amount);
      if (Number(data.amount) - Number(data.amntFeeSum) > 0) {
        Notify({
          type: "warning",
          message: "领用金额不得大于金额,请重试!",
        });
        return false;
      } else {
        return true;
      }
    },
    // 保存
    mainBtnClickSave() {
      // validate(name?: string | string[])
      this.$refs.collectionRef
        .validate()
        .then((_) => {
          customFormat("Number", this.formData);
          let result = this.allComputed(this.formData);
          if (!result) return;
          this.formData.issueDate = this.issueDate;
          this.formData.recDate = this.recDate;
          this.formData.noteItems.forEach((item, index) => {
            this.formData.noteItems[index].amount = rMoneyFormat(
              this.formData.noteItems[index].amount
            );
            this.formData.noteItems[index].docDate = this.docDateList[index];
            this.formData.noteItems[index].dueDate = this.dueDateList[index];
          });
          // 实现修改功能
          updateReceiptBill(this.formData).then((res) => {
            if (res.code === 1) {
              Notify({
                type: "success",
                message: "领用成功!",
              });
              // for(const key in this.formData) {
              //   this.formData[key] = res.data[key];
              // }
              this.loadDetail();
            }
          });
          this.editStatus = "view";
          this.setBtnStatus();
        })
        .catch((err) => {
          Notify({
            type: "danger",
            message: `操作失败!${err}`,
          });
          return;
        });
    },
    ///点击取消
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
        .then(() => {
          this.loadDetail();
        })
        .catch(() => {});
    },

    // 点击认领
    mainBtnClickEdit() {
      this.editStatus = "edit";
      this.setBtnStatus();
    },

    /// 设置 按钮的状态
    setBtnStatus() {
      if (this.editStatus === "view") {
        this.orderReadOnly = true;
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        let comform = this.formData.comform;
        if (comform === "N") {
          this.btnEditShow = true;
        }
      } else if (this.editStatus === "edit") {
        this.orderReadOnly = false;
        this.btnSaveShow = true;
        this.btnCancelShow = true;
      }
    },

    itemSelectDetail(index, fileName) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可选择！" });
        return;
      }
      this.actionItems = [];
      this.actionDesc = "";
      if (fileName === "objectNo") {
        this.actionItems = this.objectNoList;
        this.actionDesc = "请选择业务单据类型";
      } else if (fileName === "control") {
        this.actionItems = this.skflItems;
        this.actionDesc = "请选择明细分类";
      } else if (fileName === "itemType") {
        for (let index = 0; index < this.costFeeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.costFeeList[index].refValue;
          item.code = this.costFeeList[index].acctCode;
          this.actionItems[index] = item;
        }
        this.actionDesc = "请选择收款项目";
      }

      this.activeTableName = "detail";
      this.actionShow = true;
      this.activeTableIndex = index;
      this.activeFormFiled = fileName;
    },

    selectItemAction(item) {
      if (this.activeTableName === "detail") {
        if (this.activeFormFiled === "control") {
          // this.formData.items[this.activeTableIndex].control = item.name;
          this.formData.items[this.activeTableIndex].control = item.code;
        } else if (this.activeFormFiled === "objectNo") {
          this.formData.items[this.activeTableIndex].objectNo = item.code;
          this.formData.items[this.activeTableIndex].objectName = item.name;
          this.formData.items[this.activeTableIndex].impNoticNo = "";
          if (this.currentIndex !== null) {
            this.formData.items[this.currentIndex].employeeName = "";
            this.formData.items[this.currentIndex].employeeNo = "";
            this.formData.items[this.currentIndex].orgNo = "";
            this.formData.items[this.currentIndex].orgName = "";
          }
        } else if (this.activeFormFiled === "itemType") {
          this.formData.items[this.activeTableIndex].itemType = item.name;
          this.formData.items[this.activeTableIndex].control = item.code;
        }
      }
      this.actionShow = false;
      this.activeFormFiled = "";
      this.activeTableIndex = -1;
      this.activeTableName = "";
    },
    itemSelectOrder(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可选择！" });
        return;
      }
      this.currentIndex = index;
      let rowObjectNo = this.formData.items[index].objectNo;
      if (
        rowObjectNo === null ||
        rowObjectNo === "" ||
        rowObjectNo === undefined
      ) {
        Notify({
          type: "danger",
          message: "请先选择业务单据类型!",
        });
        return;
      }
      this.vendorNo = this.formData.paymentCoNo;
      ///其他类型，让用户输入
      if (rowObjectNo === "OTHER") {
        return;
      }
      if (rowObjectNo === "PM03") {
        this.isShowInlandSaleDialog = true;
        this.showInlandSale = true;
        return;
      } else if (rowObjectNo === "PM02") {
        this.isShowPurchaseOrderDialog = true;
        this.showPurchaseOrder = true;
        return;
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
    ///重新加载所有的数据
    loadDetail() {
      detail({ docEntry: this.docentry })
        .then((res) => {
          this.issueDate = res.data.issueDate;
          this.recDate = res.data.recDate;
          res.data.recDate = dateFormat(res.data.recDate, "yyyy-MM-dd");
          res.data.issueDate = dateFormat(res.data.issueDate, "yyyy-MM-dd");
          res.data.noteItems.forEach((item, index) => {
            res.data.noteItems[index].amount = moneyFormat(
              res.data.noteItems[index].amount
            );
            this.docDateList.push(res.data.noteItems[index].docDate);
            this.dueDateList.push(res.data.noteItems[index].dueDate);
            res.data.noteItems[index].docDate = dateFormat(
              res.data.noteItems[index].docDate,
              "yyyy-MM-dd"
            );
            res.data.noteItems[index].dueDate = dateFormat(
              res.data.noteItems[index].dueDate,
              "yyyy-MM-dd"
            );
          });
          this.allComputed(res.data);
          customFormat("Money", res.data);
          this.formData = res.data;
          this.fileItems = this.formData.fileItems;
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          this.editStatus = "view";
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
      } else {
      }
      this.showItemPdtSelect = false;
    },
    ///   新增商品信息
    handleAddPdtItem() {},
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
    getmix(val) {
      if (val === "1" || val === "货款") {
        return "货款";
      } else {
        return "费用";
      }
    },
  },

  computed: {
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
    computedItemFl: function (item) {
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
