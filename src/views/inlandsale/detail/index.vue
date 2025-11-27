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
        >合同预览</van-button
      >
    </div>

    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form>
            <!-- <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              label-width="85"
              readonly
              required
              placeholder="平台公司"
            /> -->
            <template 
              v-for="vanField in vanFieldData"
              :key="vanField.fieldName"
            >
              <FieldInput 
                v-if="vanField.fieldType !== 'variable' && vanField?.fieldClick"
                v-bind="vanField" 
                v-model="formData[vanField.fieldName]"
                @click="this[vanField?.fieldClick?.name](vanField.fieldClick?.params[0])"
              />
              <FieldInput 
                v-else-if="vanField.fieldType == 'variable' && vanField?.fieldClick"
                v-bind="vanField" 
                v-model="this[vanField.fieldName]" 
                @click="this[vanField.fieldClick?.name](vanField.fieldClick?.params[0])"
              />
              <FieldInput 
                v-else
                v-bind="vanField" 
                v-model="formData[vanField.fieldName]"
              />
            </template>
            <!-- <van-field
              v-model="formData.auditStatusName"
              readonly
              label-width="85"
              name="审批状态"
              label="审批状态"
              placeholder="审批状态"
            /> -->
            <!-- <van-field
              v-model="formData.isNo"
              readonly
              required
              label-width="85"
              name="销售合同号"
              label="销售合同号"
              placeholder="系统生成，无需录入"
            /> -->
            <!-- <van-field
              label-width="85"
              v-model="formData.isDate"
              name="制单日期"
              label="制单日期"
              placeholder="系统生成，无需录入"
              readonly
            /> -->
            <!-- <van-field
              readonly
              v-model="formData.orgName"
              label-width="85"
              name="部门"
              label="部门"
              required
              placeholder="部门"
            /> -->
            <!-- <van-field
              readonly
              required
              is-link
              label-width="85"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
              placeholder="请选择业务员"
              @click="mainSelecteEmployee"
            /> -->
            <!-- <van-field
              v-model="this['computedTrade']"
              is-link
              readonly
              label-width="85"
              name="贸易方式"
              label="贸易方式"
              placeholder="请选择贸易方式"
              @click="mainFieldClick('tradType')"
            /> -->
            <!-- <van-field
              v-model="this['computedSaleType']"
              name="销售类型"
              label="销售类型"
              required
              placeholder="请选择销售类型"
              label-width="85"
              readonly
              is-link
              @click="mainFieldClick('saleType')"
            /> -->
            <!-- <van-field
              v-model="formData.orderMode"
              name="合同类型"
              label-width="85"
              label="合同类型"
              required
              placeholder="请选择合同类型"
              readonly
              is-link
              @click="mainFieldClick('orderMode')"
            /> -->
            <van-field
              required
              label-width="85"
              v-model="formData.vendorName"
              name="客户"
              label="客户"
              is-link
              readonly
              placeholder="请选择客户"
              @click="mainSelectVendor()"
            />
            <van-field
              required
              readonly
              is-link
              label-width="85"
              v-model="formData.currencyCode"
              name="币别"
              label="币别"
              placeholder="请选择币别"
              @click="mainFieldClick('currencyCode')"
            />
            <van-field
              required
              label-width="85"
              type="text"
              v-model="formData.exchRate"
              name="汇率"
              label="汇率"
              placeholder="请输入汇率"
              :readonly="orderReadOnly"
            />
            <van-field
              required
              label-width="85"
              v-model="formData.totalIsValue"
              name="销售金额"
              label="销售金额"
              placeholder="自动计算,无需输入"
              readonly
            />
            <van-field
              label-width="85"
              v-model="formData.quantity"
              name="销售数量"
              label="销售数量"
              placeholder="自动计算,无需输入"
              readonly
            />
            <van-field
              is-link
              required
              v-model="formData.signDate"
              label-width="85"
              readonly
              name="签约时间"
              label="签约时间"
              placeholder="签约时间"
              @click="dateTimeFieldClick('signDate')"
            />
            <van-field
              :readonly="orderReadOnly"
              v-model="formData.signSite"
              label-width="85"
              name="签约地点"
              label="签约地点"
              placeholder="地点"
            />
            <van-field
              name="收款方式"
              label-width="480"
              label="收款方式"
              readonly
              >
              <template #label>
                <span style="position: relative;top: 4px" class="way-time-pos" @click="handleReceiveWayMode('way')">收款方式</span>
              </template>
            </van-field>
            <van-field
              v-model="formData.outType"
              required
              placeholder="请选择收款方式"
              readonly
              type="textarea"
              rows="3"
            />
            <van-field
              name="收款模式"
              label-width="480"
              label="收款模式"
              readonly
              >
              <template #label>
                <span style="position: relative;top: 4px" class="way-time-pos" @click="handleReceiveWayMode('mode')">收款模式</span>
              </template>
            </van-field>
            <van-field
              v-model="formData.payMode"
              placeholder="请选择收款模式"
              readonly
              type="textarea"
              rows="3"
            />

            <van-field
              v-model="formData.refNoTitle2"
              type="number"
              name="帐期天数"
              :readonly="orderReadOnly"
              label="帐期天数"
              label-width="85"
              placeholder="请输入帐期天数"
            />
            <van-field
              required
              label-width="85"
              v-model="formData.msd"
              name="最迟交货期"
              label="最迟交货期"
              placeholder="请选择最迟交货期"
              readonly
              is-link
              @click="dateTimeFieldClick('msd')"
            />
            <van-field
              label-width="85"
              v-model="formData.preSum"
              name="预收款金额"
              label="预收款金额"
              readonly
            />
            <van-field
              v-model="formData.preProportion"
              type="number"
              :readonly="orderReadOnly"
              label-width="85"
              name="预收款比例"
              label="预收款比例"
              @change="changePreProPortion()"
            />
            <van-field
              v-model="formData.prepayDateTime"
              name="预收款日期"
              label-width="85"
              label="预收款日期"
              placeholder="请选择预收款日期"
              :readonly="orderReadOnly"
              is-link
              @click="dateTimeFieldClick('prepayDateTime')"
            />
            <van-field
              type="textarea"
              autosize
              label-width="85"
              rows="1"
              placeholder="请输入收款说明"
              v-model="formData.payDetail"
              name="收款说明"
              label="收款说明"
              :readonly="orderReadOnly"
            />
            <van-field
              type="textarea"
              autosize
              rows="1"
              label-width="85"
              placeholder="请输入备注"
              v-model="formData.remark"
              name="备注"
              label="备注"
              :readonly="orderReadOnly"
            />
            <van-field
              label-width="85"
              v-model="formData.quantity2Desc"
              name="出库数量"
              label="出库数量"
              readonly
            />
            <van-field
              label-width="85"
              v-model="formData.quantity1Desc"
              name="开票数量"
              label="开票数量"
              readonly
            />
            <van-field
              v-model="formData.recAmount1"
              :formatter="formatterAmount"
              label-width="85"
              readonly
              name="收款金额"
              label="收款金额"
              placeholder="收款金额"
            />
            <van-field
              readonly
              label-width="85"
              v-model="formData.sapOrderNo"
              name="SAP订单号"
              label="SAP订单号"
            />
            <van-field
              label-width="85"
              v-model="formData.sapType"
              readonly
              name="SAP状态"
              label="SAP状态"
            />
            <!-- <van-field
              label-width="85"
              v-model="formData.isStatus"
              readonly
              name="状态"
              label="状态"
            /> -->
            <RcmSelect
              :select-label="'statusName'"
              :select-value="'statusCode'"
              :valueKey="'statusName'"
              :options="isStatusList"
              :label="'状态'"
              :name="'状态'"
              :placeholder="'状态'"
              :readonly="orderReadOnly"
              :isRightArrow="true"
              :field="formData.isStatus"
              @change="({label, value}) => changeRcmSelect({label, value}, 'isStatus')"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="商品信息">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
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
              >新增商品</van-button
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
                  :title="item.pdtNameC"
                 >
                  <van-form>
                    <van-field
                      label-width="68"
                      is-link
                      required
                      v-model="item.pdtNameC"
                      readonly
                      name="商品名称"
                      label="商品名称"
                      placeholder="商品名称"
                      @click="itemSelectPdt(index)"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.pdtNo1"
                      readonly
                      name="商品编码"
                      label="商品编码"
                      placeholder="商品编码"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.spec"
                      :readonly="orderReadOnly"
                      name="规格型号"
                      label="规格型号"
                      placeholder="规格型号"
                    />
                    <van-row>
                      <van-col span="12">
                        <van-field
                          type="number"
                          label-width="68"
                          v-model="item.hl"
                          name="含量(%)"
                          label="含量(%)"
                          placeholder="含量(%)"
                        />
                      </van-col>
                      <van-col span="12">
                        <van-field
                          label-width="68"
                          v-model="item.uom"
                          readonly
                          required
                          name="销售单位"
                          label="销售单位"
                          placeholder="销售单位"
                        />
                      </van-col>
                    </van-row>
                    <van-field
                      required
                      label-width="68"
                      v-model="item.quantity"
                      @change="changePdtItemNum(index, 'quantity')"
                      border
                      :readonly="orderReadOnly"
                      name="销售数量"
                      label="销售数量"
                      placeholder="销售数量"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.unitPrice"
                      required
                      :readonly="orderReadOnly"
                      @change="changePdtItemNum(index, 'unitPrice')"
                      name="销售单价"
                      label="销售单价"
                      placeholder="销售单价"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.amount"
                      required
                      :readonly="orderReadOnly"
                      @change="changePdtItemNum(index, 'amount')"
                      name="销售金额"
                      label="销售金额"
                      placeholder="销售金额"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.atr"
                      :readonly="orderReadOnly"
                      name="税率(%)"
                      label="税率(%)"
                      placeholder="税率(%)"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.unitStdCost"
                      :readonly="orderReadOnly"
                      name="成本单价"
                      label="成本单价"
                      placeholder="成本单价"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.remark"
                      :readonly="orderReadOnly"
                      type="textarea"
                      name="备注"
                      label="备注"
                      placeholder="备注"
                    />
                    <van-row>
                      <van-col span="14">
                        <van-field
                          v-model="item.sapPrice"
                          readonly
                          name="sapPrice"
                          label="SAP销售单价"
                          placeholder="SAP销售单价"
                          @change="changePdtItemNum(index, 'sapPrice')"
                      /></van-col>
                      <van-col span="10">
                        <van-field
                          v-model="item.sapUnitRate"
                          readonly
                          required
                          label-width="51"
                          name="sapUnitRate"
                          label="转换比"
                          placeholder="转换比"
                      /></van-col>
                    </van-row>
                    <van-row>
                      <van-col span="14">
                        <van-field
                          required
                          v-model="item.sapQtty"
                          readonly
                          name="sapQtty"
                          label="SAP销售数量"
                          @change="changePdtItemNum(index, 'sapQtty')"
                          placeholder="SAP销售数量"
                      /></van-col>
                      <van-col span="10">
                        <van-field
                          v-model="item.sapUnit"
                          readonly
                          label-width="34"
                          name="sapUnit"
                          label="单位"
                      /></van-col>
                    </van-row>
                    <van-field
                      label-width="68"
                      v-model="item.quantity1"
                      readonly
                      border
                      name="出库数量"
                      label="出库数量"
                      placeholder="出库数量"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.quantity2"
                      readonly
                      name="开票数量"
                      label="开票数量"
                      placeholder="开票数量"
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
      <van-tab title="合同条款">
        <!-- 对方、我方的联系信息   、 销售合同条款 @change="changeContact"-->

        <van-collapse
          accordion
          v-model="contactInfoActiveIndex"
          @change="collapseChange"
        >
          <van-collapse-item key="3" name="3" title="销售合同条款基本信息">
            <Scroll
              class="wrappers-contact wrappers"
              wrapper="contactRef"
              ref="contact"
            >
              <van-form>
                <van-field
                  label="运输方式及到达站（港）和费用负担:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.transAndFee"
                  :readonly="orderReadOnly"
                />
                <van-field
                  label="包装标准、包装物的供应和回收:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.packageDesc"
                  :readonly="orderReadOnly"
                />
                <van-field
                  label="交(提)货方式、时间及地点:"
                  readonly
                  label-width="480px"
                >
                  <template #label>
                    <span class="way-time-pos" @click="handleWayTimePos">交(提)货方式、时间及地点:</span>
                  </template>
                </van-field>
                <van-field
                  type="textarea"
                  v-model="formData.delivery"
                  :readonly="orderReadOnly"
                />
                <van-field
                  label="特殊条款:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.specs"
                  :readonly="orderReadOnly"
                />
                <van-field
                  label="违约责任:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.effectMemo"
                  readonly
                />
                <van-field
                  label="其他约定事项:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.others"
                  :readonly="orderReadOnly"
                />
                <van-field
                  label="质量技术标准:"
                  readonly
                  label-width="480px"
                />
                <van-field
                  type="textarea"
                  v-model="formData.cfmComment"
                  :readonly="orderReadOnly"
                />
              </van-form>
            </Scroll>
          </van-collapse-item>
          <van-collapse-item
            v-for="(item, index) in formData.contactItems"
            :key="index"
            :name="index"
            :ref="`contactInfoItem` + index"
            :title="
              item.controlA.trim() === 'V' ? '客户联系信息' : '我方联系信息'
            "
          >
            <van-form>
              <van-row>
                <van-col span="24" v-if="item.controlA.trim() === 'B'">
                  <van-field
                    label-width="34"
                    v-model="item.coName"
                    :readonly="orderReadOnly"
                    name="卖方"
                    label="卖方"
                    placeholder="请输入卖方"
                /></van-col>
                <van-col span="24" v-else>
                  <van-field
                    label-width="34"
                    v-model="item.coName"
                    :readonly="orderReadOnly"
                    name="买方"
                    label="买方"
                    placeholder="请输入买方"
                /></van-col>
                <van-field
                label-width="34"
                v-model="item.addr"
                :readonly="orderReadOnly"
                name="地址"
                label="地址"
                placeholder="请输入地址"
                type="textarea"
                autosize
                rows="1"
              />
                <van-col span="12">
                  <van-field
                    label-width="34"
                    v-model="item.deptName"
                    :readonly="orderReadOnly"
                    name="部门"
                    label="部门"
                    placeholder="请输入部门"
                /></van-col>
                <van-col span="12">
                  <van-field
                    label-width="51"
                    v-model="item.contact"
                    :readonly="orderReadOnly"
                    name="联系人"
                    label="联系人"
                    placeholder="请输入联系人"
                /></van-col>
              </van-row>
              <van-row>
                <van-col span="12">
                  <van-field
                    label-width="34"
                    v-model="item.phone"
                    :readonly="orderReadOnly"
                    name="电话"
                    label="电话"
                    placeholder="请输入电话"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    label-width="51"
                    v-model="item.title"
                    :readonly="orderReadOnly"
                    name="职务"
                    label="职务"
                    placeholder="请输入职务"
                /></van-col>
              </van-row>
              <van-row>
                <van-col span="12">
                  <van-field
                    label-width="34"
                    v-model="item.state"
                    :readonly="orderReadOnly"
                    name="省"
                    label="省"
                    placeholder="请输入省份"
                /></van-col>
                <van-col span="12">
                  <van-field
                    label-width="51"
                    v-model="item.city"
                    :readonly="orderReadOnly"
                    name="市"
                    label="市"
                    placeholder="请输入城市"
                /></van-col>
              </van-row>
              <van-field
                label-width="68"
                v-model="item.zipCode"
                :readonly="orderReadOnly"
                name="邮政编码"
                label="邮政编码"
                placeholder="请输入邮政编码"
              />
              <van-field
                label-width="68"
                v-model="item.email"
                :readonly="orderReadOnly"
                name="E-mail"
                label="E-mail"
                placeholder="请输入联系邮箱"
              />
              <van-field
                label-width="68"
                v-model="item.fax"
                :readonly="orderReadOnly"
                name="传真"
                label="传真"
                placeholder="请输入传真号码"
              />
            </van-form>
          </van-collapse-item>
        </van-collapse>
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
              <!-- <template
                  v-for="(item, index) in oaStatusArr"
                  :key="index"
                  :name="index"
                  :title="item.userName"
                >
                  <div class="oa-status-item">
                    <van-form>
                      <van-field
                        label-width="150"
                        v-model="item.sysNote"
                        :label="item.pkId"
                        input-align="right"
                        readonly
                      />
                      <van-field
                        label-width="150"
                        v-model="item.userName"
                        :label="item.makeTime"
                        input-align="right"
                        readonly
                      />

                      <van-field
                        label-width="68"
                        v-model="item.auditStatus"
                        readonly
                        input-align="right"
                        label="审批结论"
                      />

                      <van-field
                        type="textarea"
                        rows="1"
                        disabled
                        autosize
                        label-width="68"
                        v-model="item.auditRemark"
                        readonly
                        name="审批备注"
                        label="审批备注"
                        placeholder=""
                      />
                    </van-form>
                  </div>
                </template> -->
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
    <!-- 处理交(提)货方式、时间及地点 -->
    <van-action-sheet style="height: 50%" v-model:show="showWayTimePod" title="处理交(提)货方式、时间及地点">
      <template #default>
        <div class="content">
          <div class="content-form">
            <van-form>
              <van-field 
                label-width="480px"
                label="交货条款模板"
                readonly
              />
              <van-field 
                v-model="form.refValue"
                readonly
                type="textarea"
                rows="3"
              />

              <van-field
                v-show="form.parameterName1 !== ''" 
                label-width="85"
                v-model="form.msd"
                label="最迟交货期"
                placeholder="请选择最迟交货期"
                readonly
                is-link
                @click="dateTimeFieldClick('form_msd')"
                @change="changeTemplate"
              />
              <van-field 
                v-show="form.parameterName2 !== ''"
                label-width="85"
                v-model="form.parameterValue2"
                label="交货地点"
                @change="changeTemplate"
                placeholder="请输入交货地点"
              />
              <van-field 
                v-show="form.parameterName3 !== ''"
                label-width="480"
                label="收货人及联系方式"
              />
              <van-field 
                v-show="form.parameterName3 !== ''"
                v-model="form.parameterValue3"
                @change="changeTemplate"
                placeholder="请输入收货人及联系方式"
              />
              <van-field 
                label-width="480"
                label="交货条款"
              />
              <van-field 
                v-model="form.codeValue"
                type="textarea"
                rows="3"
                placeholder="请输入交货条款"
              />
            </van-form>
          </div>
          <div class="content-footer">
            <van-button @click="showWayTimePod = false"  color="#7232dd" plain>取消</van-button>
            <van-button @click="handleWayTimePosConfirm" type="primary">确认</van-button>
          </div>
        </div>
      </template>
    </van-action-sheet>
    <!-- 处理收款方式、收款模式 -->
    <van-action-sheet 
      style="height: 38%" 
      v-model:show="showReceiveWayMode" 
      @closed="handleClose"
      :title="`选择${codeName}`">
      <template #default>
        <div class="content">
          <div class="content-form">
            <van-form>
              <RcmSelect
                :select-label="'refValue'"
                :select-value="'refValue'"
                :valueKey="'refValue'"
                :options="codeValueList"
                :label="codeName"
                :name="codeName"
                :placeholder="codeName"
                :readonly="orderReadOnly"
                :isRightArrow="true"
                :field="receiveWayForm.refValue"
                @change="({label, value}) => changeReciveWay({label, value}, 'refValue')"
              />
              <van-field 
                v-if="receiveWayForm.parameterName1 !== ''"
                label-width="85"
                v-model="receiveWayForm.parameterValue1"
                :label="receiveWayForm.parameterName1"
              />
              <van-field 
                v-if="receiveWayForm.parameterName2 !== ''"
                label-width="85"
                v-model="receiveWayForm.parameterValue2"
                :label="receiveWayForm.parameterName2"
              />
            </van-form>
          </div>
          <div class="content-footer">
            <van-button @click="showReceiveWayMode = false"  color="#7232dd" plain>取消</van-button>
            <van-button @click="handleReceiveWayModeConfirm" type="primary">确认</van-button>
          </div>
        </div>
      </template>
    </van-action-sheet>
  </div>
