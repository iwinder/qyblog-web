import Vue from 'vue'
Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
    let imgURL = binding.value;//获取图片地址 
    if (imgURL) {
        let exist = await imageIsExist(imgURL); 
        if (exist) {
            el.setAttribute('src', imgURL);
        } 
    }
})

Vue.directive('real-background-img', async function (el, binding) {//指令名称为：real-img
    let imgURL = binding.value;//获取图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute('style', "background-image:url('"+imgURL+"');");
        } 
    }
})

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) { 
    return new Promise((resolve) => {
        var img = new Image();
        img.onload = function () { 
            if (img.complete == true){
                resolve(true);
                img = null;
            }
        }
        img.onerror = function () { 
            resolve(false);
            img = null;
        }
        img.src = url;
    })
}