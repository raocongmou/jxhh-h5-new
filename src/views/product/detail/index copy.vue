<template>
  <div>
    <nav-bar v-on="{ setChangeNewOrgCo: setChangeNewOrgCo }" />
    <Scroll class="wrapper">
      <van-tabs v-model:active="tabActive" class="magin-top:20px">
        <van-tab title="商品资料">
          <van-form @submit="onSubmit">
            <!-- 销售合同号、版本 -->
            <van-row>
              <van-field
                v-model="infoForm.pdtNameC"
                label-class="lable-class"
                readonly
                label-width="85"
                name="品名(中文)"
                label="品名(中文):"
              />
            </van-row>

            <van-field
              v-model="infoForm.pdtNameE"
              label-class="lable-class"
              readonly
              label-width="85"
              name="品名(英文)"
              label="品名(英文):"
            />
            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.pdtNo1"
                  readonly
                  label-class="lable-class"
                  label-width="85"
                  name="商品编码"
                  label="商品编码:"
              /></van-col>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.pdtcodeC"
                  readonly
                  label-class="lable-class"
                  label-width="85"
                  name="海关编码"
                  label="海关编码:"
              /></van-col>
            </van-row>
            <van-field
              v-model="infoForm.specificationC"
              readonly
              label-class="lable-class"
              label-width="80"
              name="商品规格(中文)"
              label="商品规格(中文):"
            />

            <van-field
              v-model="infoForm.specificationE"
              readonly
              label-class="lable-class"
              label-width="80"
              name="商品规格(英文)"
              label="商品规格(英文):"
            />

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.uom"
                  readonly
                  label-width="85"
                  name="销售单位"
                  label="销售单位:"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.uom1"
                  readonly
                  label-width="85"
                  name="包装单位"
                  label="包装单位:"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.sapunit"
                  readonly
                  label-width="105"
                  name="SAP计量单位"
                  label="SAP计量单位:"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.sapunitRate"
                  readonly
                  label-width="85"
                  name="转换比"
                  label="转换比:"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.hl"
                  readonly
                  label-width="105"
                  name="含量"
                  label="含量:"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.impExp"
                  readonly
                  label-width="85"
                  name="采购标识"
                  label="采购标识:"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.atr"
                  readonly
                  label-width="105"
                  name="增值税税率"
                  label="增值税税率"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.dtra"
                  readonly
                  label-width="105"
                  name="增值税退税率"
                  label="增值税退税率"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.trc"
                  readonly
                  label-width="105"
                  name="消费税税率"
                  label="消费税税率:"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.dtrc"
                  readonly
                  label-width="105"
                  name="消费税退税率"
                  label="消费税退税率:"
                />
              </van-col>
            </van-row>

            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.trcst"
                  readonly
                  label-width="105"
                  name="关税税率"
                  label="关税税率:"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.othertaxrate"
                  readonly
                  label-width="85"
                  name="其它税率"
                  label="其它税率:"
                />
              </van-col>
            </van-row>
            <van-field
              v-model="infoForm.unitStdCost"
              label-class="lable-class"
              readonly
              label-width="85"
              name="国内采购价"
              label="国内采购价"
            />
            <van-row>
              <van-col span="12"
                ><van-field
                  v-model="infoForm.unitCostM"
                  readonly
                  label-width="105"
                  name="国内销售价"
                  label="国内销售价"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.unitStdPrice"
                  readonly
                  label-width="85"
                  name="国外销售价"
                  label="国外销售价"
                />
              </van-col>
            </van-row>

            <van-field
              v-model="infoForm.sbys"
              label-class="lable-class"
              readonly
              type="textarea"
              label-width="85"
              name="申报要素"
              label="申报要素"
            />
            <van-field
              v-model="infoForm.remark"
              label-class="lable-class"
              readonly
              type="textarea"
              label-width="50"
              name="备注"
              label="备注"
            />

            <van-field
              v-model="infoForm.licensclass"
              readonly
              name="登记证类型"
              label="登记证类型"
              label-class="lable-class"
              label-width="90"
            />
            <van-field
              v-model="infoForm.packColor"
              readonly
              name="证件名称"
              label="证件名称"
              label-class="lable-class"
              label-width="80"
            />
            <van-field
              v-model="infoForm.licensNo"
              readonly
              name="附加码"
              label="附加码"
              label-class="lable-class"
              label-width="80"
            />

            <van-field
              v-model="infoForm.fl1"
              label-class="lable-class"
              readonly
              label-width="85"
              name="第一级分类"
              label="第一级分类"
            />
            <van-field
              v-model="infoForm.fl1"
              label-class="lable-class"
              readonly
              label-width="85"
              name="第二级分类"
              label="第二级分类"
            />
            <van-field
              v-model="infoForm.fl1"
              label-class="lable-class"
              readonly
              label-width="85"
              name="第三级分类"
              label="第三级分类"
            />
            <van-field
              v-model="infoForm.fl1"
              label-class="lable-class"
              readonly
              label-width="85"
              name="第四级分类"
              label="第四级分类"
            />
            <van-field
              v-model="infoForm.fl1"
              label-class="lable-class"
              readonly
              label-width="85"
              name="第五级分类"
              label="第五级分类"
            />
          </van-form>

          <!-- </Scroll> -->
        </van-tab>

        <!-- <ScrollFirst class="wrapper1"> -->
        <van-tab title="包装信息&销售组织">
          <van-form @submit="onSubmit">
            <!-- 销售合同号、版本 -->
            <van-row>
              <van-field
                v-model="infoForm.pdtNameC"
                label-class="lable-class"
                readonly
                label-width="105"
                name="品名(中文)"
                label="品名(中文):"
              />
            </van-row>
            <van-field
              v-model="infoForm.amountPs1"
              readonly
              label-class="lable-class"
              label-width="105"
              name="20'GP装柜量"
              label="20'GP装柜量"
            />
            <van-field
              v-model="infoForm.amountPs2"
              readonly
              label-class="lable-class"
              label-width="105"
              name="40'GP装柜量"
              label="40'GP装柜量"
            />
            <van-field
              v-model="infoForm.amountPs3"
              readonly
              label-class="lable-class"
              label-width="105"
              name="40'HQ装柜量"
              label="40'HQ装柜量"
            />
            <van-row>
              <van-col span="12">
                <van-field
                  v-model="infoForm.amountflag"
                  readonly
                  name="默认装柜尺寸"
                  label="默认装柜尺寸"
                  label-class="lable-class"
                  label-width="110"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.amountPs"
                  readonly
                  name="装箱率"
                  label="装箱率"
                  label-class="lable-class"
                  label-width="80"
              /></van-col>
            </van-row>
            <van-field
              v-model="infoForm.descriptionC"
              readonly
              type="textarea"
              label-class="lable-class"
              label-width="80"
              name="商品说明(中文)"
              label="商品说明(中文)"
            />
            <van-field
              v-model="infoForm.descriptionE"
              readonly
              label-class="lable-class"
              label-width="80"
              type="textarea"
              name="商品说明(英文)"
              label="商品说明(英文)"
            />
            <van-field
              v-model="infoForm.colorC"
              readonly
              type="textarea"
              name="商品包装描述"
              label="商品包装描述"
              label-class="lable-class"
              label-width="105"
            />
            <van-row>
              <van-col span="9">
                <van-field
                  v-model="infoForm.length"
                  readonly
                  label-class="lable-class"
                  label-width="20"
                  input-align="right"
                  name="长"
                  label="长"
              /></van-col>

              <van-col span="3">
                <van-field
                  v-model="infoForm.measureUOM"
                  readonly
                  label-class="lable-class"
                  label-width="20"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.lengthRate"
                  readonly
                  label-class="lable-class"
                  label-width="85"
                  label-align="right"
                  input-align="center"
                  name="标准转换比"
                  label="标准转换比"
              /></van-col>
            </van-row>

            <van-row>
              <van-col span="9">
                <van-field
                  v-model="infoForm.width"
                  readonly
                  label-class="lable-class"
                  label-width="20"
                  input-align="right"
                  name="宽"
                  label="宽"
              /></van-col>
              <van-col span="3"><van-field></van-field></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.height"
                  label-align="right"
                  readonly
                  name="高"
                  label="高"
                  label-class="lable-class"
                  input-align="center"
                  label-width="80"
              /></van-col>
            </van-row>

            <van-row>
              <van-col span="9">
                <van-field
                  v-model="infoForm.volume"
                  readonly
                  label-class="lable-class"
                  label-width="40"
                  input-align="right"
                  name="体积"
                  label="体积:"
              /></van-col>

              <van-col span="3">
                <van-field
                  v-model="infoForm.volumeUOM"
                  readonly
                  label-class="lable-class"
                  label-width="20"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.volumeRate"
                  readonly
                  label-class="lable-class"
                  label-width="85"
                  label-align="right"
                  input-align="center"
                  name="标准转换比"
                  label="标准转换比"
              /></van-col>
            </van-row>

            <van-row>
              <van-col span="9">
                <van-field
                  v-model="infoForm.grossWeight"
                  readonly
                  label-class="lable-class"
                  label-width="40"
                  input-align="right"
                  name="毛重"
                  label="毛重:"
              /></van-col>

              <van-col span="3">
                <van-field
                  v-model="infoForm.weightUOM"
                  readonly
                  label-class="lable-class"
                  label-width="20"
              /></van-col>
              <van-col span="12">
                <van-field
                  v-model="infoForm.netWeight"
                  readonly
                  label-class="lable-class"
                  label-width="80"
                  label-align="right"
                  name="净重"
                  label="净重:"
              /></van-col>
            </van-row>

            <van-field
              v-model="infoForm.weightRate"
              readonly
              label-class="lable-class"
              label-width="130"
              name="质量标准转换比"
              label="质量标准转换比:"
            />
            <van-field label="销售组织:" readonly> </van-field>
            <van-collapse v-model="pdtItemsActiveIndex" accordion>
              <van-collapse-item
                v-for="(item, index) in infoForm.items"
                :key="index"
                :name="index"
                :title="item.unitname"
              >
                <van-form>
                  <van-row>
                    <van-field
                      label-width="68"
                      v-model="item.unitcode"
                      readonly
                      name="代码"
                      label="代码"
                    />

                    <van-field
                      label-width="68"
                      v-model="item.jhgc"
                      name="交货工厂"
                      label="交货工厂"
                      readonly
                      placeholder="交货工厂"
                    />
                  </van-row>
                </van-form>
              </van-collapse-item>
            </van-collapse>
          </van-form>
        </van-tab>
        <!-- </ScrollFirst> -->
      </van-tabs>
    </Scroll>
  </div>
