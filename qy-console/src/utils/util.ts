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

export function ChangeStrByMd5(str:string) {
    const newPas = md5.appendStr(str).end();
    return newPas;
}