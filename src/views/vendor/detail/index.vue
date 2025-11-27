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
        v-show="false"
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
    </div>

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form>
            <!-- <van-form @submit="onSubmit"> -->
            <van-field
              v-model="infoForm.docno"
              readonly
              required
              label-width="105"
              name="申请单号"
              label="申请单号"
              placeholder="系统生成，无需输入。"
            />
            <van-field
              v-model="infoForm.ContactDate"
              readonly
              required
              label-width="105"
              name="申请日期"
              label="申请日期"
              placeholder="系统生成，无需输入。"
            />
            <van-field
              v-model="infoForm.auditname"
              readonly
              required
              label-width="105"
              name="审批状态"
              label="审批状态"
              placeholder="审批状态"
            />
            <van-field
              v-model="computedType6"
              readonly
              required
              is-link
              label-width="105"
              name="是否境外"
              label="是否境外"
              placeholder="请选择是否境外地区"
              @click="mainFieldClick('type6')"
            />
            <van-field
              v-model="computedType"
              required
              readonly
              is-link
              label-width="105"
              name="公司类型"
              label="公司类型"
              placeholder="请选择公司类型"
              @click="mainFieldClick('type')"
            />
            <van-field
              required
              v-model="infoForm.abbreviation"
              :readonly="orderReadOnly"
              label-width="105"
              name="简称"
              label="简称"
              placeholder="请输入简称"
              type="textarea"
              autosize
              rows="1"
            />

            <van-field
              v-model="infoForm.conamec"
              :required="infoForm.type6 === 'A'"
              :readonly="orderReadOnly"
              label-width="105"
              name="中文名称"
              label="中文名称"
              placeholder="请输入中文名称"
              type="textarea"
              autosize
              rows="1"
            />
            <van-field
              v-model="infoForm.conamee"
              :required="infoForm.type6 === 'B'"
              :readonly="orderReadOnly"
              label-width="105"
              name="英文名称"
              label="英文名称"
              placeholder="请输入英文名称"
              type="textarea"
              rows="1"
              autosize
            />

            <van-field
              v-model="computedVndcst"
              :required="infoForm.type1 === 'Y'"
              readonly
              is-link
              label-width="105"
              name="客户组"
              label="客户组"
              placeholder="请选择客户组"
              @click="mainFieldClick('vndcst')"
            />

            <van-field
              v-model="computedGrade"
              :required="infoForm.type1 !== 'Y'"
              readonly
              is-link
              label-width="105"
              name="账户组"
              label="账户组"
              placeholder="请选择账户组"
              @click="mainFieldClick('grade')"
            />

            <van-field
              v-model="infoForm.taxno"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              label-width="105"
              name="社会信用代码"
              label="社会信用代码"
              placeholder="请输入社会信用代码"
            />
            <van-field
              v-model="infoForm.legalman"
              :readonly="orderReadOnly"
              label-width="105"
              name="法人姓名"
              label="法人姓名"
              placeholder="请输入法人姓名"
            />

            <van-field
              v-model="infoForm.accno"
              :readonly="orderReadOnly"
              label-width="105"
              name="法人身份证号"
              label="法人身份证号"
              placeholder="请输入法人身份证号"
            />

            <van-field
              v-model="infoForm.strAuditFlag"
              :readonly="orderReadOnly"
              type="number"
              label-width="105"
              :required="infoForm.type1 !== 'Y'"
              name="账期"
              label="账期"
              placeholder="请输入账期"
            />
            <van-field
              v-model="computedBankTypeNo"
              :required="infoForm.type6 === 'A'"
              is-link
              readonly
              label-width="105"
              name="付款方式"
              label="付款方式"
              placeholder="请选择付款方式"
              @click="mainFieldClick('banktypeno')"
            />

            <van-field
              v-model="infoForm.bankname"
              :required="infoForm.type1 !== 'Y'"
              is-link
              readonly
              label-width="105"
              name="所属银行"
              label="所属银行"
              placeholder="请选择所属银行"
              @click="mainFieldClickOfRight('bankname')"
            />
            <van-field
              v-model="infoForm.bankname2"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              label-width="105"
              name="开户银行"
              label="开户银行"
              placeholder="请输入开户银行(增值税)"
            />

            <van-field
              v-model="infoForm.snapsno"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              label-width="105"
              name="联行号"
              label="联行号"
              placeholder="请输入联行号"
            />
            <van-field
              v-model="infoForm.accountno2"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              label-width="105"
              name="账号(增值税)"
              label="账号(增值税)"
              placeholder="请输入账号"
            />
            <van-field
              v-model="infoForm.addr2"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              label-width="105"
              name="地址(增值税)"
              label="地址(增值税)"
              placeholder="请输入地址"
            />
            <van-field
              v-model="infoForm.phone2"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'A'"
              type="tel"
              label-width="105"
              name="电话(增值税)"
              label="电话(增值税)"
              placeholder="请输入电话"
            />

            <van-field
              v-model="infoForm.countrye"
              :readonly="orderReadOnly"
              :required="infoForm.type6 === 'B'"
              label-width="105"
              name="国家/地区(中)"
              label="国家/地区(中)"
              placeholder="请输入国家/地区"
            />
            <van-field
              v-model="infoForm.statee"
              :required="infoForm.type6 === 'A'"
              :readonly="orderReadOnly"
              label-width="105"
              name="州/省(中)"
              label="州/省(中)"
              placeholder="请输入州/省"
            />

            <van-field
              v-model="infoForm.citye"
              :required="infoForm.type6 === 'A'"
              :readonly="orderReadOnly"
              label-width="105"
              name="城市(中)"
              label="城市(中)"
              placeholder="请输入城市"
            />
            <van-field
              v-model="infoForm.coaddre"
              :required="(infoForm.type6 === 'A') & (infoForm.type1 === 'Y')"
              :readonly="orderReadOnly"
              label-width="105"
              name="地址(中)"
              label="地址(中)"
              placeholder="请输入地址"
            />

            <van-field
              v-model="infoForm.vendorc1"
              :required="infoForm.type6 === 'B'"
              :readonly="orderReadOnly"
              label-width="105"
              name="国家/地区(英)"
              label="国家/地区(英)"
              placeholder="请输入国家/地区"
            />
            <van-field
              v-model="infoForm.vendorc2"
              :readonly="orderReadOnly"
              label-width="105"
              name="州/省(英)"
              label="州/省(英)"
              placeholder="请输入州/省"
            />

            <van-field
              v-model="infoForm.vendorc3"
              :required="(infoForm.type1 === 'Y') & (infoForm.type6 === 'B')"
              :readonly="orderReadOnly"
              label-width="105"
              name="城市(英)"
              label="城市(英)"
              placeholder="请输入城市"
            />
            <van-field
              v-model="infoForm.facility"
              :required="(infoForm.type1 === 'Y') & (infoForm.type6 === 'B')"
              :readonly="orderReadOnly"
              label-width="105"
              name="地址(英)"
              label="地址(英)"
              placeholder="请输入地址"
            />

            <van-field
              v-model="infoForm.sapcode"
              readonly
              label-width="105"
              name="saporderno"
              label="SAP编号"
              placeholder="系统生成，无需输入"
            />
          </van-form>
        </Scroll>
      </van-tab>

      <van-tab title="区域配置">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <div class="pdt_bt">
            <!-- <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelPdtAction()"
              style="magin-right: 10px"
              >撤销所有操作</van-button
            > -->
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="handleAddPdtItem"
              style="magin-right: 10px"
              >新&nbsp;增</van-button
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
              v-if="infoForm.userItems.length"
              ref="goodsDetail"
            >
              <div>
                <van-collapse-item
                  v-for="(item, index) in infoForm.userItems"
                  :key="index"
                  :name="index"
                  :title="item.username"
                >
                  <van-form>
                    <van-field
                      label-width="105"
                      is-link
                      required
                      v-model="item.shearid"
                      readonly
                      name="区域代码"
                      label="区域代码"
                      placeholder="区域代码"
                      @click="itemSelectEmployee(index)"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.username"
                      readonly
                      name="业务员"
                      label="业务员"
                      placeholder="业务员"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.unitname1"
                      readonly
                      name="销售地区"
                      label="销售地区"
                      placeholder="销售地区"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.unitname2"
                      readonly
                      name="销售组织"
                      label="销售组织"
                      placeholder="销售组织"
                    />

                    <van-field
                      required
                      label-width="105"
                      v-model="item.unitname3"
                      readonly
                      name="大区"
                      label="大区"
                      placeholder="大区"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.unitname4"
                      readonly
                      name="省区"
                      label="省区"
                      placeholder="省区"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.shaddr"
                      :readonly="orderReadOnly"
                      name="送达方代码"
                      label="送达方代码"
                      placeholder="送达方代码"
                    />
                    <van-field
                      label-width="105"
                      v-model="item.shid"
                      :readonly="orderReadOnly"
                      name="送达方"
                      label="送达方"
                      placeholder="送达方"
                    />

                    <div class="copy">
                      <van-button
                        round
                        type="danger"
                        size="small"
                        color="#e85452"
                        @click="deletePdtItem(index)"
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
      <van-tab title="审批进度">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
          <!-- 商品明细 -->

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
  </div>

  <!-- 下滑弹窗 主要是一些配置项 -->
  <van-action-sheet
    ref="actionSheet"
    v-model:show="actionShow"
    :actions="actionItems"
    @select="selectItemAction"
    :description="actionDesc"
    cancel-text="取消"
  />
  <!-- 所属银行的选择 -->
  <van-popup
    v-model:show="shwoBankSelect"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <ErpBankSelect
      :showDw="shwoBankSelect"
      v-on="{ selectItem: selectBankItem }"
    />
  </van-popup>
  <!-- 侧滑窗口 选择 业务员-->
  <van-popup
    v-model:show="showItemPdtSelect"
    position="right"
    :style="{ height: '80%', width: '80%' }"
  >
    <ErpEmployeeSelect
      :showEmployee="showItemPdtSelect"
      v-on="{ selectEmployeeItem: selectEmployeeItem }"
    />
  </van-popup>
