<template>
  <div class="page">
    <div style="margin-top: 120px; margin-left: 65px">
      <van-image width="210" height="70" :src="`../image/login-title.jpg`" />
    </div>

    <van-form
      ref="loginRef"
      v-model="loginForm"
      style="margin-top: 100px; margin-left: 28px; margin-right: 28px"
    >
      <van-cell-group inset>
        <van-field
          v-model="loginForm.username"
          name="username"
          label="用户名:"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <!-- , trigger: ['onBlur','onSubmit'] -->
        <van-field
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码:"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin-left: 16px; margin-right: 16px; margin-top: 38px">
        <van-button
          round
          block
          type="primary"
          text=" 登&nbsp&nbsp录"
          native-type
          @click="loginClick"
        />
          <!-- :native-type="loginClick" -->
      </div>
      <!-- <div style="margin: 16px">
        <van-button
          round
          block
          color="#73c8ba"
          @click="getOauthUrl"
          v-show="false"
        >
          授权H5应用获取企业微信用户信息
        </van-button>
      </div> -->
    </van-form>
  </div>
</template>

 <script>
import { Toast, Notify } from "vant";
import { getPublicKey } from "@/api/user";
import cdn from "@/utils/cdn";
import MD5 from "md5.js";
import { oauthUrl, oauthUser } from "@/api/user";
import { RSAUtils } from "@/api/user";
const RSAUrl = process.env.BASE_URL + "static/security/security.js";

export default {
  name: "Auth",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        imageValidCode: "",
        imageValidCodeKey: "",
      },
    };
  },
  created() {
    let code = this.$route.query.code;
    let state = this.$route.query.state;
    if (code && state) {
      console.info("是回调的方法，直接走对应的逻辑...");
      this.getOauthUser(code, state);
      return;
    }
  },
  computed: {
    url() {
      return window.location.href;
    },
  },
  methods: {
    // getOrgList() {
    //   // this.$store.dispatch('orgco/orgcoList')
    // },
    ///  用户登录  通过账号密码登录的
    loginClick() {
      // this.$refs.loginRef.validate(["username", "password"]).
      this.loginForm.imageValidCode = "";
      this.loginForm.imageValidCodeKey = "";
      let password = this.loginForm.password;
      password = new MD5().update(this.loginForm.password).digest("hex");
      var sendForm = {
        username: this.loginForm.username,
        password: password,
        imageValidCode: "",
        imageValidCodeKey: "",
      };
      this.$store
      .dispatch("user/login", sendForm)
      .then(async() => {
        this.$router.push({
          path: "/index",
          query: "",
        });
        // that.getOrgList();
        await this.$store.dispatch("user/getUserInfos");
      })
      .catch((res) => {
        console.log("dispatch user/login error ");
        Notify({ type: "danger", message: res });
      });
    },

    ///  直接就调用，接口得到当前人员的基本信息，模拟登录
    ///  如果登录成功，则认为完成了数据。 应该去index 主页面
    getOauthUser(code, state) {
      oauthUser(code, state).then((res) => {
        console.log("res=", res);
        //进行存储
        //this.saveUser(res.data)
        //this.$router.push("/user");
        //alert(  JSON.stringify(res)  )
      });
    },

    ///    访问得到一个URL的地址，返回数据
    getOauthUrl() {
      let oauthCallback = encodeURI(
        window.location.protocol + "//" + window.location.host + "/login"
      );
      let params = { oauth_callback: oauthCallback };
      oauthUrl(params).then((res) => {
        window.location.href = res.data.oauth_url;
      });
    },
  },
};
</script>


<style scoped lang="less">
.page {
  background-color: #fff;
  height: 100%;
}
.body {
  line-height: 1.6;
  position: relative;
  background-color: #fff;
  font-family: "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
}
</style>