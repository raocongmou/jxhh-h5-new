<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <!-- <div class="tools-bar">
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        v-show="btnPdfView"
        @click="mainBtnClickPDFView"
        >合同预览</van-button
      >
    </div> -->

    <van-tabs v-model:active="tabActive">
    <!-- <van-tabs v-model:active="tabActive" @change="onClickTab"> -->
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              v-model="computedOrgCo"
              input-align="left"
              name="平台公司"
              label="平台公司"
              readonly
              required
            />
            <van-field
              readonly
              input-align="left"
              name="审批状态"
              label="审批状态"
              v-model="formData.auditStatu"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoiceType"
              name="发票类型"
              label="发票类型"
            />
            <van-field
              input-align="left"
              v-model="formData.invoiceNo"
              readonly
              name="发票号"
              label="发票号"
            />
            <van-field
              input-align="left"
              required
              readonly
              v-model="formData.invoiceDate"
              name="制作日期"
              label="制作日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.empName"
              name="录入人"
              label="录入人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.orgName"
              name="部门"
              label="部门"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.coNameE"
              label="客户名称"
            />
            <van-field
              readonly
              input-align="left"
              name="贸易方式"
              label="贸易方式"
              v-model="formData.orderType"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.countryNamee"
              name="运抵国/地区"
              label="运抵国/地区"
            />
            <!-- <van-field
              input-align="left"
              readonly
              v-model="formData.customerNo"
              name="客户号"
              label="客户号"
            /> -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.countryNamec"
              name="最终国/地区"
              label="最终国/地区"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.currencyCode"
              name="币种"
              label="币种"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.exchrate"
              name="USD折原币汇率"
              label="USD折原币汇率"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.totalprice"
              name="发票金额"
              label="发票金额"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.exchangerate"
              name="原币折RMB汇率"
              label="原币折RMB汇率"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.negotiationFlag"
              name="押汇"
              label="押汇"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.jhDate1"
              name="预计收汇日期"
              label="预计收汇日期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.recamount"
              name="已收汇金额"
              label="已收汇金额"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.status"
              name="执行状态"
              label="执行状态"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.refnotitle"
              name="销售类型"
              label="销售类型"
            />
            <van-field
              input-align="left"
              v-model="formData.sapinvType"
              name="SAP接口状态"
              label="SAP接口状态"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sapinvNo"
              name="SAP销售订单号"
              label="SAP销售订单号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.sapinvcreateDate"
              name="SAP创建日期"
              label="SAP创建日期"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="商品">
        <div class="detail_item">
          <van-collapse
            v-model="pdtItemsActiveIndex"
            accordion
            @change="goodsItemColl"
          >
            <div v-if="formData.items.length">
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index"
                :title="item.pdtNamee"
              >
                <Scroll
                  class="wrappers-goods-detail wrappers"
                  wrapper="goodsDetailRef"
                  ref="goodsDetail"
                >
                  <van-form label-width="150">
                    <van-field
                      v-model="item.orderNo"
                      label="出口定单号"
                      readonly
                      input-align="left"
                    />
                    <van-field
                      v-model="item.pdtno1"
                      label="公司商品号"
                      readonly
                      input-align="left"
                    />
                    <van-field
                      v-model="item.pdtCodec"
                      label="海关编码"
                      readonly
                      input-align="left"
                    />
                    <!-- <van-field
                      v-model="item.pdtNamee"
                      readonly
                      input-align="left"
                      label="商品名称(英文)"
                    /> -->
                    <van-field
                      readonly
                      v-model="item.descriptione"
                      label="申报要素"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.hl"
                      readonly
                      label="含量(%)"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.uom"
                      readonly
                      label="销售单位"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.unitprice"
                      readonly
                      label="销售价格"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.quatity"
                      readonly
                      label="销售数量"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.subprice"
                      readonly
                      label="销售金额(原币)"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.unitstdprice"
                      readonly
                      label="结算价(原币)"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.zhengmian"
                      readonly
                      label="征免"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.sapunit"
                      readonly
                      label="SAP计量单位"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.sapunitrate"
                      readonly
                      label="SAP转换比"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.sapprice"
                      readonly
                      label="SAP销售单价(人民币)"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.sapqtty"
                      readonly
                      label="SAP销售数量"
                      input-align="left"
                    />
                    <van-field
                      v-model="item.sapunitstdcost"
                      readonly
                      label="SAP结算价(人民币)"
                      input-align="left"
                    />
                  </van-form>
                </Scroll>
              </van-collapse-item>
            </div>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="联系信息">
        <van-collapse
          accordion
          v-model="contactInfoActiveIndex"
          @change="collapseChange"
        >
          <van-collapse-item
            :title="'我方联系信息'"
          >
            <van-form>
              <van-field
                v-model="formData.contactItems[0].coName"
                name="公司名称"
                readonly
                type="textarea"
                row="1"
                autosize
                label="公司名称"
              />
                
              <van-field
                v-model="formData.contactItems[0].addr"
                name="地址"
                readonly
                type="textarea"
                row="1"
                autosize
                label="地址"
              />
              <van-field
                v-model="formData.contactItems[0].taxNo"
                name="信用代码"
                readonly
                label="信用代码"
              />
              
                
              <van-field
                v-model="formData.contactItems[0].bankName"
                name="收款银行"
                type="textarea"
                row="1"
                autosize
                readonly
                label="收款银行"
              />
                
              <van-field
                v-model="formData.contactItems[0].bankaddr"
                name="银行地址"
                type="textarea"
                row="1"
                autosize
                readonly
                label="银行地址"
              />
              <van-field
                v-model="formData.contactItems[0].accountNo"
                name="银行帐号"
                readonly
                label="银行帐号"
              />
              <van-field
                v-model="formData.contactItems[0].swift"
                name="SWIFT"
                readonly
                label="SWIFT"
              />
            </van-form>
          </van-collapse-item>
          <van-collapse-item
            ref="clientContactRef"
            :title="'客户联系信息'"
          >
            <van-form>
              <van-field
                v-model="formData.contactItems[1].coName"
                name="客户名称"
                readonly
                type="textarea"
                row="1"
                autosize
                label="客户名称"
              />
                
              <van-field
                v-model="formData.contactItems[1].addr"
                name="地址"
                readonly
                type="textarea"
                row="1"
                autosize
                label="地址"
              />
              <van-field
                v-model="formData.contactItems[1].contact"
                name="联系人"
                readonly
                label="联系人"
              />
              
                
              <van-field
                v-model="formData.contactItems[1].country"
                name="国家"
                readonly
                label="国家"
              />
                
              <van-field
                v-model="formData.contactItems[1].phone"
                name="电话"
                readonly
                label="电话"
              />
              <van-field
                v-model="formData.contactItems[1].fax"
                name="传真"
                readonly
                label="传真"
              />
            </van-form>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="价格条款">
        <Scroll class="wrappers-main wrappers" wrapper="dlvtermRef" ref="main">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              input-align="left"
              v-model="formData.dlvterm"
              readonly
              name="价格条款"
              label="价格条款"
            />
            <van-field
              v-model="formData.dlvport"
              input-align="left"
              name="价格口岸"
              label="价格口岸"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.payterm"
              name="付款方式"
              label="付款方式"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.creditday"
              name="信用证天数"
              label="信用证天数"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.workday"
              name="账期天数"
              label="账期天数"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.expectdays"
              name="付款期限"
              label="付款期限"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.commodity"
              name="付款说明"
              label="付款说明"
            />
            <van-field
              input-align="left"
              readonly
              v-model="getCmmsnsign1"
              label="佣金类型1"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.commision1"
              label="比率1(%)"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.commamount1"
              label="金额1"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.cmmsman1"
              label="佣金描述1"
            />
            <van-field
              input-align="left"
              readonly
              v-model="getCmmsnsign2"
              label="佣金类型2"
            />
              <!-- v-model="formData.cmmsnsign2" -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.commision2"
              label="比率2(%)"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.commamount2"
              label="金额2"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.cmmsman2"
              label="佣金描述2"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.discountrate"
              label="折扣比率(%)"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.discount1"
              label="折扣金额"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.disccomm"
              name="折扣描述"
              label="折扣描述"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="运输资料">
        <Scroll class="wrappers-main wrappers" wrapper="dlvtermSourceRef">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              input-align="left"
              v-model="formData.invoice1Items[0].freightNo"
              readonly
              name="运输委托单号"
              label="运输委托单号"
            />
            <van-field
              v-model="formData.invoice1Items[0].transtool"
              input-align="left"
              name="运输方式(报关用)"
              label="运输方式(报关用)"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].freightfee"
              name="运费支付方式"
              label="运费支付方式"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].blnum"
              name="提单张数"
              label="提单张数"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].shippfee"
              name="预计运费"
              label="预计运费"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].preincidental"
              name="预计运杂费(CNY)"
              label="预计运杂费(CNY)"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].isotherfee"
              name="其他费用(CNY)"
              label="其他费用(CNY)"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].outvesselName"
              name="船名"
              label="船名"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].shippline"
              name="运输公司"
              label="运输公司"
              autosize
              type="textarea"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].shipper"
              name="装运人"
              autosize
              type="textarea"
              label="装运人"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].consignee"
              name="B/L AWB"
              label="B/L AWB"
              autosize
              type="textarea"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].notifyparty"
              name="通知人"
              autosize
              type="textarea"
              label="通知人"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].goodsto"
              name="境外收货人"
              label="境外收货人"
              autosize
              type="textarea"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.latshipDate"
              name="截止船运期"
              label="截止船运期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.transhipment"
              name="转运"
              label="转运"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.partialshipment"
              name="分批"
              label="分批"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.ship_via"
              name="运输方式"
              label="运输方式"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.portdesignation"
              name="到达港"
              label="到达港"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.deliverplace"
              name="目的地"
              label="目的地"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.portshiping"
              name="装运港"
              label="装运港"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.exptport"
              name="出口口岸"
              label="出口口岸"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.pdtresource"
              name="境内货源地"
              label="境内货源地"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.transshipport"
              name="包装种类"
              label="包装种类"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.shipmark"
              name="唛头信息"
              label="唛头信息"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="保险资料信用证等">
        <Scroll class="wrappers-main wrappers" wrapper="dlvtermSourceRef">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              input-align="left"
              v-model="formData.invoice1Items[0].insurcoName"
              readonly
              name="保险公司"
              label="保险公司"
              autosize
              type="textarea"
            />
            <van-field
              v-model="formData.invoice1Items[0].assured"
              input-align="left"
              name="被保险人"
              label="被保险人"
              autosize
              type="textarea"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].claimaddr"
              name="赔付地点"
              label="赔付地点"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].insurplus"
              name="保险加成(%)"
              label="保险加成(%)"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].insuramount"
              name="投保金额"
              label="投保金额"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].estiminsurfee"
              name="预计保费"
              label="预计保费"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].applicant"
              name="投保联系人"
              label="投保联系人"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].apptel"
              name="联系电话"
              label="联系电话"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].formarefNo"
              name="Form A编号"
              label="Form A编号"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].expcountry"
              name="贸易国/地区"
              label="贸易国/地区"
            />
            <van-field
              readonly
              type="textarea"
              input-align="left"
              v-model="formData.invoice1Items[0].goodsfrom"
              name="产地证发货人"
              label="产地证发货人"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].goodsto"
              name="FROM CO"
              label="FROM CO"
              autosize
              type="textarea"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].transmeens"
              name="产地证运输航线"
              label="产地证运输航线"
              autosize
              type="textarea"
            />
            <!-- 截断 -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.titleName"
              name="发票抬头人"
              label="发票抬头人"
              autosize
              type="textarea"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.creditNo"
              name="信用证号"
              label="信用证号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.issueDate"
              name="开证日期"
              label="开证日期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.bank"
              name="开证银行"
              label="开证银行"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.expDate"
              name="有效期"
              label="有效期"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.negobank"
              name="议付银行"
              label="议付银行"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="报关资料备忘录">
        <Scroll class="wrappers-main wrappers" wrapper="dlvtermSourceRef">
          <van-form @submit="onSubmit" label-width="120">
            <van-field
              input-align="left"
              v-model="formData.invoice1Items[0].controlb"
              readonly
              name="贸易方式"
              label="贸易方式"
            />
            <van-field
              v-model="formData.invoice1Items[0].permissionNo"
              input-align="left"
              name="许可证号"
              label="许可证号"
              readonly
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].packingcost"
              name="包装费(美国/加拿大发票)"
              label="包装费(美国/加拿大发票)"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].confirmNo"
              name="合同协议号"
              label="合同协议号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].refranceno"
              name="备案号"
              label="备案号"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].othercost"
              name="国内运费(美国发票)"
              label="国内运费(美国发票)"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].taxproperty"
              name="征收性质"
              label="征收性质"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].custotherfee"
              name="杂费"
              label="杂费"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].domfrghtcharge"
              name="其他费用(美国发票)"
              label="其他费用(美国发票)"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].exportDate"
              name="出口日期"
              label="出口日期"
            />
            <van-field
              readonly
              input-align="left"
              v-model="formData.invoice1Items[0].custman"
              name="报关员"
              label="报关员"
            />
            <!-- <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].goodsto"
              name="统计否"
              label="统计否"
            /> -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].otherchar2"
              name="海关发票备注"
              label="海关发票备注"
            />
            <!-- 截断 -->
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].documents"
              name="随附单据"
              label="随附单据"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].otherchar1"
              name="报关单唛头及备注"
              label="报关单唛头及备注"
            />
            <van-field
              input-align="left"
              readonly
              type="textarea"
              v-model="formData.invoice1Items[0].dealcoName"
              name="经营单位"
              label="经营单位"
            />
            <van-field
              input-align="left"
              readonly
              type="textarea"
              v-model="formData.invoice1Items[0].sendcoName"
              name="发货公司"
              label="发货公司"
            />
            <van-field
              input-align="left"
              readonly
              v-model="formData.invoice1Items[0].manufactory"
              name="生产厂商"
              label="生产厂商"
            />
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="单据打印">
        <van-collapse
          v-model="pdtItemsActiveIndex"
          accordion
          @change="goodsItemColl"
        >
          <van-collapse-item
            v-for="(item, index) in formData.attachItems"
            :key="index"
            :name="index"
            :title="item.objNameC"
          >
            <Scroll class="wrappers-main wrappers" wrapper="docTypeRef">
              <van-form @submit="onSubmit" label-width="120">
                <van-field
                  v-model="item.docDate"
                  input-align="left"
                  name="制单日期"
                  label="制单日期"
                  :formatter="formatter"
                  readonly
                />
                <van-field
                  readonly
                  input-align="left"
                  v-model="item.refdocNo"
                  name="份数"
                  label="份数"
                />
                <van-field
                  input-align="left"
                  readonly
                  v-model="item.titleName"
                  name="题头"
                  label="题头"
                />
              </van-form>
              <div class="doc-preview">
                <van-button 
                  type="primary" 
                  size="small"
                  @click="handlePreview(item)"
                >
                  预览
                </van-button>
              </div>
            </Scroll>
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
      <!-- <van-tab title="附件">
        <van-collapse
          v-model="pdtItemsActiveIndex"
          accordion
          @change="goodsItemColl"
        >
          <van-collapse-item
            v-for="(item, index) in formData.fileItems"
            :key="index"
            :name="index + 1"
            :title="item.fileName"
          >
            <Scroll class="wrappers-main wrappers" wrapper="fileRef">
              <van-form @submit="onSubmit" label-width="120">
                <van-field
                  input-align="left"
                  v-model="item.fileName"
                  readonly
                  name="附件"
                  label="附件"
                />
                <van-field
                  v-model="item.fileDesc"
                  input-align="left"
                  name="备注"
                  label="备注"
                  readonly
                />
                <van-field
                  readonly
                  input-align="left"
                  v-model="item.empNo"
                  name="上传人"
                  label="上传人"
                />
                <van-field
                  input-align="left"
                  readonly
                  v-model="item.impDate"
                  name="上传日期"
                  label="上传日期"
                />
              </van-form>
            </Scroll>
          </van-collapse-item>
        </van-collapse>
      </van-tab> -->
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

