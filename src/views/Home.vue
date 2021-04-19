<template>
  <div class="home">
    <h3>扫码登录</h3>
    <div class="qr-div"></div>
    <p>
      <span>登录状态：</span>
      <span>{{ loginStatus }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import request from "../request/login";
import router from "../router/index";
export default defineComponent({
  name: "Home",
  data() {
    return {
      loginQrcodeStr: "",
    };
  },
  setup() {
    let nIntervId: number | undefined = undefined;
    let loginStatus = ref("");
    const getLoginQrcodeStr = () => {
      request.getLoginQrcodeStr().then((res: any) => {
        const qrUrl = window.URL.createObjectURL(res.data);
        const img = document.createElement("img");
        img.src = qrUrl;
        img.onload = function () {
          window.URL.revokeObjectURL(qrUrl);
        };
        const imgDiv = document.querySelector(".qr-div");
        (imgDiv as Element).appendChild(img);

        const qrsig = res.headers.qrsig;
        nIntervId = window.setInterval(checkLoginRes, 5000, qrsig);
      });
    };
    const checkLoginRes = (qrsig: string) => {
      request.checkLoginRes(qrsig).then((res: any) => {
        loginStatus.value = res.data as string;
        if (res.data.includes("登录成功")) {
          window.clearInterval(nIntervId);
          router.push("/about");
        }
      });
    };
    const getLoginStatus = () => {
      request.getLoginStatus().then((res: any) => {
        if (res.data.qq) {
          loginStatus.value = "已登录";
          router.push("/about");
        } else {
          getLoginQrcodeStr();
        }
      });
    };

    onMounted(() => {
      getLoginStatus();
    });
    onUnmounted(() => {
      if (nIntervId) {
        window.clearInterval(nIntervId);
      }
    });

    return {
      loginStatus,
    };
  },
});
</script>
