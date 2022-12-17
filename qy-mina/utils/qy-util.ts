const colorList =["pink","red","orange","green","cyan","blue","purple"];
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
    const idx = GetRandomNum(1,20);
    return '/static/images/thumb/'+ idx+'.jpg';
}
export function ValidateUrl(url:string) {
    const reg = /^(http:\/\/|https:\/\/)/;
    return reg.test(url);
}