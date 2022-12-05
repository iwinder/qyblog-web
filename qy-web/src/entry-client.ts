import createApp from "@/main"
// 配置新的入口文件
const {app,router} = createApp();
router.isReady().then(() => {
    app.mount('#app');
});
// app.mount("#app");