</template>

<script>
import { provide } from "vue";
import { Dialog, Notify } from "vant";
import NavBar from "@/components/NavBar.vue";
import Scroll from "@/components/Scroll.vue";
import { getExchangeRate } from "@/api/common";
import ErpVendorSelect from "@/components/ErpVendor.vue";
import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
import ErpProductSelect from "@/components/ErpProduct.vue";
//import ErpFile from "@/components/ErpFile.vue";
import { dateFormat, moneyFormat, rMoneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import {
  detail,
  save,
  update,
  deleteDocentry,
  apply,
  undoApply,
  applySap,
  updateFile,
} from "@/api/erp.isinland.js";

import { listOaStatus } from "@/api/erp.oa.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload } from "@/api/erp.file.js";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";
import fieldFormData from "./cloumn";
import FieldConfig from "./field_config"
console.log("FieldConfig", FieldConfig.getConfig());
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
        if (newVal === 0) {
          this.$refs.main.refresh();
        }
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
      vanFieldData: FieldConfig.getConfig(),
      isStatusList: JSON.parse(this.$route.query.isStatusList),
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
      recTypeList: [], // 收款模式
      orderModeList: [{ name: "格式合同" }, { name: "非格式合同" }],
      recMethodList: [], // 收款方式
      currencyCodeList: [],
      fileItems: [],
      // 处理交(提)货方式、时间及地点
      showWayTimePod: false,
      form: {
        refValueCode: '',
        refValue: '供方于{{最迟交货期}}之前发出产品至需方交货地点，交货(进仓) 地点：{{交货地点}}。\n' +
          ' 收货联系人及联系方式：{{收货联系人及联系方式}}。',
        parameterName1: '最迟交货期',
        parameterValue1: '',
        parameterName2: '交货地点',
        parameterValue2: '',
        parameterName3: '收货联系人及联系方式',
        parameterValue3: '',
        msd: '',
        codeValue: '',
        deliveryTemplate: ''
      },
      // 处理收款方式、收款模式
      showReceiveWayMode: false,
      codeName: '收款模式',
      codeValueList: [],
      receiveWayForm: {
        refValueCode: '',
        refValue: '',
        parameterName1: '',
        parameterValue1: '',
        parameterName2: '',
        parameterValue2: '',
        parameterName3: '',
        parameterValue3: '',
        codeValue: '',
        memo: '',
      }
    };
  },
  created() {
    provide("title", this.tileName);
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
    getCurrencyCode().then((res) => {
      this.currencyCodeList.push(...res);
    });
    if (this.docentry && this.docentry > 0) {
      this.loadDetail();
    } else {
      this.addOrder();
    }
    this.setBtnStatus();
    if(this.showWayTimePod) {
      this.initData();
    }
  },
  methods: {
    // 处理交(提)货方式、时间及地点
    handleWayTimePos() {
      console.log("handleWayTimePos");
      this.showWayTimePod = true
    },
    // 处理交(提)货方式、时间及地点 -- 确认按钮
    handleWayTimePosConfirm() {
      if (this.form.parameterName1 !== "") {
        if (this.form.parameterValue1 === "") {
          Notify({ type: "warning", message: this.form.parameterName1 + "不能为空" });
          return;
        }
      }
      if (this.form.parameterName2 !== "") {
        if (this.form.parameterValue2 === "") {
          Notify({ type: "warning", message: this.form.parameterName2 + "不能为空" });
          return;
        }
      }
      if (this.form.parameterName3 !== "") {
        if (this.form.parameterValue3 === "") {
          Notify({ type: "warning", message: this.form.parameterName3 + "不能为空" });
          return;
        }
      }
      
      let parameterValue = this.form.refValue;
      let template = this.form.refValue;
      if (this.form.parameterName1 !== "") {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName1 + "}}",this.form.parameterValue1 );
      }
      if (this.form.parameterName2 !== "")   {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName2 + "}}",this.form.parameterValue2 );
        template = template.replace("{{" + this.form.parameterName2 + "}}",this.form.parameterValue2 );
      }
      if (this.form.parameterName3 !== "")   {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName3 + "}}",this.form.parameterValue3 );
        template = template.replace("{{" + this.form.parameterName3 + "}}",this.form.parameterValue3 );
      }
      template = template + "|" + this.form.parameterValue2 + "|" + this.form.parameterValue3
      this.form.codeValue = parameterValue;
      this.form.deliveryTemplate = template;
      this.formData.delivery = this.form.codeValue;
      this.formData.deliveryTemplate = this.form.deliveryTemplate;
      this.formData.msd = this.form.msd;
      this.showWayTimePod = false;
    },
    // 处理交(提)货方式、时间及地点 -- 交货时间改变
    changeTemplate() {
      console.log("changeTemplate");
      debugger
      const date = new Date(this.form.msd);
      this.form.parameterValue1 = 
        date.getFullYear().toString() + "年" 
        + (date.getMonth()+1).toString() + "月" 
        + date.getDate().toString() + "日"
      let parameterValue = this.form.refValue;
      if ((this.form.parameterName1 !== "") && (this.form.parameterValue1 !== "")) {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName1 + "}}",this.form.parameterValue1 );
      }
      if ((this.form.parameterName2 !== "") && (this.form.parameterValue2 !== "")) {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName2 + "}}",this.form.parameterValue2 );
      }
      if ((this.form.parameterName3 !== "") && (this.form.parameterValue3 !== "")) {
        parameterValue = parameterValue.replace("{{" + this.form.parameterName3 + "}}",this.form.parameterValue3 );
      }
      this.form.codeValue = parameterValue;
    },
    // 处理交(提)货方式、时间及地点 -- 数据初始化
    initData() {
      this.form.msd = this.formData.msd;
      // 还原
      let template = this.formData.deliveryTemplate;
      if (template !== "") {
        let templateList = template.split("|");
        let parameterValue2 = "";
        let parameterValue3 = "";

        for(let i = 0; i<templateList.length;i++) {
          if (i === 1) {
            parameterValue2 = templateList[1]
          }
          if (i === 2) {
            parameterValue3 = templateList[2]
          }
        }
        this.form.parameterValue2 = parameterValue2
        this.form.parameterValue3 = parameterValue3
      }
    },
    // 处理收款方式、收款模式 
    handleReceiveWayMode(type) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.codeName = type == 'way' ? '收款方式' : '收款模式';
      this.codeValueList = [];
      if(type == 'mode') {
        this.recMethodList.forEach(item => {
          this.codeValueList.push(item);
        })
      } else {
        this.recTypeList.forEach(item => {
          this.codeValueList.push(item);
        })
      }
      this.showReceiveWayMode = true;
    },
    // 处理收款方式、收款模式 
    changeReciveWay({ value }, field) {
      this.receiveWayForm[field] = value;
      debugger
      const item = this.codeValueList.find(item => item.refValue === value)
      console.log('item', item);
      if (item != null) {
        let parameterName = item.acceleKey;
        let parameterNameList = parameterName.split(",");
        this.receiveWayForm.parameterName1 = ""
        this.receiveWayForm.parameterName2 = ""
        for(let i = 0; i<parameterNameList.length;i++) {
          if(i === 0) {
            this.receiveWayForm.parameterName1 = parameterNameList[0]
          }
          if(i === 1) {
            this.receiveWayForm.parameterName2 = parameterNameList[1]
          }
        }
        this.receiveWayForm.memo = item.configs;
      }
    },
    // 处理收款方式、收款模式 
    handleReceiveWayModeConfirm() {
      if (this.receiveWayForm.parameterName1 !== "") {
        if (this.receiveWayForm.parameterValue1 === "") {
          Notify({ type: "warning", message: this.receiveWayForm.parameterName1 + "不能为空" });
          return;
        }
      }
      if (this.receiveWayForm.parameterName2 !== "") {
        if (this.receiveWayForm.parameterValue2 === "") {
          Notify({ type: "warning", message: this.receiveWayForm.parameterName2 + "不能为空" });
          return;
        }
      }
      let parameterValue = this.receiveWayForm.refValue;
      if (this.receiveWayForm.parameterName1 !== "") {
        parameterValue = parameterValue.replace("{{" + this.receiveWayForm.parameterName1 + "}}",this.receiveWayForm.parameterValue1 );
      }
      if (this.receiveWayForm.parameterName2 !== "") {
        parameterValue = parameterValue.replace("{{" + this.receiveWayForm.parameterName2 + "}}",this.receiveWayForm.parameterValue2 );
      }
      this.receiveWayForm.codeValue = parameterValue;
      if (this.codeName === "收款模式") {
        this.formData.payMode = this.receiveWayForm.codeValue;
      }
      if (this.codeName === "收款方式") {
        console.log("this.receiveWayForm.memo", this.receiveWayForm.memo);
        this.formData.outType = this.receiveWayForm.codeValue;
        this.formData.effectMemo = this.receiveWayForm.memo;
      }

      this.showReceiveWayMode = false;
    },
    // 处理收款方式、收款模式 
    handleClose() {
      for(const key in this.receiveWayForm) {
        this.receiveWayForm[key] = ''
      }
    },
    changeRcmSelect({ label, value }, field) {
      this.formData[field] = value;
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
    mainSelecteEmployee(e) {
      console.log('e', e);
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
      // this.infoForm.orgNo = this.rowVendor.parentOrgNo;
      this.formData.orgName = item.unitName4;
      ///往来单位的 数据 需要处理进 联系信息中
      console.log("selectVendorItem往来单位", item);
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
          this.formData.contactItems[i].coName = item.coNameC;
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
      if (this.activeFormFiled === "msd") {
        this.formData.msd = dateFormat(val);
      } else if (this.activeFormFiled === "prepayDateTime") {
        this.formData.prepayDateTime = dateFormat(val);
      } else if (this.activeFormFiled === "signDate") {
        this.formData.signDate = dateFormat(val);
      } else if (this.activeFormFiled === 'form_msd') {
        this.form.msd = dateFormat(val);
        // TO DO
      }
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
    selectItemAction(item) {
      if (this.activeFormFiled === "tradType") {
        this.formData.tradType = item.code;
      } else if (this.activeFormFiled === "saleType") {
        this.formData.saleType = item.code;
      } else if (this.activeFormFiled === "orderMode") {
        this.formData.orderMode = item.name;
      } else if (this.activeFormFiled === "payMode") {
        this.formData.payMode = item.name;
      } else if (this.activeFormFiled === "outType") {
        this.formData.outType = item.name;
      } else if (this.activeFormFiled === "currencyCode") {
        this.formData.currencyCode = item.code;
        getExchangeRate({
          currency1: item.code,
          currency2: 'CNY',
          currency3: 'CNY',
          applyDate:  dateFormat(new Date(), "yyyy/MM/dd"),
          fangx: 1,
          precision: 8
        }).then((res) => {
          if (res.data) {
            this.formData.exchRate = Number(res.data[0].applyExchrate).toFixed(4);
          }
        })
      }
      this.actionShow = false;
      this.activeFormFiled = "";
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
    /// 主表的枚举项处理
    resetActionItems(filedName) {
      this.actionItems = [];
      if (filedName === null || filedName === "") {
        return;
      }
      if (filedName === "tradType") {
        this.actionDesc = "请选择贸易方式";
        for (let index = 0; index < this.tredeTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.tredeTypeList[index].tradeType;
          item.code = this.tredeTypeList[index].tradeTypeNo;
          this.actionItems[index] = item;
        }
      } else if (filedName === "orderMode") {
        this.actionDesc = "请选择合同类型";
        this.actionItems.push(...this.orderModeList);
      } else if (filedName === "saleType") {
        this.actionDesc = "请选择销售类型";
        for (let index = 0; index < this.saleTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.saleTypeList[index].refValue;
          item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "payMode") {
        this.actionDesc = "请选择收款模式";
        for (let index = 0; index < this.recTypeList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.recTypeList[index].refValue;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "outType") {
        this.actionDesc = "请选择收款方式";
        for (let index = 0; index < this.recMethodList.length; index++) {
          let item = { name: "", code: "" };
          item.name = this.recMethodList[index].refValue;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      } else if (filedName === "currencyCode") {
        this.actionDesc = "请选择币种";
        for (let index = 0; index < this.currencyCodeList.length; index++) {
          let item = { name: "", code: "" };
          item.name =
            this.currencyCodeList[index].currencyName +
            "-" +
            this.currencyCodeList[index].currencyCode;
          item.code = this.currencyCodeList[index].currencyCode;
          /// item.code = this.saleTypeList[index].refId;
          this.actionItems[index] = item;
        }
      }
    },

    //////   当前详情是否可以修改
    getOrderCanEdit() {
      let docEntry = this.formData.docEntry;
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
        let auditStatu = this.formData.auditStatu;
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
      this.formData = {};
      //this.isNotAddStatus = false;
      this.titleName = "销售合同新增";
      //  provide("title", "销售合同新增");
      this.formData.docVersion = 1;
      this.formData.fileItems = [];
      //   this.formData.fileItems = fieldFormData().formData.fileItems;
      this.fileItems.splice(0, 0);

      this.formData.auditStatu = "S";
      this.formData.auditStatusName = "未申请审批";
      this.formData.signSite = "江西南昌";
      this.formData.signDate = dateFormat(new Date());
      this.formData.saptype = "未提交";
      this.formData.payMode = "电汇";
      this.formData.isStatus = "U";
      this.formData.exchRate = Number(1).toFixed(4);
      this.formData.delivery = "";
      this.formData.specs = "";
      this.formData.others = "";
      this.formData.cfmComment = "";
      this.formData.contactItems = [];
      getOrgInfo().then((res) => {
        this.formData.contactItems.push({
          controlA: "B",
          addr: res.addr,
          addrE: res.addrE,
          zipCode: res.zipCode,
          coName: res.coName
        });
      });

      this.formData.contactItems.push({ controlA: "V" });
      this.formData.items = [];
      this.initAmountFeeList();
      this.formData.transAndFee =
        "运输方式及费用由供方负责，供方负责将货物按时运抵需方指定收货地点，其后货物毁损灭失等风险由需方承担。";
      this.formData.packageDesc = "包装物不回收。";
      this.formData.cfmComment = "符合国家标准或企业标准。";
      this.formData.currencyCode = "CNY";
      this.formData.tradType = "N";
      this.formData.orderMode = "格式合同";

      this.formData.orgCoNo = getDefaultOrgCoNo();
      this.formData.preProportion = 0.0;
      this.formData.preSum = 0.0;
      this.editStatus = "add";

      this.setBtnStatus();
    },
    // 获取OA 审批数据
    loadOaStatus() {
      let docentry = this.formData.docEntry;
      let isNo = this.formData.isNo;

      listOaStatus("PM03", docentry, isNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();

        })
        .catch((res) => {});
    },
    // 
    formatFieldToFixed(data, field, num) {
      data[field] = Number(data[field]).toFixed(num);
    },
    ///重新加载所有的数据
    loadDetail() {
      detail({ docEntry: this.docentry })
        .then((res) => {
          this.formatFieldToFixed(res.data, "exchRate", 4);
          res.data.totalIsValue = moneyFormat(res.data.totalIsValue);
          res.data.preSum = moneyFormat(res.data.preSum);
          res.data.quantity = Number(res.data.quantity).toFixed(2);
          res.data.items.forEach(item => {
            item.unitPrice = moneyFormat(item.unitPrice);
            item.amount = moneyFormat(item.amount);
            item.unitStdCost = moneyFormat(item.unitStdCost);
            item.sapPrice = moneyFormat(item.sapPrice);
            item.quantity = Number(item.quantity).toFixed(2);
            item.sapQtty = Number(item.sapQtty).toFixed(2);
            item.quantity1 = Number(item.quantity1).toFixed(2);
            item.quantity2 = Number(item.quantity2).toFixed(2);
          })
          this.formData = res.data;
          this.fileItems = this.formData.fileItems;
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
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
          pdtNo1: item.pdtNo1,
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
        this.formData.items[this.activePdtItemIndex].pdtNo1 = item.pdtNo1;
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
        message: `合同【${this.formData.isNo}】一旦删除，则无法恢复!`,
      })
        .then(() => {
          deleteDocentry({ docEntry: this.formData.docEntry })
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
      let temp = this.formData.employeeNo;
      if (!temp) {
        Notify({ type: "warning", message: "业务员尚未录入!" });
        return 0;
      }
      /// 往来单位
      temp = this.formData.vendorNo;
      if (!temp) {
        Notify({ type: "warning", message: "往来单位尚未录入!" });
        return 0;
      }
      /// 币种
      temp = this.formData.currencyCode;
      if (!temp) {
        Notify({ type: "warning", message: "币种尚未录入!" });
        return 0;
      }
      //贸易方式
      temp = this.formData.tradType;
      if (!temp) {
        Notify({ type: "warning", message: "贸易方式尚未录入!" });
        return 0;
      }
      //合同类型
      temp = this.formData.orderMode;
      if (!temp) {
        Notify({ type: "warning", message: "合同类型尚未选择!" });
        return 0;
      }
      ////销售类型
      temp = this.formData.saleType;
      if (!temp) {
        Notify({ type: "warning", message: "销售类型尚未选择!" });
        return 0;
      }
      temp = this.formData.outType;
      if (!temp) {
        Notify({ type: "warning", message: "收款方式尚未选择!" });
        return 0;
      }
      temp = this.formData.delivery;
      if (!temp) {
        Notify({ type: "warning", message: "尚未录入交(提)货方式、时间及地点!" });
        return 0;
      }
      temp = this.formData.msd;
      if (!temp) {
        Notify({ type: "warning", message: "最迟交货期尚未选择!" });
        return 0;
      }
      ///明细必须有
      if (!this.formData.items || this.formData.items.length == 0) {
        Notify({ type: "warning", message: "尚未录入商品明细!" });
        return 0;
      }
      //  对明细进行验证
      for (let index = 0; index < this.formData.items.length; index++) {
        const itemPdt = this.formData.items[index];
        if (!itemPdt.pdtNo1) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未选择销售商品!`,
          });
          return 0;
        }
        if (!itemPdt.quantity || Number(itemPdt.quantity) <= 0) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未录入数量!`,
          });
          return 0;
        }
        if (!itemPdt.unitPrice || itemPdt.unitPrice < 0) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细尚未录入单价!`,
          });
          return 0;
        }
        if (!itemPdt.sapUnitRate || itemPdt.sapUnitRate <= 0) {
          Notify({
            type: "warning",
            message: `第${index + 1}行明细的sap转换比为空!`,
          });
          return 0;
        }
        this.formData.items[index].groupNo = (index + 1) * 10;
      }

      return 1;
    },
    /////保存之前的操作
    beforeDoSave() {
      let check = this.checkSaveFormData();
      if (!check) {
        return 0;
      }
      this.sendFomData = this.formData;
      var splitCode = ",";
      let tempvar = this.sendFomData.quantity;
      if (tempvar.includes(splitCode)) {
        tempvar = tempvar.replace(splitCode, "");
      }
      this.sendFomData.quantity = tempvar.replace(splitCode, "");
      return 1;
    },
    mainBtnClickSave() {
      this.formData.totalIsValue = rMoneyFormat(this.formData.totalIsValue);
      this.formData.preSum = rMoneyFormat(this.formData.preSum);
      this.formData.items.forEach(item => {
        item.unitPrice = rMoneyFormat(item.unitPrice);
        item.amount = rMoneyFormat(item.amount);
        item.unitStdCost = rMoneyFormat(item.unitStdCost);
        item.sapPrice = rMoneyFormat(item.sapPrice);
      })
      let check = this.beforeDoSave();
      if (!check) {
        return;
      }
      // this.formatFieldToFixed(this.sendFomData, "exchRate", 4);
      if (this.sendFomData.docEntry) {
        update(this.sendFomData)
          .then((res) => {
            this.doAfterSave(res);
            this.loadDetail();
          })
          .catch((res) => {
            Notify({
              type: "danger",
              message: "更新销售合同错误：" + res,
            });
          });
        return;
      }
      this.doInsertIeInlandSale();
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
      } else {
        Notify({
          type: "error",
          message: "保存销售合同出错",
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
    ///// 撤销审批
    doCancelApply() {
      undoApply({
        docEntry: this.formData.docEntry,
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
          this.loadDetail();
        })
        .catch((res) => {
          Notify({ type: "error", message: "保存单据出错:" + res.message });
        });
    },
    mainBtnClickAudit() {
      apply({ docEntry: this.formData.docEntry })
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
      if (this.formData.sapOrderNo !== "") {
        Notify({
          type: "warning",
          message: "该记录已提交SAP,不能撤消审批"
        });
        return;
      }
      //undoApply
      this.undoApplyShow = true;
    },
    mainBtnClickSap() {
      applySap({ docEntry: this.formData.docEntry })
        .then((res) => {
          Notify({ type: "success", message: "提交SAP成功!" });
          this.loadDetail();
        })
        // .catch((res) => {
        //   console.log("res", res);
        //   Notify({ type: "danger", message: res });
        // });
    },
    //实际的取消操作
    doCancelOrder() {
      if (this.oldFormData.docEntry) {
        this.formData = this.oldFormData;
        this.orderReadOnly = true;
        this.editStatus = "view";
        //this.isNotAddStatus = true;
        this.setBtnStatus();
      } else {
        this.formData = {};
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
      let keyValue = this.formData.docEntry;
      let keyName = "docEntry";
      let moduleName = "d_pm03_jxhh";
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
        this.updateFileAfter("delete", this.formData.fileItems[index]);
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
            if(this.editStatus === "view") {
              this.updateFileAfter("update", newFileItem);
            }
          }
        })
        .catch();
    },
    updateFileAfter(type, fileItem) {
      let tempForm = {};
      if(type === "update") {
        let fileList = [];
        fileList[0] = fileItem;
        tempForm = {
          docEntry: this.formData.docEntry,
          isNo: this.formData.isNo,
          fileItems: fileList,
          filterFileItems: []
        };
      } else {
        let filterFileItems = [];
        filterFileItems[0] = fileItem;
        tempForm = {
          docEntry: this.formData.docEntry,
          isNo: this.formData.isNo,
          filterFileItems,
          fileItems: []
        };
      }
      updateFile(tempForm).then((res) => {
        if(res.code === 1) {
          Notify({
            type: "success",
            message: type === "update" ? "文件修改成功!" : "文件删除成功!" 
          });
        }
      }).catch(err => {
        Notify({
          type: "danger",
          message: type === "update" ? "文件修改失败!" : "文件删除失败!" 
        });
      });
    },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.goodsItemActIndex = index;
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
  // .van-field__body {
  //   input.van-field__control {
  //     text-indent: 0.7em;
  //   }
  // }
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

<style lang="less" scoped>
  .content {
    height: 100%;
    
    .content-form {
      padding-bottom: 60px;
    }
    .content-footer {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      display: flex;
      button {
        flex: 1;
      }
    }
  }

  .way-time-pos {
    width: 100%;
    height: 100%;
    background: #1fa2e8;
    color: #fff;
    padding: 10px;
  }
</style>
