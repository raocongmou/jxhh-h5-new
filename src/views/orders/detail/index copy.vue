<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />

    <Scroll class="wrapper">
      <van-tabs v-model:active="tabActive" class="magin-top:20px">
        <van-tab title="主表信息">
          <!-- <Scroll
          class="wrapper"
          :pullup="pullup"
          :elementChangeFlag="elementChangeFlag"
        > -->
          <van-form @submit="onSubmit">
            <van-field
              v-model="computedOrgCo"
              name="平台公司"
              label="平台公司"
              label-width="68"
              readonly
              required
              placeholder="平台公司"
            />
            <!-- 销售合同号、版本 -->
            <van-row>
              <van-col span="16">
                
              </van-col>
              <van-col span="8">
                <van-field
                  v-model="formData.docVersion"
                  readonly
                  required
                  label-width="40"
                  name="版本"
                  label="版本"
                  placeholder="版本"
                />
              </van-col>
            </van-row>
            <!-- 客户名称 -->
            <van-row>
              <van-col span="24">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.coNameE"
                  name="客户名称"
                  label="客户名称"
                  readonly
                />
              </van-col>
            </van-row>
            <van-field
              v-model="custRefNo"
              name="客户合同号"
              label="客户合同号"
              label-width="88"
              readonly
              required
              placeholder="客户合同号"
            />

            <!-- 部门、业务员 -->
            <van-row>
              <van-col span="10">
                <van-field
                  readonly
                  v-model="formData.orgName"
                  label-width="35"
                  name="部门"
                  label="部门"
                  required
                  placeholder="部门"
              /></van-col>

              <van-col span="14">
                <van-field
                  readonly
                  required
                  label-width="51"
                  v-model="formData.employeeName"
                  name="业务员"
                  label="业务员"
                  placeholder="业务员"
                />
              </van-col>
            </van-row>

            <!-- 币种、金额-->
            <van-row>
              <van-col span="10">
                <van-field
                  required
                  readonly
                  label-width="34"
                  v-model="formData.currencyCode"
                  name="币种"
                  label="币种"
                  placeholder=""
              /></van-col>
              <van-col span="14">
                <van-field
                  required
                  label-width="68"
                  v-model="formData.totalPriceA"
                  name="原币金额"
                  label="原币金额"
                  readonly
                  placeholder="0.00"
                />
              </van-col>
            </van-row>
            <!-- 合同数量、SAP状态 :formatter="formatterAmount"-->
            <van-row>
              <van-col span="12"
                ></van-col>
              <van-col span="12">
               </van-col>
            </van-row>
            <!-- 开票数量、出库数量-->
            <van-row>
              <van-col span="12">
               
              </van-col>

              <van-col span="12">
                
              </van-col>
            </van-row>
            <!-- 收款情况、收款金额-->
            <van-row>
              <van-col span="12">
               
              </van-col>
              <van-col span="12">
              
              </van-col>
            </van-row>
            <!-- 审批状态、执行状态-->
            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.auditStatusName"
                  readonly
                  label-width="68"
                  name="审批状态"
                  label="审批状态"
                  placeholder="审批状态"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model="formData.isStatus"
                  readonly
                  name="执行状态"
                  label="执行状态"
                  label-width="68"
                />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.countryName"
                  readonly
                  label-width="68"
                  name="运抵国"
                  label="运抵国"
                  placeholder="运抵国"
                />
              </van-col>
              <van-col span="12">
               
              </van-col>
            </van-row>

            <van-field
              v-model="formData.orderDate"
              name="制单日期"
              label="制单日期"
              readonly
            />
            <van-field
              v-model="formData.rcvOrdDate"
              name="收到日期"
              label="收到日期"
              readonly
            />
            <van-field
              v-model="formData.priceValidTill"
              name="有效日期"
              label="有效日期"
              readonly
            />

            <van-field
              v-model="formData.refNoTitle2"
              name="账期"
              label="账期"
              readonly
            />

            <van-row>
              <van-col span="12">
                <van-field
                  v-model="formData.signDate"
                  readonly
                  label-width="68"
                  name="签约时间"
                  label="签约时间"
                  placeholder="签约时间"
                />
              </van-col>
              <van-col span="12">
              
              </van-col>
            </van-row>

            <!-- 对方、我方的联系信息   、 销售合同条款 @change="changeContact"-->
            <van-collapse accordion v-model="contactInfoActiveIndex">
              <van-collapse-item key="3" name="3" title="销售合同条款基本信息">
                <!-- <van-form>
                  <van-field
                    label="运输方式及到达站（港）和费用负担:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.transAndFee"
                    :readonly="orderReadOnly"
                  ></van-field>
                  <van-field
                    label="包装标准、包装物的供应和回收:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.packageDesc"
                    :readonly="orderReadOnly"
                  ></van-field>
                  <van-field
                    label="交(提)货方式、时间及地点:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.delivery"
                    :readonly="orderReadOnly"
                  ></van-field>
                  <van-field
                    label="特殊条款:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.specs"
                    :readonly="orderReadOnly"
                  ></van-field>
                  <van-field
                    label="其他约定事项:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.others"
                    :readonly="orderReadOnly"
                  ></van-field>
                  <van-field
                    label="质量技术标准:"
                    readonly
                    label-width="480px"
                  ></van-field>
                  <van-field
                    type="textarea"
                    v-model="formData.cfmComment"
                    :readonly="orderReadOnly"
                  ></van-field>
                </van-form> -->
              </van-collapse-item>
              <!-- <van-collapse-item
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
                    <van-col span="12">
                      <van-field
                        v-model="item.deptName"
                        :readonly="orderReadOnly"
                        name="部门"
                        label="部门"
                        placeholder="部门"
                    /></van-col>
                    <van-col span="12">
                      <van-field
                        label-width="65"
                        v-model="item.contact"
                        :readonly="orderReadOnly"
                        name="联系人"
                        label="联系人"
                        placeholder="联系人"
                    /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="45"
                        v-model="item.phone"
                        :readonly="orderReadOnly"
                        name="电话"
                        label="电话"
                        placeholder="电话"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        label-width="65"
                        v-model="item.title"
                        :readonly="orderReadOnly"
                        name="职务"
                        label="职务"
                        placeholder="职务"
                    /></van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="45"
                        v-model="item.state"
                        :readonly="orderReadOnly"
                        name="省"
                        label="省"
                        placeholder="省"
                    /></van-col>
                    <van-col span="12">
                      <van-field
                        label-width="45"
                        v-model="item.city"
                        :readonly="orderReadOnly"
                        name="市"
                        label="市"
                        placeholder="市"
                    /></van-col>
                  </van-row>
                  <van-field
                    label-width="65"
                    v-model="item.zipCode"
                    :readonly="orderReadOnly"
                    name="邮政编码"
                    label="邮政编码"
                    placeholder="邮政编码"
                  />
                  <van-field
                    label-width="45"
                    v-model="item.addr"
                    :readonly="orderReadOnly"
                    type="textarea"
                    name="地址"
                    label="地址"
                    placeholder="地址"
                  />
                  <van-field
                    label-width="65"
                    v-model="item.email"
                    :readonly="orderReadOnly"
                    name="E-mail"
                    label="E-mail"
                    placeholder="E-mail"
                  />
                  <van-field
                    label-width="45"
                    v-model="item.fax"
                    :readonly="orderReadOnly"
                    name="传真"
                    label="传真"
                    placeholder="传真"
                  />
                </van-form>
              </van-collapse-item> -->
            </van-collapse>

            <div v-show="divEmpty" class="empty"></div>
          </van-form>
          <!-- </Scroll> -->
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
                    label-width="34"
                    v-model="item.contral"
                    readonly
                    name="序号"
                    label="序号"
                    placeholder="序号"
                  />

                  <van-row>
                    <van-col span="14">
                      <van-field
                        label-width="68"
                        v-model="item.pdtno1"
                        readonly
                        name="商品编号"
                        label="商品编号"
                        placeholder="商品编号"
                      />
                    </van-col>
                    <van-col span="10">
                      <van-field
                        label-width="68"
                        v-model="item.hl"
                        name="含量(%)"
                        label="含量(%)"
                        placeholder="含量(%)"
                      />
                    </van-col>
                  </van-row>

                  <van-field
                    label-width="68"
                    v-model="item.pdtnamee"
                    readonly
                    input-align="right"
                    name="英文品名"
                    label="英文品名"
                  />

                  <van-field
                    label-width="68"
                    v-model="item.specificatione"
                    readonly
                    name="规格型号"
                    input-align="right"
                    label="规格型号"
                    placeholder="规格型号"
                  />

                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="68"
                        v-model="item.quantity"
                        type="number"
                        :readonly="orderReadOnly"
                        name="销售数量"
                        label="销售数量"
                        input-align="right"
                        placeholder="销售数量"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        label-width="34"
                        v-model="item.uom"
                        readonly
                        name="单位"
                        input-align="right"
                        label="单位"
                        placeholder="单位"
                      />
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="12">
                      <van-field
                        label-width="68"
                        v-model="item.unitprice"
                        :readonly="orderReadOnly"
                        input-align="right"
                        name="销售单价"
                        label="销售单价"
                        placeholder="销售单价"
                      />
                    </van-col>
                    <van-col span="12">
                      <van-field
                        label-width="68"
                        v-model="item.subprice"
                        :readonly="orderReadOnly"
                        input-align="right"
                        name="销售金额"
                        label="销售金额"
                        placeholder="销售金额"
                      />
                    </van-col>
                  </van-row>
                 

                  <van-row>
                    <van-col span="10">
                     </van-col>
                    <van-col span="14">
                    </van-col>
                  </van-row>
                  <van-row>
                    <van-col span="24">
                      <van-field
                        v-model="item.unitstdprice"
                        readonly
                        label-width="150"
                        input-align="right"
                        name="结算价(原币)"
                        label="结算价(原币)"
                        placeholder="结算价(原币)"
                    /></van-col>
                  </van-row>
                
                  <van-row>
                    <van-col span="12">
                    </van-col>
                    <van-col span="12">
                   </van-col>
                  </van-row>
                  <van-row>
                    <van-col span="12">
                     </van-col>
                    <van-col span="12">
                     </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="14">
                     </van-col>
                    <van-col span="10">
                      <van-field
                        v-model="item.sapunit"
                        readonly
                        label-width="34"
                        name="sapunit"
                        label="单位"
                    /></van-col>
                  </van-row>

                 
             
                 
                  <van-row>
                    <van-col span="24">
                      </van-col>
                    <van-col span="24">
                    </van-col>
                    <van-col span="24">
                      </van-col>
                    <van-col span="24">
                     </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                     </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                      </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
                    </van-col>
                    <van-col span="24">
                     </van-col>
                    <van-col span="24">
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

        <van-tab title="基本信息">
          <!-- 商品明细 -->
          <van-collapse v-model="feeAmountActiveIndex" accordion>
            <van-collapse-item an-collapse-item title="付款信息">
              <van-form>
                <van-field
                  label="价格条款"
                  input-align="right"
                  v-model="formData.dlvTerm"
                  readonly
                ></van-field>
                <van-field
                  label="价格口岸"
                  input-align="right"
                  v-model="formData.dlvPort"
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
                  label="采购金额"
                  input-align="right"
                  v-model="formData.poAmount"
                  readonly
                ></van-field>
                <van-field
                  label="融资状态"
                  input-align="right"
                  v-model="formData.status1"
                  readonly
                ></van-field>
                <van-field
                  label="预付款支付时间"
                  label-width="110"
                  input-align="right"
                  v-model="formData.prepayDate"
                  readonly
                ></van-field>
                <van-field
                  label="预付款支付比例"
                  label-width="110"
                  input-align="right"
                  v-model="formData.preProportion"
                  readonly
                ></van-field>
                <van-field
                  label="预付款金额"
                  v-model="formData.preSum"
                  readonly
                  input-align="right"
                  label-width="88"
                ></van-field>
                <van-field
                  label="付款方式说明"
                  v-model="formData.creditCom"
                  readonly
                  type="texearea"
                  input-align="right"
                  label-width="88"
                ></van-field> </van-form
            ></van-collapse-item>
            <van-collapse-item an-collapse-item title="装运信息">
              <van-form>
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
                  label="海运方式"
                  input-align="right"
                  v-model="formData.trnsMthd"
                  readonly
                ></van-field>
                <van-field
                  label="货物最迟装船时间"
                  input-align="right"
                  v-model="formData.lastShipDate"
                  readonly
                ></van-field>
                <van-field
                  label="货物装船时间"
                  input-align="right"
                  v-model="formData.lastShipC"
                  readonly
                ></van-field>
                <van-field
                  label="溢短装"
                  input-align="right"
                  v-model="formData.shortage"
                  readonly
                ></van-field>
                <van-field
                  label="转运"
                  label-width="110"
                  input-align="right"
                  v-model="formData.transhipment"
                  readonly
                ></van-field>
                <van-field
                  label="分批"
                  label-width="110"
                  input-align="right"
                  v-model="formData.partialshipment"
                  readonly
                ></van-field>
                <van-field
                  label="运出港口最大时间"
                  v-model="formData.leadTime"
                  readonly
                  input-align="right"
                  label-width="88"
                ></van-field>
                <van-field
                  label="目的港免费滞留天数"
                  v-model="formData.freedays"
                  readonly
                  input-align="right"
                  label-width="88"
                ></van-field>
                <van-field
                  label="付款方式说明"
                  v-model="formData.creditCom"
                  readonly
                  type="texearea"
                  input-align="right"
                  label-width="88"
                ></van-field>
              </van-form>
            </van-collapse-item>
            <van-collapse-item an-collapse-item title="信用证信息">
              <van-form>
                <van-field
                  label="信用证类型"
                  input-align="right"
                  v-model="formData.creditType"
                  readonly
                ></van-field>
                <van-field
                  label="最迟开证日期"
                  input-align="right"
                  v-model="formData.issueDate"
                  readonly
                ></van-field>
                <van-field
                  label="信用证付款比例"
                  input-align="right"
                  v-model="formData.lcproportion"
                  readonly
                ></van-field>
                <van-field
                  label="信用证预付款金额"
                  input-align="right"
                  v-model="formData.lcamount"
                  readonly
                ></van-field>
                <van-field
                  label="允许转让"
                  input-align="right"
                  v-model="formData.transferable"
                  readonly
                ></van-field>
                <van-field
                  label="信用保兑"
                  input-align="right"
                  v-model="formData.confirmcredit"
                  readonly
                ></van-field>
              </van-form>
            </van-collapse-item>
            <van-collapse-item an-collapse-item title="佣金和折扣">
              <van-form>
                <van-field
                  label="佣金类型"
                  input-align="right"
                  v-model="formData.cmmsnSign1"
                  readonly
                ></van-field>
                <van-field
                  label="比率"
                  input-align="right"
                  v-model="formData.commision1"
                  readonly
                ></van-field>
                <van-field
                  label="金额"
                  input-align="right"
                  v-model="formData.commAmount1"
                  readonly
                ></van-field>
                <van-field
                  label="佣金描述"
                  input-align="right"
                  v-model="formData.cmmsman1"
                  readonly
                ></van-field>
                <van-field
                  label="佣金类型"
                  input-align="right"
                  v-model="formData.cmmsnSign2"
                  readonly
                ></van-field>
                <van-field
                  label="比率"
                  input-align="right"
                  v-model="formData.commision2"
                  readonly
                ></van-field>
                <van-field
                  label="金额"
                  input-align="right"
                  v-model="formData.commAmount2"
                  readonly
                ></van-field>
                <van-field
                  label="佣金描述"
                  input-align="right"
                  v-model="formData.cmmsman2"
                  readonly
                ></van-field>

                <van-field
                  label="折扣比例"
                  input-align="right"
                  v-model="formData.discountRate"
                  readonly
                ></van-field>
                <van-field
                  label="折扣金额"
                  input-align="right"
                  v-model="formData.discount1"
                  readonly
                ></van-field>
                <van-field
                  label="折扣描述"
                  input-align="right"
                  v-model="formData.discComm"
                  readonly
                ></van-field>
              </van-form>
            </van-collapse-item>
            <van-collapse-item an-collapse-item title="投保信息">
              <van-form>
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
                  v-model="formData.tbafee"
                  readonly
                ></van-field>
              </van-form>
            </van-collapse-item>
          </van-collapse>
        </van-tab>

        <van-tab title="附件"> </van-tab>
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

