/**
 * 设置 弹幕DOM池 每一个通道最多六条弹幕
**/

const MAX_DM_COUNT = 6;
const CHANNEL_COUNT = 10;

let domPool = [];
let danmuPool = [
    'A', "BB"
];
let hasPosition = [];

/**
 * 做一下初始化工作
 */
function init() {

    let wrapper = document.getElementById('wrapper')
    // 先new一些span 重复利用这些DOM
    for (let j = 0; j < CHANNEL_COUNT; j++) {
        let doms = [];
        for (let i = 0; i < MAX_DM_COUNT; i++) {
            // 要全部放进wrapper
            let dom = document.createElement('span');
            wrapper.appendChild(dom);
            // 初始化dom的位置 通过设置className
            dom.className = 'right';
            // DOM的通道是固定的 所以设置好top就不需要再改变了
            dom.style.top = j * 20 + 'px';
            // 放入改通道的DOM池
            doms.push(dom);
            // 每次到transition结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
            dom.addEventListener('transitionend', () => {
                dom.className = 'right';
                // dom.style.transition = null;
                // dom.style.left = null;
                dom.style.transform = null;

                domPool[j].push(dom);
            });
        }
        domPool.push(doms);
    }
    // hasPosition 标记每个通道目前是否有位置
    for (let i = 0; i < CHANNEL_COUNT; i++) {
        hasPosition[i] = true;
    }
}

/**
 * 获取一个可以发射弹幕的通道 没有则返回-1
 */
function getChannel() {
    for (let i = 0; i < CHANNEL_COUNT; i++) {
        if (hasPosition[i] && domPool[i].length) return i;
    }
    return -1;
}

/**
 * 根据DOM和弹幕信息 发射弹幕
 */
function shootDanmu(dom, text, channel) {
    console.log('biu~ [' + text + ']');
    dom.innerText = text;
    // 如果为每个弹幕设置 transition 可以保证每个弹幕的速度相同 这里没有保证速度相同
    // dom.style.transition = `transform ${7 + dom.clientWidth / 100}s linear`;

    // dom.style.left = '-' + dom.clientWidth + 'px';
    // 设置弹幕的位置信息 性能优化 left -> transform
    dom.style.transform = `translateX(${-dom.clientWidth}px)`;
    dom.className = 'left';

    hasPosition[channel] = false;
    // 弹幕全部显示之后 才能开始下一条弹幕
    // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
    setTimeout(() => {
        hasPosition[channel] = true;
    }, dom.clientWidth * 10 + 1000);
}

window.onload = function () {
    // document.getElementsByClassName("right").style.transform = `translateX(700px)`;
    document.getElementsByClassName("right").style.transform = `translateX(${document.body.clientWidth}px)`;
    document.getElementById("wrapper").style.backgroundColor = "yellow";

    init();

    // 为input和button添加事件监听
    // let btn = document.getElementsByTagName('button')[0];
    // let input = document.getElementsByTagName('input')[0];
    // btn.addEventListener('click', () => {
    //     input.value = input.value.trim();
    //     if (input.value) danmuPool.push(input.value);
    // })
    // input.addEventListener('keyup', (e) => {
    //     if (e.key === 'Enter' && (input.value = input.value.trim())) {
    //         danmuPool.push(input.value);
    //     }
    // })
    // 每隔1ms从弹幕池里获取弹幕（如果有的话）并发射
    setInterval(() => {
        let channel;
        if (danmuPool.length && (channel = getChannel()) != -1) {
            let dom = domPool[channel].shift();
            let danmu = danmuPool.shift();
            shootDanmu(dom, danmu, channel);
        }
    }, 1);

}