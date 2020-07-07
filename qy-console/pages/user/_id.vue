<template>
        <div>
         <a-page-header
                title="修改用户"
                sub-title=""
                @back="backF()"
            />
            <qy-user-form    
                ref="userForm"
                :userObj = "userObj"
                 :afterSubmit="submitForm"> </qy-user-form>
    </div>
</template>

<script  >
import Vue from 'vue'
import  QyUserForm  from '~/components/qy-user-form.vue';


export default Vue.extend({
    validate ({ params }) {
        // 必须是number类型
        return /^\d+$/.test(params.id)
    },
    components: {
        QyUserForm
    },
    data() {
        return {
            userObj: {}
        }

    },
    methods: {
        submitForm(val) {

        },
        backF() {
              let _this = this;
                _this.$router.push("/user");
        }
    }
    
})
</script>