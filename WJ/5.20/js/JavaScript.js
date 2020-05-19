function Random(start, end) {
    let num = (Math.random() * (end - start) + start).toString();
    return parseInt(num, 10);
}
function SetBarrage(text) {
    var barrage = document.createElement('span');
    barrage.className = "content-barrage-single";
    barrage.innerText = text;
    document.getElementById('content-barrage').appendChild(barrage);
    const randomTime = Random(10, 15);
    const randomTop = Random(0, 90);
    barrage.style.top = randomTop + "%";
    barrage.style.animation = "barrage " + randomTime + "s linear";
    setTimeout(() => {
        document.getElementById('content-barrage').removeChild(barrage)
    }, randomTime * 1000);
}
window.onload = function () {
    let danmuPool = [
        '你就是我心中的一把火',
        '祝小仙女520快乐,永远爱你么么',
        '520快乐',
        '520快乐',
        '520快乐',
        '520快乐',
        '520快乐',
        '做我女朋友吧',
        '做我女朋友吧',
        '做我女朋友吧',
        '做我女朋友吧',
        '做我女朋友吧',
        '爱你么么',
        '遇见你是我的幸运',
        '世界因你的美丽而闪耀',
    ];
    let length = danmuPool.length;
    console.log(length);

    let index = 0;
    setInterval(() => {
        index = this.Random(0, length);
        this.SetBarrage(danmuPool[index]);
        console.log(danmuPool[index]);
    }, 20);
}