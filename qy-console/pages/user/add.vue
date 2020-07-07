<template>
        <div>
         <a-page-header
                title="添加用户"
                sub-title=""
                @back="backF()"
            />
            <qy-user-form      
                ref="userForm"
                 :afterSubmit="submitForm"> </qy-user-form  >
    </div>
</template>

<script  >
import Vue from 'vue'
import  QyUserForm  from '~/components/qy-user-form.vue';

export default Vue.extend({
    components: {
        QyUserForm
    },
    data() {
        return {}
    },
    methods: {
        backF() {
              let _this = this;
                _this.$router.push("/user");
        },
        submitForm(val) {

        }
    }
})
</script>