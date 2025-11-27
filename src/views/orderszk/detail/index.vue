<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <div class="tools-bar">
      <van-button
        size="small"
        class="tools-bar-button"
        type="primary"
        color="#1fa2e8"
        @click="mainBtnClickPDFView"
        >合同预览</van-button
      >
    </div>
    <van-tabs v-model:active="tabActive" @change="onClickTab">
      <van-tab title="主表信息">
        <Scroll class="wrappers-main wrappers" wrapper="mainRef" ref="main">
          <van-form>
            <!-- <van-form @submit="onSubmit"> -->
            <van-field
              v-model="computedOrgCo"
              input-align="left"
              name="平台公司"
              label="平台公司"
              readonly
              required
              placeholder="平台公司"
            />
            <van-field
              v-model="computedControlc"
              name="内部往来"
              label="内部往来"
              input-align="left"
              readonly
              required
              placeholder="内部往来"
            />
            <van-field
              v-model="formData.orderNo"
              input-align="left"
              readonly
              required
              name="orderNo"
              label="出口定单号"
              placeholder="出口定单号"
            />
            <van-field
              v-model="formData.orderDate"
              input-align="left"
              name="orderDate"
              label="制单日期"
              required
              readonly
            />
            <van-field
              readonly
              required
              v-model="formData.orgName"
              input-align="left"
              name="部门"
              label="部门"
              placeholder="部门"
            />
            <van-field
              readonly
              required
              input-align="left"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
              placeholder="业务员"
            />
            <van-field
              v-model="formData.coNameE"
              input-align="left"
              name="客户"
              label="客户"
              readonly
              required
            />
            <van-field
              v-model="formData.auditStatusName"
              readonly
              required
              input-align="left"
              name="审批状态"
              label="审批状态"
              placeholder="审批状态"
            />
            <van-field
              v-model="formData.orderType"
              readonly
              required
              input-align="left"
              name="贸易方式"
              label="贸易方式"
            />
            <van-field
              v-model="formData.refNoTitle1"
              readonly
              required
              name="合同类型"
              label="合同类型"
              input-align="left"
            />
            <van-field
              input-align="left"
              v-model="formData.signDate"
              name="签约日期"
              label="签约日期"
              readonly
              required
            />
            <van-field
              v-model="formData.signSite"
              readonly
              required
              name="签约地"
              label="签约地"
              input-align="left"
            />
            <van-field
              v-model="formData.countryName"
              readonly
              required
              input-align="left"
              name="运抵国"
              label="运抵国/地区"
            />
            <van-field
              readonly
              required
              input-align="left"
              v-model="formData.currencyCode"
              name="币种"
              label="币种"
              placeholder=""
            />

            <van-field
              v-model="formData.totalPrice"
              input-align="left"
              readonly
              required
              name="定单金额"
              label="定单金额"
              placeholder="定单金额"
            />

            <van-field
              input-align="left"
              v-model="formData.exchRate"
              name="USD折原币汇率"
              label="USD折原币汇率"
              readonly
              required
            />
            <van-field
              input-align="left"
              v-model="formData.totalPriceA"
              name="美元金额"
              label="美元金额"
              readonly
              required
            />
            <van-field
              input-align="left"
              v-model="formData.exchangerate"
              name="原币折RMB汇率"
              label="原币折RMB汇率"
              readonly
              required
            />
            <van-field
              input-align="left"
              v-model="formData.rmbTotalPrice"
              readonly
              required
              name="人民币金额"
              label="人民币金额"
              placeholder=""
            />
            <van-field
              v-model="formData.refNoTitle3"
              readonly
              required
              input-align="left"
              name="销售类型"
              label="销售类型"
              placeholder="销售类型"
            />
            <van-field
              v-model="formData.refNoTitle2"
              name="账期"
              label="账期"
              input-align="left"
              readonly
            />
            <van-field
              label="付款方式说明"
              v-model="formData.creditCom"
              readonly
              required
              type="texearea"
              input-align="left"
            />
            <van-field
              label="价格条款"
              input-align="left"
              v-model="formData.dlvTerm"
              readonly
            />
            <van-field
              label="付款方式"
              input-align="left"
              v-model="formData.payTerm"
              readonly
            ></van-field>
            <van-field
              label="付款期限"
              input-align="left"
              v-model="formData.expectDays"
              readonly
            ></van-field>
            <van-field
              label="融资状态"
              input-align="left"
              v-model="formData.status1"
              readonly
            ></van-field>
            <van-field
              label="装运港"
              input-align="left"
              v-model="formData.portShipping"
              readonly
            ></van-field>
            <van-field
              label="目的港"
              input-align="left"
              v-model="formData.portDesignation"
              readonly
            ></van-field>
            <van-field
              label="运输方式"
              input-align="left"
              v-model="formData.shipVia"
              readonly
            ></van-field>
            <van-field
              label="投保公司"
              input-align="left"
              v-model="formData.tbCom"
              readonly
            ></van-field>
            <van-field
              label="投保比例%"
              v-model="formData.tbjc"
              readonly
              input-align="left"
            ></van-field>
            <van-field
              label="投保费率(%)"
              v-model="formData.tbrate"
              readonly
              input-align="left"
            ></van-field>
            <van-field
              label="投保金额(CNY)"
              input-align="left"
              v-model="formData.tbamount"
              readonly
            ></van-field>
            <van-field
              label="投保费(CNY)"
              input-align="left"
              v-model="tbfee"
              readonly
            ></van-field>
          </van-form>
        </Scroll>
      </van-tab>
      <van-tab title="商品信息">
        <!-- <Scroll class="wrappers-goods wrappers" wrapper="goodsRef" ref="goods"> -->
        <div class="detail_item">
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
                  :title="item.pdtnamec"
                >
                  <van-form>
                    <van-field
                      label-width="128"
                      v-model="item.pdtno1"
                      readonly
                      name="商品编码"
                      label="商品编码"
                    />
                    <van-field
                      label-width="128"
                      v-model="item.pdtnamec"
                      readonly
                      name="商品名称"
                      label="商品名称"
                      placeholder="商品名称"
                    />
                    <van-field
                      label-width="128"
                      v-model="item.pdtnamee"
                      :readonly="orderReadOnly"
                      name="商品名称(英文)"
                      label="商品名称(英文)"
                      placeholder="商品名称(英文)"
                    />
                    <van-field
                      label-width="128"
                      v-model="item.specificatione"
                      :readonly="orderReadOnly"
                      name="规格"
                      label="规格"
                      placeholder="规格"
                    />
                    <van-field
                      type="number"
                      label-width="128"
                      v-model="item.hl"
                      name="含量(%)"
                      label="含量(%)"
                      placeholder="含量(%)"
                    />
                    <van-field
                      label-width="128"
                      v-model="item.uom"
                      readonly
                      required
                      name="销售单位"
                      label="销售单位"
                      placeholder="销售单位"
                    />
                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.unitprice"
                          type="number"
                          readonly
                          name="销售单价"
                          label="销售单价"
                          placeholder="销售单价"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>

                    <van-field
                      label-width="128"
                      v-model="item.quantity"
                      border
                      readonly
                      name="销售数量"
                      label="销售数量"
                      placeholder="销售数量"
                    />

                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.subprice"
                          type="number"
                          readonly
                          name="销售金额"
                          label="销售金额"
                          placeholder="销售金额"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.unitstdcost"
                          :readonly="orderReadOnly"
                          name="工厂进价"
                          label="工厂进价"
                          placeholder="工厂进价"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>
                    <van-field
                      v-model="item.profitrate"
                      :readonly="orderReadOnly"
                      name="毛利率%"
                      label="毛利率%"
                      label-width="128"
                      placeholder="毛利率%"
                    />
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.ml"
                          :readonly="orderReadOnly"
                          name="毛利"
                          label-width="128"
                          label="毛利"
                          placeholder="毛利"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.tax"
                          readonly
                          label-width="128"
                          name="所得税15%"
                          label="所得税15%"
                          placeholder="所得税15%"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.jl"
                          readonly
                          name="净利"
                          label-width="128"
                          label="净利"
                          placeholder="净利"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-field
                      v-model="item.jll"
                      readonly
                      label-width="128"
                      name="净利率%"
                      label="净利率%"
                      placeholder="净利率%"
                    />
                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.yj"
                          :readonly="orderReadOnly"
                          label="客户佣金原币"
                          placeholder="客户佣金原币"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.yjrmb"
                          readonly
                          label-width="128"
                          name="客户佣金"
                          label="客户佣金"
                          placeholder="客户佣金"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.yf"
                          readonly
                          name="sapPrice"
                          label-width="128"
                          label="出口运费原币"
                          placeholder="出口运费原币"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.yfrmb"
                          readonly
                          label-width="128"
                          name="出口运费"
                          label="出口运费"
                          placeholder="出口运费"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.bxf"
                          readonly
                          name="sapPrice"
                          label="出口保险费原币"
                          placeholder="出口保险费原币"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.bxfrmb"
                          readonly
                          label-width="128"
                          name="出口保险费"
                          label="出口保险费"
                          placeholder="出口保险费"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.qtwb"
                          :readonly="orderReadOnly"
                          name="qtwb"
                          label-width="128"
                          label="其他外币费用原币"
                          placeholder="其他外币费用原币"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">{{ formData.currencyCode }}</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.qtwbrmb"
                          readonly
                          label-width="128"
                          name="其他外币费用人民币"
                          label="其他外币费用"
                          placeholder="其他外币费用人民币"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.jcf"
                          :readonly="orderReadOnly"
                          name="sapPrice"
                          label-width="128"
                          label="检测费"
                          placeholder="检测费"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.djz"
                          readonly
                          label-width="128"
                          name="登记证"
                          label="登记证"
                          placeholder="登记证"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.zxf"
                          :readonly="orderReadOnly"
                          label-width="128"
                          name="sapPrice"
                          label="装卸费"
                          placeholder="装卸费"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.bzf"
                          readonly
                          label-width="128"
                          name="包装费"
                          label="包装费"
                          placeholder="包装费"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.gzf"
                          :readonly="orderReadOnly"
                          name="港杂费"
                          label-width="128"
                          label="港杂费"
                          placeholder="港杂费"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-field
                      v-model="item.lxll"
                      readonly
                      label-width="128"
                      name="资金利率(%)"
                      label="资金利率(%)"
                      placeholder="资金利率(%)"
                    />

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.lxlx"
                          readonly
                          label-width="128"
                          name="资金利息"
                          label="资金利息"
                          placeholder="资金利息"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.qt"
                          readonly
                          label-width="128"
                          name="其他费用"
                          label="其他费用"
                          placeholder="其他费用"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-field
                      v-model="item.dtra"
                      :readonly="orderReadOnly"
                      name="退税率%"
                      label="退税率%"
                      label-width="128"
                      placeholder="退税率%"
                    />

                    <van-row>
                      <van-col span="18">
                        <van-field
                          v-model="item.ts"
                          readonly
                          label-width="128"
                          name="退税"
                          label="退税"
                        />
                      </van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-field
                      v-model="item.sapunit"
                      readonly
                      label-width="128"
                      name="sapunit"
                      label="SAP计量单位"
                    />
                    <van-field
                      v-model="item.sapunitrate"
                      readonly
                      label-width="128"
                      name="SAP转换比"
                      label="SAP转换比"
                    />

                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="128"
                          v-model="item.sapprice"
                          readonly
                          name="SAP销售单价"
                          label="SAP销售单价"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>

                    <van-field
                      v-model="item.sapqtty"
                      :readonly="orderReadOnly"
                      label-width="128"
                      type="number"
                      name="sapQtty"
                      label="SAP销售数量"
                    />
                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="130"
                          v-model="item.sapunitstdcost"
                          readonly
                          name="SAP结算价"
                          label="SAP结算价"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">CNY</div>
                      </van-col>
                    </van-row>
                  </van-form>
                </van-collapse-item>
                <!-- <div class="empty"></div> -->
              </div>
            </Scroll>
          </van-collapse>
        </div>
        <!-- </Scroll> -->
      </van-tab>

      <van-tab title="联系信息">
        <!-- 对方、我方的联系信息   、 销售合同条款 @change="changeContact"-->
        <div class="detail_item">
          <van-collapse
            accordion
            v-model="contactInfoActiveIndex"
            @change="collapseChange"
          >
            <Scroll
              class="wrappers-contact wrappers"
              wrapper="contactRef"
              ref="contact"
            >
              <div>
                <van-collapse-item
                  v-for="(item, index) in computedContactItems"
                  :key="index"
                  :name="index"
                  :ref="`contactInfoItem` + index"
                  :title="contactInfoText[item.controla.trim()].title"
                >
                  <van-form>
                    <van-field
                      label-width="68"
                      v-model="item.coName"
                      :readonly="orderReadOnly"
                      name="公司名称"
                      :label="contactInfoText[item.controla.trim()].copName"
                      type="textarea"
                      autosize
                      rows="1"
                    />
                    <van-field
                      label-width="68"
                      v-model="item.coAddr"
                      :readonly="orderReadOnly"
                      name="地址"
                      label="地址"
                      type="textarea"
                      autosize
                      rows="1"
                    />
                    <van-field
                      v-show="item.controla.trim() === 'C'"
                      label-width="68"
                      v-model="item.country"
                      :readonly="orderReadOnly"
                      name="国家"
                      label="国家"
                    />
                    <van-field
                      v-show="item.controla.trim() === 'C'"
                      label-width="68"
                      v-model="item.contact"
                      :readonly="orderReadOnly"
                      name="联系人"
                      label="联系人"
                    />
                    <van-field
                      v-show="item.controla.trim() === 'C'"
                      label-width="68"
                      v-model="item.phone"
                      :readonly="orderReadOnly"
                      name="电话"
                      label="电话"
                    />
                    <van-field
                      v-show="item.controla.trim() === 'C'"
                      label-width="68"
                      v-model="item.fax"
                      :readonly="orderReadOnly"
                      name="传真"
                      label="传真"
                    />

                    <van-field
                      v-show="item.controla.trim() !== 'C'"
                      label-width="68"
                      v-model="item.title"
                      :readonly="orderReadOnly"
                      name="信用代码"
                      label="信用代码"
                    />
                    <van-field
                      v-show="item.controla.trim() !== 'C'"
                      label-width="68"
                      type="textarea"
                      autosize
                      rows="1"
                      v-model="item.bankname"
                      :readonly="orderReadOnly"
                      name="收款银行"
                      label="收款银行"
                    />
                    <van-field
                      v-show="item.controla.trim() !== 'C'"
                      label-width="68"
                      type="textarea"
                      autosize
                      rows="1"
                      v-model="item.bankaddr"
                      :readonly="orderReadOnly"
                      name="银行地址"
                      label="银行地址"
                    />
                    <van-field
                      v-show="item.controla.trim() !== 'C'"
                      label-width="68"
                      v-model="item.accountno"
                      :readonly="orderReadOnly"
                      name="收款账号"
                      label="收款账号"
                    />
                    <van-field
                      v-show="item.controla.trim() !== 'C'"
                      label-width="68"
                      v-model="item.swift"
                      :readonly="orderReadOnly"
                      name="SWIFT"
                      label="SWIFT"
                    />
                  </van-form>
                </van-collapse-item>
              </div>
            </Scroll>
          </van-collapse>
        </div>
      </van-tab>
      <van-tab title="附件">
        <Scroll class="wrappers-file wrappers" wrapper="fileRef" ref="file">
          <div>
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
import { detail } from "@/api/erp.orders.js";
import { listOaStatus } from "@/api/erp.oa.js";
import { genarateDocNo } from "@/api/erp.docno.js";
import { upload, down } from "@/api/erp.file.js";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";
import { filterDict } from "@/utils/dict.js";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";

