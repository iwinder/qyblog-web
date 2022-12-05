import {Directive, DirectiveBinding} from "vue";
import {GetRandomDefImg, ImageIsExist} from "@/utils/util";
import realBackgroundImg from "@/directives/qyRealImg";
import {DEF_IMG_ERR} from "@/utils/constants";

interface ElType extends HTMLElement {

}
const contentImags: Directive = {
    async mounted(el: ElType, binding: DirectiveBinding) {
        console.log("contentImags el",el)
        console.log("contentImags binding",binding)
        let data = el.getElementsByTagName("img")
        console.log("contentImags data",data)
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
                        console.log('资源22error', error);
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