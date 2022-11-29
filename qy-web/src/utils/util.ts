
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