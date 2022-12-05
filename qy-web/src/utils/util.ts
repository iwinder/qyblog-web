import {Md5} from "ts-md5";
const md5 = new Md5();
export function timeFix () {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}
const colorList =["pink","red","orange","green","cyan","blue","purple"]

export function GetRandomNum(Min:number, Max :number)  {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
export function GetRandomColor() {
    const idx = GetRandomNum(0,6);
    return colorList[idx]
}

export function GetRandomDefImg() {
    const idx = GetRandomNum(1,32);
    return '/images/thumb/'+ idx+'.jpg';
}
export function ValidateUrl(url:string) {
    const reg = /^(http:\/\/|https:\/\/)/;
    return reg.test(url);
}

export function ChangeStrByMd5(str:string) {
    const newPas = md5.appendStr(str).end();
    return newPas;
}
/**
 * 检测图片是否存在
 * @param url
 */
export  function ImageIsExist(url:string) {
    return new Promise((resolve) => {
        let img = new Image();
        img.onload = function () {
            if (img.complete == true){
                resolve(true);
                img.remove();
            }
        }
        img.onerror = function () {
            //console.log('资源error', img);
            resolve(false);
            img.remove();
        }
        img.src = url;
    })
}