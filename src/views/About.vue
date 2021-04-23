<template>
  <div>
    <p>
      <span>当前绑定角色：</span>
      <span>{{ nowRole }}</span>
    </p>
  </div>

  <div class="select-area-role">
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
      :props="cascaderProps"
      placeholder="请选择大区"
    >
    </el-cascader>

    <el-select v-model="roleValue" placeholder="请选择角色">
      <el-option
        v-for="item in roleOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-button type="primary" @click="setRole">绑定</el-button>

    <el-button type="primary" @click="handleReceive">一键领取</el-button>
  </div>

  <div class="aboutTable">
    <el-table :data="nowActivity" style="width: 100%" border>
      <el-table-column prop="enable" label="是否可用" width="180">
        <template #default="scope">
          <el-checkbox v-model="scope.row.enable">状态</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="活动" width="280"></el-table-column>
      <el-table-column prop="message" label="结果"></el-table-column>
    </el-table>
  </div>

</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { STD_DATA } from "../assets/dnf_server_select";
import request from "../request/dnf_helper";
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
  setup() {
    const nowRole = ref("");
    const nowActivity = ref([]);
    const getNowRole = () => {
      request.getNowRole().then((res: any) => {
        nowRole.value = res.data.name;
      });
    };
    const getActivity = () => {
      request.getActivity().then((res: any) => {
        nowActivity.value = res.data;
      });
    };
    onMounted(() => {
      getNowRole();
      getActivity();
    });
    return {
      nowRole,
      nowActivity,
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
      request.setRoles(roleData).then(() => {
        this.nowRole = (roleData as any).name;
      });
    },
    handleReceive(): void {
      request.handleReceive().then((res: any) => {
        this.nowActivity = res.data;
      });
    },
  },
});
</script>
<style lang="less">
.select-area-role {
  & > div {
    margin-right: 10px;
  }
  & > button {
    margin-right: 10px;
  }
}
.aboutTable {
  max-width: 1000px;
  margin: 20px auto;
}
</style>