</template>

<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";
import { Dialog, Notify } from "vant";
import {
  info,
  add,
  update,
  unitCodeInfo,
  apply,
  deleteVd05,
  applySap,
} from "@/api/erp.vendor.js";
import NavBar from "@/components/NavBar.vue";
import ErpBankSelect from "@/components/ErpBankSelect.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import { getDefaultOrgCoNo } from "@/utils/user.setting";

import { listOaStatus } from "@/api/erp.oa.js";

import {
  getVd05KhzList,
  getVd05ZhhzList,
  getVd05FkfsList,
} from "@/utils/erp.base.data.js";

export default {
  name: "VendorDetail",
  components: {
    NavBar,
    Scroll,
    ErpBankSelect,
    ErpEmployeeSelect,
  },
  data() {
    return {
      docno: null,
      orderReadOnly: false,
      oaStatusArr: [],
      checked: [],
      checkboxRefs: [],
      //// 客户组枚举类型 集合
      ///   默认的状态
      editStatus: "view",
      khzList: [],
      zhhzList: [],
      ////  主表的按钮是否可见
      fkfsList: [],

      tabActive: 0,
      actionItems: [],
      actionShow: false,

      /// 所属银行的弹窗 是否显示
      shwoBankSelect: false,

      // 是否显示 区域配置 的弹窗
      showItemPdtSelect: false,
      activePdtItemIndex: 0,

      btnDeleteShow: false,
      btnAddShow: false,
      btnSaveShow: false,
      btnEditShow: false,
      btnAuditShow: false,
      btnCancelAuditShow: false,
      btnSapShow: false,
      btnCancelShow: false,
      cmpTypeList: [
        { name: "客户", key: "type1", value: true },
        { name: "供应商", key: "type2" },
        { name: "物流公司", key: "type3" },
        { name: "仓库", key: "type13" },
        { name: "保险公司", key: "type4" },
        { name: "集团往来", key: "type5" },
        { name: "后勤往来", key: "type10" },
        { name: "个人往来", key: "type8" },
        { name: "银行", key: "type9" },
        { name: "协作方", key: "type11" },
        { name: "店铺", key: "type14" },
        { name: "其他", key: "type7" },
      ],
      pdtItemsActiveIndex: 0,
      infoForm: {},
      oldFormData: {},
    };
  },
  watch: {
    tabActive: {
      handler(oldVal, newVal) {
        if (newVal === 0) {
          this.$refs.main.refresh();
        } else if (newVal === 3) {
          this.$refs.file.refresh();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    document.title = this.$route.matched[0].meta.name;
    this.docno = this.$route.query.docno;
    getVd05KhzList().then((res) => {
      this.khzList.push(...res);
    });
    getVd05ZhhzList().then((res) => {
      this.zhhzList.push(...res);
    });
    getVd05FkfsList().then((res) => {
      this.fkfsList.push(...res);
    });
    if (this.docno && this.docno !== "") {
      this.loadDetail();
    } else {
      this.addOrder();
    }
  },

  setup() {
    provide("title", "往来单位详情");
  },
  mounted() {},
  updated() {},

  methods: {
    mainBtnClickCancel() {
      Dialog.confirm({
        title: "取消对单据的操作",
        message: "当前操作将不会保存您对单据的修改!",
      })
        .then(() => {
          if (this.oldFormData && this.oldFormData.docno) {
            this.formData = this.oldFormData;
            this.orderReadOnly = true;
            this.editStatus = "view";
            this.loadDetail();
            setBtnStatus(this);
          } else {
            // this.formData = {};
            this.$router.go(-1);
          }
        })
        .catch((error) => {
          console.log("点击取消按钮报错", error);
        });
    },
    onClickTab(title) {
      console.log(title);
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      } else if (title === 3) {
        this.$nextTick((_) => {
          this.$refs.file.refresh();
        });
      }
    },
    // 新增一个往来单位
    addOrder() {
      this.tabActive = 0;
      this.infoForm = {};
      this.infoForm.vendorNo = "";
      this.infoForm.auditstatus = "D";
      this.infoForm.strAuditFlag = null;
      this.infoForm.orggroup = "江西汇和";
      this.infoForm.pkid = null;
      this.infoForm.orgcono = getDefaultOrgCoNo();
      this.infoForm.userItems = [];
      this.infoForm.auditname = "未提交审批";
      this.editStatus = "add";
      this.setBtnStatus();
    },
    /// 新增一个区域配置明细
    handleAddPdtItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      let type1 = this.infoForm.type1;
      if (type1 !== "Y") {
        Notify({ type: "warning", message: "非客户,不可选择区域配置!" });
        return;
      }
      this.showItemPdtSelect = true;
      this.activePdtItemIndex = -1;
    },
    //// 选择商品名称
    itemSelectEmployee(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      let type1 = this.infoForm.type1;
      if (type1 !== "Y") {
        Notify({ type: "warning", message: "非客户,不可选择区域配置!" });
        return;
      }
      this.activePdtItemIndex = index;

      this.showItemPdtSelect = true;
    },

    selectEmployeeItem(item) {
      this.showItemPdtSelect = false;
      console.log("选择了一个业务员", item);
      unitCodeInfo({ orgNo: item.orgNo, shearId: item.shearid }).then((res) => {
        console.log("取数", res);
        let data = res.data;
        if (this.activePdtItemIndex === -1) {
          /// 新增
          let newRow = {
            shearid: item.shearid,
            username: item.userName,
            unitname1: data.name1,
            unitname2: data.name2,
            unitname3: data.name3,
            unitname4: data.name4,

            flag: "0",
            flag1: "1",
            history: "0",
            orgNo: item.orgNo,
            orgName: item.orgName,
            userNo: item.userNo,
            bzirk: data.code2,
            vkbur: data.code4,
            vkgrp: data.code5,
            vkorg: data.code3,
            shaddr: "",
            shid: "",
          };
          this.infoForm.userItems.push(newRow);
        } else {
          this.infoForm.userItems[this.activePdtItemIndex].shearid =
            item.shearid;
          this.infoForm.userItems[this.activePdtItemIndex].username =
            item.userName;
          this.infoForm.userItems[this.activePdtItemIndex].unitname1 =
            data.name1;
          this.infoForm.userItems[this.activePdtItemIndex].unitname2 =
            data.name2;
          this.infoForm.userItems[this.activePdtItemIndex].unitname3 =
            data.name3;
          this.infoForm.userItems[this.activePdtItemIndex].unitname4 =
            data.name4;
          this.infoForm.userItems[this.activePdtItemIndex].shaddr = "";
          this.infoForm.userItems[this.activePdtItemIndex].shid = "";

          this.infoForm.userItems[this.activePdtItemIndex].flag = "0";
          this.infoForm.userItems[this.activePdtItemIndex].flag1 = "1";
          this.infoForm.userItems[this.activePdtItemIndex].history = "0";
          this.infoForm.userItems[this.activePdtItemIndex].orgNo = item.orgNo;
          this.infoForm.userItems[this.activePdtItemIndex].orgName =
            item.orgName;
          this.infoForm.userItems[this.activePdtItemIndex].userNo = item.userNo;
          this.infoForm.userItems[this.activePdtItemIndex].bzirk = data.code2;
          this.infoForm.userItems[this.activePdtItemIndex].vkbur = data.code4;
          this.infoForm.userItems[this.activePdtItemIndex].vkgrp = data.code5;
          this.infoForm.userItems[this.activePdtItemIndex].vkorg = data.code3;
        }
      });
    },
    selectBankItem(item) {
      console.log("选择了项目", item);
      this.infoForm.bankname = item.refValue;
      this.shwoBankSelect = false;
    },

    /// 主表点击了某个字段，下方弹窗。
    mainFieldClickOfRight(fieldName) {
      console.log("右侧滑出", fieldName);
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activeFormFiled = fieldName;
      if (fieldName === "bankname") {
        this.shwoBankSelect = true;
      }
    },
    /////主表选择了一些枚举类型的数据，下方弹窗
    mainFieldClick(fieldName) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activeFormFiled = fieldName;
      // 根据 当前字段 重置 reset
      this.resetActionItems(fieldName);
      this.actionShow = true;
    },
    selectItemAction(item) {
      if (this.activeFormFiled === "type6") {
        this.infoForm.type6 = item.code;
      } else if (this.activeFormFiled === "vndcst") {
        this.infoForm.vndcst = item.code;
      } else if (this.activeFormFiled === "grade") {
        this.infoForm.grade = item.code;
      } else if (this.activeFormFiled === "banktypeno") {
        this.infoForm.banktypeno = item.code;
      } else if (this.activeFormFiled === "type") {
        let type1 = this.infoForm.type1;

        if (type1 === "Y" && item.code === "type1") {
          console.log("无变化");
        } else if (type1 === "Y" && item.code !== "type1") {
          console.log("选择了公司类型", item);
          Dialog.confirm({
            title: "提示",
            message: "当前公司类型从【客户】修改为其他类型,将删除区域配置信息?",
          })
            .then(() => {
              this.infoForm.type1 = "";
              this.infoForm.type2 = "";
              this.infoForm.type3 = "";
              this.infoForm.type13 = "";
              this.infoForm.type4 = "";
              this.infoForm.type5 = "";
              this.infoForm.type10 = "";
              this.infoForm.type8 = "";
              this.infoForm.type9 = "";
              this.infoForm.type11 = "";
              this.infoForm.type14 = "";
              this.infoForm.type7 = "";
              this.infoForm[item.code] = item.value;
              this.infoForm.userItems = [];
            })
            .catch((res) => {});
        } else {
          this.infoForm.type1 = "";
          this.infoForm.type2 = "";
          this.infoForm.type3 = "";
          this.infoForm.type13 = "";
          this.infoForm.type4 = "";
          this.infoForm.type5 = "";
          this.infoForm.type10 = "";
          this.infoForm.type8 = "";
          this.infoForm.type9 = "";
          this.infoForm.type11 = "";
          this.infoForm.type14 = "";
          this.infoForm.type7 = "";

          this.infoForm[item.code] = item.value;
        }

        //this.infoForm[item.code] = item.value;
        // if (this.infoForm[item.code] === item.code) {
        //   this.infoForm.type10 = item.value;
        // }
      } else {
        this.infoForm[item.code] = item.value;
      }
      this.actionShow = false;
      this.activeFormFiled = "";
    },
    /// 主表的枚举项处理
    resetActionItems(filedName) {
      this.actionItems = [];
      if (filedName === null || filedName === "") {
        return;
      }
      if (filedName === "type6") {
        this.actionDesc = "请选择境内外";
        let item = { name: "境内", code: "A" };
        this.actionItems[0] = item;
        let item1 = { name: "境外", code: "B" };
        this.actionItems[1] = item1;
      } else if (filedName === "vndcst") {
        this.actionDesc = "请选择客户组";
        for (let index = 0; index < this.khzList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.khzList[index].refValue;
          item.code = this.khzList[index].refValueCode;
          this.actionItems[index] = item;
        }
      } else if (filedName === "grade") {
        this.actionDesc = "请选择账户组";
        for (let index = 0; index < this.zhhzList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.zhhzList[index].refValue;
          item.code = this.zhhzList[index].refValueCode;
          this.actionItems[index] = item;
        }
      } else if (filedName === "banktypeno") {
        this.actionDesc = "请选择付款方式";
        for (let index = 0; index < this.fkfsList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.fkfsList[index].refValue;
          item.code = this.fkfsList[index].refValueCode;
          this.actionItems[index] = item;
        }
      } else if (filedName === "type") {
        this.actionDesc = "请选择公司类型";
        this.actionItems = [
          { name: "客户", code: "type1", value: "Y" },
          { name: "供货商", code: "type2", value: "Y" },
          { name: "物流公司", code: "type3", value: "Y" },
          { name: "仓库", code: "type13", value: "Y" },
          { name: "保险公司", code: "type4", value: "Y" },
          { name: "集团往来", code: "type5", value: "Y" },
          { name: "后勤往来", code: "type10", value: "Y" },
          { name: "个人往来", code: "type8", value: "Y" },
          { name: "银行", code: "type9", value: "Y" },
          { name: "协作方", code: "type11", value: "Y" },
          { name: "店铺", code: "type14", value: "Y" },
          { name: "其他", code: "type7", value: "Y" },
        ];
      }
    },
    loadOaStatus() {
      console.log("展示审批进度");
      let docentry = this.infoForm.pkid;
      let isNo = this.infoForm.docno;
      let oatype = "VD05_N";
      let type1 = this.infoForm.type1;
      if (type1 === "Y") {
        oatype = "VD05_A";
      }
      listOaStatus(oatype, docentry, isNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();

          console.log("zzzz", res.data);
        })
        .catch((res) => {});
    },
    //加载 当前的数据
    loadDetail() {
      if (!this.docno) {
        this.docno = this.infoForm.docno;
      }
      info({ docno: this.docno })
        .then((res) => {
          this.infoForm = res.data;
          this.loadOaStatus();
          this.setBtnStatus();
          this.oldFormData = this.infoForm;
        })
        .catch((res) => {});
    },

    mainBtnClickAudit() {
      if (this.infoForm.pkid) {
        apply({ docEntry: this.infoForm.pkid })
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
      }
    },
    mainBtnClickSap() {
      applySap({ docEntry: this.infoForm.pkid })
        .then((res) => {
          Notify({ type: "success", message: "提交SAP成功!" });
          this.loadData();
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
    },
    mainBtnClickAdd() {
      this.addOrder();
    },
    mainBtnClickEdit() {
      this.editStatus = "edit";
      this.setBtnStatus();
    },
    beforeDoSave() {
      let vartemp = this.infoForm.abbreviation;
      if (vartemp === "" || !vartemp) {
        Notify({ type: "danger", message: "往来单位必须输入简称!" });
        return false;
      }
      let type6 = this.infoForm.type6;
      let type1 = this.infoForm.type1;

      if (type6 === "A") {
        /// 境内
        let tmpvar = this.infoForm.conamec;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须输入中文名称!" });
          return false;
        }
        tmpvar = this.infoForm.taxno;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({
            type: "danger",
            message: "境内往来单位必须输入社会信用代码!",
          });
          return false;
        }
        tmpvar = this.infoForm.banktypeno;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须选择付款方式!" });
          return false;
        }
        tmpvar = this.infoForm.bankname2;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须输入开户银行!" });
          return false;
        }
        tmpvar = this.infoForm.snapsno;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须输入联行号!" });
          return false;
        }
        tmpvar = this.infoForm.accountno2;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({
            type: "danger",
            message: "境内往来单位必须输入账号(增值税)!",
          });
          return false;
        }
        tmpvar = this.infoForm.phone2;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({
            type: "danger",
            message: "境内往来单位必须输入电话(增值税)!",
          });
          return false;
        }
        tmpvar = this.infoForm.statee;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须输入中文省份!" });
          return false;
        }
        tmpvar = this.infoForm.citye;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境内往来单位必须输入中文城市!" });
          return false;
        }
      } else if (type6 === "B") {
        /// 境外
        let tmpvar = this.infoForm.conamee;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "境外往来单位必须输入英文名称!" });
          return false;
        }
        tmpvar = this.infoForm.countrye;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({
            type: "danger",
            message: "境外往来单位必须输入国家/地区(中)!",
          });
          return false;
        }
        tmpvar = this.infoForm.vendorc1;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({
            type: "danger",
            message: "境外往来单位必须输入国家/地区(英)!",
          });
          return false;
        }
        if (type1 === "Y") {
          tmpvar = this.infoForm.vendorc3;
          if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
            Notify({
              type: "danger",
              message: "境外客户必须输入城市(英)!",
            });
            return false;
          }
          tmpvar = this.infoForm.facility;
          if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
            Notify({
              type: "danger",
              message: "境外客户必须输入地址(英)!",
            });
            return false;
          }
        }
      } else {
        /// 错误
        Notify({
          type: "danger",
          message: "请确定往来单位是否境外!",
        });
        return false;
      }
      ///// 非 客户
      if (type1 !== "Y") {
        let tmpvar = this.infoForm.bankname;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "非客户,必须选择所属银行!" });
          return false;
        }
        tmpvar = this.infoForm.strAuditFlag;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "非客户,必须选择输入账期!" });
          return false;
        }
        tmpvar = this.infoForm.grade;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "非客户,必须选择选择账户组!" });
          return false;
        }
      } else {
        /////     客户
        let tmpvar = this.infoForm.vndcst;
        if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
          Notify({ type: "danger", message: "客户,必须选择客户组!" });
          return false;
        }
        let type6 = this.infoForm.type6;
        if (type6 === "A") {
          tmpvar = this.infoForm.coaddre;
          if (!tmpvar | (tmpvar === "") | (tmpvar === undefined)) {
            Notify({ type: "danger", message: "境内客户,必须输入地址(中)!" });
            return false;
          }
        }
      }
      return true;
    },

    saveAfter() {
      this.editStatus = "view";
      this.setBtnStatus();
    },

    mainBtnClickDelete() {
      Dialog.confirm({
        title: `确定删除当前往来单位吗?`,
        message: `合同【${this.infoForm.docno}】一旦删除，则无法恢复!`,
      })
        .then(() => {
          deleteVd05({ idList: this.infoForm.docno })
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

    mainBtnClickSave() {
      let check = this.beforeDoSave();
      if (!check) {
        return;
      }
      let pkid = this.infoForm.pkid;
      let docno = this.infoForm.docno;
      if (pkid > 0 && docno) {
        update(this.infoForm)
          .then((res) => {
            console.log("更新往来单位返回值", res);
            this.infoForm = res.data;
            //            this.docno = res.data.docno;
            Notify({ type: "success", message: "更新往来单位信息成功！" });
            this.saveAfter();
          })
          .catch((res) => {
            Notify({ type: "danger", message: res });
          });
      } else {
        add(this.infoForm)
          .then((res) => {
            console.log("保存往来单位返回值", res);
            this.infoForm = res.data;
            this.docno = res.data.docno;
            Notify({ type: "success", message: "新增往来单位信息成功！" });
            this.saveAfter();
          })
          .catch((res) => {
            Notify({ type: "danger", message: res });
          });
      }
    },

    doDeletePdtItem(index) {
      if (this.infoForm.userItems[index].vendorno) {
        var len = this.infoForm.filterItems.length;
        this.infoForm.filterItems[len] = this.infoForm.userItems[index];
      }

      this.infoForm.userItems.splice(index, 1);
    },
    deletePdtItem(index) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前区域配置吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index);
        })
        .catch((res) => {});
    },

    /// 设置 按钮的状态
    setBtnStatus() {
      /// 新增状态 和 编辑状态
      if (this.editStatus === "add" || this.editStatus === "edit") {
        this.btnSaveShow = true;
        this.btnCancelShow = true;

        this.btnAddShow = false;
        this.btnEditShow = false;
        this.btnAuditShow = false;
        this.btnSapShow = false;
        this.btnCancelAuditShow = false;
        this.btnDeleteShow = false;

        this.orderReadOnly = false;
        /// 视图状态
      } else if (this.editStatus === "view") {
        this.orderReadOnly = true;
        // 新增按始终显示
        this.btnAddShow = true;
        //  保存 、取消按钮 始终不显示
        this.btnSaveShow = false;
        this.btnCancelShow = false;
        /////  提交sap按钮 默认不显示
        this.btnSapShow = false;
        this.btnAuditShow = true;
        this.btnDeleteShow = true;
        this.btnEditShow = true;

        let auditStatu = this.infoForm.auditStatus;

        console.log("设置按钮", auditStatu);
        if (auditStatu === "D") {
          // 未提交审批
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
        } else if (auditStatu === "S") {
          /////////////// 申请审批
          this.btnDeleteShow = false; // 不可删除
          this.btnEditShow = false; // 不可以编辑
          this.btnAuditShow = false; //  不可再次提交审批
          this.btnCancelAuditShow = true; //撤销审批
        } else if (auditStatu === "Y") {
          /////////////审批同意
          this.btnDeleteShow = false; // 不可删除
          this.btnEditShow = false; //  不可编辑
          this.btnAuditShow = false; ///不可提交审批
          this.btnCancelAuditShow = true; ////可以撤销审批
          let sapcode = this.infoForm.sapcode;
          if (!sapcode || sapcode === "" || sapcode === undefined) {
            this.btnSapShow = true; ////提交sap
          }
        } else if (auditStatu === "N") {
          /////////////审批同意
          this.btnDeleteShow = true; // 不可删除
          this.btnEditShow = true; //  不可编辑
          this.btnAuditShow = true; ///不可提交审批
          this.btnCancelAuditShow = false; ////可以撤销审批
          this.btnSapShow = false; ////提交sap
        } else if (auditStatu === "SU") {
          ////申请撤销
          this.btnDeleteShow = false;
          this.btnEditShow = false;
          this.btnAuditShow = false;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        } else if (auditStatu === "UN") {
          ////同意撤销
          this.btnDeleteShow = true;
          this.btnEditShow = true;
          this.btnAuditShow = true;
          this.btnCancelAuditShow = false;
          this.btnSapShow = false;
        }
      }
    },
  },
  //// 计算列
  computed: {
    computedBankTypeNo: function () {
      let banktypeno = this.infoForm.banktypeno;
      for (var i = 0; i < this.fkfsList.length; i++) {
        if (this.fkfsList[i].refValueCode === banktypeno) {
          return this.fkfsList[i].refValue;
        }
      }
      //infoForm.banktypeno
      return banktypeno;
    },

    computedGrade: function () {
      let grade = this.infoForm.grade;
      for (var i = 0; i < this.zhhzList.length; i++) {
        if (this.zhhzList[i].refValueCode === grade) {
          return this.zhhzList[i].refValue;
        }
      }
      return grade;
    },

    computedVndcst: function () {
      let vndcst = this.infoForm.vndcst;
      for (var i = 0; i < this.khzList.length; i++) {
        if (this.khzList[i].refValueCode === vndcst) {
          return this.khzList[i].refValue;
        }
      }
      return "";
    },
    computedType6: function () {
      console.log("zzzzzzzzzz", this.infoForm);
      let type6 = this.infoForm.type6;
      if (type6 === "A") {
        return "境内";
      } else if (type6 === "B") {
        return "境外";
      }
      return "";
    },
    computedType: function () {
      let tempType = this.infoForm.type1;
      if (tempType === "Y") {
        return "客户";
      }
      tempType = this.infoForm.type2;
      if (tempType === "Y") {
        return "供货商";
      }
      tempType = this.infoForm.type3;
      if (tempType === "Y") {
        return "物流公司";
      }
      tempType = this.infoForm.type13;
      if (tempType === "Y") {
        return "仓库";
      }

      tempType = this.infoForm.type4;
      if (tempType === "Y") {
        return "保险公司";
      }
      tempType = this.infoForm.type5;
      if (tempType === "Y") {
        return "集团往来";
      }
      tempType = this.infoForm.type10;
      if (tempType === "Y") {
        return "后勤往来";
      }
      tempType = this.infoForm.type8;
      if (tempType === "Y") {
        return "个人往来";
      }
      tempType = this.infoForm.type9;
      if (tempType === "Y") {
        return "银行";
      }

      tempType = this.infoForm.type11;
      if (tempType === "Y") {
        return "协作方";
      }

      tempType = this.infoForm.type14;
      if (tempType === "Y") {
        return "店铺";
      }
      tempType = this.infoForm.type7;
      if (tempType === "Y") {
        return "其他";
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
</style>
