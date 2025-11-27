<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        v-show="btnShow.save"
        size="small"
        class="tools-bar-button"
        @touchstart="handleUpdate"
        type="success"
        @click="mainBtnClickSave"
        >保存</van-button
      >
      <van-button
        v-show="btnShow.cancel"
        size="small"
        class="tools-bar-button"
        type="warning"
        color="#e8c048"
        @click="mainBtnClickCancel"
        >取消</van-button
      >
      <van-button
        v-show="btnShow.add"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        @click="mainBtnClickAdd"
        >新增</van-button
      >
      <van-button
        v-show="btnShow.edit"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="editStatus === 'view'"
        @click="mainBtnClickEdit"
        >修改</van-button
      >
      <van-button
        v-show="btnShow.delete"
        size="small"
        class="tools-bar-button"
        type="danger"
        color="#e85452"
        @click="mainBtnClickDelete"
        >删除</van-button
      >
      <!-- <van-button
        v-show="btnShow.changeContract"
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#e85452"
        @click="handleChangeContract"
        >合同变更</van-button
      > -->

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnShow.applyAudit"
        color="#1fa2e8"
        @click="mainBtnClickAudit"
        >提交审批</van-button
      >

      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        v-show="btnShow.cancelAudit"
        color="#e8c048"
        @click="mainBtnClickCancelAudit"
        >撤销审批</van-button
      >
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnShow.sendSap"
        @click="mainBtnClickSap"
        >提交SAP</van-button
      >
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-if="btnShow.pdfView"
        @click="handlePreview"
        >预览</van-button
      >
    </div>
    <van-tabs v-model:active="tabActive" class="magin-top:20px">
      <van-tab title="主表信息">
        <div class="scroll-wrap-main-table">
          <van-form label-width="120">
            <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              readonly
              required
              placeholder="平台公司"
            />
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="auditStatusList"
              :label="'审批状态'"
              :placeholder="'审批状态'"
              :readonly="true"
              :field="formData.auditStatus"
              :btnStatus="editStatus"
            />
            <van-field
              v-model="formData.poDate"
              readonly
              name="制单日期"
              label="制单日期"
              placeholder="系统生成，无需录入"
            />
            <van-field
              v-model="formData.poNo"
              readonly
              required
              name="采购合同号"
              label="采购合同号"
              placeholder="系统生成，无需录入"
            />
            <van-field
              v-model="formData.docVersion"
              readonly
              name="版本"
              label="版本"
              placeholder="请输入版本"
            />
            <van-field
              readonly
              v-model="formData.orgName"
              name="采购部门"
              label="采购部门"
              required
              placeholder="部门"
            />
            <van-field
              readonly
              required
              is-link
              v-model="formData.employeeName"
              name="采购员"
              label="采购员"
              placeholder="请输入采购员"
              @click="mainFieldSelect('employee')"
            />
            <van-field
              required
              type="textarea"
              rows="1"
              autosize
              v-model="formData.vendorName"
              name="供货商"
              label="供货商"
              is-link
              readonly
              placeholder="供货商"
              @click="vendorNameClick"
            />
            <van-field
              v-model="formData.onlineOk"
              required
              is-link
              readonly
              name="线上签署"
              label="线上签署"
              placeholder="线上签署"
              @click="mainFieldClick('onlineOk')"
            />
            <van-field
              required
              is-link
              v-model="formData.printOk"
              readonly
              name="供应商盖章"
              label="供应商盖章"
              placeholder="供应商盖章"
              @click="mainFieldClick('printOk')"
            />
            <RcmSelect
              :select-label="'refValue'"
              :select-value="'refValueCode'"
              :valueKey="'refValue'"
              :options="orderTypeList"
              :label="'贸易方式'"
              :name="'贸易方式'"
              :placeholder="'贸易方式'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.ordTypNo"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'orderType', 'ordTypNo')
              "
            />
            <van-field
              v-model="formData.signDate"
              is-link
              readonly
              name="签约日期"
              label="签约日期"
              placeholder="请选择签约日期"
              @click="mainDateFieldClick('signDate')"
            />
            <van-field
              v-model="formData.contractType"
              name="合同类型"
              label="合同类型"
              is-link
              readonly
              placeholder="合同类型"
              @click="mainFieldClick('contractType')"
            />
            <RcmSelect
              :select-label="'currencyName'"
              :select-value="'currencyCode'"
              :valueKey="'currencyName'"
              :options="currencyCodeList"
              :label="'币种'"
              :name="'币种'"
              :placeholder="'币种'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.currencyCode"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'currencyCode')
              "
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.exchRate"
              name="汇率"
              label="汇率"
              placeholder="请输入汇率"
            />
            <van-field
              v-model="formData.totalPoValue"
              name="合同金额"
              label="合同金额"
              readonly
              placeholder="0.00"
            />
            <van-field
              v-model="formData.totalPoValueS"
              name="本位币金额"
              label="本位币金额"
              readonly
              placeholder="0.00"
            />
            <van-field
              v-model="formData.sapType"
              readonly
              name="SAP状态"
              label="SAP状态"
              placeholder="系统生成，无需录入"
            />
            <van-field
              v-model="formData.sapOrderNo"
              name="SAP采购订单号"
              label="SAP采购订单号"
              readonly
              placeholder="系统生成，无需录入"
            />
            <van-field
              v-model="formData.sapCreateDate"
              name="SAP创建日期"
              label="SAP创建日期"
              placeholder="系统生成，无需录入"
              readonly
            />
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="poStatusList"
              :label="'执行状态'"
              :name="'执行状态'"
              :placeholder="'执行状态'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.poStatus"
              @change="
                ({ label, value }) =>
                  changeRcmSelect({ label, value }, 'poStatus')
              "
            />
          </van-form>
        </div>
      </van-tab>
      <van-tab title="商品信息">
        <div class="detail_item">
          <div class="scroll-wrap-main-table">
            <div class="pdt_bt">
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
                >新增商品
              </van-button>
            </div>
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index"
                :title="
                  formData.items.length > 1
                    ? index + 1 + '.' + item.prodName
                    : item.prodName
                "
              >
                <van-form>
                  <van-row>
                    <van-col span="24">
                      <van-field
                        label-width="88"
                        v-model="item.contractNo"
                        input-align="left"
                        readonly
                        name="销售合同号"
                        label="销售合同号"
                        placeholder="销售合同号"
                      />
                    </van-col>
                    <van-col span="24">
                      <van-field
                        label-width="88"
                        v-model="item.pdtNo1"
                        input-align="left"
                        readonly
                        label-class="van-field__label"
                        name="公司商品号"
                        label="公司商品号"
                        placeholder="公司商品号"
                      />
                    </van-col>
                  </van-row>

                  <van-field
                    label-width="68"
                    input-align="left"
                    v-model="item.prodName"
                    readonly
                    name="中文品名"
                    label="中文品名"
                    placeholder="中文品名"
                  />

                  <van-field
                    label-width="68"
                    v-model="item.spec"
                    :readonly="orderReadOnly"
                    input-align="left"
                    name="规格型号"
                    label="规格型号"
                    placeholder="规格型号"
                  />
                  <van-col span="24">
                    <van-field
                      input-align="left"
                      label-width="68"
                      v-model="item.hl"
                      :readonly="orderReadOnly"
                      name="含量(%)"
                      label="含量(%)"
                      placeholder="含量(%)"
                    />
                  </van-col>
                  <van-col span="24">
                    <van-field
                      required
                      input-align="left"
                      label-width="68"
                      v-model="item.uomName"
                      readonly
                      name="采购单位"
                      label="采购单位"
                      placeholder="采购单位"
                    />
                  </van-col>
                  <van-col span="24">
                    <van-field
                      label-width="68"
                      input-align="left"
                      v-model="item.unitStdCost"
                      required
                      :readonly="orderReadOnly"
                      name="采购单价"
                      label="采购单价"
                      placeholder="采购单价"
                      @change="(value) => CalcUnitStdCost(value, item, index)"
                    />
                  </van-col>
                  <van-col span="24">
                    <van-field
                      required
                      input-align="left"
                      label-width="68"
                      v-model="item.quantity"
                      border
                      :readonly="orderReadOnly"
                      name="采购数量"
                      label="采购数量"
                      placeholder="采购数量"
                      @change="(value) => CalcQuantity(value, item, index)"
                    />
                    <!-- type="number" -->
                  </van-col>

                  <van-col span="24">
                    <van-field
                      required
                      v-model="item.subSumValue"
                      label-width="68"
                      input-align="left"
                      :readonly="orderReadOnly"
                      name="采购金额"
                      label="采购金额"
                      placeholder="采购金额"
                      @change="(value) => CalcSubSumValue(value, item, index)"
                    />
                  </van-col>

                  <van-col span="24">
                    <van-field
                      v-model="item.sapUnit"
                      input-align="left"
                      readonly
                      label-width="94"
                      name="sapUnit"
                      label="SAP计量单位"
                  /></van-col>
                  <van-col span="24">
                    <van-field
                      v-model="item.sapUnitRate"
                      readonly
                      input-align="left"
                      label-width="108"
                      label="SAP转换比"
                      placeholder="请输入SAP转换比"
                  /></van-col>
                  <van-col span="24">
                    <van-field
                      input-align="left"
                      v-model="item.sapPrice"
                      readonly
                      name="sapPrice"
                      label="SAP采购单价"
                      placeholder="SAP采购单价"
                    />
                  </van-col>
                  <van-col span="24">
                    <van-field
                      required
                      input-align="left"
                      v-model="item.sapQtty"
                      readonly
                      name="sapQtty"
                      label="SAP采购数量"
                      placeholder="SAP采购数量"
                  /></van-col>
                  <!-- type="number" -->

                  <van-col span="24">
                    <van-field
                      label-width="68"
                      v-model="item.uom1"
                      input-align="left"
                      readonly
                      border
                      name="包装单位"
                      label="包装单位"
                      placeholder="包装单位"
                  /></van-col>
                  <van-col span="24">
                    <van-field
                      label-width="85"
                      v-model="item.amountPs"
                      readonly
                      input-align="left"
                      name="数量/包装"
                      label="数量/包装"
                      placeholder="数量/包装"
                  /></van-col>

                  <van-field
                    v-model="item.remark"
                    :readonly="orderReadOnly"
                    label-width="38"
                    type="textarea"
                    name="备注"
                    label="备注"
                    placeholder="备注"
                  />
                  <van-field
                    v-model="item.quantity1"
                    readonly
                    input-align="left"
                    name="入库数量"
                    label="入库数量"
                    placeholder="入库数量"
                  />

                  <van-field
                    v-model="item.atr"
                    :readonly="orderReadOnly"
                    input-align="left"
                    name="增值税率(%)"
                    label="增值税率(%)"
                    placeholder="增值税率(%)"
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
            </van-collapse>
          </div>
        </div>
      </van-tab>
      <van-tab title="基本信息">
        <div class="scroll-wrap-main-table">
          <van-form label-width="130">
            <van-field
              v-model="formData.signSite"
              :readonly="orderReadOnly"
              name="签约地点"
              label="签约地点"
              placeholder="签约地点"
            />
            <van-field
              v-model="formData.validTo"
              required
              is-link
              readonly
              name="合同有效日期"
              label="合同有效日期"
              placeholder="合同有效日期"
              @click="mainDateFieldClick('validTo')"
            />
            <van-field
              v-model="formData.shipTo"
              required
              is-link
              readonly
              name="交货地点"
              label="交货地点"
              placeholder="请选择交货地点"
              @click="mainFieldSelect('warehouse')"
            />
            <van-field
              v-model="formData.msd"
              required
              is-link
              readonly
              name="交货日期"
              label="交货日期"
              placeholder="请选择交货日期"
              @click="mainDateFieldClick('msd')"
            />
            <van-field
              v-model="formData.dlvTerm"
              is-link
              readonly
              name="交货方式"
              label="交货方式"
              placeholder="请选择交货方式"
              @click="mainFieldClick('dlvTerm')"
            />
            <van-field
              v-model="formData.notifyDays"
              type="number"
              :readonly="orderReadOnly"
              name="交货前通知天数"
              label="交货前通知天数"
              placeholder="交货前通知天数"
            />
            <van-field
              v-model="formData.payMode"
              required
              is-link
              readonly
              name="付款方式"
              label="付款方式"
              placeholder="请选择付款方式"
              @click="mainFieldClick('payMode')"
            />
            <van-field
              v-model="formData.payDate"
              is-link
              readonly
              name="付款日期"
              label="付款日期"
              placeholder="请选择付款日期"
              @click="mainDateFieldClick('payDate')"
            />
            <van-field
              v-model="formData.payDetail"
              :readonly="orderReadOnly"
              name="付款详情"
              label="付款详情"
              placeholder="请输入付款详情"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="formData.payTerm"
              is-link
              readonly
              name="付款类型"
              label="付款类型"
              placeholder="请选择付款类型"
              @click="mainFieldClick('payTerm')"
            />
            <van-field
              v-model="formData.prepayPortion"
              :readonly="getReadOnly"
              name="预付比例(%)"
              label="预付比例(%)"
              placeholder="请输入预付比例(%)"
              @change="changePrepayPortion"
            />
            <van-field
              v-model="formData.prepaySum"
              :readonly="getReadOnly"
              @change="changePrepaySum"
              name="预付金额"
              label="预付金额"
            />
            <van-field
              v-model="formData.payDate"
              is-link
              readonly
              name="预付款日期"
              label="预付款日期"
              placeholder="请选择预付款日期"
              @click="mainDateFieldClick('payDate')"
            />
            <van-field
              v-model="formData.remark"
              :readonly="orderReadOnly"
              name="备忘录"
              label="备忘录"
              placeholder="请输入备忘录"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="formData.quatity"
              :readonly="orderReadOnly"
              name="质量标准"
              label="质量标准"
              placeholder="请输入质量标准"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="formData.settlement"
              :readonly="orderReadOnly"
              name="结算方式"
              label="结算方式"
              placeholder="请输入结算方式"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="formData.quatityPeriod"
              :readonly="orderReadOnly"
              name="卖方对质量负责期限"
              label="卖方对质量负责期限"
              placeholder="卖方对质量负责期限"
            />
            <van-field
              v-model="formData.delivery"
              :readonly="orderReadOnly"
              name="交货期限"
              label="交货期限"
              placeholder="请输入交货期限"
            />
            <van-field
              v-model="formData.transAndFee"
              :readonly="orderReadOnly"
              name="运输方式及费用承担"
              label="运输方式及费用承担"
              placeholder="请输入运输方式及费用承担"
              type="textarea"
              rows="1"
              autosize
            />
          </van-form>
        </div>
      </van-tab>
      <van-tab title="联系信息">
        <van-collapse accordion v-model="contactInfoActiveIndex">
          <div class="scroll-wrap-main-table">
            <van-collapse-item title="我方联系信息" name="1">
              <van-form label-width="100">
                <van-cell-group @click="vanCellGroupBtn">
                  <van-field
                    v-model="contactForm.coName"
                    :readonly="orderReadOnly"
                    label="买方"
                    placeholder="请输入买方"
                  />
                  <van-field
                    v-model="contactForm.deptName"
                    :readonly="orderReadOnly"
                    label="部门"
                    placeholder="请输入部门"
                  />
                  <van-field
                    v-model="contactForm.state"
                    :readonly="orderReadOnly"
                    label="省"
                    placeholder="请输入省"
                  />
                  <van-field
                    v-model="contactForm.city"
                    :readonly="orderReadOnly"
                    label="市"
                    placeholder="请输入市"
                  />
                  <van-field
                    v-model="contactForm.addr"
                    :readonly="orderReadOnly"
                    label="地址"
                    type="textarea"
                    placeholder="请输入地址"
                  />
                  <van-field
                    v-model="contactForm.phone"
                    :readonly="orderReadOnly"
                    label="电话"
                    placeholder="请输入电话"
                  />
                  <van-field
                    v-model="contactForm.fax"
                    :readonly="orderReadOnly"
                    label="传真"
                    placeholder="请输入传真"
                  />
                  <van-field
                    v-model="contactForm.zipCode"
                    :readonly="orderReadOnly"
                    label="邮政编码"
                    placeholder="请输入邮政编码"
                  />
                  <van-field
                    v-model="contactForm.contact"
                    :readonly="orderReadOnly"
                    label="联系人"
                    placeholder="请输入联系人"
                  />
                  <van-field
                    v-model="contactForm.title"
                    :readonly="orderReadOnly"
                    label="职务"
                    placeholder="请输入职务"
                  />
                  <van-field
                    v-model="contactForm.email"
                    :readonly="orderReadOnly"
                    label="E-mail"
                    placeholder="请输入E-mail"
                  />
                </van-cell-group>
              </van-form>
            </van-collapse-item>
            <van-collapse-item title="客户联系信息" name="2">
              <van-form label-width="100">
                <van-cell-group @click="vanCellGroupBtn">
                  <van-field
                    v-model="clientContactForm.coName"
                    :readonly="orderReadOnly"
                    label="卖方"
                    placeholder="请输入卖方"
                  />
                  <van-field
                    v-model="clientContactForm.state"
                    :readonly="orderReadOnly"
                    label="省"
                    placeholder="请输入省"
                  />
                  <van-field
                    v-model="clientContactForm.city"
                    :readonly="orderReadOnly"
                    label="市"
                    placeholder="请输入市"
                  />
                  <van-field
                    v-model="clientContactForm.addr"
                    :readonly="orderReadOnly"
                    label="地址"
                    type="textarea"
                    placeholder="请输入地址"
                  />
                  <van-field
                    v-model="clientContactForm.phone"
                    :readonly="orderReadOnly"
                    label="电话"
                    placeholder="请输入电话"
                  />
                  <van-field
                    v-model="clientContactForm.fax"
                    :readonly="orderReadOnly"
                    label="传真"
                    placeholder="请输入传真"
                  />
                  <van-field
                    v-model="clientContactForm.zipCode"
                    :readonly="orderReadOnly"
                    label="邮政编码"
                    placeholder="请输入邮政编码"
                  />
                  <van-field
                    v-model="clientContactForm.contact"
                    :readonly="orderReadOnly"
                    label="联系人"
                    placeholder="请输入联系人"
                  />
                  <van-field
                    v-model="clientContactForm.title"
                    :readonly="orderReadOnly"
                    label="职务"
                    placeholder="请输入职务"
                  />
                  <van-field
                    v-model="clientContactForm.email"
                    :readonly="orderReadOnly"
                    label="E-mail"
                    placeholder="请输入E-mail"
                  />
                  <van-field
                    v-model="clientContactForm.deptName"
                    :readonly="orderReadOnly"
                    label="开户行"
                    placeholder="请输入开户行"
                  />
                  <van-field
                    v-model="clientContactForm.bp"
                    :readonly="orderReadOnly"
                    label="账号"
                    placeholder="请输入账号"
                  />
                  <van-field
                    v-model="clientContactForm.printMan"
                    :readonly="orderReadOnly"
                    label="用印人"
                    placeholder="请输入用印人"
                  />
                  <van-field
                    v-model="clientContactForm.printPhone"
                    :readonly="orderReadOnly"
                    label="用印人电话"
                    placeholder="请输入用印人电话"
                  />
                  <van-field
                    v-model="clientContactForm.printId"
                    :readonly="orderReadOnly"
                    label="用印人身份证号"
                    placeholder="请输入用印人身份证号"
                  />
                </van-cell-group>
              </van-form>
            </van-collapse-item>
          </div>
        </van-collapse>
      </van-tab>
      <van-tab title="版本">
        <div class="scroll-wrap-main-table">
          <div
            v-for="(item, index) in formData.changeList"
            :key="index"
            class="fileFromClass"
          >
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <!-- <van-collapse v-model="changeListActive" accordion> -->
              <van-collapse-item
                :key="index"
                :name="index"
                :title="
                  formData.changeList.length > 1
                    ? index + 1 + '.' + item.docVersion
                    : item.docVersion
                "
              >
                <van-form :v-model="item" label-width="130px">
                  <van-field
                    label="版本号"
                    :readonly="orderReadOnly"
                    v-model="item.docVersion"
                  />
                  <van-field
                    label="类型"
                    :readonly="orderReadOnly"
                    v-model="item.currentVersion"
                  />
                  <van-field
                    label="版本日期"
                    v-model="item.versionDate"
                    readonly
                  />
                  <van-field label="操作人" v-model="item.empName" readonly />
                  <van-field
                    label="审批状态"
                    v-model="item.auditStatusName"
                    readonly
                  />
                  <van-field label="审批人" v-model="item.auditorNo" readonly />
                  <van-field
                    label="审批日期"
                    v-model="item.auditDate"
                    readonly
                  />
                  <van-field label="变更单" v-model="item.docNo" readonly />
                  <!-- <van-row>
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
                  </van-row> -->
                </van-form>
              </van-collapse-item>
            </van-collapse>
          </div>
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
    <!-- 侧滑窗口 选择 业务员-->
    <van-popup
      v-model:show="popupShow.employee"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpEmployeeSelect v-on="{ selectEmployeeItem: mainFieldSelectItem }" />
    </van-popup>
    <!-- 侧滑窗口 选择 往来单位-->
    <!-- <van-popup
      v-model:show="popupShow.vendor"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpVendorSelect
        :employeeNo="employeeNoVendor"
        v-on="{ selectVendorItem: mainFieldSelectItem }"
      />
    </van-popup> -->
    <!-- 选择客户 -->
    <van-popup
      v-model:show="showVendorSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <VendorDialog
        :showVendor="showVendorSelect"
        :employeeNo="employeeNoVendor"
        v-on="{ selectVendorItem: selectVendorItem }"
      />
    </van-popup>
    <!-- 选择公司商品 -->
    <van-popup
      v-model:show="showCompanyGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <CompanyGoodsDialog
        :form="companyGoodsForm"
        :showCompanyGoods="showCompanyGoods"
        v-on="{
          handleMutiSelectGoods: selectCompanyGoods,
        }"
      />
    </van-popup>
    <!-- 选择执行订单商品 -->
    <van-popup
      v-model:show="showExecOrderGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ExecOrderGoodsDialog
        :showExecOrderGoods="showExecOrderGoods"
        v-on="{
          handleMutiSelectGoods: selectExecOrderGoods,
        }"
      />
    </van-popup>
    <!-- 选择国内销售合同商品 -->
    <van-popup
      v-model:show="showInlandSaleGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <InlandSaleGoodsDialog
        :showInlandSaleGoods="showInlandSaleGoods"
        v-on="{
          handleMutiSelectGoods: selectInlandSaleGoods,
        }"
      />
    </van-popup>
    <!-- 选择转口销售合同商品 -->
    <van-popup
      v-model:show="showZkSaleGoods"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ZkSaleGoodsDialog
        :showZkSaleGoods="showZkSaleGoods"
        v-on="{
          handleMutiSelectGoods: selectZkSaleGoods,
        }"
      />
    </van-popup>
    <!-- 交货地点-->
    <van-popup
      v-model:show="popupShow.warehouse"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <erp-warehouse-select
        v-on="{ selectEmployeeItem: mainFieldSelectItem }"
      />
    </van-popup>

    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="popupShow.detail"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>
    <!-- 选择单据类型 -->
    <van-popup
      duration="0.8"
      v-model:show="isShowTypeSelectDialog"
      position="bottom"
      :style="{ height: '15%', width: '100%' }"
    >
      <template #default>
        <div class="default-button">
          <van-button type="success" plain @click="exitPopup">返回</van-button>
          <van-button type="primary" @click="confirmPopup">确认</van-button>
        </div>
        <RcmSelect
          :select-label="'label'"
          :select-value="'value'"
          :valueKey="'label'"
          :options="docTypeList"
          :label="'单据类型'"
          :name="'单据类型'"
          :placeholder="'单据类型'"
          :readonly="orderReadOnly"
          :isRightArrow="true"
          :field="objectNo3"
          @change="
            ({ label, value }) => changeRcmSelect({ label, value }, 'objectNo3')
          "
        />
      </template>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="mainOptionSelect.show"
      :actions="mainOptionSelect.list"
      :click-overlay="onOver"
      @select="selectItemAction"
      :description="mainOptionSelect.title"
      :close-on-click-overlay="overlay"
      cancel-text="取消"
    />
    <!-- 时间选择 -->
    <van-calendar
      v-model:show="mainOptionSelect.dateShow"
      @confirm="selectDateTime"
    />
    <!-- 单据编号确认      :beforeClose="onBeforeCloseConfirmOrderNo"-->
    <van-dialog
      v-model:show="createOrder.show"
      title="生成的采购合同号(可修改)"
      @confirm="confirmOrderNo"
    >
      <van-field
        label="采购合同号:"
        v-model="createOrder.tempOrder"
      ></van-field>
    </van-dialog>
    <!-- 撤销审批的原因确认 -->
    <van-dialog
      v-model:show="cancelAuditShow"
      title="撤销原因"
      @confirm="doCancelAuditOrder()"
      show-cancel-button
    >
      <van-field
        type="textarea"
        v-model="cancelAuditReason"
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
import { orderChange } from "@/api/erp.purchase.js";
import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
import VendorDialog from "../components/VendorDialog.vue";
import CompanyGoodsDialog from "../components/CompanyGoodsDialog.vue";
import ExecOrderGoodsDialog from "../components/ExecOrderGoodsDialog.vue";
import InlandSaleGoodsDialog from "../components/InlandSaleGoodsDialog.vue";
import ZkSaleGoodsDialog from "../components/ZkSaleGoodsDialog.vue";
import ErpWarehouseSelect from "./ErpWarehouseSelect.vue";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload, updateFile } from "@/api/erp.file.js";