import fieldFormData from "./cloumn";

export default {
  name: "InlandSaleDetail",
  components: {
    NavBar,
    Scroll,
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
      objectNo: "SM07",
      orderSId: null,
      tileName: "转口合同详情",
      docentry: null,
      //isNotAddStatus: true,
      formData: fieldFormData().formData,
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
      oaStatusArr: [],
      genarareForm: {
        objectNo: "SM07",
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
      contactInfoActiveIndex: 0,
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
      contactInfoText: {
        A: {
          title: "内部往来公司",
          copName: "内部公司",
        },
        B: {
          title: "我方联系信息",
          copName: "公司名称",
        },
        C: {
          title: "客户联系信息",
          copName: "客户名称",
        },
      },
    };
  },
  created() {
    document.title = this.$route.matched[0].meta.name;
    provide("title", this.tileName);
    this.orderSId = this.$route.query.orderSId;

    getOrgList().then((res) => {
      this.orgList.push(...res);
    });

    // getTredeType().then((res) => {
    //   this.tredeTypeList.push(...res);
    // });

    // getSaleType().then((res) => {
    //   this.saleTypeList.push(...res);
    // });
    // getRecType().then((res) => {
    //   this.recTypeList.push(...res);
    // });
    // getRecMethod().then((res) => {
    //   this.recMethodList.push(...res);
    // });
    // getCurrencyCode().then((res) => {
    //   this.currencyCodeList.push(...res);
    // });
    this.loadDetail();
  },
  mounted() {
    this.setBtnStatus();
  },
  methods: {
    collapseChange1(name) {
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
      else if(title === 2) {
        this.$nextTick(_ => {
          this.$refs.contact.refresh();
        })
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

    /// 弹窗中用户选择了某一个往来单位
    selectVendorItem(item) {
      this.showVendorSelect = false;
      this.formData.vendorName = item.coNameC;
      this.formData.vendorNo = item.vendorNo1;
      this.formData.orgNo = item.orgNo;
      // this.infoForm.orgNo = this.rowVendor.parentOrgNo;
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

    //// 时间字段 点击了
    dateTimeFieldClick(item) {
      if (this.orderReadOnly) {
        Notify({ type: "warning", message: "当前单据是只读状态,不可编辑!" });
        return;
      }
      this.activeFormFiled = item;
      this.selectTimeShow = true;
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

    // 获取OA 审批数据
    loadOaStatus() {
      let orderSId = this.formData.orderSId;
      let orgNo = this.formData.orgNo;
      listOaStatus("SM07", orderSId, orgNo)
        .then((res) => {
          this.oaStatusArr = res.data.reverse();
        })
        .catch((res) => {});
    },
    ///重新加载所有的数据
    loadDetail() {
      detail({ orderSId: this.orderSId })
        .then((res) => {
          this.formData = res.data;
          this.formData.auditStatusName = filterDict(
            this.formData.auditStatus,
            "auditStatus"
          );
          this.fileItems = this.formData.fileItems;
          this.oldFormData = JSON.parse(JSON.stringify(this.formData));
          this.loadOaStatus();
        })
        .catch((res) => {
          Notify({ type: "danger", message: res });
        });
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

    mainBtnClickPDFView() {
      let name ='';
      if(this.formData.orgCono==='0201'){
        name ='d_sm07_jxhh'
      }else{
        name ='d_sm07_jxhh_other'
      }
      let query = {
        keyValue: this.formData.orderSId,
        keyName: "orderSId",
        moduleName: name,
      };
      this.$router.push({
        path: "/pdforder",
        query,
      });
    },

    downFileItem(index) {
      if (this.formData.fileItems[index].objId) {
        let pkid = this.formData.fileItems[index].pkId;
        this.$router.push({
          path: "/pdf",
          query: { pkId: pkid },
        });
      } else {
        Notify({ type: "warn", message: "当前附件尚未保存,无法预览!" });
      }
    },
  },

  computed: {
    tbfee: function () {
      if (this.formData.tbrate && this.formData.tbamount) {
        let tbf = Number(this.formData.tbrate) * 0.01 * this.formData.tbamount;
        tbf !== 0 && (tbf = tbf.toFixed(2));
        return tbf;
      } else {
        return "";
      }
    },
    computedContactItems: function () {
      return this.formData.contactItems.filter(function (item) {
        return (
          item.controla.trim() === "A" ||
          item.controla.trim() === "B" ||
          item.controla.trim() === "C"
        );
      });
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
      let orgCono = this.formData.orgCono;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgName;
        }
      }
      return "";
    },

    // 计算内部往来
    computedControlc: function () {
      let controlc = this.formData.controlc;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === controlc) {
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

    ///// 计算销售类型
    computedSaleType: function () {
      let saleType = this.formData.refNoTitle3;
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
  height: calc(100vh - 57.93px);
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
.wrappers-main {
  height: calc(100vh - 135.43px);
}
.wrappers-contact {
  height: calc(100vh - 195.43px);
}
.wrappers-goods-detail {
  height: calc(100vh - 130.93px);
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
.rmb_tip {
  height: 100%;

  color: #afafaf;
  font-size: 13px;
  text-align: center;
  padding-top: 12px;
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
  background-color: #ffffff;
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
