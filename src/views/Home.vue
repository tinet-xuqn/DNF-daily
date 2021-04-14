<template>
  <div class="home">
    <h1>This is an home page</h1>
    <div class="qr-div"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import request from "../request/login";
export default defineComponent({
  name: "Home",
  data() {
    return {
      loginQrcodeStr: "",
    };
  },
  setup() {
    let nIntervId: number | undefined = undefined;
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
        nIntervId = window.setInterval(checkLoginRes, 3000, qrsig);
      });
    };

    const checkLoginRes = (qrsig: string) => {
      request.checkLoginRes(qrsig).then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          window.clearInterval(nIntervId);
        }
      });
    };

    onMounted(() => {
      getLoginQrcodeStr();
    });
  },
});
</script>
