  <template>
  <div class="m-pdf">
    <van-icon name="arrow-left" @click="back" />
    <div id="pdf"></div>
  </div>
</template>
<script>
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";
import { order2pdf } from "@/api/erp.file.js";
import { ImagePreview, Toast } from "vant";

export default {
  name: "OrderFDF",
  data() {
    return {
      urls: [],
      pkid: null,
      pdfh5: null,
      pdfUrl: "pdf文件地址...",
      instance_before: "",
      colseType: true,
      fileType: "pdf",
      queryForm: {
        moduleName: null,
        // keyName: null,
        // keyValue: null,
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-2);
      // const { currentPath, infoId } = this.$route.query;
      // this.$router.push({
      //   path: currentPath,
      //   query: {
      //     infoId,
      //     auditStatusList: JSON.stringify(this.auditStatusList),
      //     currencyCodeList: JSON.stringify(this.currencyCodeList) 
      //   }
      // });
    }
  },
  created() {
    console.log("raoaaa", this.$route.query);
    document.title = this.$route.matched[0].meta.name;
    let moduleName = this.$route.query.moduleName;
    let keyName = this.$route.query.keyName;
    let keyValue = this.$route.query.keyValue;
    this.queryForm.moduleName = moduleName + "___" + keyName + "___" + keyValue;
  },
  unmounted() {
    if (this.colseType && this.fileType !== "pdf") {
      this.urls = [];
      this.instance_before.close();
      this.colseType = false;
    }
  },
  mounted() {
    console.log("rao", this.queryForm);
    // pdfh5实例化时传两个参数：selector选择器，options配置项参数，会返回一个pdfh5实例对象，可以用来操作pdf，监听相关事件
    // pdfh5 = new Pdfh5(selector, options) goto初始到第几页，logo设置每一页pdf上的水印
    order2pdf(this.queryForm)
      .then((data) => {
        console.log("预览data1");
        let str = data.headers["content-disposition"];
        const strArr = str.split(";");
        /////form-data; name="attachment"; filename="5.jpg.jpg"
        //let contentType = data.headers["content-type"];
        console.log("预览data2", strArr);
        // 文件名
        let fileName = "inputFileName.pdf";
        // //let fileType = "";
        // for (let index = 0; index < strArr.length; index++) {
        //   const element = strArr[index];
        //   if (element.includes("filename")) {
        //     fileName = element.split('="')[1];
        //     fileName = fileName.substring(0, fileName.length - 1);
        //     console.log("element=", element);
        //   }
        // }
        // console.log("预览data3");
        //console.log("预览data", fileName);
        let blob = new Blob([data.data], { type: "UTF-8" });

        var fileUrl = URL.createObjectURL(blob);
        if (fileName.includes(".pdf") || fileName.includes(".PDF")) {
          this.fileType = "pdf";
          this.pdfh5 = new Pdfh5("#pdf", {
            pdfurl: fileUrl,
            goto: 1,
          });
          // 监听pdf准备开始渲染，此时可以拿到pdf总页数
          this.pdfh5.on("ready", function () {
            console.log("总页数:" + this.totalNum);
          });
          // 监听pdf加载完成事件，加载失败、渲染成功都会触发
          this.pdfh5.on("complete", (status, msg, time) => {
            console.log(
              "状态:" + status + "，信息:" + msg + "，耗时:" + time + "毫秒"
            );
          });
        }
      })
      .catch((res) => {});
  },
};
</script>
<style lang="less" scoped>
.m-pdf {
  // 保证pdf区域铺满整个屏幕
  // 方法1：使用vw和vh视窗单位，1vw=视窗宽度的1%；1vh=视窗高度的1%
  width: 100vw;
  height: 100vh;
  position: relative;
  .van-icon {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 100;
  }
  // 方法2：使用fixed定位
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // right: 0;
  // left: 0;
}
::v-deep{
  .van-icon-arrow-left{
    &::before {
      color: #000 !important;
    }
  }
}
</style>