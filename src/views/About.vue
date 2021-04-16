<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
      :props="cascaderProps"
    >
    </el-cascader>

    <el-select v-model="roleValue" placeholder="请选择">
      <el-option
        v-for="item in roleOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-button type="primary" @click="setRole">绑定</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { STD_DATA } from "../assets/dnf_server_select";
import request from "../request/login";
export default defineComponent({
  name: "About",
  data() {
    return {
      value: "",
      roleValue: "",
      options: STD_DATA,
      roleOptions: [],
      cascaderProps: {
        value: "v",
        label: "t",
        children: "opt_data_array",
      },
    };
  },
  methods: {
    handleChange(value: unknown) {
      console.log(value, this.value);
      this.getRoles();
    },

    getRoles(): void {
      request.getRoles(this.value[1]).then((res: any) => {
        this.roleOptions = res.data;
      });
    },
    setRole(): void {
      const roleData = this.roleOptions.find((item: any) => {
        return item.id === this.roleValue;
      });
      request.setRoles(roleData).then((res: any) => {
        console.log(res);
      });
    },

    getNowRole(): void {
      request.getNowRole().then((res) => {
        console.log(res);
      });
    },
  },
});
</script>
