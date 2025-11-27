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
              readonly
              required
              input-align="right"
              placeholder="平台公司"
            />
            <van-field
              v-model="computedControlc"
              name="内部往来"
              label="内部往来"
              input-align="right"
              readonly
              required
              placeholder="内部往来"
            />
            <van-field
              v-model="formData.orderNo"
              readonly
              required
              input-align="right"
              name="出口定单"
              label="出口定单"
              placeholder="出口定单"
            />
            <van-field
              v-model="formData.orderDate"
              name="制单日期"
              label="制单日期"
              required
              input-align="right"
              readonly
            />
            <van-field
              readonly
              v-model="formData.orgName"
              input-align="right"
              name="部门"
              label="部门"
              required
              placeholder="部门"
            />
            <van-field
              readonly
              required
              input-align="right"
              v-model="formData.employeeName"
              name="业务员"
              label="业务员"
              placeholder="业务员"
            />
            <van-field
              required
              input-align="right"
              v-model="formData.coNameE"
              name="客户名称"
              label="客户名称"
              readonly
            />
            <van-field
              v-model="formData.auditStatusName"
              readonly
              required
              input-align="right"
              name="审批状态"
              label="审批状态"
              placeholder="审批状态"
            />
            <van-field
              v-model="formData.orderType"
              readonly
              required
              name="贸易方式"
              label="贸易方式"
              input-align="right"
            />
            <van-field
              v-model="formData.refNoTitle1"
              readonly
              required
              name="合同类型"
              label="合同类型"
              input-align="right"
            />
            <van-field
              v-model="formData.signDate"
              readonly
              required
              input-align="right"
              name="签约时间"
              label="签约时间"
              placeholder="签约时间"
            />
            <van-field
              v-model="formData.signSite"
              readonly
              required
              name="签约地"
              label="签约地"
              input-align="right"
            />
            <van-field
              required
              readonly
              input-align="right"
              v-model="formData.currencyCode"
              name="币种"
              label="币种"
              placeholder=""
            />
            <van-field
              v-model="formData.totalPrice"
              input-align="right"
              readonly
              required
              name="定单金额"
              label="定单金额"
              placeholder="定单金额"
            />
            <van-field
              input-align="right"
              v-model="formData.exchRate"
              name="USD折原币汇率"
              label="USD折原币汇率"
              readonly
              required
            />
            <van-field
              input-align="right"
              v-model="formData.totalPriceA"
              name="美元金额"
              label="美元金额"
              readonly
              required
            />
            <van-field
              input-align="right"
              v-model="formData.exchangerate"
              name="原币折RMB汇率"
              label="原币折RMB汇率"
              readonly
              required
            />
            <van-field
              input-align="right"
              v-model="formData.rmbTotalPrice"
              readonly
              required
              name="人民币金额"
              label="人民币金额"
            />
            <van-field
              v-model="formData.refNoTitle3"
              readonly
              required
              input-align="right"
              name="销售类型"
              label="销售类型"
              placeholder="销售类型"
            />
            <van-field
              v-model="formData.countryName"
              readonly
              input-align="right"
              name="运抵国"
              label="运抵国"
              placeholder="运抵国"
            />
            <van-field
              v-model="formData.refNoTitle2"
              name="账期"
              label="账期"
              input-align="right" 
              readonly
            />
            <van-field
              label="付款方式说明"
              v-model="formData.creditCom"
              readonly
              required
              type="texearea"
              input-align="right"
              label-width="88"
            ></van-field>
            <van-field
              label="价格条款"
              input-align="right"
              v-model="formData.dlvTerm"
              readonly
            ></van-field>
            <van-field
              label="付款方式"
              input-align="right"
              v-model="formData.payTerm"
              readonly
            ></van-field>
            <van-field
              label="付款期限"
              input-align="right"
              v-model="formData.expectDays"
              readonly
            ></van-field>
            <van-field
              label="融资状态"
              input-align="right"
              v-model="formData.status1"
              readonly
            ></van-field>
            <van-field
              label="装运港"
              input-align="right"
              v-model="formData.portShipping"
              readonly
            ></van-field>
            <van-field
              label="目的港"
              input-align="right"
              v-model="formData.portDesignation"
              readonly
            ></van-field>
            <van-field
              label="运输方式"
              input-align="right"
              v-model="formData.shipVia"
              readonly
            ></van-field>
            <van-field
              label="是否账款保险"
              input-align="right"
              v-model="formData.isInsur"
              readonly
            ></van-field>
            <van-field
              label="投保公司"
              input-align="right"
              v-model="formData.tbcom"
              readonly
            ></van-field>
            <van-field
              label="投保比例%"
              input-align="right"
              v-model="formData.tbjc"
              readonly
            ></van-field>
            <van-field
              label="投保费率(%)"
              input-align="right"
              v-model="formData.tbrate"
              readonly
            ></van-field>
            <van-field
              label="投保金额(CNY)"
              input-align="right"
              v-model="formData.tbamount"
              readonly
            ></van-field>
            <van-field
              label="投保费(CNY)"
              input-align="right"
              v-model="tbfee"
              readonly
            ></van-field>
            <div v-show="divEmpty" class="empty"></div>
          </van-form>
        </van-tab>
        <van-tab title="商品信息">
          <div class="detail_item">
            <!-- 商品明细 -->
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in formData.items"
                :key="index"
                :name="index"
                :title="item.pdtnamee"
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
                    <van-row>
                      <van-col span="18">
                        <van-field
                          label-width="130"
                          v-model="item.unitstdprice"
                          readonly
                          name="结算价原币"
                          label="结算价原币"
                      /></van-col>
                      <van-col span="6">
                        <div class="rmb_tip">USD</div>
                      </van-col>
                    </van-row>
                  </van-form>
              </van-collapse-item>
            </van-collapse>
            <!-- </div>
        </ScrollFirst> -->
          </div>
        </van-tab>
        <!-- </ScrollFirst> -->
        <van-tab title="联系信息">
        <van-collapse
          accordion
          v-model="contactInfoActiveIndex"
          @change="collapseChange"
        >
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
                v-model="item.email"
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
        </van-collapse>
      </van-tab>
      <van-tab title="附件">
        <div v-for="(item, index) in formData.fileItems" :key="index" class="fileFromClass">
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
                  v-if="item.type ==='PDF'"
                  type="success"
                  round
                  color="#1fa2e8"
                  text="预览附件"
                  @click="downFileItem(index)"
                />
                <!-- <van-button
                  type="error"
                  round
                  color="#e85452"
                  text="删除"
                  @click="deleteFileItem(index)"
                /> -->
              </div>
            </van-row>
          </van-form>
        </div>
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
    </Scroll>
    <!-- </Scroll> -->
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
    <!-- 侧滑窗口 选择 业务员-->
    <van-popup
      v-model:show="showEmploeeySelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpEmployeeSelect v-on="{ selectEmployeeItem: selectEmployeeItem }" />
    </van-popup>
    <!-- 侧滑窗口，选择明细的商品 -->
    <van-popup
      v-model:show="showItemPdtSelect"
      position="right"
      :style="{ height: '80%', width: '80%' }"
    >
      <ErpProductSelect
        :orgNo="orgNo"
        v-on="{ selectItemProduct: selectItemProduct }"
      ></ErpProductSelect>
    </van-popup>

    <!-- 下滑弹窗 主要是一些配置项 -->
    <van-action-sheet
      ref="actionSheet"
      v-model:show="actionShow"
      :actions="actionItems"
      :click-overlay="onOver"
      @select="selectItemAction"
      :description="actionDesc"
      :close-on-click-overlay="overlay"
      cancel-text="取消"
    />
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
import { genarateDocNo } from "@/api/erp.docno.js";
import { getOrgList, getOrgInfo } from "@/utils/erp.org.js";
import { filterDict } from "@/utils/dict.js";
import { listOaStatus } from "@/api/erp.oa.js";

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";