</template>

<script>
import { provide } from "vue";
import Scroll from "@/components/Scroll.vue";

import { pdtInfo } from "@/api/erp.pdt.js";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ProductDetail",
  components: {
    NavBar,
    Scroll,
  },
  data() {
    return {
      pdtID: null,
      pdtItemsActiveIndex: 0,
      infoForm: {
        items: [],
        taxRateItems: [],
        pdtID: "", //主键
        pdtNo1: "", //编码
        pdtNameC: null,
        acctPdt: null,
        amountflag: null,
        amountPs: null,
        amountPs1: null,
        amountPs2: null,
        amountPs3: null,
        barCode: null,
        cmpsFlag: null,
        cmpsPrnt: null,
        colorC: null,
        control1: null,
        control2: null,
        control3: 0,
        dateStart: null,
        deptId: null,
        descriptionC: null,
        descriptionE: null,
        empId: null,
        employeeId: null,
        fl1: null,
        fl2: null,
        fl3: null,
        fl4: null,
        fl5: null,
        grossWeight: 0,
        groupId: null,
        height: null,
        hl: null,
        impExp: null,
        importantPdt: null,
        labelTypeC: null,
        labelTypeE: null,
        length: null,
        lengthRate: 1,
        licensNo: null,
        licensclass: null,
        maTkl: null,
        measureUOM: null,
        mngDate: null,
        mngFlag: null,
        mngId: null,
        mngUserNo: null,
        mtBez: null,
        mvGr1: null,
        mvGr2: null,
        mvGr3: null,
        netWeight: null,
        oid: null,
        packColor: "",
        packDescriptionC: null,
        packDescriptionE: null,
        packTypeC: null,
        packTypeE: null,
        packUnit: null,
        pdtcodeC: null,
        pdtcodeE: null,
        pdtCtlG: null,
        pdtNameE: null,
        prodClassC: null,
        prodGroupC: null,
        prodLineC: null,
        prodTypeC: null,
        prodstyleC: null,
        quaAssC: null,
        quaAssE: null,
        qualityDesC: null,
        qualityDesE: null,
        remark: null,
        salunit: null,
        sapunit: null,
        sapunitRate: null,
        sbys: null,
        shareFlag: null,
        specificationC: null,
        specificationE: null,
        taxCode: null,
        taxName: null,
        taxType: null,
        unitCostM: null,
        unitPriceM: null,
        unitSTDCost: null,
        unitSTDPrice: null,
        uOM: null,
        uOM1: null,
        useFlag: null,
        usedFlag: null,
        userno: null,
        validDate: null,
        vkorg: null,
        volume: null,
        volumeRate: null,
        volumeUOM: null,
        wareLocationM: null,
        weightRate: null,
        weightUOM: null,
        width: null,
        zSPm: null,
        atr: null,
        dtra: null,
        trc: null,
        dtrc: null,
        trcst: null,
        othertaxrate: null,
      },
      taxRateItems: {
        pdtrid: null,
        pdtid: null,
        atr: null,
        dtra: null,
        trc: null,
        dtrc: null,
        trcst: null,
        othertaxrate: null,
        contrl1: null,
        contrl2: null,
      },
      baseDetail: {
        pkid: null,
        pdtid: null,
        orgclass: null,
        orgno: null,
        userno: null,
        shargflag: null,
        unitcode: null,
        unitname: null,
        jhgc: null,
      },
      amountflagList: [
        { id: 1, text: "20'GP" },
        { id: 2, text: "40'GP" },
        { id: 3, text: "40'HQ" },
      ],
    };
  },
  created() {
    this.pdtID = this.$route.query.pdtID;
    this.loadDetail();
  },

  setup() {
    provide("title", "商品资料明细");
  },
  mounted() {},
  updated() {},
  methods: {
    loadDetail() {
      pdtInfo({ pdtId: this.pdtID }).then((res) => {
        this.infoForm = res.data;
        for (let index = 0; index < this.amountflagList.length; index++) {
          const element = this.amountflagList[index];
          if (element.id === this.infoForm.amountflag) {
            this.infoForm.amountflag = element.text;
          }
        }
      });
    },
  },
  computed: {},
};
</script>

<style scoped lang="less">
////样式穿透，改变已经存在的组件的样式
::v-deep {
  .van-cell__title.van-field__label.lable-class {
    margin-right: 1px !important;
  }

  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 5px 5px;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    background-color: #fff;
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
  height: calc(100vh - 81.47px);
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
  .tools-bar-button {
    flex: 1;
    & + .tools-bar-button {
      margin-left: 10px;
    }
  }
}

.detail_item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
