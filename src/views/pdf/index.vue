  <template>
  <div class="m-pdf">
    <van-icon name="arrow-left" @click="back" />
    <div id="pdf"></div>
  </div>
</template>
<script>
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";
import { upload, down } from "@/api/erp.file.js";
import { ImagePreview, Toast } from "vant";

export default {
  name: "Index",
  data() {
    return {
      urls: [],
      pkid: null,
      pdfh5: null,
      pdfUrl: "pdf文件地址...",
      instance_before: "",
      colseType: true,
      fileType: "pdf",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    document.title = this.$route.matched[0].meta.name;
    this.pkid = this.$route.query.pkId;
  },
  unmounted() {
    if (this.colseType && this.fileType !== "pdf") {
      this.urls = [];
      this.instance_before.close();
      this.colseType = false;
    }
  },
  mounted() {
    // pdfh5实例化时传两个参数：selector选择器，options配置项参数，会返回一个pdfh5实例对象，可以用来操作pdf，监听相关事件
    // pdfh5 = new Pdfh5(selector, options) goto初始到第几页，logo设置每一页pdf上的水印
    down(this.pkid)
      .then((data) => {
        let str = data.headers["content-disposition"];
        const strArr = str.split(";");
        /////form-data; name="attachment"; filename="5.jpg.jpg"
        let contentType = data.headers["content-type"];

        // 文件名
        let fileName = "inputFileName";
        let fileType = "";
        for (let index = 0; index < strArr.length; index++) {
          const element = strArr[index];
          if (element.includes("filename")) {
            fileName = element.split('="')[1];
            fileName = fileName.substring(0, fileName.length - 1);
            console.log("element=", element);
          }
        }

        let blob = new Blob([data.data], { type: contentType });
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
        } else {
          this.fileType = "image";
          if (this.pdfh5 || this.pdfh5 === undefined) {
            this.pdfh5.colse();
          }

          let _this = this;
          this.urls[0] = fileUrl;
          this.instance_before = ImagePreview({
            images: this.urls,
            closeOnPopstate: true,
            closeable: true,
            onClose() {
              //_this.colseType = false;
              if (_this.colseType) {
                _this.$router.go(-1); //返回上一层
              }
            },
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