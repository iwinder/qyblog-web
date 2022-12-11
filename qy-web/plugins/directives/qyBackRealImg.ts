/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from "vue";
import {ImageIsExist} from "@/utils/util";

interface ElType extends HTMLElement {

}
const realBackgroundImg: Directive = {
    async mounted(el: ElType, binding: DirectiveBinding) {
        let imgURL = binding.value;
        if (imgURL) {
            try {
                let exist = await ImageIsExist(imgURL);
                if (exist) {
                    el.setAttribute('style', "background-image:url('" + imgURL + "');");
                } else {
                    el.onerror = null;
                }
            } catch (error) {
                console.log('资源22error', error);
            }
        }
    },
    updated(el: ElType, binding: DirectiveBinding) {

    },
    beforeUnmount(el: ElType) {

    }
};


export default realBackgroundImg;