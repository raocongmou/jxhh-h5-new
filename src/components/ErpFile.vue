<template>
  <van-uploader
    :after-read="uploadFile"
    class="class_uploader"
    :disabled="orderReadOnly"
  >
    <van-button
      icon="plus"
      type="primary"
      color="#1fa2e8"
      size="small"
      :disabled="orderReadOnly"
      class="width:100%"
      >上传文件</van-button
    >
  </van-uploader>

  <div
    v-for="(item, index) in localFileItems"
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
          <van-button type="success" round color="#1fa2e8" text="下载" />
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
</template>

<script>
import { upload } from "@/api/erp.file.js";
import { Dialog, Notify } from "vant";

export default {
  name: "ErpFile",
  props: {
    fileItems: {
      type: Array,
      default: () => [],
    },
    orderReadOnly: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      localFileItems: this.fileItems,
    };
  },

  methods: {
    //// 上传文件
    uploadFile(file) {
      //文件读取完毕。执行 上传文件的操作
      console.log("文件选择完成-", file);
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
            if (!this.localFileItems || this.localFileItems.length === 0) {
              this.localFileItems = [];
            }
            let len = this.localFileItems.length;
            this.localFileItems[len] = newFileItem;
            this.$emit("hasUploadFile", resFileList[0]);
          }
        })
        .catch();
    },

    downFile(item) {},
    doDeleteFileItem(index) {
      let delFile = this.localFileItems[index];
      if (delFile) {
        this.localFileItems.splice(this.localFileItems[index], 1);
        console.log("删除一个文件", delFile);
        this.$emit("hasDeleteFile", delFile);
      }
      // console.log("删除之前", this.localFileItems[0]);

      // console.log("删除之后", this.localFileItems);
      // this.$emit("hasDeleteFile", index);
    },
    ////  删除文件
    deleteFileItem(index) {
      if (this.orderReadOnly) {
        Notify({
          type: "warning",
          message: "当前单据是只读状态,不可删除附件!",
        });
        return;
      }
      console.log("删除附件");
      Dialog.confirm({
        title: "删除附件",
        message: "是否删除附件?",
      })
        .then((res) => {
          this.doDeleteFileItem(index);
        })
        .catch((res) => {
          console.log("zzzzzZ");
        });
    },
  },
  computed: {
    // getFullName(item) {
    //   if (item.type) {
    //     return item.fileName + "." + item.type;
    //   }
    //   return item.fileName;
    // },
  },
};
</script>

<style scoped lang="less">
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

.copy {
  width: 100%;
  display: flex;
  button {
    flex: 1;
    height: 27px;
    margin: 0 17px;
  }
}
.van-uploader__input::v-deep {
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
}
</style>