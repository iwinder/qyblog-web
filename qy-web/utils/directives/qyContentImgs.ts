import {Directive, DirectiveBinding} from "vue";
import {GetRandomDefImg, ImageIsExist} from "@/utils/util";
import realBackgroundImg from "@/utils/directives/qyRealImg";
import {DEF_IMG_ERR} from "@/utils/constants";

interface ElType extends HTMLElement {

}
const contentImags: Directive = {
    async mounted(el: ElType, binding: DirectiveBinding) {
        let data = el.getElementsByTagName("img")
        for (let i =0;i<data.length;i++) {
            if (data.item(i)!=null) {
                let imgURL =   data.item(i).src
                if (imgURL) {
                    try {
                        let exist = await ImageIsExist(imgURL);
                        if (!exist) {
                            data.item(i).onerror = null;
                            data.item(i).src = DEF_IMG_ERR;
                        }
                    } catch (error) {
                        console.log('contentImags资源加载error', error);
                    }
                }
                data.item(i).onclick = function () {
                    binding.value(imgURL);
                };
            }

        }
        // let imgURL = binding.value;

    },
    updated(el: ElType, binding: DirectiveBinding) {

    },
    beforeUnmount(el: ElType) {

    }
};
export default contentImags;
