// import directives
import { App } from "vue";
import realImg from "./qyRealImg";
import contentImags from "@/utils/directives/qyContentImgs";
import realBackgroundImg from "@/utils/directives/qyBackRealImg";

const directivesList: any = {
    // Custom directives
    realBackgroundImg,
    contentImags,
    realImg,
};

const directives = {
    install: function (app: App<Element>) {
        Object.keys(directivesList).forEach(key => {
            // 注册自定义指令
            app.directive(key, directivesList[key]);
        });
    }
};

export default directives;