import { getOrgList } from "@/utils/erp.org.js";

import {
  getPm02DlvTerm,
  getPm02PayType,
  getRecType,
  getRecMethod,
  getVd05FkfsList,
} from "@/utils/erp.base.data.js";
import fieldFormData from "./cloumn";
import baseMainData from "./mainData";
import setBtnStatus from "./setBtnStatus";
import {
  mainFieldClick,
  selectItemAction,
  mainDateFieldClick,
  selectDateAction,
} from "./mainFiledClick";
import { mainFieldSelect, mainFieldSelectItem } from "./mainFiledSelect";
import {
  addOrder,
  loadDetail,
  deleteOrder,
  editOrder,
  cancelOrder,
  saveOrder,
  confirmOrderNo,
  auditOrder,
  cancelAuditOrder,
  doCancelAuditOrder,
  sapOrder,
} from "./mainBtnClick";
import { listOaStatus } from "@/api/erp.oa.js";
import { getExchangeRate } from "@/api/common";
import { dateFormat, rMoneyFormat } from "@/utils/format";
import { moneyFormat } from "../../../utils/format";

export default {
  name: "IePurchaseDetail",
  components: {
    NavBar,
    Scroll,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    ErpWarehouseSelect,
    VendorDialog,
    CompanyGoodsDialog,
    ExecOrderGoodsDialog,
    InlandSaleGoodsDialog,
    ZkSaleGoodsDialog,
  },
  data() {
    return {
      versionDate: "",
      dateForm: {
        poDate: "",
        signDate: "",
      },
      versionDates: [],
      oaStatusArr: [],
      docTypeLabel: "",
      docTypeValue: "",
      orderTypeList: JSON.parse(this.$route.query.orderTypeList),
      poStatusList: JSON.parse(this.$route.query.poStatusList),
      currencyCodeList: JSON.parse(this.$route.query.currencyCodeList),
      auditStatusList: JSON.parse(this.$route.query.auditStatusList),
      showPopover: false,
      objectNo3: "",
      isShowTypeSelectDialog: false,
      contactForm: fieldFormData().contactForm,
      clientContactForm: fieldFormData().clientContactForm,
      baseDetail: fieldFormData().baseDetail,
      showVendorSelect: false,
      docentry: null,
      objectNo: "PM02",
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      /// 右侧的 弹窗 是否可见
      popupShow: baseMainData().popupShow,
      ///单据编号 确认框
      createOrder: baseMainData().createOrder,
      /// 按钮的 显隐性
      btnShow: baseMainData().btnShow,
      /// 单选下拉框 的处理
      mainOptionSelect: baseMainData().mainOptionSelect,
      ///   默认的状态
      editStatus: "view",
      /// 当前单据 是否只读
      orderReadOnly: true,
      ///撤销申请原因的弹窗
      cancelAuditShow: false,
      ///撤销申请原因内容
      cancelAuditReason: "",
      employeeNoVendor: "",
      /// 当前是哪一个 tab 活跃
      tabActive: 0,
      pullup: false,
      /// 明细折叠，当前打开的  明细行字段
      pdtItemsActiveIndex: 0,
      changeListActive: 0,
      /// 联系信息折叠
      contactInfoActiveIndex: 1,
      elementChangeFlag: 0,
      ////   成本分析，折叠框，默认
      feeAmountActiveIndex: 0,
      orgNo: "",
      activePdtItemIndex: null,
      ////  站位
      divEmpty: true,
      orgList: [],
      fklx: [],
      fkfsList: [],
      jhfsList: [],
      contractTypeList: [
        { name: "格式合同", code: "格式合同" },
        { name: "非格式合同", code: "非格式合同" },
      ],

      recTypeList: [],
      recMethodList: [],
      fileItems: [],
      // 公司商品
      showCompanyGoods: false,
      companyGoodsForm: {
        orgNo: "",
      },
      // 执行订单
      showExecOrderGoods: false,
      // 国内销售合同商品
      showInlandSaleGoods: false,
      // 转口销售合同商品
      showZkSaleGoods: false,
    };
  },
  // watch: {
  //   "formData.totalPoValue": {
  //     handler(newVal) {
  //       this.formData.prepaySum = moneyFormat(
  //         Number(this.formData.prepayPortion * 0.01 * rMoneyFormat(newVal))
  //       );
  //     },
  //     deep: true,
  //     immediate: false
  //   }
  // },
  computed: {
    getReadOnly() {
      if (this.orderReadOnly) {
        return true;
      } else {
        if (this.formData.payTerm.replace(/\s*/g, "") != "预付款") {
          return true;
        }
        return false;
      }
    },
    docTypeList() {
      return [
        {
          label: "公司商品",
          value: "PM01",
        },
        {
          label: this.docTypeLabel,
          value: this.docTypeValue,
        },
      ];
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
  },
  created() {
    this.docentry = this.$route.query.docEntry;
    // getTable3XByRef({
    //   objRef: "InlandPurchase"
    // }).then(res => {
    //   this.orderTypeList.push(...res.data);
    // });
    if (this.docentry && this.docentry > 0) {
      loadDetail(this);
    } else {
      addOrder(this);
    }
    getOrgList().then((res) => {
      this.orgList.push(...res);
    });
    getVd05FkfsList().then((res) => {
      this.fkfsList.push(...res);
    });
    getRecType().then((res) => {
      this.recTypeList.push(...res);
    });
    getRecMethod().then((res) => {
      this.recMethodList.push(...res);
    });
    getPm02PayType().then((res) => {
      this.fklx.push(...res);
    });
    getPm02DlvTerm().then((res) => {
      this.jhfsList.push(...res);
    });
    setBtnStatus(this);
  },
  setup() {
    provide("title", "采购合同详情");
  },
  methods: {
    // 预付比例
    changePrepayPortion(e) {
      let prepayPortion = e.target.value;
      this.formData.prepaySum = moneyFormat(
        prepayPortion * 0.01 * rMoneyFormat(this.formData.totalPoValue)
      );
    },
    // 预付金额
    changePrepaySum(e) {
      let prepaySum = rMoneyFormat(e.target.value);
      this.formData.prepayPortion = Number(
        (prepaySum * 100) / rMoneyFormat(this.formData.totalPoValue)
      ).toFixed(2);
    },
    // 合同变更
    async handleChangeContract() {
      orderChange({ docEntry: this.formData.docEntry }).then((res) => {
        if (res.code === 1) {
          for (let key in this.formData) {
            this.formData[key] = res.data[key];
          }
          this.dateForm.poDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
          this.dateForm.signDate = dateFormat(
            new Date(),
            "yyyy-MM-dd HH:mm:ss"
          );
          this.formData.poDate = dateFormat(new Date(), "yyyy-MM-dd");
          this.formData.signDate = dateFormat(new Date(), "yyyy-MM-dd");
          this.formData.versionDate = dateFormat(new Date(), "yyyy-MM-dd");
          this.versionDate = dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss");
          this.editStatus = "add";
          this.setBtnStatus();
        }
      });
    },
    // 获取OA 审批数据 objId
    loadOaStatus() {
      listOaStatus("PM02", this.formData.docEntry, this.formData.poNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();
        })
        .catch((res) => {});
    },
    handlerComputed() {
      this.formData.items.forEach(
        (
          {
            quantity,
            unitStdCost,
            subSumValue,
            sapQtty,
            sapPrice,
            sapUnitRate,
          },
          index
        ) => {
          if (sapUnitRate !== 0) {
            this.formData.items[index].sapQtty =
              Number(quantity) / Number(sapUnitRate);
          }
          this.formData.items[index].sapPrice =
            Number(unitStdCost) * Number(sapUnitRate);
          this.formData.items[index].subSumValue =
            Number(unitStdCost) * Number(quantity);
        }
      );
      this.formData.totalPoValue = this.formData.items.reduce(
        (pre, { subSumValue }) => {
          return Number(rMoneyFormat(pre)) + Number(rMoneyFormat(subSumValue));
        },
        0
      );
      this.formData.totalPoValueS =
        Number(rMoneyFormat(this.formData.totalPoValue)) *
        Number(this.formData.exchRate).toFixed(4);
        // this.formData.prepaySum = 
        // Number(this.formData.prepayPortion * 0.01 * rMoneyFormat(this.formData.totalPoValue)
      // );
      // this.computed_htje_bwbje_yfje();
    },
    /***
     * 采购数量不需要通过计算公式: 采购数量 = 采购金额/采购单价
     * 采购单价需要通过计算公式: 采购单价 = 采购金额/采购数量
     */
    // 采购金额=采购数量*采购单价
    // 采购单价变化时
    CalcUnitStdCost(
      value,
      { quantity, subSumValue, sapQtty, sapPrice },
      index
    ) {
      value = rMoneyFormat(value.target.value);
      if (
        (Number(quantity) || Number(quantity) === 0) &&
        (Number(value) || Number(value) === 0)
      ) {
        this.formData.items[index].subSumValue =
          moneyFormat(Number(quantity) * Number(value));
      }
      this.computed_htje_bwbje_yfje();
    },
    // 采购金额=采购数量*采购单价
    // 采购数量变化时
    CalcQuantity(
      value,
      { unitStdCost, subSumValue, sapQtty, sapPrice },
      index
    ) {
      value = rMoneyFormat(value.target.value);
      if (
        (Number(value) || Number(value) === 0) &&
        (Number(unitStdCost) || Number(unitStdCost) === 0)
      ) {
        this.formData.items[index].subSumValue =
          moneyFormat(Number(value) * Number(unitStdCost));
          this.computed_htje_bwbje_yfje();
        return;
      }
      if (Number(value) && (Number(subSumValue) || Number(subSumValue) === 0)) {
        this.formData.items[index].unitStdCost =
          moneyFormat(
            Number(subSumValue) / Number(value)
          )
      }
      // 处理合同金额、本位币金额、预付金额的计算逻辑
      this.computed_htje_bwbje_yfje();
    },
    // 采购金额=采购数量*采购单价
    // 采购金额变化时
    CalcSubSumValue(
      value,
      { quantity, unitStdCost, subSumValue, sapUnitRate, sapPrice, sapQtty },
      index
    ) {
      value = rMoneyFormat(value.target.value);
      if (Number(quantity) && (Number(value) || Number(value) === 0)) {
        this.formData.items[index].unitStdCost = (
          Number(value) / Number(quantity)
        ).toFixed(2);
      }
      this.computed_htje_bwbje_yfje();
    },
    /**
     * 主要用于处理合同金额、本位币金额、预付金额的计算逻辑
     * @param htje  -- 主表信息的合同金额
     * @param bwbje -- 主表信息的本位币金额
     * @param yfje  -- 基本信息的预付金额
     */
    computed_htje_bwbje_yfje() {
      this.formData.totalPoValue = moneyFormat(
        this.formData.items.reduce(
        (pre, { subSumValue }) => {
          return Number(rMoneyFormat(pre)) + Number(rMoneyFormat(subSumValue));
        },
        0
      ));
      this.formData.prepaySum = moneyFormat(
        Number(this.formData.prepayPortion * 0.01 * rMoneyFormat(this.formData.totalPoValue))
      );
      this.formData.totalPoValueS = 
        moneyFormat(
          Number(rMoneyFormat(this.formData.totalPoValue)) *
        Number(this.formData.exchRate).toFixed(4)
        )
    },
    // 转口销售合同商品
    selectZkSaleGoods(selectionArr) {
      if (selectionArr && selectionArr.length) {
        selectionArr.forEach((item) => {
          // 不允许相同的行
          let orderMid = item.orderMid;
          let index = this.formData.items.findIndex(
            (item) => item.isOrderMid === orderMid
          );
          if (index == -1) {
            let baseDetail = Object.assign({}, this.baseDetail);
            baseDetail.isOrderMid = item.orderMid;
            baseDetail.pdtId = item.pdtId;
            baseDetail.pdtNo1 = item.pdtNo1;
            baseDetail.unitStdCost = item.unitStdCost;
            baseDetail.volumeUom = item.volumeUom;
            baseDetail.volume = item.volume;
            baseDetail.grossWeight = item.grossWeight;
            baseDetail.netWeight = item.netWeight;
            baseDetail.weightUom = item.weightUom;
            baseDetail.atr = Number(0).toFixed(2);

            baseDetail.uom = item.uom;
            baseDetail.uom1 = item.uom1;
            baseDetail.amountPs = item.amountPs;
            baseDetail.cmpsPrnt = "N";
            baseDetail.refNo1 = item.control1;
            baseDetail.refNo2 = item.control2;
            baseDetail.refNo3 = "";
            baseDetail.prodName = item.pdtNameC;
            baseDetail.specification = item.specificationC;
            baseDetail.prodDescript = "";
            baseDetail.packDescript = item.packDescriptionC;
            baseDetail.packtype = item.packtype;
            baseDetail.pdtCodeC = item.pdtCodeC;
            // 计算 unitStdCosts
            baseDetail.sapUnit = item.sapUnit;
            baseDetail.sapUnitRate = item.sapUnitRate;
            baseDetail.uomName = item.uomName;

            this.formData.items.push(baseDetail);
          }
        });
      }
      this.showZkSaleGoods = false;
    },
    // 国内销售合同商品
    selectInlandSaleGoods(selectionArr) {
      if (selectionArr && selectionArr.length) {
        selectionArr.forEach((item) => {
          // 不允许相同的行
          let isMid = item.isMid;
          let index = this.formData.items.findIndex(
            (item) => item.isOrderMid === isMid
          );
          if (index == -1) {
            let baseDetail = Object.assign({}, this.baseDetail);
            baseDetail.orderSid = item.docEntry;
            baseDetail.contractNo = item.isNo;
            baseDetail.isOrderMid = item.isMid;
            baseDetail.pdtId = item.pdtId;
            baseDetail.pdtNo1 = item.pdtNo1;
            baseDetail.unitStdCost = item.unitStdCost;
            baseDetail.volumeUom = item.volumeUom;
            baseDetail.volume = item.volume;
            baseDetail.grossWeight = item.grossWeight;
            baseDetail.netWeight = item.netWeight;
            baseDetail.weightUom = item.weightUom;
            baseDetail.uom = item.uom;
            baseDetail.uom1 = item.uom1;
            baseDetail.amountPs = item.amountPs;
            baseDetail.cmpsPrnt = "N";
            baseDetail.refNo1 = item.control1;
            baseDetail.refNo2 = item.control2;
            baseDetail.refNo3 = "";
            baseDetail.prodName = item.pdtNameC;
            baseDetail.specification = item.specificationC;
            baseDetail.prodDescript = "";
            baseDetail.packDescript = item.packDescriptionC;
            baseDetail.packtype = item.packtype;
            baseDetail.pdtCodeC = item.pdtCodeC;
            baseDetail.hl = item.hl;
            baseDetail.atr = Number(0).toFixed(2);
            // 计算 unitStdCosts
            baseDetail.sapUnit = item.sapUnit;
            baseDetail.sapUnitRate = item.sapUnitRate;
            baseDetail.uomName = item.uomName;

            this.formData.items.push(baseDetail);
          }
        });
      }
      this.showInlandSaleGoods = false;
    },
    // 执行订单商品选择完成按钮回调
    selectExecOrderGoods(selectionArr) {
      if (selectionArr && selectionArr.length) {
        selectionArr.forEach((item) => {
          // 不允许相同的行
          let orderMid = item.orderMid;
          let index = this.formData.items.findIndex(
            (item) => item.isOrderMid === orderMid
          );
          if (index == -1) {
            let baseDetail = Object.assign({}, this.baseDetail);
            baseDetail.atr = Number(0).toFixed(2);
            baseDetail.contractNo = item.orderNo;
            baseDetail.orderNo = item.orderNo;
            baseDetail.isOrderMid = item.orderMid;
            baseDetail.pdtId = item.pdtId;
            baseDetail.pdtNo1 = item.pdtNo1;
            baseDetail.unitStdCost = item.unitStdCost;
            baseDetail.volumeUom = item.volumeUom;
            baseDetail.volume = item.volume;
            baseDetail.grossWeight = item.grossWeight;
            baseDetail.netWeight = item.netWeight;
            baseDetail.weightUom = item.weightUom;

            baseDetail.uom = item.uom;
            baseDetail.uom1 = item.uom1;
            baseDetail.amountPs = item.amountPs;
            baseDetail.cmpsPrnt = "N";
            baseDetail.refNo1 = item.control1;
            baseDetail.refNo2 = item.control2;
            baseDetail.refNo3 = "";
            baseDetail.prodName = item.pdtNameC;
            baseDetail.specification = item.specificationC;
            // baseDetail.prodDescript = item.descriptionC;
            baseDetail.prodDescript = "";
            baseDetail.packDescript = item.packDescriptionC;
            baseDetail.packtype = item.packtype;
            baseDetail.pdtCodeC = item.pdtCodeC;
            // baseDetail.hl = item.hl;
            // 计算 unitStdCosts
            baseDetail.sapUnit = item.sapUnit;
            baseDetail.sapUnitRate = item.sapUnitRate;
            baseDetail.uomName = item.uomName;

            this.formData.items.push(baseDetail);
          }
        });
      }
      this.showExecOrderGoods = false;
    },
    // 公司商品选择完成按钮回调
    selectCompanyGoods(selectionArr) {
      if (selectionArr && selectionArr.length) {
        selectionArr.forEach((item) => {
          let baseDetail = Object.assign({}, this.baseDetail);
          baseDetail.pdtId = item.pdtId;
          baseDetail.pdtNo1 = item.pdtNo1;
          baseDetail.unitStdCost = item.unitStdCost;
          baseDetail.volumeUom = item.volumeUom;
          baseDetail.volume = item.volume;
          baseDetail.grossWeight = item.grossWeight;
          baseDetail.netWeight = item.netWeight;
          baseDetail.weightUom = item.weightUom;
          baseDetail.uom = item.uom;
          baseDetail.uom1 = item.uom1;
          baseDetail.amountPs = item.amountPs;
          baseDetail.cmpsPrnt = "N";
          baseDetail.refNo1 = item.control1;
          baseDetail.refNo2 = item.control2;
          baseDetail.refNo3 = "";
          baseDetail.prodName = item.pdtNameC;
          baseDetail.specification = item.specificationC;
          baseDetail.prodDescript = "";
          baseDetail.packDescript = item.packDescriptionC;
          baseDetail.packtype = item.packtype;
          baseDetail.pdtCodeC = item.pdtCodeC;
          baseDetail.hl = item.hl;
          baseDetail.atr = Number(0).toFixed(2);
          // 计算 unitStdCosts
          baseDetail.sapUnit = item.sapUnit;
          baseDetail.sapUnitRate = item.sapUnitRate;
          baseDetail.uomName = item.uomName;
          this.formData.items.push(baseDetail);
        });
      }
      this.showCompanyGoods = false;
    },
    // 单据类型弹窗退出
    exitPopup() {
      this.isShowTypeSelectDialog = false;
    },
    // 单据类型弹窗确认
    confirmPopup() {
      if (this.objectNo3 === "PM01") {
        this.companyGoodsForm.orgNo = this.formData.orgNo;
        this.showCompanyGoods = true;
      } else if (this.objectNo3 === "PM02") {
        this.showExecOrderGoods = true;
      } else if (this.objectNo3 === "PM03") {
        this.showInlandSaleGoods = true;
      } else if (this.objectNo3 === "PM04") {
        this.showZkSaleGoods = true;
      }
      this.isShowTypeSelectDialog = false;
    },
    changeRcmSelect({ label, value }, field1, field2) {
      if (field1 === "objectNo3") {
        this.objectNo3 = value;
      }
      if (field2 === "ordTypNo") {
        this.formData.items = [];
      }
      if (field1) {
        this.formData[field1] = value;
      }
      if (field1 === "orderType") {
        this.formData[field1] = label;
      }
      if (field2) {
        this.formData[field2] = value;
      }
      if (field1 === "currencyCode") {
        getExchangeRate({
          currency1: this.formData.currencyCode,
          currency2: "CNY",
          currency3: "CNY",
          applyDate: dateFormat(new Date(), "yyyy/MM/dd"),
          fangx: 1,
          precision: 8,
        }).then((res) => {
          if (res.data) {
            this.formData.exchRate = Number(res.data[0].applyExchrate).toFixed(
              4
            );
          }
        });
      }
    },
    vanCellGroupBtn() {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "当前属于查阅状态,无法修改单据!",
        });
        return;
      }
    },
    /// 弹窗选择往来单位
    selectVendorItem(item) {
      this.showVendorSelect = false;
      // 需要带入到客户联系信息
      this.resetVendorItem(item);
    },
    resetVendorItem(item) {
      if (item) {
        this.formData.vendorName = item.coNameC;
        this.formData.vndCst = item.vndCst;
        this.formData.refNoTitle2 = item.strAuditFlag;
        this.formData.vendorNo = item.vendorNo1;
        this.clientContactForm.coName = item.coNameC;
        this.clientContactForm.coNameE = item.coNameE;
        this.clientContactForm.deptName = item.deptName;
        this.clientContactForm.deptNameE = item.deptNameE;
        this.clientContactForm.state = item.state;
        this.clientContactForm.stateE = item.stateE;
        this.clientContactForm.city = item.city;
        this.clientContactForm.cityE = item.cityE;
        this.clientContactForm.addr = item.coAddr;
        this.clientContactForm.addrE = item.addrE;
        this.clientContactForm.phone = item.phone;
        this.clientContactForm.fax = item.fax;
        this.clientContactForm.zipCode = item.zipCode;
        this.clientContactForm.contact = item.contact;
        this.clientContactForm.title = item.title;
        this.clientContactForm.email = item.email;
        // 选择供货商带入orgNo到公司商品查询参数中
        this.companyGoodsForm.orgNo = item.parentOrgNo;
      } else {
        this.formData.vendorName = "";
        this.formData.vndCst = "";
        this.formData.refNoTitle2 = "";
        this.formData.vendorNo = "";
        this.clientContactForm.coName = "";
        this.clientContactForm.coNameE = "";
        this.clientContactForm.deptName = "";
        this.clientContactForm.deptNameE = "";
        this.clientContactForm.state = "";
        this.clientContactForm.stateE = "";
        this.clientContactForm.city = "";
        this.clientContactForm.cityE = "";
        this.clientContactForm.addr = "";
        this.clientContactForm.addrE = "";
        this.clientContactForm.phone = "";
        this.clientContactForm.fax = "";
        this.clientContactForm.zipCode = "";
        this.clientContactForm.contact = "";
        this.clientContactForm.title = "";
        this.clientContactForm.email = "";
      }
    },
    deleteFileItem(index) {
      // if (this.orderReadOnly) {
      //   Notify({ type: "warning", message: "当前单据是只读状态,不可删除!" });
      //   return;
      // }
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
        // 文件删除
        this.updateFileAfter("delete", this.formData.fileItems[index]);
      }
      this.formData.fileItems.splice(index, 1);
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
    // 预览功能
    handlePreview() {
      let keyValue = this.formData.docEntry;
      let keyName = "docEntry";
      let moduleName = "d_pm02_jxhh";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
        },
      });
    },
    ///  当前页面切换了平台公司
    setChangeNewOrgCo() {
      this.$router.go(-1); //返回上一层
    },
    ///按钮【新增】的点击事件
    mainBtnClickAdd() {
      addOrder(this);
    },
    ///按钮【删除】的点击事件
    mainBtnClickDelete() {
      deleteOrder(this);
    },
    /// 按钮【修改】的点击事件
    mainBtnClickEdit() {
      editOrder(this);
    },
    //按钮【取消】的点击事件
    mainBtnClickCancel() {
      cancelOrder(this);
    },
    //按钮【保存】的点击事件
    mainBtnClickSave() {
      saveOrder(this);
    },
    /// 确认单据的编码,完成insert操作的逻辑
    confirmOrderNo() {
      confirmOrderNo(this);
    },
    onBeforeCloseConfirmOrderNo(action, done) {
      return done(false);
    },
    /// 按钮【提交审批】的点击事件
    mainBtnClickAudit() {
      auditOrder(this);
    },
    /// 按钮【撤销审批】的点击事件
    mainBtnClickCancelAudit() {
      if (this.formData.sapOrderNo !== "") {
        Notify({
          type: "warning",
          message: "该记录已提交SAP,不能撤消审批",
        });
        return;
      }
      cancelAuditOrder(this);
    },
    /// 填写了原因之后，实际的撤销操作
    doCancelAuditOrder() {
      doCancelAuditOrder(this);
    },
    /// 按钮【提交SAP】的点击事件
    mainBtnClickSap() {
      sapOrder(this);
    },

    //// 时间字段 点击了
    mainDateFieldClick(item) {
      mainDateFieldClick(this, item);
    },
    /// 选择了某一个时间
    selectDateTime(val) {
      selectDateAction(this, val);
    },
    ///  主表选择了一些枚举类型的数据，下方弹窗
    mainFieldClick(fieldName) {
      mainFieldClick(this, fieldName);
    },
    ///  选择 下拉的逻辑
    selectItemAction(item) {
      selectItemAction(this, item);
    },
    /// 设置 按钮的状态
    setBtnStatus() {
      setBtnStatus(this);
    },
    /// 右侧弹窗的点击事件
    mainFieldSelect(fieldName) {
      mainFieldSelect(this, fieldName);
    },
    /// 右侧弹窗的选择事件
    mainFieldSelectItem(item) {
      mainFieldSelectItem(this, item);
    },
    // 供货商选择
    vendorNameClick() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.employeeNoVendor = this.formData.employeeNo;
      if (
        !this.employeeNoVendor ||
        this.employeeNoVendor === "" ||
        this.employeeNoVendor === undefined
      ) {
        Notify({ type: "danger", message: "请先选择业务员" });
        return;
      }
      this.showVendorSelect = true;
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
      this.popupShow.detail = true;
    },
    /// 弹窗中用户选择了某一个商品
    selectItemProduct(item) {
      if (this.activePdtItemIndex === -1) {
        let newRow = {
          pdtNo1: item.pdtNo1,
          prodName: item.pdtNameC,
          spec: item.specificationC,
          sapUnit: item.sapUnit,
          sapUnitRate: 1,
          uom: item.uom,
          hl: item.hl,
          quantity: 0.0,
          unitPrice: 0.0,
          amount: 0.0,
        };
        this.formData.items.push(newRow);
        this.pdtItemsActiveIndex = this.formData.items.length - 1;
      } else {
        this.formData.items[this.activePdtItemIndex].pdtNo1 = item.pdtNo1;
        this.formData.items[this.activePdtItemIndex].prodName = item.pdtNameC;
        this.formData.items[this.activePdtItemIndex].spec = item.specificationC;
        this.formData.items[this.activePdtItemIndex].uom = item.uom;
        this.formData.items[this.activePdtItemIndex].sapUnit = item.sapUnit;
        this.formData.items[this.activePdtItemIndex].sapUnitRate =
          item.sapUnitRate;
        this.formData.items[this.activePdtItemIndex].hl = item.hl;
        this.formData.items[this.activePdtItemIndex].quantity = 0.0;
        this.formData.items[this.activePdtItemIndex].unitPrice = 0.0;
        this.formData.items[this.activePdtItemIndex].amount = 0.0;
      }

      this.popupShow.detail = false;
    },
    ///   新增商品信息
    handleAddPdtItem() {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      // 自营出口
      if (this.formData.ordTypNo == "1") {
        this.docTypeLabel = "出口合同商品";
        this.docTypeValue = "PM02";
      }
      // 国内贸易
      if (this.formData.ordTypNo == "7") {
        this.docTypeLabel = "国内销售合同商品";
        this.docTypeValue = "PM03";
      }
      // 转口贸易
      if (this.formData.ordTypNo == "9") {
        this.docTypeLabel = "转口销售合同商品";
        this.docTypeValue = "PM04";
      }
      this.isShowTypeSelectDialog = true;
      // ///       先要选择商品
      // this.orgNo = this.formData.orgNo;
      // if (!this.orgNo) {
      //   Notify({ type: "danger", message: "请先选择部门及业务员信息" });
      //   return;
      // }

      // this.popupShow.detail = true;
      // this.activePdtItemIndex = -1;
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

    // 删除明细
    deletePdtItem(index) {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "当前属于查阅状态,无法修改单据!",
        });
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确认删除当前商品吗?",
      })
        .then(() => {
          this.doDeletePdtItem(index);
        })
        .catch(() => {});
    },

    doDeletePdtItem(index) {
      if (this.formData.items[index].isMid) {
        // 是原有的
      }
      this.formData.items.splice(this.formData.items[index], 1);
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
            // this.formData.fileItems = newFileItem;
            if (this.editStatus === "view") {
              this.updateFileAfter("update", newFileItem);
            }
          }
        })
        .catch((err) => {
          Notify({
            type: "danger",
            message: "文件上传失败!",
          });
        });
    }, //purchaseOrder
    // updateFileAfter(type, fileItemsOrfilterFileItems, fileItem) {
    updateFileAfter(type, fileItem) {
      let tempForm = {};
      if (type === "update") {
        let fileList = [];
        fileList[0] = fileItem;
        tempForm = {
          docEntry: this.formData.docEntry,
          poNo: this.formData.poNo,
          fileItems: fileList,
          filterFileItems: [],
        };
      } else {
        let filterFileItems = [];
        filterFileItems[0] = fileItem;
        tempForm = {
          docEntry: this.formData.docEntry,
          poNo: this.formData.poNo,
          filterFileItems,
          fileItems: [],
        };
      }
      updateFile(tempForm)
        .then((res) => {
          if (res.code === 1) {
            Notify({
              type: "success",
              message: type === "update" ? "文件修改成功!" : "文件删除成功!",
            });
          }
        })
        .catch((err) => {
          Notify({
            type: "danger",
            message: type === "update" ? "文件修改失败!" : "文件删除失败!",
          });
        });
    },
  },
};
</script>

<style scoped lang="less">
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
.default-button {
  display: flex;
  // justify-content: space-between;
  font-size: 14px;
  width: 100%;
  .van-button {
    flex: 1;
  }
  position: absolute;
  bottom: 0%;
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
  textarea.van-field__control {
    border: 1px solid rgb(134, 154, 232);
    padding-left: 9px;
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
  height: calc(100vh - 101.47px);
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
    }
  }
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
