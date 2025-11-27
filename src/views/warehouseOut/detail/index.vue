<template>
  <div>
    <nav-bar
      v-on="{
        setChangeNewOrgCo,
      }"
    />
    <!-- :isCanClick="false" -->
    <!-- handleClickBack  -->
    <div class="tools-bar">
      <van-button
        v-show="btnSaveShow"
        size="small"
        class="tools-bar-button"
        @touchstart="handleUpdate"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
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
        v-if="isShowPdfview"
        @click="handlePreview"
        >预览</van-button
      >
    </div>
    <van-tabs v-model:active="tabActive" class="magin-top:20px">
      <van-tab title="主表信息">
        <div class="scroll-wrap-main-table">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              v-model="computedOrgCo"
              label="平台公司"
              readonly
              placeholder="平台公司"
            />
            <van-field v-model="formData.wareDate" label="制单日期" readonly />
            <van-field v-model="formData.empName" label="制单人" readonly />
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="auditStatusList"
              :label="'审批状态'"
              :placeholder="'审批状态'"
              :readonly="true"
              :btnStatus="editStatus"
              :field="formData.adtStatus"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'adtStatus')
              "
            />
            <van-field v-model="formData.wareHsNo" label="出库单号" readonly />
            <van-field
              v-model="formData.wareHsClss"
              label="单据类型"
              readonly
              placeholder="单据类型"
            />
            <van-field
              v-model="formData.wareLoc"
              label="仓库"
              readonly
              required
              placeholder="请选择仓库"
              @click="wareLocClick"
            />
            <RcmSelect
              :select-label="'refValue'"
              :select-value="'refValueCode'"
              :valueKey="'refValue'"
              :options="objectNo3List"
              :label="'合同类型'"
              :name="'合同类型'"
              :placeholder="'合同类型'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.objectNo3"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'objectNo3')
              "
            />
            <van-field
              readonly
              v-model="formData.expNoticNo"
              label="合同号"
              required
              placeholder="请选择合同号"
              @click="expNoticNoClick()"
            />
            <van-field
              readonly
              v-model="formData.ticketNo"
              label="客户合同号"
              placeholder="自动带出，无需录入"
            />
            <van-field
              v-model="getObjectNo"
              label="贸易方式"
              placeholder="系统生成 无需录入"
              readonly
            />
            <van-field
              readonly
              v-model="formData.custNo"
              label="客户号"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.custName"
              label="客户名称"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.orgName"
              label="部门"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.employeeName"
              label="业务员"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.currencyCode"
              label="币别"
              placeholder="系统生成 无需录入"
            />
            <!-- <RcmSelect
                :select-label="'currencyName'"
                :select-value="'currencyCode'"
                :valueKey="'currencyName'"
                :options="currencyCodeList"
                :label="'币别'"
                :placeholder="'币别'"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="formData.currencyCode"
                @change="({label, value}) => changeRcmSelect({label, value}, 'currencyCode')"
              /> -->
            <van-field
              :readonly="orderReadOnly"
              type="number"
              v-model="formData.exchangRt"
              label="原币折RMB汇率"
              placeholder="原币折RMB汇率"
            />
            <van-field
              readonly
              v-model="formData.rpAmount"
              label="出库金额"
              placeholder="系统生成 无需录入"
            />
            <RcmSelect
              :select-label="'refValue'"
              :select-value="'refValueCode'"
              :valueKey="'refValue'"
              :options="outTypeList"
              :label="'提货方式'"
              :placeholder="'提货方式'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :required="true"
              :field="formData.outType"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'outType')
              "
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.customerID"
              label="账期天数"
              required
              placeholder="请输入账期天数"
              type="number"
            />
            <RcmSelect
              :select-label="'label'"
              :select-value="'value'"
              :valueKey="'label'"
              :options="feePayerList"
              :label="'出仓费用'"
              :placeholder="'出仓费用'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.feePayer"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'feePayer')
              "
            />
            <RcmSelect
              :select-label="'refValue'"
              :select-value="'refValueCode'"
              :valueKey="'refValue'"
              :options="rcvPrtList"
              :label="'运费支付'"
              :placeholder="'运费支付'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.rcvPrt"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'rcvPrt')
              "
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.transFee"
              type="number"
              label="运费"
              placeholder="请输入运费"
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.transCo"
              label="运输公司"
              placeholder="请输入运输公司"
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.shipMemo"
              label="运输说明"
              placeholder="请输入运输说明"
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.remark"
              label="备注"
              placeholder="请输入备注"
            />
            <!-- <van-field
                v-model="formData.wareHsW"
                label="字"
                readonly
                placeholder="字"
              />
              <van-field
                v-model="formData.wareHsNo"
                label="号"
                readonly
                placeholder="号"
              /> -->
            <van-field
              readonly
              v-model="formData.sapCreateDate"
              label="SAP创建日期"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.sapStatus"
              label="SAP状态"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.sapVouNo"
              label="SAP交货单号"
              placeholder="系统生成 无需录入"
            />
            <van-field
              readonly
              v-model="formData.printFlag"
              label="打印"
              placeholder="系统生成 无需录入"
            />
          </van-form>
        </div>
      </van-tab>

      <van-tab title="出库商品">
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelPdtAction"
              style="magin-right: 10px"
              >撤销所有商品操作</van-button
            >
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="addGoods"
              style="magin-right: 10px"
              >添加商品</van-button
            >
          </div>

          <!-- 出库商品明细 -->
          <van-collapse v-model="pdtItemsActiveIndex" accordion>
            <div class="scroll-wrap">
              <van-collapse-item
                v-for="(item, index) in formData.m1Items"
                :key="index"
                :name="index"
                :title="item.pdtName"
                :is-link="false"
              >
                <template #title>
                  <div class="collapse-slot-title">
                    <span>{{ item.pdtName }}</span>
                    <van-checkbox
                      v-model="item.checked"
                      @click="selectPdtCheck(item)"
                    />
                  </div>
                </template>
                <!-- <Scroll
                  class="wrappers-goods-detail wrappers"
                  wrapper="goodsDetailRef"
                  ref="goodsDetail"
                > -->
                <!-- <div class="scroll-wrap"> -->
                <van-form label-width="120">
                  <van-field
                    v-model="item.groupNo"
                    readonly
                    label="组号"
                    placeholder="组号"
                  />
                  <!-- <van-field
                      is-link
                      v-model="item.pdtName"
                      readonly
                      label="中文品名"
                      placeholder="中文品名"
                      @click="itemSelectPdt(index)"
                    /> -->
                  <van-field
                    v-model="item.specification"
                    label="规格"
                    placeholder="规格"
                    :readonly="orderReadOnly"
                  />
                  <van-field
                    v-model="item.uom"
                    readonly
                    label="销售单位"
                    placeholder="销售单位"
                  />
                  <van-field
                    v-model="item.amountPs"
                    label="装箱率"
                    placeholder="装箱率"
                    :readonly="orderReadOnly"
                  />
                  <van-field
                    v-model="item.outQnttyItem1"
                    label="应出件数"
                    placeholder="应出件数"
                    :readonly="orderReadOnly"
                  />
                  <van-field
                    v-model="item.outQnttyPiece1"
                    :readonly="orderReadOnly"
                    label="应出数量"
                    placeholder="应出数量"
                    @change="
                      (e) =>
                        changeOutQnttyPiece1(
                          e,
                          item,
                          index,
                          'm1ItemOutQnttyPiece1'
                        )
                    "
                  />
                  <van-field
                    v-model="item.hsdj"
                    required
                    readonly
                    @change="changePdtItemNum(index, 'hsdj')"
                    label="销售单价"
                    placeholder="销售单价"
                  />
                  <van-field
                    v-model="item.transferAmountOut"
                    readonly
                    @change="changePdtItemNum(index, 'transferAmountOut')"
                    label="销售金额"
                    placeholder="销售金额"
                    required
                  />

                  <van-field
                    v-model="item.outFQnttyItem1"
                    readonly
                    label="实出件数"
                    placeholder="实出件数"
                  />
                  <van-field
                    v-model="item.outFQnttyPiece1"
                    readonly
                    label="实出数量"
                    placeholder="实出数量"
                  />
                  <van-field
                    v-model="item.atr"
                    label="增值税率"
                    placeholder="增值税率"
                    type="number"
                    :readonly="orderReadOnly"
                  />
                  <van-field
                    v-model="item.pdtVndNo"
                    readonly
                    label="产品号"
                    placeholder="产品号"
                  />
                  <van-field
                    v-model="item.pdtNameE"
                    readonly
                    label="英文品名"
                    placeholder="英文品名"
                  />
                  <van-field
                    v-model="item.isNo"
                    readonly
                    label="销售合同/出口发票"
                    placeholder="销售合同/出口发票"
                  />
                  <van-field
                    v-model="item.isMid"
                    readonly
                    label="识别码"
                    placeholder="识别码"
                  />
                  <van-field
                    v-model="item.sapUnit"
                    readonly
                    label="SAP计量单位"
                  />
                  <van-field
                    v-model="item.sapPrice"
                    readonly
                    label="SAP单价(人民币)"
                    placeholder="SAP单价(人民币)"
                  />
                  <van-field
                    v-model="item.sapUnitRate"
                    readonly
                    label="SAP转换比"
                    placeholder="SAP转换比"
                    @change="changePdtItemNum(index, 'sapUnitRate')"
                  />
                  <van-field
                    v-model="item.sapQty"
                    readonly
                    label="SAP应出数量"
                    placeholder="SAP应出数量"
                  />
                  <van-field
                    v-model="item.sapQty1"
                    readonly
                    label="SAP实出数量"
                    placeholder="SAP实出数量"
                  />
                  <div class="copy">
                    <van-button
                      round
                      type="danger"
                      size="small"
                      color="#e85452"
                      @click="deletePdtItem(index, 'm1Items')"
                      >删除</van-button
                    >
                  </div>
                </van-form>
                <!-- </div> -->
                <!-- </Scroll> -->
              </van-collapse-item>
            </div>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="出库清单">
        <div class="detail_item">
          <div class="pdt_bt">
            <van-button
              type="warning"
              size="small"
              color="#e8c048"
              @click="handleCancelPdtAction"
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
          </div>

          <!-- 出库清单明细 -->
          <van-collapse v-model="pdtItemsActiveIndex" accordion>
            <div class="scroll-wrap">
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index"
                :title="item.pdtName"
              >
                <!-- :title="item.pdtVndNo" -->
                <van-form label-width="120">
                  <van-field
                    v-model="item.groupNo"
                    readonly
                    label="组号"
                    placeholder="组号"
                  />
                  <!-- <van-field
                    is-link
                    v-model="item.pdtName"
                    readonly
                    label="中文品名"
                    placeholder="中文品名"
                    @click="itemSelectPdt(index)"
                  /> -->
                  <van-field
                    v-model="item.specification"
                    label="规格型号"
                    placeholder="规格型号"
                    readonly
                  />
                  <van-field
                    v-model="item.lotNo"
                    readonly
                    label="批号"
                    placeholder="批号"
                  />
                  <van-field
                    v-model="item.otherRate"
                    label="含量(%)"
                    placeholder="含量(%)"
                    :readonly="orderReadOnly"
                  />
                  <van-field
                    v-model="item.uom"
                    readonly
                    required
                    label="销售单位"
                    placeholder="销售单位"
                  />
                  <van-field
                    v-model="item.outQnttyItem1"
                    :readonly="orderReadOnly"
                    label="应出件数"
                    placeholder="应出件数"
                  />
                  <van-field
                    v-model="item.outQnttyPiece1"
                    :readonly="orderReadOnly"
                    label="应出数量"
                    placeholder="应出数量"
                    @change="
                      (e) =>
                        changeOutQnttyPiece1(
                          e,
                          item,
                          index,
                          'itemOutQnttyPiece1'
                        )
                    "
                  />
                  <!-- @change="changePdtItemNum(index, 'outQnttyPiece1')" -->
                  <van-field
                    v-model="item.hsdj"
                    readonly
                    label="销售单价"
                    placeholder="销售单价"
                  />
                  <!-- @change="changePdtItemNum(index, 'hsdj')" -->

                  <van-field
                    v-model="item.transferAmountOut"
                    readonly
                    label="销售金额"
                    placeholder="销售金额"
                    @change="
                      (e) =>
                        changeOutQnttyPiece1(
                          e,
                          item,
                          index,
                          'transferAmountOut'
                        )
                    "
                  />
                  <van-field
                    v-model="item.unitCost2"
                    readonly
                    label="结算价"
                    placeholder="结算价"
                  />
                  <van-field
                    v-model="item.unitCost"
                    readonly
                    label="含税成本价"
                    placeholder="含税成本价"
                  />
                  <van-field
                    v-model="item.unitCostNT"
                    readonly
                    label="无税成本价"
                    placeholder="无税成本价"
                  />
                  <van-field
                    v-model="item.amntRMB"
                    readonly
                    label="含税金额"
                    placeholder="含税金额"
                  />
                  <van-field
                    v-model="item.amntRMBNt"
                    readonly
                    label="无税金额"
                    placeholder="无税金额"
                  />
                  <van-field v-model="item.atr" readonly label="增值税率(%)" />
                  <van-field
                    v-model="item.orderMid"
                    readonly
                    label="识别码"
                    placeholder="识别码"
                  />
                  <van-field
                    v-model="item.pdtVndNo"
                    readonly
                    label="产品号"
                    placeholder="产品号"
                  />
                  <van-field
                    v-model="item.pdtNameE"
                    readonly
                    label="英文品名"
                    placeholder="英文品名"
                  />
                  <van-field
                    v-model="item.wareHsNo2"
                    readonly
                    label="入库单号"
                    placeholder="入库单号"
                  />
                  <van-field
                    v-model="item.orderNo"
                    readonly
                    label="采购定单"
                    placeholder="采购定单"
                  />
                  <van-field
                    v-model="item.invoiceNo"
                    readonly
                    label="出口发票"
                    placeholder="出口发票"
                  />
                  <van-field
                    v-model="item.sapUnit"
                    readonly
                    label="SAP计量单位"
                    placeholder="SAP计量单位"
                  />
                  <van-field
                    v-model="item.sapUnitRate"
                    readonly
                    label="SAP转换比"
                    placeholder="SAP转换比"
                  />
                  <van-field
                    v-model="item.sapPrice"
                    readonly
                    label="SAP单价(人民币)"
                    placeholder="SAP单价(人民币)"
                  />
                  <van-field
                    v-model="item.sapQty"
                    readonly
                    label="SAP应出数量"
                    placeholder="SAP应出数量"
                  />
                  <van-field
                    v-model="item.sapQty1"
                    readonly
                    label="SAP实出数量"
                    placeholder="SAP实出数量"
                  />
                  <div class="copy">
                    <!-- <van-button
                      round
                      type="primary"
                      size="small"
                      class="width:50%"
                      >复制
                    </van-button> -->

                    <van-button
                      round
                      type="danger"
                      size="small"
                      color="#e85452"
                      @click="deletePdtItem(index, 'items')"
                      >删除</van-button
                    >
                  </div>
                </van-form>
              </van-collapse-item>
            </div>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="联系信息">
        <div class="scroll-wrap">
          <van-collapse v-model="activeContractCollapse">
            <van-collapse-item title="仓库信息" name="1">
              <RcmSelect
                :select-label="'refValue'"
                :select-value="'refValueCode'"
                :valueKey="'refValue'"
                :options="typeList"
                :label="'分类'"
                :placeholder="'分类'"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="contactFormW.type"
                @change="
                  ({ label, value }) =>
                    changeContactFormW({ label, value }, 'type')
                "
              />
              <van-field v-model="contactFormW.lxr" label="联系人" />
              <van-field v-model="contactFormW.phone" label="电话" />
              <van-field v-model="contactFormW.fax" label="传真" />
              <van-field v-model="contactFormW.idNo" label="证件号" />
              <van-field v-model="contactFormW.carNo" label="车号" />
              <van-field v-model="contactFormW.coName" label="公司名称" />
              <van-field
                v-model="contactFormW.addr"
                label="地址"
                type="textarea"
              />
            </van-collapse-item>
            <van-collapse-item title="卖方信息" name="2">
              <RcmSelect
                :select-label="'refValue'"
                :select-value="'refValueCode'"
                :valueKey="'refValue'"
                :options="typeList"
                :label="'分类'"
                :placeholder="'分类'"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="contactForm.type"
                @change="
                  ({ label, value }) =>
                    changeContactForm({ label, value }, 'type')
                "
              />
              <van-field v-model="contactForm.lxr" label="联系人" />
              <van-field v-model="contactForm.phone" label="电话" />
              <van-field v-model="contactForm.fax" label="传真" />
              <van-field v-model="contactForm.idNo" label="证件号" />
              <van-field v-model="contactForm.carNo" label="车号" />
              <van-field v-model="contactForm.coName" label="公司名称" />
              <van-field
                v-model="contactForm.addr"
                label="地址"
                type="textarea"
              />
            </van-collapse-item>
            <van-collapse-item title="买方信息" name="3">
              <RcmSelect
                :select-label="'refValue'"
                :select-value="'refValueCode'"
                :valueKey="'refValue'"
                :options="typeList"
                :label="'分类'"
                :placeholder="'分类'"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="contactFormB.type"
                @change="
                  ({ label, value }) =>
                    changeContactFormB({ label, value }, 'type')
                "
              />
              <van-field v-model="contactFormB.lxr" label="联系人" />
              <van-field v-model="contactFormB.phone" label="电话" />
              <van-field v-model="contactFormB.fax" label="传真" />
              <van-field v-model="contactFormB.idNo" label="证件号" />
              <van-field v-model="contactFormB.carNo" label="车号" />
              <van-field v-model="contactFormB.coName" label="公司名称" />
              <van-field
                v-model="contactFormB.addr"
                label="地址"
                type="textarea"
              />
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="附件">
        <div class="scroll-wrap-upload-file">
          <div class="pdt_bt">
            <!-- <van-button
                type="warning"
                size="small"
                color="#e8c048"
                @click="handleCancelPdtAction()"
                style="magin-right: 10px"
                >撤销所有商品操作</van-button
              > -->
            <van-button
              type="primary"
              size="small"
              color="#1fa2e8"
              @click="addFileItem"
              style="magin-right: 10px"
              >新增附件</van-button
            >
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
              <van-row gutter="0" class="btn-group-setting">
                <van-col :span="8">
                  <van-button
                    type="success"
                    color="#1fa2e8"
                    size="small"
                    round
                    @click="downFileItem(index)"
                  >
                    文件预览
                  </van-button>
                </van-col>
                <van-col :span="8">
                  <van-uploader
                    :after-read="(file) => uploadFile(file, index)"
                    class="uploader-file"
                    :disabled="orderReadOnly"
                  >
                    <van-button
                      type="success"
                      color="#1fa2e8"
                      size="small"
                      round
                      :disabled="orderReadOnly"
                    >
                      文件上传
                    </van-button>
                  </van-uploader>
                </van-col>
                <van-col :span="8">
                  <van-button
                    type="error"
                    round
                    color="#e85452"
                    size="small"
                    @click="deleteFileItem(index)"
                  >
                    删除
                  </van-button>
                </van-col>
              </van-row>
            </van-form>
          </div>
        </div>
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
    <!--选择合同号---销售合同-->
    <van-popup
      v-model:show="isShowExpNoticNo"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ExpNoticNoDialog
        :isShowExpNoticNo="isShowExpNoticNo"
        :objectNo3="formData.objectNo3"
        v-on="{ expNoticNoSelect: expNoticNoSelect }"
      />
    </van-popup>
    <!--选择合同号---转口销售、出口发票-->
    <van-popup
      v-model:show="isShowExpNoticNoOrSales"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ExpNoticNoOrSales
        :isShowExpNoticNoOrSales="isShowExpNoticNoOrSales"
        :objectNo3="formData.objectNo3"
        v-on="{ expNoticNoSelect: expNoticNoSelect }"
      />
    </van-popup>
    <!--销售合同项下出库商品-->
    <van-popup
      v-model:show="isShowGoodsDetail"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <GoodsDetailDialog
        :isShowGoodsDetail="isShowGoodsDetail"
        :ckForm="ckForm"
        v-on="{ handleMutiSelectGoods: handleMutiSelectGoods }"
      />
    </van-popup>
    <!--转口销售、出口发票项下出库商品-->
    <van-popup
      v-model:show="isShowExpNoticNoOrSalesGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ExpNoticNoOrSalesGoods
        :isShowExpNoticNoOrSalesGoods="isShowExpNoticNoOrSalesGoods"
        :ckForm="goodsExpInvoorEntpotSalForm"
        :objectNo3="formData.objectNo3"
        v-on="{ handleMutiSelect: handleMutiSelect }"
      />
    </van-popup>
    <!--选择仓库-->
    <van-popup
      v-model:show="isShowWareLoc"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <WareLocDialog
        :isShowWare="isShowWareLoc"
        v-on="{ wareLocSelect: wareLocSelect }"
      />
    </van-popup>
    <!--选择出库清单-->
    <van-popup
      v-model:show="isShowPdtGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <PdtGoodsDialog
        :isShowPdtGoods="isShowPdtGoods"
        :ckListForm="ckListForm"
        v-on="{ PdtGoodsSelect: PdtGoodsSelect }"
      />
    </van-popup>
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
      @confirm="doCancelApply"
      show-cancel-button
    >
      <van-field
        type="textarea"
        v-model="cancelReason"
        border
        class="border-bottom: 1px solid rgb(134, 154, 232);"
      ></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import {
  getVendorInfo,
  findSaleContactInfo,
  updateWareHouse,
  addWareHouse,
  delWareHouse,
  apply,
  undoApply,
  findInvContactInfo,
  applySap,
  getWareHouseLocList,
  getInvPdtUnitPrice,
} from "@/api/wareHouseCKD";
import ErpVendorSelect from "@/components/ErpVendor.vue";
import WareLocDialog from "./components/WareLocDialog.vue";
import ExpNoticNoDialog from "./components/ExpNoticNoDialog.vue";
import ExpNoticNoOrSales from "./components/ExpNoticNoOrSales.vue";
import GoodsDetailDialog from "./components/GoodsDetailDialog.vue";
import PdtGoodsDialog from "./components/PdtGoodsDialog.vue";
import ExpNoticNoOrSalesGoods from "./components/ExpNoticNoOrSalesGoods.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
import { dateFormat, moneyFormat, rMoneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import {
  detail,
  save,
  findBasePdtInfoByList,
  getIsNoPdtListByNo,
  getInvNoPdtListByNo,
  getsaleItemUnitPrice,
  getInvPdtUnitPrices,
  getwareHouseLocInfo,
} from "@/api/erp.warehouse.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload } from "@/api/erp.file.js";
import { getOrgList } from "@/utils/erp.org.js";
import { listOaStatus } from "@/api/erp.oa.js";
import fieldFormData from "./cloumn";
import { getCookie } from "@/utils/user.setting";

export default {
  name: "warehouseOutDetail",
  components: {
    NavBar,
    ErpVendorSelect,
    ExpNoticNoDialog,
    WareLocDialog,
    GoodsDetailDialog,
    ExpNoticNoOrSalesGoods,
    ErpProductSelect,
    ExpNoticNoOrSales,
    PdtGoodsDialog,
    //ErpFile,
  },
  data() {
    return {
      wareDate: "",
      baseItems: {
        groupNo: null,
        wareHsMId: null,
        wareHsId: null,
        pdtDate: "",
        pdtId: null,
        acctPdt: "",
        pdtVndNo: "",
        pdtName: "",
        pdtShr: "",
        lotNo: "",
        vidDate: "",
        specification: "",
        amountPs: null,
        uom: "",
        uom1: "",
        taxRate: null,
        unitCost: null,
        unitCostNT: null,
        unitCostF: null,
        inQnttyItem: null,
        inQnttyPiece: null,
        amntRMBIn: null,
        amntRMBNTIn: null,
        amountFIn: null,
        recQnttyItem: null,
        recQnttyPiece: null,
        amountRMB: null,
        amountRMBNT: null,
        amountF: null,
        outQnttyItem1: null,
        outQnttyPiece1: null,
        outFQnttyItem1: null,
        outFQnttyPiece1: null,
        amntRMB1: null,
        amntRMBNT1: null,
        blncnttyItem2: null,
        blncQunttyPiece2: null,
        unitCost2: null,
        unitCostNT2: null,
        amntRMB2: null,
        amntRMBNT2: null,
        avrgAmnt: null,
        blncInQntty: null,
        volume: null,
        grossWeight: null,
        houseLoc: "",
        area: "",
        rack: "",
        shelf: "",
        qultyStts: "",
        blncDate: "",
        closeDate: "",
        blncMonth: "",
        blncPrsn: null,
        invTrySgn: "",
        wareLocNo: "",
        remark: "",
        contrl: "",
        wareHsmid1: null,
        blncInQntty1: null,
        dtra: null,
        dtrc: null,
        costAmount: null,
        inDate: "",
        reLocNo1: "",
        deptId: null,
        unitCostF1: null,
        amountFIn1: null,
        amountF1: null,
        taxAmount: null,
        expFk: null,
        vendorNo: "",
        coNameC: "",
        otherRate: null,
        atrAmount: null,
        trcAmount: null,
        trcsAmount: null,
        amntRMB: null,
        amntRMBNt: null,
        pingZz: "",
        pingZh: null,
        acctMon: "",
        control10: "",
        wareLoc: "",
        transferFlag: null,
        transferDate: "",
        originalId: null,
        transferMan: null,
        transferId: null,
        transferQuantityIn: null,
        transferPiecesIn: null,
        transferQuantityOut: null,
        transferPiecesOut: null,
        transferAmountIn: null,
        transferAmountInNt: null,
        transferAmountOut: null,
        transferAmountOutNt: null,
        objectNo: "",
        impOrderSid: null,
        orderNo: "",
        contractNo: "",
        impNoticSid: null,
        invoiceNo: "",
        orderMid: null,
        impNoticMid: null,
        empId: null,
        wareHsType: null,
        wareHsCode: "",
        uomRate: null,
        ysFlag: null,
        pdtNameE: "",
        wsAmount: null,
        trcst: null,
        trc: null,
        atr: null,
        otherTaxRate: null,
        otherTaxAmount: null,
        payTaxAmount: null,
        fhFlag: null,
        fhsl: null,
        kpFlag: null,
        fhDate: "",
        ysDate: "",
        hsdj: null,
        bhsdj: null,
        wareHsNo: null,
        wareHsNo1: null,
        wareHsId1: null,
        wareHsId2: null,
        wareHsMid2: null,
        wareHsNo2: null,
        isNo: "",
        isMid: null,
        originalSid: null,
        cost: null,
        transFeePaidFlag: null,
        soType: null,
        empNo: "",
        orgCoNo: "",
        orgNo: "",
        currencyCode: "",
        flag1: null,
        flag2: null,
        flag3: null,
        flag4: null,
        flag5: null,
        flag6: null,
        isMid1: null,
        lotNo1: "",
        wareHsId3: null,
        wareHsMid3: null,
        wareHsNo3: null,
        tradeType: "",
        originalSid1: null,
        originalId1: null,
        originalCountry: "",
        qualityLevel: "",
        pmanuFactory: "",
        lbNo: "",
        orderSid: null,
        reqMid: null,
        balAmntRmb: null,
        balAmntRmbNt: null,
        grade: "",
        packAgeNo: "",
        ticketNo: "",
        baseSource: "",
        sourceObjectNo: "",
        sourceObjId: null,
        sourceObjNo: "",
        sourceObjMid: null,
        sapOrderNo: "",
        sapMblnr: "",
        sapZeile: "",
        wareHsMid_1: null,
        sapYear: "",
        matchRound: null,
        sapUnit: "",
        sapPrice: null,
        sapUnitRate: null,
        sapQty: null,
        sapQty1: null,
      },
      checked: false,
      isShowPdfview: false,
      oaStatusArr: [],
      cancelReason: "", // 审批相关
      // 出库商品选择查询条件
      ckForm: {
        orgCoNo: getDefaultOrgCoNo(),
        isNo: "",
      },
      // 出库商品清单选择查询条件
      ckListForm: {
        factory: "",
        wareLocNo: "",
        wareLoc: "", //仓库
        pdtNo1: "", //物料号(商品编号)
        lotNo: "",
      },
      m1ItemsRow: {}, //出库清单和出库商品
      // 合同号表格参数
      isNoForm: {
        orgCoNo: "",
        isNo: "",
      },
      // 转口销售或出口发票列表查询参数
      expInvOrEntpotSalForm: {
        orgCoNo: "",
        orderType: "",
        invoiceNo: "",
      },
      // 转口销售出库商品或出口发票出库商品列表查询参数
      goodsExpInvoorEntpotSalForm: {
        orgCoNo: "",
        orderType: "",
        invoiceNo: "",
      },
      heightIndex: "20px",
      objectNo3List: [
        { refValueCode: "PM03", refValue: "销售合同" },
        { refValueCode: "SD01", refValue: "出口发票" },
        { refValueCode: "SM07", refValue: "转口销售" },
      ],
      outTypeList: [
        { refValueCode: "收款放货", refValue: "收款放货" },
        { refValueCode: "分批款到发货", refValue: "分批款到发货" },
        {
          refValueCode: "货到付款，需方应在收到货物后30天内付清贷款",
          refValue: "货到付款，需方应在收到货物后30天内付清贷款",
        },
      ],
      rcvPrtList: [
        { refValueCode: "O", refValue: "由我公司承担" },
        { refValueCode: "C", refValue: "由提货单位承担" },
      ],
      activeContractCollapse: ["1", "2", "3"],
      showContractSelect: false,
      wareHsId: null,
      formData: fieldFormData().formData,
      baseForm: fieldFormData().formData,
      fileItems: fieldFormData().fileItems,
      baseM1Detail: fieldFormData().baseM1Detail,
      typeList: [
        { refValueCode: "W", refValue: "仓库" },
        { refValueCode: "S", refValue: "卖方" },
        { refValueCode: "B", refValue: "买方" },
        { refValueCode: "L", refValue: "物流公司" },
      ],
      feePayerList: [
        { value: "O", label: "由我公司承担" },
        { value: "C", label: "由提货单位承担" },
      ],
      contactForm: {
        lxr: "",
        phone: "",
        fax: "",
        idNo: "",
        carNo: "",
        coName: "",
        addr: "",
        type: "",
      },
      contactFormW: {
        lxr: "",
        phone: "",
        fax: "",
        idNo: "",
        carNo: "",
        coName: "",
        addr: "",
        type: "",
      },
      contactFormB: {
        lxr: "",
        phone: "",
        fax: "",
        idNo: "",
        carNo: "",
        coName: "",
        addr: "",
        type: "",
      },
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
      // activePdtItemIndex: null,
      ////  主表的按钮是否可见
      btnDeleteShow: false,
      btnAddShow: false,
      btnSaveShow: false,
      btnEditShow: false,
      btnAuditShow: false,
      btnCancelAuditShow: false,
      btnSapShow: false,
      btnCancelShow: false,
      undoApplyShow: false, // 审批
      // 侧滑窗口是否显示
      showVendorSelect: false,
      isShowWareLoc: false, //仓库
      isShowExpNoticNo: false, //合同号
      isShowExpNoticNoOrSales: false, //转口销售、出口发票
      isShowExpNoticNoOrSalesGoods: false, //转口销售、出口发票商品
      isShowPdtGoods: false,
      isShowGoodsDetail: false, //出库商品
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
      orderModeList: ["格式合同", "非格式合同"],
      recMethodList: [],
      currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      wareHouseLocList: [],
      inlandSaleList: [],
      auditStatusList: JSON.parse(this.$route.query.auditStatusList),
      objectNoList: [
        // 贸易方式
        { value: "N", label: "内贸" },
        { value: "G", label: "进口" },
        { value: "T", label: "转口" },
        { value: "E", label: "出口" },
      ],
    };
  },
  created() {
    const { wareHsId, infoId } = this.$route.query;
    this.wareHsId = wareHsId ? wareHsId : infoId;
    // getCurrencyCodeList().then((res) => {
    //   this.currencyCodeList.push(...res.data);
    // });
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });
    // getAuditStatusList({}).then(res => {
    //   this.auditStatusList.push(...res.data);
    // })
    if (this.wareHsId && this.wareHsId > 0) {
      this.loadDetail();
    } else {
      this.addOrder();
    }
    this.setBtnStatus();
  },

  setup() {
    provide("title", "出库单详情");
  },
  methods: {
    // 监听导航回退
    // handleClickBack() {
    //   this.$router.push("/warehouseOut/list");
    // },
    // 计算主表amntRmb
    summaryAmntRMB() {
      console.log("summaryAmntRMB");
      //含税金额
      let amntRmb = this.formData.m1Items.reduce((pre, { amntRMB }) => {
        return pre + Number(rMoneyFormat(amntRMB));
      }, 0);
      this.formData.amntRmb = amntRmb;
      //无税金额
      let amntRmbNT = this.formData.m1Items.reduce((pre, { amntRMBNt }) => {
        return pre + Number(rMoneyFormat(amntRMBNt));
      }, 0);
      this.formData.amntRmbNT = amntRmbNT;
      //应收金额
      let rpamount1 = this.formData.m1Items.reduce(
        (pre, { transferAmountOut }) => {
          return pre + Number(rMoneyFormat(transferAmountOut));
        },
        0
      );
      let rpamount2 = this.formData.items.reduce(
        (pre, { transferAmountOut }) => {
          return pre + Number(rMoneyFormat(transferAmountOut));
        },
        0
      );
      //如果出库商品清单有数据，以商品清单合计为准，否则已出库商品合计为准
      if (rpamount2 === null || rpamount2 === 0) {
        this.formData.rpAmount = rpamount1;
      } else {
        this.formData.rpAmount = rpamount2;
      }
    },
    // 根据应出数量计算应出件数
    changeOutQnttyPiece1(
      e,
      {
        hsdj,
        transferAmountOut,
        amountPs,
        sapUnitRate,
        unitCostNT2,
        unitCostNT,
        unitCost,
        outQnttyPiece1,
        wareHsCode,
        unitCost2,
      },
      index,
      type
    ) {
      console.log("handleM1ItemOutQnttyPiece1", hsdj);
      function handleItemOutQnttyPiece1() {
        const outQnttyPiece1 = e.target.value;
        console.log("outQnttyPiece1", outQnttyPiece1);
        if (hsdj && outQnttyPiece1) {
          this.formData.items[index].transferAmountOut = (
            rMoneyFormat(hsdj) * rMoneyFormat(outQnttyPiece1)
          ).toFixed(2);
        }
        if (outQnttyPiece1 && amountPs) {
          let pieces = (
            rMoneyFormat(outQnttyPiece1) / rMoneyFormat(amountPs)
          ).toFixed(2);
          this.formData.items[index].outQnttyItem1 = Math.ceil(pieces);
        }
        if (sapUnitRate && outQnttyPiece1) {
          this.formData.items[index].sapQty = moneyFormat(
            rMoneyFormat(outQnttyPiece1) / sapUnitRate
          );
        }
      }
      function handleTransferAmountOut() {
        const transferAmountOut = e.target.value;
        console.log("transferAmountOut", transferAmountOut);
        if (transferAmountOut && outQnttyPiece1) {
          this.formData.items[index].hsdj = (
            rMoneyFormat(transferAmountOut) / rMoneyFormat(outQnttyPiece1)
          ).toFixed(4);
        }
      }
      function handleM1ItemOutQnttyPiece1() {
        let warehscode = wareHsCode.trim();
        let unitcosts = 0.0;
        let unitcostnt = 0.0;
        if (warehscode === "1F") {
          unitcosts = unitCost2 === null ? 0.0 : unitCost2;
          unitcostnt = unitCostNT2 === null ? 0.0 : unitCostNT2;
        } else {
          unitcosts = unitCost === null ? 0.0 : unitCost;
          unitcostnt = unitCostNT === null ? 0.0 : unitCostNT;
        }
        let hsdjcopy = hsdj === null ? 0.0 : hsdj;
        let quantity = outQnttyPiece1 === null ? 0.0 : outQnttyPiece1;
        let amountps = amountPs === null ? 0.0 : amountPs;
        let sapunitrate = sapUnitRate === null ? 0.0 : sapUnitRate;
        if (sapunitrate === null || sapunitrate === 0) {
          sapunitrate = 1.0;
        }
        //设置金额
        this.formData.m1Items[index].amntRMB = Number(
          rMoneyFormat(quantity) * unitcosts
        ).toFixed(2);
        this.formData.m1Items[index].amntRMBNt = Number(
          rMoneyFormat(quantity) * unitcostnt
        ).toFixed(2);
        console.log("quantity", quantity);
        console.log("hsdjcopy", hsdjcopy);
        this.formData.m1Items[index].transferAmountOut = Number(
          quantity * rMoneyFormat(hsdjcopy)
        ).toFixed(2);
        //设置数量
        this.formData.m1Items[index].sapQty = moneyFormat(
          rMoneyFormat(quantity) / sapunitrate
        );
        //设置件数
        if (amountps === 0.0) {
          this.formData.m1Items[index].outQnttyItem1 = Number(
            rMoneyFormat(quantity)
          ).toFixed(4);
        } else {
          this.formData.m1Items[index].outQnttyItem1 = Math.ceil(
            Number(rMoneyFormat(quantity) / amountps)
          );
        }
      }
      switch (type) {
        case "transferAmountOut":
          handleTransferAmountOut.call(this);
          break;
        case "itemOutQnttyPiece1":
          handleItemOutQnttyPiece1.call(this);
          this.summaryAmntRMB();
          break;
        case "m1ItemOutQnttyPiece1":
          handleM1ItemOutQnttyPiece1.call(this);
          this.summaryAmntRMB();
          break;
        default:
          break;
      }
    },
    // 新增附件
    addFileItem() {
      let fileItems = Object.assign({}, this.fileItems);
      this.formData.fileItems.push(fileItems);
    },
    // 完成按钮回调
    async PdtGoodsSelect(selectionsArr) {
      // 我将出库商品清单的多选数组对象存放到selectionCkGoodsList中了
      /**
       * 此处需要你来填充相应字段赋值带入到出库商品清单详情中
       */
      //获取商品基础信息,从后端获取
      let idList = "";
      selectionsArr.forEach((item1) => {
        if (idList === null || idList === "") {
          idList = item1.pdtId;
        } else {
          idList = idList + "," + item1.pdtId;
        }
      });

      //查找合适的商品基础信息
      const resbasepdt = await findBasePdtInfoByList({
        idList: idList,
      });

      let ressalepdt = [];
      let resinvpdt = [];
      //查找合适的销售合同商品 pdtno1--getIsNoPdtList
      if (this.formData.objectNo3 === "PM03") {
        ressalepdt = await getIsNoPdtListByNo({
          orgCoNo: this.formData.orgCoNo,
          isNo: this.formData.expNoticNo,
        });
      } else {
        //出口发票、转口销售商品
        let orderType = "自营出口";
        if (this.formData.objectNo3 === "SM07") {
          orderType = "转口贸易";
        }

        resinvpdt = await getInvNoPdtListByNo({
          orgCoNo: this.formData.orgCoNo,
          isNo: this.formData.expNoticNo,
          orderType: orderType,
        });
      }
      //开始接收数据
      if (selectionsArr && selectionsArr.length) {
        let wareLocNoOld = "";

        selectionsArr.forEach(async (item, groupno) => {
          let baseDetail = Object.assign({}, this.baseItems);

          //校验仓库是否不同
          let wareLocNo = item.wareLocNo;
          if (wareLocNo === null) {
            wareLocNo = "";
          }

          if (groupno === 0) {
            wareLocNoOld = wareLocNo;
          }
          let findindex = -1;
          (this.formData.items ? this.formData.items : []).forEach(
            (item, index) => {
              if (item.wareLocNo !== wareLocNoOld) {
                findindex = index;
              }
            }
          );

          if (wareLocNo !== wareLocNoOld || findindex > -1) {
            this.$message.error("不能选择多个仓库的库存!");
            return false;
          }

          baseDetail.wareHsId = 0;
          baseDetail.wareHsMid = 0;
          baseDetail.pdtId = item.pdtId;
          baseDetail.pdtVndNo = item.pdtNo;
          baseDetail.pdtName = item.pdtName;

          let amountPs = 0.0;
          let sapUnitRate = 0.0;
          //查找是否有相同pdtid号的记录，如果存在，取找到记录的相应值
          if (resbasepdt.data.length) {
            let index = resbasepdt.data.findIndex(
              (pdtitem) => pdtitem.pdtId === item.pdtId
            );
            //找到合适的商品基础信息，则带回
            if (index > -1) {
              baseDetail.pdtNameE = resbasepdt.data[index].pdtNameE;
              baseDetail.specification = resbasepdt.data[index].specificationC;
              baseDetail.uom = resbasepdt.data[index].uOM;
              baseDetail.uomRate = 1.0;
              baseDetail.uom1 = resbasepdt.data[index].uOM1;
              amountPs = resbasepdt.data[index].amountPs;
              sapUnitRate = resbasepdt.data[index].sapUnitRate;
            } else {
              baseDetail.pdtNameE = "";
              baseDetail.specification = "";
              baseDetail.uom = "";
              baseDetail.uomRate = 1.0;
              baseDetail.uom1 = "";
            }
          } else {
            baseDetail.pdtNameE = "";
            baseDetail.specification = "";
            baseDetail.uom = "";
            baseDetail.uomRate = 1.0;
            baseDetail.uom1 = "";
          }

          if (amountPs === null || amountPs === 0) {
            amountPs = 1.0;
          }

          //获取sap数量、需求计算、待完成
          let sapsl = item.quantity;
          if (sapsl === null) {
            sapsl = 0.0;
          }

          //应出数量
          let ycsl = this.m1ItemsRow.outQnttyPiece1;
          if (ycsl === null) {
            ycsl = 0.0;
          }

          //计算已分配数量、取当前已经接收的商品记录，并且组号相同的数量合计值、待完成
          let yfpsl = 0.0;

          //从items数组中查询符合groupno值的记录，并进行合计
          this.formData.items.forEach((mitem) => {
            if (this.m1ItemsRow.groupNo === mitem.groupNo) {
              yfpsl = Number(yfpsl) + Number(mitem.quantity);
            }
          });

          if (
            Number(sapsl).toFixed(8) >=
            Number(ycsl).toFixed(8) - Number(yfpsl).toFixed(8)
          ) {
            sapsl = Number(ycsl).toFixed(8) - Number(yfpsl).toFixed(8);
          }

          baseDetail.amountPs = amountPs;
          if (sapsl !== 0) {
            baseDetail.outQnttyItem1 = Math.ceil(sapsl / amountPs);
          } else {
            baseDetail.outQnttyItem1 = 0;
          }
          baseDetail.outQnttyPiece1 = Number(sapsl).toFixed(8);

          // 取ismid
          baseDetail.isMid = this.m1ItemsRow.isMid;
          baseDetail.isMid1 = this.m1ItemsRow.isMid1;
          //处理sap计量单位
          baseDetail.sapUnit = this.m1ItemsRow.sapUnit;
          baseDetail.sapPrice = this.m1ItemsRow.sapPrice;

          let sapUnitRate1 = this.m1ItemsRow.sapUnitRate;
          if (sapUnitRate1 === null || sapUnitRate1 === 0) {
          } else {
            sapUnitRate = sapUnitRate1;
          }

          if (sapUnitRate === null || sapUnitRate === 0) {
            sapUnitRate = 1.0;
          }
          baseDetail.sapUnitRate = sapUnitRate;
          baseDetail.sapQty = Number(sapsl / sapUnitRate).toFixed(8);

          baseDetail.unitCostF1 = 0.0;
          baseDetail.amountFIn1 = 0.0;

          baseDetail.tradeType = this.formData.objectNo;
          baseDetail.currencyCode = this.formData.currencyCode;
          baseDetail.orgCoNo = this.formData.orgCoNo;
          baseDetail.orgNo = this.formData.orgNo;
          baseDetail.empNo = this.formData.employeeNo;

          baseDetail.impOrderSid = 0;
          baseDetail.orderNo = "";
          baseDetail.contractNo = "";
          baseDetail.impNoticSid = 0;
          baseDetail.invoiceNo = "";
          baseDetail.orderMid = 0;
          baseDetail.impNoticMid = 0;

          //在返回的结果集中通过pdtno1查找合适的记录，并返回结果
          if (this.formData.objectNo3 === "PM03") {
            if (typeof ressalepdt != "undefined" && ressalepdt.data.length) {
              let index = ressalepdt.data.findIndex(
                (saleitem) => saleitem.pdtNo1 === item.pdtNo
              );
              //找到记录，返回结果
              if (index > -1) {
                baseDetail.isNo = this.formData.expNoticNo;
                baseDetail.isMid = ressalepdt.data[index].isMid;
                baseDetail.transferId = ressalepdt.data[index].transferId;
                baseDetail.isMid1 = ressalepdt.data[index].isMid1;
              } else {
                baseDetail.isNo = this.formData.expNoticNo;
                baseDetail.isMid = 0;
                baseDetail.transferId = 0;
                baseDetail.isMid1 = 0;
              }
            } else {
              baseDetail.isNo = this.formData.expNoticNo;
              baseDetail.isMid = 0;
              baseDetail.transferId = 0;
              baseDetail.isMid1 = 0;
            }
          }
          //出口发票
          if (
            this.formData.objectNo3 === "SD01" ||
            this.formData.objectNo3 === "SM07"
          ) {
            if (typeof resinvpdt != "undefined" && resinvpdt.data.length) {
              let index = resinvpdt.data.findIndex(
                (invitem = invitem.pdtNo1 === item.pdtNo)
              );
              if (index > -1) {
                baseDetail.isNo = this.formData.expNoticNo;
                baseDetail.isMid = resinvpdt.data[index].invoicemId;
                baseDetail.transferId = resinvpdt.data[index].invoicemId;
                baseDetail.isMid1 = resinvpdt.data[index].invoicemId;
              } else {
                baseDetail.isNo = this.formData.expNoticNo;
                baseDetail.transferId = 0;
              }
            } else {
              baseDetail.isNo = this.formData.expNoticNo;
              baseDetail.transferId = 0;
            }
          }
          baseDetail.wareHsId2 = 0;
          baseDetail.wareHsMid2 = 0;
          baseDetail.wareHsNo2 = 0;
          baseDetail.soType = 0;
          baseDetail.lotNo = item.lotNo;
          baseDetail.wareHsCode = this.formData.wareHsCode;
          baseDetail.wareHsType = 0;
          //主表仓库编码为空，则用子表第一笔仓库编码去查找合适的仓库信息、待完成
          if (
            this.formData.wareLocNo === null ||
            this.formData.wareLocNo === ""
          ) {
            const resware = await getwareHouseLocInfo({
              //饶从谋未定义的接口
              wareLocNo: item.wareLocNo,
            });

            if (resware.data) {
              this.formData.wareLocNo = resware.data.wareLocNo;
              this.formData.wareLoc = resware.data.wareLoc;
              this.formData.wareLoc2 = resware.data.printName;
            }
          }
          baseDetail.unitCost = 0.0;
          baseDetail.unitCostNT = 0.0;
          baseDetail.originalSid = 0;
          baseDetail.originalId = 0;
          baseDetail.originalSid1 = 0;
          baseDetail.originalId1 = 0;
          baseDetail.atr = 0.0;
          baseDetail.amntRMB = 0.0;
          baseDetail.amntRMBNt = 0.0;
          baseDetail.atrAmount = 0.0;
          baseDetail.wareLocNo = this.formData.wareLocNo;
          baseDetail.wareLoc = this.formData.wareLoc;
          baseDetail.vendorNo = this.formData.custNo;
          baseDetail.coNameC = this.formData.custName;
          baseDetail.flag6 = 0;
          baseDetail.otherRate = item.hl;
          //获取销售合同商品销售单价、待完成
          let hsdj = 0.0;
          let jsprice = 0.0;
          if (this.formData.objectNo3 === "PM03") {
            const resunitprice = await getsaleItemUnitPrice({
              pdtNo1: item.pdtNo,
              orgCoNo: this.formData.orgCoNo,
              isNo: this.formData.expNoticNo,
            });
            if (resunitprice.data) {
              hsdj = resunitprice.data[0].unitPrice;
            }
          } else {
            const resprice = await getInvPdtUnitPrices({
              pdtNo1: item.pdtNo,
              orgCoNo: this.formData.orgCoNo,
              isNo: this.formData.expNoticNo,
            });
            if (resprice.data) {
              hsdj = resprice.data[0].unitprice;
              jsprice = resprice.data[0].unitstdprice;
            }
          }
          if (hsdj === null) {
            hsdj = 0.0;
          }
          baseDetail.hsdj = hsdj;
          baseDetail.transferAmountOut = (Number(hsdj) * Number(sapsl)).toFixed(
            2
          );
          baseDetail.unitCost2 = jsprice;
          baseDetail.groupNo = this.m1ItemsRow.groupNo;
          baseDetail.wareHsMid_1 = this.m1ItemsRow.wareHsMid1;
          // 格式化数据
          baseDetail.outQnttyPiece1 = moneyFormat(
            Number(baseDetail.outQnttyPiece1)
          );
          baseDetail.hsdj = moneyFormat(Number(baseDetail.hsdj));
          baseDetail.sapPrice = moneyFormat(Number(baseDetail.sapPrice));
          baseDetail.sapQty = moneyFormat(Number(baseDetail.sapQty));
          //接收数据
          this.formData.items.push(baseDetail);
        });
      }

      selectionsArr = [];
      //调用合计函数，回写主表金额

      this.isShowPdtGoods = false;
    },
    // 测试用例
    // PdtGoodsSelect(selectionsArr) {
    //   this.formData.items.push(...selectionsArr);
    //   this.isShowPdtGoods = false;
    // },
    selectPdtCheck(item) {
      console.log("item", item);
      // 避免多次来回点击同一个出库商品导致未选中时pdtNo也有值的bug
      this.ckListForm.pdtNo1 = "";
      this.m1ItemsRow = {};
      // 将出库商品中的pdtVndNo赋值给出库商品清单的隐藏查询条件pdtNo1
      if (item.checked) {
        this.ckListForm.pdtNo1 = item.pdtVndNo;
        this.m1ItemsRow = item;
        this.formData.m1Items.forEach((m1Item) => {
          // 如果选中当前出库商品，那么其他出库商品的复选框的按钮状态要为false;
          if (item.isMid1 !== m1Item.isMid1 && m1Item.checked) {
            m1Item.checked = false;
          }
        });
      }
    },
    // 预览
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
    // 处理多选(转口销售、出口发票商品多选)
    handleMutiSelect(selectionsArr) {
      this.handleAddInvGoods(selectionsArr);
      this.isShowExpNoticNoOrSalesGoods = false;
    },
    // 预览功能
    handlePreview() {
      let keyValue = this.formData.wareHsId;
      let keyName = "docEntry";
      let moduleName = "d_pm08_jxhh";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
          editStatus: "contractView",
          currentPath: "/warehouseOut/detail",
          infoId: this.formData.wareHsId,
        },
      });
    },
    // 获取OA 审批数据
    loadOaStatus() {
      let docentry = this.formData.wareHsId;
      let payNo = this.formData.wareHsNo;

      listOaStatus("PM08", docentry, payNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();
        })
        .catch((res) => {});
    },
    // 撤销审批
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
          console.log("res撤销审批失败", res);
          Notify({ type: "danger", message: "撤销审批失败:" + res });
        });
    },
    changeRcmSelect({ value }, field) {
      if (field === "objectNo3") {
        this.formData.m1Items = [];
        this.formData.expNoticNo = "";
      }
      this.formData[field] = value;
    },
    changeContactForm({ value }, field) {
      this.contactForm[field] = value;
    },
    changeContactFormW({ value }, field) {
      this.contactFormW[field] = value;
    },
    changeContactFormB({ value }, field) {
      this.contactFormB[field] = value;
    },
    ///当前页面切换了平台公司
    setChangeNewOrgCo() {
      // console.log("/warehouseOut/list");
      this.$router.go(-1); //返回上一层
    },
    /// 弹窗中用户选择了某一个业务员，并且做了修改
    doChangeEmployee() {
      this.formData.items = [];
      this.formData.vendorName = "";
      this.formData.vendorNo = "";
    },
    wareLocClick() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.isShowWareLoc = true;
    },
    // 合同号点击事件
    expNoticNoClick() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (this.formData.objectNo3 === "PM03") {
        this.isShowExpNoticNo = true;
      } else if (
        this.formData.objectNo3 === "SD01" ||
        this.formData.objectNo3 === "SM07"
      ) {
        this.isShowExpNoticNoOrSales = true;
      }
    },
    // 销售合同处理
    handlerSaleOrder(rowData) {
      this.formData.expNoticsId = 0;
      this.formData.expNoticNo = rowData.isNo;
      this.formData.orgNo = rowData.orgNo;
      this.formData.orgName = rowData.orgName;
      this.formData.deptId = rowData.deptId;
      this.formData.employeeNo = rowData.employeeNo;
      this.formData.employeeName = rowData.employeeName;
      this.formData.employeeId = rowData.employeeId;
      this.formData.currencyCode = rowData.currencyCode;
      this.formData.currencyCode1 = rowData.currencyCode1;
      this.formData.exchangRt = rowData.exchRate;
      this.formData.refNo = rowData.refNo;
      this.formData.outType = rowData.outType;
      this.formData.fhType = rowData.jhType;
      this.formData.ticketNo = rowData.refNo;
      this.formData.objectNo = rowData.tradType;
      (this.formData.soType = rowData.soType),
        (this.formData.custNo = rowData.vendorNo);
      this.formData.custName = rowData.vendorName;
      //账期天数
      this.formData.customerID = rowData.refNoTitle2;
      //生成联系信息S、B、W、V
      // 处理买方联系信息
      (this.formData.contactInfoItems
        ? this.formData.contactInfoItems
        : []
      ).forEach((item, index) => {
        if (item.type === "S") {
          this.formData.contactInfoItems.splice(index, 1);
        }
      });
      (this.formData.contactInfoItems
        ? this.formData.contactInfoItems
        : []
      ).forEach((item, index) => {
        if (item.type === "B") {
          this.formData.contactInfoItems.splice(index, 1);
        }
      });
      (async function (that) {
        const resContactB = await getVendorInfo({
          vendorno1: rowData.vendorNo,
        });
        console.log("-----------", resContactB);
        console.log("-----------555555", that.contactFormB);
        if (resContactB.data) {
          that.contactFormB.lxr = resContactB.data.contact || "";
          that.contactFormB.fax = resContactB.data.fax || "";
          that.contactFormB.phone = resContactB.data.phone || "";
          that.contactFormB.coName = resContactB.data.conamec || "";
          that.contactFormB.addr = resContactB.data.coaddre || "";
          that.contactFormB.type = "B";
          that.formData.contactInfoItems.push(that.contactFormB);
        }
      })(this);
      // 选择销售合同出库商品带入卖方联系信息
      (async function (that) {
        const resContactS = await findSaleContactInfo({
          orgCoNo: getDefaultOrgCoNo(),
          isNo: rowData.isNo,
        });
        if (resContactS.data.length) {
          that.contactForm.lxr = resContactS.data[0].contact || "";
          that.contactForm.fax = resContactS.data[0].fax || "";
          that.contactForm.phone = resContactS.data[0].phone || "";
          that.contactForm.coName = getCookie("loginInfo").enterpriseName;
          that.contactForm.addr = resContactS.data[0].addr || "";
          that.contactForm.type = "S";
          that.formData.contactInfoItems.push(that.contactForm);
        }
      })(this);
      // 出库商品列表查询参数
      this.ckForm.isNo = this.formData.expNoticNo.trim();
      // this.ckForm.orgCoNo = getDefaultOrgCoNo();
      // 清商品
      this.clearGoods();
    },
    // 转口销售
    handleExpInvSale(rowData) {
      //接收出口发票、转口销售信息
      this.formData.expNoticNo = rowData.invoiceNo;
      this.formData.ticketNo = rowData.referenceNo;

      this.formData.orgCoNo = rowData.orgCoNo;
      this.formData.orgNo = rowData.orgNo;
      this.formData.orgName = rowData.orgName;
      this.formData.employeeNo = rowData.employeeNo;
      this.formData.employeeName = rowData.employeeName;

      this.formData.custNo = rowData.customerNo;
      this.formData.custName = rowData.coNameE;
      this.formData.custName2 = rowData.coNameE;

      if (this.formData.objectNo3 === "SM07") {
        this.formData.objectNo = "T";
      } else {
        this.formData.objectNo = "E";
      }

      this.formData.currencyCode = rowData.currencyCode;
      this.formData.exchangRt = rowData.exchangerate;
      this.formData.customerID = rowData.workday;

      //生成联系信息S、B、W
      //买方联系信息
      (this.formData.contactInfoItems
        ? this.formData.contactInfoItems
        : []
      ).forEach((item, index) => {
        if (item.type === "B") {
          this.formData.contactInfoItems.splice(index, 1);
        }
      });
      (async function (that) {
        const res = await getVendorInfo({
          vendorno1: rowData.customerNo.trim(),
        });
        console.log("========", res);
        if (res.data.length) {
          that.contactFormB.lxr = res.data.contact || "";
          that.contactFormB.fax = res.data.fax || "";
          that.contactFormB.phone = res.data.phone || "";
          that.contactFormB.coName = getCookie("loginInfo").enterpriseName;
          that.contactFormB.addr = res.data.addr || "";
          that.contactFormB.type = "B";
          that.formData.contactInfoItems.push(that.contactFormB);
        }
      })(this);

      //卖方联系信息
      (this.formData.contactInfoItems
        ? this.formData.contactInfoItems
        : []
      ).forEach((item, index) => {
        if (item.type === "S") {
          this.formData.contactInfoItems.splice(index, 1);
        }
      });
      //接口获取卖方联系信息
      (async function (that) {
        const resContactS = await findInvContactInfo({
          orgCoNo: getDefaultOrgCoNo(),
          invNo: rowData.invoiceNo,
        });
        if (resContactS.data.length) {
          that.contactForm.fax = resContactS.data[0].fax || "";
          that.contactForm.lxr = resContactS.data[0].contact || "";
          that.contactForm.phone = resContactS.data[0].phone || "";
          that.contactForm.coName = getCookie("loginInfo").enterpriseName;
          that.contactForm.addr = resContactS.data[0].addr || "";
          that.contactForm.type = "S";
          that.formData.contactInfoItems.push(that.contactForm);
        }
      })(this);

      //仓库信息
      if (this.formData.wareLocNo !== null || this.formData.wareLocNo !== "") {
        (this.formData.contactInfoItems
          ? this.formData.contactInfoItems
          : []
        ).forEach((item, index) => {
          if (item.type === "W") {
            this.formData.contactInfoItems.splice(index, 1);
          }
        });

        //获取仓库信息
        (async (that) => {
          const resContactW = await getWareHouseLocList({
            orgCoNo: getDefaultOrgCoNo(),
            wareLocNo: that.formData.wareLocNo,
          });
          if (resContactW.data.length) {
            that.contactFormW.type = "W";
            that.contactFormW.lxr = resContactW.data[0].contact || "";
            that.contactFormW.phone = resContactW.data[0].phone || "";
            that.contactFormW.fax = resContactW.data[0].fax || "";
            that.contactFormW.coName = getCookie("loginInfo").enterpriseName;
            that.contactFormW.addr = resContactW.data[0].addr || "";
            that.formData.contactInfoItems.push(that.contactFormW);
          }
        })(this);
      }
    },
    // 清空商品
    clearGoods() {
      this.formData.filterM1Items.push(...this.formData.m1Items);
      this.formData.m1Items = [];
      this.formData.filterItems.push(...this.formData.items);
      this.formData.items = [];
      // this.formData.contactInfoItems = [];
    },
    // 处理出口发票添加的操作
    handlerExpInvo() {
      this.goodsExpInvoorEntpotSalForm.orgCoNo = "";
      this.goodsExpInvoorEntpotSalForm.orderType = "";
      this.goodsExpInvoorEntpotSalForm.invoiceNo = "";
      this.goodsExpInvoorEntpotSalForm.orderType = "1";
      this.goodsExpInvoorEntpotSalForm.orgCoNo = getDefaultOrgCoNo();
      this.goodsExpInvoorEntpotSalForm.invoiceNo = this.formData.expNoticNo;
      // this.goodsExpInvoorEntpotSalForm.invoiceNo = this.formData.expNoticNo.trim();
    },
    // 处理转口销售添加的操作
    handlerEntpotSal() {
      this.goodsExpInvoorEntpotSalForm.orgCoNo = "";
      this.goodsExpInvoorEntpotSalForm.orderType = "";
      this.goodsExpInvoorEntpotSalForm.invoiceNo = "";
      this.goodsExpInvoorEntpotSalForm.orderType = "9";
      this.goodsExpInvoorEntpotSalForm.orgCoNo = getDefaultOrgCoNo();
      this.goodsExpInvoorEntpotSalForm.invoiceNo =
        this.formData.expNoticNo.trim();
    },
    //合同号选择
    expNoticNoSelect(row) {
      this.formData.m1Items = [];
      this.formData.items = [];
      if (this.formData.objectNo3 === "PM03") {
        // 处理销售合同
        this.handlerSaleOrder(row);
      } else if (this.formData.objectNo3 === "SD01") {
        // 接收出口发票信息
        this.handleExpInvSale(row);
        //传输出口发票商品查询参数
        this.handlerExpInvo();
      } else if (this.formData.objectNo3 === "SM07") {
        //接收转口销售信息
        this.handleExpInvSale(row);
        //传输转口商品查询参数
        this.handlerEntpotSal();
      }
      // 清除出库商品
      this.clearGoods();
      // 添加完所有信息后关闭当前弹窗
      this.isShowExpNoticNo = false;
      // 添加完所有信息后开启出库商品弹窗
      if (
        this.formData.objectNo3 === "SD01" ||
        this.formData.objectNo3 === "SM07"
      ) {
        this.isShowExpNoticNoOrSalesGoods = true;
      } else if (this.formData.objectNo3 === "PM03") {
        this.isShowGoodsDetail = true;
      }
    },
    handleMutiSelectGoods(selectionsArr) {
      this.handleAddSaleGoods(selectionsArr);
      this.isShowGoodsDetail = false;
    },
    // 计算主表amntRmb
    summaryAmntRMB() {
      //含税金额
      let amntRmb = this.formData.m1Items.reduce((pre, { amntRMB }) => {
        return pre + Number(rMoneyFormat(amntRMB));
      }, 0);
      this.formData.amntRmb = amntRmb;
      //无税金额
      let amntRmbNT = this.formData.m1Items.reduce((pre, { amntRMBNt }) => {
        return pre + Number(rMoneyFormat(amntRMBNt));
      }, 0);
      this.formData.amntRmbNT = amntRmbNT;
      //应收金额
      let rpamount1 = this.formData.m1Items.reduce(
        (pre, { transferAmountOut }) => {
          return pre + Number(rMoneyFormat(transferAmountOut));
        },
        0
      );
      let rpamount2 = this.formData.items.reduce(
        (pre, { transferAmountOut }) => {
          return pre + Number(rMoneyFormat(transferAmountOut));
        },
        0
      );
      //如果出库商品清单有数据，以商品清单合计为准，否则已出库商品合计为准
      if (rpamount2 === null || rpamount2 === 0) {
        this.formData.rpAmount = rpamount1;
      } else {
        this.formData.rpAmount = rpamount2;
      }
    },
    //用于接收销售合同商品
    handleAddSaleGoods(selectionsArr) {
      console.log("selectionsArr", selectionsArr);
      selectionsArr.forEach((row) => {
        //接收销售合同选择商品记录
        let baseM1Detail = Object.assign({}, this.baseM1Detail);
        let sotype = this.formData.soType;
        if (sotype === null) {
          sotype = 0;
        }
        let isMid = 0;
        let isMid1 = 0;
        if (sotype === 1) {
          if (row.orderMid1 === null || row.orderMid1 === 0) {
            isMid = row.isMid;
          } else {
            isMid = row.orderMid1;
          }
          isMid1 = row.isMid;
        } else {
          if (row.orderMid1 === null || row.orderMid1 === 0) {
            isMid = row.isMid;
          } else {
            isMid = row.orderMid1;
          }
          isMid1 = row.isMid;
        }
        if (isMid === null || isMid === 0) {
          return true;
        }
        baseM1Detail.wareHsId = null;
        baseM1Detail.wareHsMid1 = null;
        // baseM1Detail.wareHsMid1 = 0;
        // baseM1Detail.groupNo = groupno + 1;
        baseM1Detail.groupNo = row.groupNo;
        console.log("baseM1Detail.groupNo", baseM1Detail.groupNo);
        baseM1Detail.pdtId = row.pdtId;
        baseM1Detail.pdtVndNo = row.pdtNo1;
        baseM1Detail.pdtName = row.pdtNameC;
        baseM1Detail.pdtNameE = row.pdtNameE;
        baseM1Detail.specification = row.spec;
        baseM1Detail.uom = row.uom;
        baseM1Detail.uomRate = 1.0;
        baseM1Detail.uom1 = row.uom1;
        let amountPs = row.amountPs;
        if (amountPs === null || amountPs === 0.0) {
          amountPs = 1.0;
        }
        baseM1Detail.amountPs = Number(amountPs).toFixed(4);
        let quantity = 0;
        let quantity1 = 0;
        quantity = row.quantity;
        quantity1 = row.quantity1;
        if (quantity === null) {
          quantity = 0.0;
        }
        if (quantity1 === null) {
          quantity1 = 0.0;
        }
        //商品件数
        if (quantity - quantity1 !== 0) {
          baseM1Detail.outQnttyItem1 = Math.ceil(
            (quantity - quantity1) / amountPs
          );
        } else {
          baseM1Detail.outQnttyItem1 = 0;
        }
        //商品数量
        baseM1Detail.outQnttyPiece1 = (quantity - quantity1).toFixed(8);
        baseM1Detail.sapUnit = row.sapUnit;
        baseM1Detail.sapPrice = row.sapPrice;
        let sapunitrate = row.sapUnitRate;
        if (sapunitrate === null || sapunitrate === 0) {
          sapunitrate = 1.0;
        }
        baseM1Detail.sapUnitRate = sapunitrate;
        baseM1Detail.sapQty = ((quantity - quantity1) / sapunitrate).toFixed(2);
        let objectno = row.objectNo;
        let tradetype1 = "";
        baseM1Detail.objectNo = objectno;

        if (objectno === "PM02" && this.formData.objectNo === "G") {
          tradetype1 = "N";
        } else {
          tradetype1 = this.formData.objectNo;
        }
        baseM1Detail.tradeType = tradetype1;
        baseM1Detail.orgCoNo = this.formData.orgCoNo;
        baseM1Detail.orgNo = this.formData.orgNo;
        baseM1Detail.empNo = this.formData.employeeNo;
        baseM1Detail.orderSid = 0;
        baseM1Detail.orderNo = "";
        baseM1Detail.orderMid = 0;
        baseM1Detail.isNo = row.isNo;
        baseM1Detail.isMid = isMid;
        baseM1Detail.isMid1 = isMid1;
        baseM1Detail.soType = sotype;
        baseM1Detail.lotNo = "";
        baseM1Detail.wareHsCode = this.formData.wareHsCode;
        if (
          this.formData.wareHsCode === "2B" ||
          this.formData.wareHsCode === "2C"
        ) {
          baseM1Detail.wareHsType = 1;
        } else {
          baseM1Detail.wareHsType = 0;
        }
        baseM1Detail.atr = row.atr;
        baseM1Detail.transferAmountOut = row.amount;
        baseM1Detail.hsdj = row.unitPrice;
        baseM1Detail.wareLocNo = this.formData.wareLocNo;
        baseM1Detail.wareLoc = this.formData.wareLoc;
        baseM1Detail.originalSid = 0;
        baseM1Detail.originalId = 0;
        baseM1Detail.flag3 = 1;
        baseM1Detail.otherRate = row.hl;
        // 格式化
        baseM1Detail.outQnttyPiece1 = Number(baseM1Detail.outQnttyPiece1);
        // baseM1Detail.outQnttyPiece1 = moneyFormat(
        //   Number(baseM1Detail.outQnttyPiece1)
        // );
        baseM1Detail.hsdj = Number(baseM1Detail.hsdj);
        // baseM1Detail.hsdj = moneyFormat(Number(baseM1Detail.hsdj));
        baseM1Detail.transferAmountOut = Number(baseM1Detail.transferAmountOut);
        // baseM1Detail.transferAmountOut = moneyFormat(
        //   Number(baseM1Detail.transferAmountOut)
        // );
        baseM1Detail.atr = Number(baseM1Detail.atr);
        // baseM1Detail.atr = moneyFormat(Number(baseM1Detail.atr));
        baseM1Detail.sapUnitRate = Number(baseM1Detail.sapUnitRate);
        // baseM1Detail.sapUnitRate = moneyFormat(
        //   Number(baseM1Detail.sapUnitRate)
        // );
        baseM1Detail.sapQty = Number(baseM1Detail.sapQty);
        // baseM1Detail.sapQty = moneyFormat(Number(baseM1Detail.sapQty));
        // 重算金额
        if (quantity1 > 0) {
          let hsdj = Number(rMoneyFormat(baseM1Detail.hsdj));
          let amount = ((quantity - quantity1) * hsdj).toFixed(2);
          baseM1Detail.transferAmountOut = amount;
        }

        // 不允许相同的行
        let index = this.formData.m1Items.findIndex(
          (item) => isMid1 === item.isMid1
        );
        if (index == -1) {
          this.formData.m1Items.push(baseM1Detail);
        }
      });
      this.summaryAmntRMB();
    },
    //用于接收出口发票、转口合同项下的商品信息
    handleAddInvGoods(selectionsArr) {
      selectionsArr.forEach((row) => {
        console.log("handleAddInvGoods:row", row);
        let baseM1Detail = Object.assign({}, this.baseM1Detail);
        baseM1Detail.wareHsId = null;
        baseM1Detail.wareHsMid1 = null;
        // baseM1Detail.groupNo = row.groupNo;
        // baseM1Detail.groupNo = groupno + 1;
        baseM1Detail.pdtId = row.pdtId;
        baseM1Detail.pdtVndNo = row.pdtno1.trim();
        baseM1Detail.pdtName = row.pdtName.trim();
        baseM1Detail.pdtNameE = row.pdtNamee.trim();
        baseM1Detail.specification = row.specificatione.trim();
        baseM1Detail.uom = row.uom.trim();
        baseM1Detail.uomRate = 1.0;
        baseM1Detail.uom1 = row.uom1;
        let amountps = row.amountps;
        if (amountps === null || amountps === 0.0) {
          amountps = 1.0;
        }
        let sapsl = row.quatity;
        if (sapsl === null) {
          sapsl = 0.0;
        }
        baseM1Detail.amountPs = amountps;
        if (sapsl !== 0) {
          baseM1Detail.outQnttyItem1 = Math.ceil(sapsl / amountps);
        } else {
          baseM1Detail.outQnttyItem1 = 0;
        }
        baseM1Detail.outQnttyPiece1 = sapsl.toFixed(8);
        baseM1Detail.sapUnit = row.sapunit;
        baseM1Detail.sapPrice = row.sapprice;
        let sapunitrate = row.sapunitrate;
        if (sapunitrate === null || sapunitrate === 0) {
          sapunitrate = 1.0;
        }
        baseM1Detail.sapUnitRate = sapunitrate;
        baseM1Detail.sapQty = (sapsl / sapunitrate).toFixed(8);
        baseM1Detail.tradeType = this.formData.objectNo;
        baseM1Detail.orgCoNo = this.formData.orgCoNo;
        baseM1Detail.orgNo = this.formData.orgNo;
        baseM1Detail.empNo = this.formData.employeeNo;
        baseM1Detail.orderSid = row.ordersId;
        baseM1Detail.orderNo = row.orderNo;
        baseM1Detail.orderMid = row.ordermId;
        baseM1Detail.isNo = this.formData.expNoticNo;
        baseM1Detail.isMid = row.invoicemId;
        baseM1Detail.isMid1 = row.invoicemId;
        baseM1Detail.soType = 0;
        baseM1Detail.lotNo = "";
        baseM1Detail.wareHsCode = this.formData.wareHsCode;
        baseM1Detail.wareHsType = 0;
        baseM1Detail.unitCost = 0.0;
        baseM1Detail.unitCostNT = 0.0;
        baseM1Detail.originalSid = 0;
        baseM1Detail.originalId = 0;
        baseM1Detail.atr = 0.0;
        baseM1Detail.amntRMB = 0.0;
        baseM1Detail.amntRMBNt = 0.0;
        baseM1Detail.atrAmount = 0.0;
        baseM1Detail.wareLocNo = this.formData.wareLocNo;
        baseM1Detail.wareLoc = this.formData.wareLoc;
        baseM1Detail.flag3 = 1;
        baseM1Detail.otherRate = row.hl;
        baseM1Detail.hsdj = row.unitprice;
        baseM1Detail.transferAmountOut = (
          sapsl * rMoneyFormat(row.unitprice)
        ).toFixed(2);
        // 格式化
        baseM1Detail.outQnttyPiece1 = Number(baseM1Detail.outQnttyPiece1);
        // baseM1Detail.outQnttyPiece1 = moneyFormat(
        //   Number(baseM1Detail.outQnttyPiece1)
        // );
        baseM1Detail.hsdj = Number(baseM1Detail.hsdj);
        // baseM1Detail.hsdj = moneyFormat(Number(baseM1Detail.hsdj));
        baseM1Detail.transferAmountOut = Number(baseM1Detail.transferAmountOut);
        // baseM1Detail.transferAmountOut = moneyFormat(
        //   Number(baseM1Detail.transferAmountOut)
        // );
        baseM1Detail.atr = Number(baseM1Detail.atr);
        // baseM1Detail.atr = moneyFormat(Number(baseM1Detail.atr));
        baseM1Detail.sapUnitRate = Number(baseM1Detail.sapUnitRate);
        // baseM1Detail.sapUnitRate = moneyFormat(
        //   Number(baseM1Detail.sapUnitRate)
        // );
        baseM1Detail.sapQty = Number(baseM1Detail.sapQty);
        // baseM1Detail.sapQty = moneyFormat(Number(baseM1Detail.sapQty));

        // 不允许相同的行
        let index = this.formData.m1Items.findIndex(
          (item) => baseM1Detail.isMid === item.isMid1
        );
        if (index == -1) {
          this.formData.m1Items.push(baseM1Detail);
        }
      });
      // 添加完后将每一行明细的groupNo进行赋值
      this.$groupNo();
      this.isShowExpNoticNoOrSales = false;
      this.summaryAmntRMB();
    },
    $groupNo() {
      this.formData.m1Items.forEach((item, index) => {
        this.formData.m1Items[index].groupNo = index + 1;
      });
    },
    // 仓库选择
    wareLocSelect(row) {
      this.formData.wareLocNo = row.wareLocNo;
      this.formData.wareType = row.wareType;
      this.formData.wareLoc = row.wareLoc;
      this.formData.wareLoc2 = row.wareLoc2;
      (this.formData.contactInfoItems
        ? this.formData.contactInfoItems
        : []
      ).forEach((item, index) => {
        if (item.type === "W") {
          this.formData.contactInfoItems.splice(index, 1);
          this.formData.filterContactItems.push(item);
        }
      });
      // 2.仓库列表信息带入到联系信息中
      this.contactFormW.type = "W";
      this.contactFormW.lxr = row.contact || "";
      this.contactFormW.phone = row.phone || "";
      this.contactFormW.fax = row.fax || "";
      this.contactFormW.coName = getCookie("loginInfo").enterpriseName;
      this.contactFormW.addr = row.addr || "";
      this.formData.contactInfoItems.push(this.contactFormW);
      console.log("contactFormW", this.contactFormW);
      // 3.更新出库单商品中的仓库信息
      this.formData.m1Items.forEach((item) => {
        item.wareLocNo = row.wareLocNo;
        item.wareLoc = row.wareLoc;
      });
      // 4.清除出库商品清单数据
      this.formData.items.forEach((item) => {
        this.formData.filterItems.push(item);
      });
      this.formData.items = [];
      this.isShowWareLoc = false;
    },
    /// form表单中触发  选择业务员的按钮
    mainSelecteEmployee() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.showEmploeeySelect = true;
    },
    // 当前详情是否可以修改
    getOrderCanEdit() {
      let docEntry = this.formData.wareHsId;
      if (!docEntry) {
        return 0;
      }
      let auditstatu = this.formData.adtStatus;
      if (!auditstatu && (auditstatu === "Y" || auditstatu === "S")) {
        return 0;
      }

      return 1;
    },
    setBtnStatus() {
      // 当前 页面的编辑状态 editStatus  考虑  add  edit  view
      if (this.editStatus === "add") {
        this.btnSaveShow = true;
        this.btnCancelShow = true;
        this.isShowPdfview = false;
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
        this.isShowPdfview = true;
        /////
        this.btnSapShow = false;
        let auditStatu = this.formData.adtStatus;
        if (auditStatu === "D" || auditStatu === "N") {
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
        } else if (auditStatu === "UN") {
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
    /// 设置 按钮的状态
    // setBtnStatus() {
    //   if (this.editStatus === "add") {
    //     this.btnSaveShow = true;
    //     this.btnCancelShow = true;
    //     this.btnAddShow = false;
    //     this.btnEditShow = false;
    //     this.btnAuditShow = false;
    //     this.btnSapShow = false;
    //     this.btnCancelAuditShow = false;
    //     this.btnDeleteShow = false;
    //     this.orderReadOnly = false;
    //   } else if (this.editStatus === "view") {
    //     this.orderReadOnly = true;
    //     this.btnAddShow = true;
    //     this.btnSaveShow = false;
    //     this.btnCancelShow = false;
    //     /////
    //     this.btnSapShow = false;
    //     let auditStatu = this.formData.adtStatus;
    //     if (auditStatu === "D") {
    //       this.btnDeleteShow = true;
    //       this.btnEditShow = true;
    //       this.btnAuditShow = true;
    //       this.btnCancelAuditShow = false;
    //     } else if (auditStatu === "S") {
    //       this.btnDeleteShow = false;
    //       this.btnEditShow = false;
    //       this.btnAuditShow = false;
    //       this.btnCancelAuditShow = true;
    //     } else if (auditStatu === "Y") {
    //       this.btnDeleteShow = false;
    //       this.btnEditShow = false;
    //       this.btnAuditShow = false;
    //       this.btnCancelAuditShow = true;
    //       this.btnSapShow = true;
    //     }
    //   } else if (this.editStatus === "edit") {
    //     /// 修改状态下，只有删除和保存
    //     this.btnSaveShow = true;
    //     this.btnCancelShow = true;
    //     this.orderReadOnly = false;
    //     this.btnAddShow = false;
    //     this.btnDeleteShow = false;
    //     this.btnAuditShow = false;
    //     this.btnCancelAuditShow = false;
    //     this.btnSapShow = false;
    //   }
    // },
    ////主表新增一个新的单据
    addOrder() {
      this.tabActive = 0;
      for (let key in this.formData) {
        this.formData[key] = this.baseForm[key];
      }
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
      this.formData.currencyCode = "CNY";
      this.formData.exchangRt = 1.0;
      this.formData.wareHsType = 2;
      this.formData.wareHsW = "出";
      this.formData.accontrol = "0";
      this.formData.wareHsCode = "20";
      this.formData.objectNo3 = "PM03";
      this.formData.wareHsClss = "销售商品出库";
      this.formData.accAdtId = 0;
      this.formData.soType = 0;

      // 联系信息
      this.contactFormB.type = "B";
      this.contactForm.type = "S";
      this.contactFormW.type = "W";

      //提货方式、仓库费用、运费支付
      this.formData.outType = "收款放货";
      this.formData.feePayer = "C";
      this.formData.rcvPrt = "C";

      //产生默认附件记录
      let fileItems = Object.assign({}, this.fileItems);
      fileItems.type = "";
      fileItems.fileDesc = "";
      fileItems.rowId = 1;
      fileItems.fileName = "收货确认函";
      fileItems.impDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
      fileItems.empNo = getCookie("loginInfo").userNo;
      fileItems.empName = getCookie("loginInfo").realName;
      this.formData.fileItems.push(fileItems);
      this.formData.objectDocNo = "PM08";
      this.editStatus = "add";
      this.setBtnStatus();
    },

    ///重新加载所有的数据
    loadDetail() {
      detail({ wareHsId: this.wareHsId }).then((res) => {
        this.$route.query.wareHsId = res.data.wareHsId;
        this.wareDate = res.data.wareDate;
        res.data.m1Items.forEach((item) => {
          item.hsdj = moneyFormat(item.hsdj);
          item.transferAmountOut = moneyFormat(item.transferAmountOut);
        });
        res.data.rpAmount = moneyFormat(res.data.rpAmount);
        res.data.wareDate = dateFormat(res.data.wareDate, "yyyy-MM-dd");
        res.data.contactInfoItems.forEach((item) => {
          if (item.type === "S") {
            this.contactForm = item;
          } else if (item.type === "B") {
            this.contactFormB = item;
          } else if (item.type === "W") {
            this.contactFormW = item;
          }
        });
        this.formData = res.data;
        // this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.loadOaStatus();
        this.setBtnStatus();
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
      this.isShowPdtGoods = true;
    },
    /// 弹窗中用户选择了某一个商品
    selectItemProduct(item) {
      if (this.activePdtItemIndex === -1) {
        let newRow = {
          pdtNo1: item.pdtNo1,
          pdtNameC: item.pdtNameC,
          sapUnit: item.sapunit,
          sapUnitRate: item.sapunitrate,
          uom: item.uOM,
          hl: item.hl,
          quantity: 0.0,
          unitPrice: 0.0,
          amount: 0.0,
        };
        this.formData.items.push(newRow);
        this.pdtItemsActiveIndex = this.formData.items.length - 1;
      } else {
        this.formData.items[this.activePdtItemIndex].pdtNo1 = item.pdtNo1;
        this.formData.items[this.activePdtItemIndex].pdtNameC = item.pdtNameC;
        this.formData.items[this.activePdtItemIndex].uom = item.uOM;
        this.formData.items[this.activePdtItemIndex].sapUnit = item.sapunit;
        this.formData.items[this.activePdtItemIndex].sapUnitRate =
          item.sapunitrate;
        this.formData.items[this.activePdtItemIndex].hl = item.hl;
        this.formData.items[this.activePdtItemIndex].quantity = 0.0;
        this.formData.items[this.activePdtItemIndex].unitPrice = 0.0;
        this.formData.items[this.activePdtItemIndex].amount = 0.0;
      }

      this.isShowPdtGoods = false;
    },
    // 新增商品
    addGoods() {
      const wareLoc = this.formData.wareLoc;
      if (!wareLoc) {
        Notify({ type: "warning", message: "请先选择仓库信息" });
        return;
      }
      const expNoticNo = this.formData.expNoticNo.trim();
      if (!expNoticNo) {
        Notify({ type: "warning", message: "请先选择合同号信息" });
        return;
      }
      if (this.formData.objectNo3 === "PM03") {
        this.ckForm.isNo = expNoticNo;
        this.ckForm.orgCoNo = getDefaultOrgCoNo();
        this.isShowGoodsDetail = true;
      } else {
        this.goodsExpInvoorEntpotSalForm.orgCoNo = getDefaultOrgCoNo();
        this.goodsExpInvoorEntpotSalForm.invoiceNo = expNoticNo;
        if (this.formData.objectNo3 === "SD01") {
          this.goodsExpInvoorEntpotSalForm.orderType = "1";
        }
        if (this.formData.objectNo3 === "SM07") {
          this.goodsExpInvoorEntpotSalForm.orderType = "9";
        }
        this.isShowExpNoticNoOrSalesGoods = true;
      }
    },
    // 新增商品信息
    handleAddPdtItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      if (
        !this.formData.wareType ||
        this.formData.wareType == "本公司实物库" ||
        !this.formData.expNoticNo
      ) {
        Notify({
          type: "warning",
          message: "仓库类型要是非本公司实物库且仓库编码和合同号不能为空!",
        });
        return;
      }
      // 出库商品清单四个查询条件
      this.ckListForm.wareLocNo = this.formData.wareLocNo;
      this.ckListForm.wareLoc = this.formData.wareLoc;
      this.ckListForm.lotNo = "";
      this.ckListForm.factory = "";
      if (!this.ckListForm.pdtNo1) {
        Notify({
          type: "warning",
          message:
            "出库清单查询条件物料号不能为空,请先从出库清单中勾选一项带出物料号!",
        });
        return;
      }
      this.isShowPdtGoods = true;

      // this.ckListForm.pdtNo1 = this.currentRowKey.pdtVndNo;
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
        title: `确定删除当前出库单吗?`,
        message: `出库单【${this.formData.wareHsNo}】一旦删除，则无法恢复!`,
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
    // 保存之前的操作 数据校验
    checkSaveFormData() {
      // 合同号判断
      let temp = this.formData.expNoticNo;
      if (!temp) {
        Notify({ type: "warning", message: "合同号尚未录入!" });
        return 0;
      }
      // 账期天数
      temp = this.formData.customerID;
      if (!temp) {
        Notify({ type: "warning", message: "账期天数尚未录入!" });
        return 0;
      }
      // 币种
      temp = this.formData.currencyCode;
      if (!temp) {
        Notify({ type: "warning", message: "币种尚未录入!" });
        return 0;
      }
      //仓库
      temp = this.formData.wareLoc;
      if (!temp) {
        Notify({ type: "warning", message: "仓库尚未录入!" });
        return 0;
      }
      // 合同类型
      // temp = this.formData.orderMode;
      // if (!temp) {
      //   Notify({ type: "warning", message: "合同类型尚未选择!" });
      //   return 0;
      // }
      // 销售类型
      // temp = this.formData.saleType;
      // if (!temp) {
      //   Notify({ type: "warning", message: "销售类型尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.outType;
      // if (!temp) {
      //   Notify({ type: "warning", message: "收款方式尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.payMode;
      // if (!temp) {
      //   Notify({ type: "warning", message: "收款模式尚未选择!" });
      //   return 0;
      // }
      // temp = this.formData.msd;
      // if (!temp) {
      //   Notify({ type: "warning", message: "最迟交货期尚未选择!" });
      //   return 0;
      // }
      /// 明细必须有
      // if (!this.formData.items || this.formData.items.length == 0) {
      //   Notify({ type: "warning", message: "尚未录入商品明细!" });
      //   return 0;
      // }
      // 对明细进行验证
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
      // }

      return 1;
    },
    /////保存之前的操作
    beforeDoSave() {
      let check = this.checkSaveFormData();
      if (!check) {
        return 0;
      }
      // 去除选择出库商品时添加的新属性checked
      this.formData.m1Items.forEach((item) => {
        Object.keys(item).forEach((iten) => {
          if (iten === "checked") {
            delete item.checked;
          }
        });
      });
      console.log(
        "去除选择出库商品时添加的新属性checked",
        this.formData.m1Items
      );
      this.sendFomData = this.formData;
      return 1;
    },
    isEqual() {
      // 出库清单有明细时才作处理
      if (this.formData.items && this.formData.items.length) {
        // 出库商品【应出数量】合计
        let outQnttyPiece1M1Items = this.formData.m1Items.reduce(
          (pre, { outQnttyPiece1 }) => {
            return pre + Number(rMoneyFormat(outQnttyPiece1));
          },
          0
        );
        // 出库清单【应出数量】合计
        let outQnttyPiece1Items = this.formData.items.reduce(
          (pre, { outQnttyPiece1 }) => {
            return pre + Number(rMoneyFormat(outQnttyPiece1));
          },
          0
        );
        console.log("outQnttyPiece1M1Items", outQnttyPiece1M1Items);
        console.log("outQnttyPiece1Items", outQnttyPiece1Items);
        if (outQnttyPiece1M1Items === outQnttyPiece1Items) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    mainBtnClickSave() {
      let check = this.beforeDoSave();
      if (!check) {
        return;
      }
      if (this.sendFomData.wareType !== "本公司实物库") {
        // if (this.sendFomData.wareType !== "本公司实物库") {
        if (this.sendFomData.items && this.sendFomData.items.length === 0) {
          Notify({
            message: "仓库类型不是本公司实物库时,出库商品清单不允许为空!",
            type: "warning",
          });
          return;
        }
      }

      // 出库商品数量合计

      this.sendFomData.items.forEach((item, index) => {
        this.sendFomData.items[index].outQnttyPiece1 = rMoneyFormat(
          this.sendFomData.items[index].outQnttyPiece1
        );
        this.sendFomData.items[index].sapPrice = rMoneyFormat(
          this.sendFomData.items[index].sapPrice
        );
        this.sendFomData.items[index].sapQty = rMoneyFormat(
          this.sendFomData.items[index].sapQty
        );
      });
      // res.data.m1Items.forEach((item) => {
      //     item.hsdj = moneyFormat(item.hsdj);
      //     item.transferAmountOut = moneyFormat(item.transferAmountOut);
      //   });
      this.sendFomData.m1Items.forEach((item, index) => {
        if (!item.outQnttyPiece1) {
          this.sendFomData.m1Items[index].outQnttyPiece1 = 0;
        }
        item.hsdj = rMoneyFormat(item.hsdj);
        item.transferAmountOut = rMoneyFormat(item.transferAmountOut);
      });
      this.sendFomData.rpAmount = rMoneyFormat(this.sendFomData.rpAmount);
      this.sendFomData.wareDate = this.wareDate;
      this.summaryAmntRMB();
      const res = this.isEqual();
      if (!res) {
        Notify({
          type: "warning",
          message:
            "出库清单【应出数量】与出库商品【应出数量】的合计要保持一致!",
        });
        return;
      }

      if (this.sendFomData.wareHsId) {
        updateWareHouse(this.sendFomData)
          .then((res) => {
            this.doAfterSave(res);
            this.loadDetail();
          })
          .catch((res) => {
            Notify({
              type: "danger",
              message: res,
            });
          });
        return;
      } else {
        this.addWareHouseApi();
      }

      // this.doInsertIeInlandSale();
    },
    addWareHouseApi() {
      addWareHouse(this.sendFomData)
        .then((res) => {
          this.formData = res.data;
          this.wareHsId = res.data.wareHsId;
          this.sendFomData = {};
          this.editStatus = "view";
          Notify({
            type: "success",
            message: "新增出库单成功!",
          });
          this.loadDetail();
          this.setBtnStatus();
        })
        .catch((res) => {
          Notify({
            type: "warning",
            message: res,
          });
        });
      return;
    },
    ///// 保存之后的操作
    doAfterSave(res) {
      if (res) {
        this.formData = res.data;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.sendFomData = {};
        this.editStatus = "view";
        Notify({
          type: "success",
          message: "修改出库单成功!",
        });
        this.setBtnStatus();
        return;
      } else {
        Notify({
          type: "error",
          message: "保存出库单出错",
        });
      }
    },
    //// 实际上是insert 的操作
    doInsertIeInlandSale() {
      this.genarareForm.orgCoNo = getDefaultOrgCoNo();
      genarateDocNo(this.genarareForm)
        .then((res) => {
          this.tempIsNo = res.data;
          this.isNoInputShow = true;
        })
        .catch((res) => {
          Notify({
            type: "error",
            message: "创建销售合同号错误：" + res.message,
          });
          return;
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
      //  sapOrderNo
      if (this.formData.sapVouNo !== "") {
        Notify({
          type: "warning",
          message: "该记录已提交SAP,不能撤消审批",
        });
        return;
      }
      this.undoApplyShow = true;
    },
    mainBtnClickSap() {
      applySap({ wareHsId: this.formData.wareHsId })
        .then((res) => {
          Notify({ type: "success", message: "提交SAP成功!" });
          this.loadDetail();
        })
        .catch((res) => {
          console.log("mainBtnClickSapres", res);
          Notify({ type: "danger", message: res });
        });
    },
    //实际的取消操作
    doCancelOrder() {
      // if(this.editStatus === "add") {
      //   this.$router.push({
      //     path: "/warehouseOut/list",
      //   });
      //   return;
      // }
      if (this.oldFormData && this.oldFormData.wareHsId) {
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
    // 删除明细
    deletePdtItem(index, type) {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "当前单据是只读状态,不可编辑!",
        });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前商品吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index, type);
        })
        .catch(() => {});
    },
    // 待处理
    doDeletePdtItem(index, type) {
      if (this.formData[type][index].wareHsId) {
        const m1ItemsOrItems =
          String(type.slice(0, 1)).toLocaleUpperCase() + type.slice(1);
        var len = this.formData[`filter${m1ItemsOrItems}`].length;
        this.formData[`filter${m1ItemsOrItems}`][len] =
          this.formData[type][index];
      }
      this.formData[type].splice(this.formData[type][index], 1);
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

    uploadFile(file, index) {
      console.log("file", index);
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
            this.formData.fileItems[index] = newFileItem;
          }
        })
        .catch();
    },
  },
  activated() {
    console.log("activated");
  },
  computed: {
    // 贸易方式
    getObjectNo() {
      let objectNo = "";
      this.objectNoList.forEach((item) => {
        if (item.value === this.formData.objectNo) {
          objectNo = item.label;
        }
      });
      return objectNo;
    },
    // 计算平台名称
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
      let tradType = this.formData.tradType;
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
.scroll-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 4.7rem);
  overflow: auto;
}
.collapse-slot-title {
  display: flex;
  justify-content: space-between;
}
::v-deep {
  .van-cell.van-field.ware-loc {
    // .van-cell__value.van-field__value {
    background-color: rgb(31 162 232);
    // }
  }
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
  height: calc(100vh - 100px);
  // height: calc(100vh - 151.47px);
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
.wrappers-goods-detail {
  height: calc(100vh - 126.91px - v-bind(heightIndex));
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
  // background-color: white;
  margin-bottom: 10px;
  .uploader-file {
    width: 400%;
    position: relative;
    height: 40px;
    flex: 1;
    .van-button {
      position: absolute;
      width: 100%;
    }
  }
  .van-button:nth-child(1),
  .van-button:nth-child(3) {
    flex: 1;
    height: 30px;
    // margin: 0 17px;
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
.wro-detail-title {
  padding: 10px;
  font-size: 18px;
  background-color: #fff;
}
.scroll-wrap-upload-file {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 3.7rem);
  overflow: auto;
}
.scroll-wrap-main-table {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 3.7rem);
  overflow: auto;
}
::v-deep {
  .btn-group-setting {
    background-color: #fff;
    padding-bottom: 10px;
    .van-button {
      width: 100%;
    }
    .uploader-file {
      width: 100%;
      .van-uploader__input-wrapper {
        width: 100%;
      }
    }
  }
}
</style>