import {
  getTredeType,
  getSaleType,
  getRecType,
  getRecMethod,
  getCurrencyCode,
} from "@/utils/erp.base.data.js";

import fieldFormData from "./cloumn";

export default {
  name: "OrdersDetail",
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
      orderSId: null,
      formData: {},
      oldFormData: fieldFormData().formData,
      sendFomData: fieldFormData().formData,
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
    console.log("Create方法");
    document.title = this.$route.matched[0].meta.name;
    this.orderSId = this.$route.query.orderSId;

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
    if (this.orderSId && this.orderSId > 0) {
      this.loadDetail();
    }
  },

  setup() {
    console.log("生命周期【 setup 】");
    provide("title", "出口合同详情");
  },
  mounted() {
    // 刷新的时候 会进入进入这个生命周期
    console.log("生命周期【 mounted 】");
  },
  updated() {},
  methods: {
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
      detail({ orderSId: this.orderSId }).then((res) => {
        this.formData = res.data;
        this.fileItems = this.formData.fileItems;
        this.oldFormData = JSON.parse(JSON.stringify(this.formData));
      });
    },
  },

  computed: {
    ///// 计算平台名称
    computedOrgCo: function () {
      let orgCono = this.formData.orgCono;
      for (var i = 0; i < this.orgList.length; i++) {
        if (this.orgList[i].orgNo === orgCono) {
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
</style>