//import ErpVendorSelect from "@/components/ErpVendor.vue";
//import ErpEmployeeSelect from "@/components/ErpEmployee.vue";
//import ErpProductSelect from "@/components/ErpProduct.vue";
//import ErpFile from "@/components/ErpFile.vue";
import { dateFormat, moneyFormat } from "@/utils/format";
import { getDefaultOrgCoNo } from "@/utils/user.setting";
import { getInvoiceInfo } from "@/api/exportTrade/document";
import { 
  getTable3XByDoc, 
  getDocStatusList, 
  getCurrencyCodeList, 
  getTable3XByRef, 
  getAuditStatusList,
  getBankList 
} from "@/api/common";

import { listOaStatus } from "@/api/erp.oa.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload, down } from "@/api/erp.file.js";

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
  name: "PurchaseInvoiceDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    //ErpVendorSelect,
    //ErpEmployeeSelect,
    //ErpProductSelect,
    //ErpFile,
  },
  watch: {
    // tabActive: {
    //   handler(oldVal, newVal) {
    //     if (newVal === 0) {
    //       this.$refs.main.refresh();
    //     }
    //     else if (newVal === 3) {
    //       this.$refs.file.refresh();
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  data() {
    return {
      oaStatusArr: [],
      bankList: [], // 银行代码表
      statusList: [], // 执行状态
      cmmsnsign1List: [
        { refValue: "明佣", refValueCode: "Y" },
        { refValue: "暗佣", refValueCode: "N" },
      ], // 佣金类型
      negotiationflagList: [
        { refValue: "是", refValueCode: "Y" },
        { refValue: "否", refValueCode: "N" },
      ],
      invoiceTypeList: [
        { refValue: "议付", refValueCode: 1 },
        { refValue: "报关", refValueCode: 2 },
        { refValue: "议付+报关", refValueCode: 3 },
      ],
      heightIndex: "20px",
      auditStatusList: [],
      objectNo: "PM03",
      tileName: "销售合同详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      baseDetail: fieldFormData().baseDetail,
      sapItemsDetail: fieldFormData().sapItemsDetail,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      oaStatusArr: [],
      genarareForm: {
        objectNo: "PM03",
        orgCoNo: "",
      },
      // 分类
      acctCodeList: [
        { name: "费用", code: "1"},
        { name: "货款", code: "0"},
      ],
      // 紧急程度
      importantList: [
        { id: 0, text: "正常" },
        { id: 1, text: "重要" },
        { id: 2, text: "紧急" }
      ],
      // 单据类型
      docTypeList: [
        { id: "PM02", text: "内采合同" },
        { id: "PM03", text: "销售合同" },
        { id: "SD01", text: "出口发票" },
        { id: "SM07", text: "出口定单" },
        { id: "OTHER", text: "其他" },
        { id: "SM07A", text: "转口销售" }
      ],
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
      currencyCodeList: [],
      fileItems: [],
      payItemList: [], // 付款项目
      payModeList: [], // 预付款方式
      payTypeList: [], // 付款类型
      flag2List: [], // 贸易方式
      statusList: [
        { refValue: "未复核", refValueCode: "N" },
        { refValue: "复核", refValueCode: "Y" },
        { refValue: "退回", refValueCode: "R" },
      ],
      flag1List: [
        { refValue: "未核销", refValueCode: "0" },
        { refValue: "部分核销", refValueCode: "1" },
        { refValue: "全部核销", refValueCode: "2" },
      ],
      conformList: [
        { refValue: "√", refValueCode: "Y" },
        { refValue: "", refValueCode: "N" },
      ],
      acctFlagList: [
        { refValue: "√", refValueCode: 1 },
        { refValue: "", refValueCode: 0 },
      ],
      transtoolList: [], // 运输方式
    };
  },
  created() {
    this.docentry = this.$route.query.docEntry;
    getBankList({}).then(res => {
      this.bankList.push(...res.data);
    })
    // 贸易方式
    getTable3XByRef({
      objRef: "InlandPurchase"
    }).then(res => {
      this.flag2List.push(...res.data);
    });
    // 贸易方式
    getDocStatusList({
    }).then(res => {
      this.statusList.push(...res.data);
    });
    getTable3XByDoc({
      objRef: "recMode",
      objectNo: "PM09"
    }).then(res => {
      this.payTypeList.push(...res.data);
    })
    getTable3XByDoc({
      objRef: "costfee",
      objectNo: "PM09",
      sortId: "4"
    }).then(res => {
      this.payItemList.push(...res.data);
    })
    // 运输方式(报关用)
    getTable3XByRef({
      objRef: "transtool"
    }).then(res => {
      this.transtoolList.push(...res.data);
    })
    getTable3XByDoc({
      objRef: "payTerm",
      objectNo: "PM09"
    }).then(res => {
      this.payModeList.push(...res.data);
    })
    getAuditStatusList({}).then(res => {
      this.auditStatusList.push(...res.data);
    })
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
    getCurrencyCodeList().then((res) => {
      this.currencyCodeList.push(...res.data);
    });
    if (this.docentry) {
      this.loadDetail();
    }
  },
  methods: {
    formatterCmmsman(value) {
      return value === "N" ? "暗佣" : "明佣";
    },
    // 预览功能
    handlePreview(item) {
      console.log(item);
      let objectNo = item.objectNo.trim();
      let moduleName = "";
      if (objectNo === "SD01") {
        if (this.formData.orgCoNo === "0201") {
          moduleName = "d_sd01_yfnb_jxhh";
        } else {
          moduleName = "d_sd01_yfnb_jxhh_other";
        }
      }
      if (objectNo === "SD02") {
        if (this.formData.orgCoNo === "0201") {
          moduleName = "d_sd02_yf_jxhh";
        } else {
          moduleName = "d_sd02_yf_jxhh_other";
        }
      }
      if (objectNo === "ED11") {
        moduleName = "d_ed11_jxhh";
      }
      if (objectNo === "ED09") {
        moduleName = "d_ed09_yf_jxhh";
      }
      let keyValue = item.docentry;
      let keyName = "docEntry";
      this.$router.push({
        path: "/pdforder",
        query: {
          moduleName: moduleName,
          keyName: keyName,
          keyValue: keyValue,
          names: "B"
        },
      });
    },
    // 获取OA 审批数据
    loadOaStatus() {
      // let docentry = this.formData.docEntry;
      let payNo = this.formData.invoiceNo;

      listOaStatus("SD01", this.docentry, payNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();
        })
        .catch((res) => {});
    },
    formatter(val) {
      return dateFormat(val, "yyyy-MM-dd");
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
    formatterAudit(value) {
      this.auditStatusList.forEach(item => {
        if(item.statusCode === value) {
          value = item.statusName;
        }
      })
      return value;
    },
    collapseChange(index) {
      if (index || index === 0) {
        this.heightIndex = "20px";
        this.heightIndex = Number(this.heightIndex.replace(/px/g, ""))*index + 'px'
        // this.goodsItemActIndex = index;
      }
    },
    onClickTab(title) {
      console.log(title);
      if (title === 0) {
        this.$nextTick((_) => {
          this.$refs.main.refresh();
        });
      }
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
    initAllStatus(items, data) {
      // invoice1Items
      this.auditStatusList.forEach(item => {
        if(data.auditStatu === item.statusCode) {
          data.auditStatu = item.statusName;
        }
      })
      this.bankList.forEach(item => {
        if(data.negobank === item.bankCode) {
          data.negobank = item.bankNameC;
        }
      })
      this.statusList.forEach(item => {
        if(data.status === item.statusCode) {
          data.status = item.statusName;
        }
      })
      this.currencyCodeList.forEach(item => {
        if(data.currencyCode === item.currencyCode) {
          data.currencyCode = item.currencyName;
        }
      })
      // this.transtoolList.forEach(item => {
      //   if(data.transtool === item.refValueE) {
      //     data.transtool = item.refValue;
      //   }
      // })
      this.negotiationflagList.forEach(item => {
        if(data.negotiationFlag === item.refValueCode) {
          data.negotiationFlag = item.refValue;
        }
        if(data.transhipment === item.refValueCode) {
          data.transhipment = item.refValue;
        }
        if(data.partialshipment === item.refValueCode) {
          data.partialshipment = item.refValue;
        }
      })
      this.cmmsnsign1List.forEach(item => {
        if(data.cmmsnsign1 === item.refValueCode) {
          data.cmmsnsign1 = item.refValue;
        } else if(data.cmmsnsign2 === item.refValueCode) {
          data.cmmsnsign2 = item.refValue;
        } 
      })
      items.forEach(itex => {
        this.acctCodeList.forEach(item => {
          if(itex.acctCode === item.code) {
            itex.acctCode = item.name;
          }
        });
        // (商品)核销
        this.flag1List.forEach(item => {
          if(itex.flag1 == item.refValueCode) {
            itex.flag1 = item.refValue;
          }
        });
        this.docTypeList.forEach(item => {
          if(itex.objectNo === item.id) {
            itex.objectNo = item.text;
          }
        });
        this.payModeList.forEach(item => {
          if(itex.payMode === item.refValueCode) {
            itex.payMode = item.refValue;
          }
        });
      });
      this.invoiceTypeList.forEach(item => {
        if(data.invoiceType === item.refValueCode) {
          data.invoiceType = item.refValue;
        }
      });
      this.flag2List.forEach(item => {
        if(data.flag2 == item.refValueCode) {
          data.flag2 = item.refValue;
        }
      });
      this.statusList.forEach(item => {
        if(data.status == item.refValueCode) {
          data.status = item.refValue;
        }
      });
      this.flag1List.forEach(item => {
        if(data.flag1 == item.refValueCode) {
          data.flag1 = item.refValue;
        }
      });
      this.conformList.forEach(item => {
        if(data.conform == item.refValueCode) {
          data.conform = item.refValue;
        }
      });
      this.acctFlagList.forEach(item => {
        if(data.acctFlag == item.refValueCode) {
          data.acctFlag = item.refValue;
        }
      });
    },
    // 移除字段空字符串
    removeBlankStr(data) {
      for(let key in data) {
        if(typeof data[key] === 'string') {
          data[key] = data[key].replace(/\s+/g, "")
        }
      }
      return data;
    },
    ///重新加载所有的数据
    loadDetail() {
      getInvoiceInfo({ docentry: this.docentry })
      .then((res) => {
        res.data.invoiceDate = dateFormat(res.data.invoiceDate, "yyyy-MM-dd");
        res.data.exchrate = Number(res.data.exchrate).toFixed(4);
        res.data.totalprice = moneyFormat(res.data.totalprice);
        res.data.commamount1 = moneyFormat(res.data.commamount1);
        res.data.commamount2 = moneyFormat(res.data.commamount2);
        res.data.discount1 = moneyFormat(res.data.discount1);
        res.data.items.forEach(item => {
          item.unitprice = moneyFormat(item.unitprice);
          item.subprice = moneyFormat(item.subprice);
          item.unitstdprice = moneyFormat(item.unitstdprice);
          item.sapqtty = Number(item.sapqtty).toFixed(2);
          item.quatity = Number(item.quatity).toFixed(2);
        });

        if(res.data.items) {
          this.initAllStatus(res.data.items, res.data)
        }
        console.log("data", res);
        this.formData = this.removeBlankStr(res.data);
        this.fileItems = this.formData.fileItems;
        this.loadOaStatus();
      })
      .catch((res) => {
        Notify({ type: "danger", message: res });
      });
    },
    // /////用户确认了销售合同号  insert 逻辑的延续
    // confirmIsNo() {
    //   this.sendFomData.isNo = this.tempIsNo;
    //   save(this.sendFomData)
    //     .then((res) => {
    //       this.doAfterSave(res);
    //     })
    //     .catch((res) => {
    //       Notify({ type: "error", message: "保存单据出错:" + res.message });
    //     });
    // },
    /// 合同预览
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
    // updateFileAfter(fileItem) {
    //   //let aduitStatus = this.form
    //   let auditStatus = this.formData.auditStatus;
    //   if (this.orderReadOnly) {
    //     console.log("当前表单是非编辑状态，需要自动提交附件");
    //     let fileList = [];
    //     fileList[0] = fileItem;
    //     let tempForm = {
    //       docEntry: this.formData.docEntry,
    //       isNo: this.formData.isNo,
    //       fileItems: fileList,
    //     };
    //     updateFile(tempForm).then((res) => {
    //       console.log("自动提交附件", res);
    //     });
    //     return;
    //   }
    //   console.log("当前表单是编辑状态，无需自动提交数据");
    // },
    goodsItemColl(index) {
      if (index || index === 0) {
        this.heightIndex = "20px";
        this.heightIndex = Number(this.heightIndex.replace(/px/g, ""))*index + 'px'
        this.goodsItemActIndex = index;
      }
    },
  },

  computed: {
    getCmmsnsign1() {
      return this.formData.cmmsnsign1 === "N" ? "暗佣" : "明佣";
    },
    getCmmsnsign2() {
      return this.formData.cmmsnsign2 === "N" ? "暗佣" : "明佣";
    },
    // 计算高度
    goodsDetailHeight: function () {
      /// const height = window.innerHeight;
      let goodsItemActIndex = this.goodsItemActIndex;
      console.log("当前展开行", goodsItemActIndex);
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
        console.log("计算高度", searchBarHeight);
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
  setup() {
    provide("title", "出口单证详情");
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
  height: 280px;
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
  background-color: #fff;
  // background-color: #eeeeee;
  height: calc(100vh - 137.93px + 47.95px);
  // height: calc(100vh - 137.93px);
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
  // height: calc(100vh - 194.43px);
  height: calc(100vh - 192.93px - v-bind(heightIndex));
}
.wrappers-goods-detail {
  height: calc(100vh - 192.93px - v-bind(heightIndex));
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
.doc-preview {
  width: 80%;
  margin: 20px auto;
  .van-button {
    width: 100%;
    border-radius: 20px;
  }
}
</style>
