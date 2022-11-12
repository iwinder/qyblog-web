<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-row>
      <a-col>
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="doCallChange"
        />
        <menu-fold-outlined v-else class="trigger" @click="doCallChange" />
      </a-col>
      <a-col :xs="{span:8, offset:5 }" :md="{span:3, offset:17}" :lg="{ span: 3, offset: 18 }" style="text-align: center;" >
        <a-dropdown  placement="bottom">
          <a class="ant-dropdown-link" style="display: block"  @click.prevent>
            <a-avatar :src="myInfos.avatar">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            {{myInfos.nickname }}
          </a>
          <template #overlay>
            <a-menu  @click="onDropdownClick">
              <a-menu-item key="userInfo" disabled>
                {{myInfos.roleNames}}
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">
                <logout-outlined /> 退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>



      </a-col>
    </a-row>


  </a-layout-header>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useUserInfo} from "@/store/userInfo";
import {UserType} from "@/api/user";
import {MenuProps} from "ant-design-vue";
import {useRouter} from "vue-router";
const emit = defineEmits(['onCollapsed'])
const userStore =useUserInfo();
const router = useRouter();
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
})
const myInfos = reactive<UserType>({
  id:"",
})
const collapsed = ref(props.isCollapsed);
onMounted(() => {
  console.log("ddd",userStore.myInfo)
  myInfos.id = userStore.myInfo.id;
  myInfos.nickname = userStore.myInfo.nickname;
  myInfos.avatar = userStore.myInfo.avatar;
  myInfos.roleNames = userStore.myInfo.roleNames
})

// trigger 切换事件
const doCallChange = ()=> {
   collapsed.value = !collapsed.value;
   emit('onCollapsed', collapsed.value);
}

const onDropdownClick: MenuProps['onClick'] = ({ key }) => {
  console.log(`Click on item ${key}`);
  if (key == "logout") {
    userStore.token = "";
    router.push({name:"login"});
  }
};
</script>

<style scoped>

</style>