import fieldFormData from "./cloumn";

export default {
  name: "OrdersZkDetail",
  components: {
    NavBar,
    Scroll,
    //ScrollFirst,
    ErpVendorSelect,
    ErpEmployeeSelect,
    ErpProductSelect,
    //ErpFile,
  },
  data() {
    return {
      contactInfoText: {
        'A': {
          title: '内部往来公司',
          copName: '内部公司'
        },
        'B': {
          title: '我方联系信息',
          copName: '公司名称'
        },
        'C': {
          title: '客户联系信息',
          copName: '客户名称'
        }
      },
      oaStatusArr: [],
      orderSId: null,
      formData: {},
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
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
    this.orderSId = this.$route.query.orderSId;
    getOrgList().then((res) => {
      this.orgList.push(...res);
    })
    getTredeType().then((res) => {
      this.tredeTypeList.push(...res);
    })
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
    if (this.orderSId && this.orderSId > 0) {
      this.loadDetail();
    }
  },

  setup() {
    provide("title", "转口销售合同详情");
  },
  updated() {},
  methods: {
    downFileItem(index) {
      if (this.formData.fileItems[index].objId) {
        let pkid = this.formData.fileItems[index].pkId;
        this.$router.push({
          path: "/pdf",
          query: { pkId: pkid },
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
      detail({ orderSId: this.orderSId }).then((res) => {
        this.formData = res.data;
        this.formData.auditStatusName = filterDict(
          this.formData.auditStatus,
          "auditStatus"
        );
        this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
        this.loadOaStatus()
      })
    },
  },
  computed: {
    tbfee: function () {
      if (this.formData.tbrate && this.formData.tbamount) {
        return Number(this.formData.tbrate) * 0.01 * this.formData.tbamount
      } else {
        return ''
      }
    },
    computedContactItems: function () {
      return this.formData.contactItems.filter(function (item) {
        return item.controla.trim() === "A" || item.controla.trim() === "B" || item.controla.trim() === "C";
      });
    },
    // 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCono;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
          return this.orgList[i].orgAbbrName;
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
      let tradType = this.formData.orderType;
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
.rmb_tip {
  height: 100%;
  color: #afafaf;
  font-size: 13px;
  text-align: center;
  padding-top: 12px;
}
</style>
