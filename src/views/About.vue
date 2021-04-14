<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <div>
    <el-cascader
      v-model="value"
      :options="options"
      :props="cascaderProps"></el-cascader>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { STD_DATA } from "../assets/dnf_server_select";
export default defineComponent({
  name: "About",
  data() {
    return {
      value: '',
      options: STD_DATA,
      cascaderProps: {
        value: 'v',
        label: 't',
        children: 'opt_data_array',
      }
    };
  },
});
</script>