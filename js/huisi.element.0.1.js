/*--
// author:慧思
// version:0.01
// instructions：已将常用的几个元素进行包裹，使用方法：
一、元素相关： 
   1、QE查询元素，可以查询id（QE.id('xx')或SE('#xx')）、标签（QE.tags()）、类（QE.classNames()或SE('.xx')），以及选择器(QE.querys());注意:sE是设置某个样式，格式为sE（a,b）;oE是输出元素，格式为oE(a,b);
   2、LE循环输出元素，目前添加了循环输出图片（LE.loopAddImg()）和链接与图片（LE.loopAddLinkImg()）两个
   3、CE创建元素，CE(element,attribute,value,insertlement)，其中attribute和value均是数组，insertlement为插入的位置
   4、只需要在html标签，加上date的id，然后使用setInterval(dateTime.date,1000);进行调用。
----*/
var C = console.log,
    CW = console.warn;
var D = document,
    W = window;
var index = 0;
var tipMsg = ["主上，您输入的类型是：%c", "主上，您的浏览器是：%c", "浏览器版本是：%c"];
var tipMsgColor = ['color:#ff0000', 'color:#000000'];
function getBrowser() {
    var UA = W.navigator.userAgent.toLowerCase(),
        system = W.navigator.platform,
        width = W.screen.width,
        height = W.screen.height;
    //IE中的screen width取值仅在100%缩放时正确
    var browserArray = {
        IE: W.ActiveXObject || "ActiveXObject" in W, // IE
        Chrome: UA.indexOf('chrome') > -1 && UA.indexOf('safari') > -1, // Chrome浏览器
        Firefox: UA.indexOf('firefox') > -1 && UA.indexOf('Gecko/'), // 火狐浏览器
        Opera: UA.indexOf('opera') > -1, // Opera浏览器
        Safari: UA.indexOf('safari') > -1 && UA.indexOf('chrome') == -1, // safari浏览器
        Edge: UA.indexOf('edge') > -1, // Edge浏览器
        QQBrowser: /qqbrowser/.test(UA), // qq浏览器
        WeixinBrowser: /MicroMessenger/i.test(UA), // 微信浏览器
        //Electron:UA.indexOf('electron') >= 0
        Electron: UA.includes('electron') //另一种更简单的方法
    };
    var d = {
        Android: UA.match(/(Android);?[\s\/]+([\d.]+)?/),
        IPad: UA.match(/(iPad).*OS\s([\d_]+)/),
        IPod: UA.match(/(iPod)(.*OS\s([\d_]+))?/),
        IPhone: !(UA.match(/(iPad).*OS\s([\d_]+)/)) && UA.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        Window: "Win32" === system,
        Mac: 'MacIntel' === system,
    };
    var v = {
        /*
		IE:UA.match(/(msie\s|trident.*rv:)([\w.]+)/),
		Chrome:UA.match(/chrome\/([\d.]+)/),
		Firefox:UA.match(/firefox\/([\d.]+)/),
		Opera:UA.match(/opera\/([\d.]+)/),
		Safari:UA.match(/version\/([\d.]+)/),
		Edge:UA.match(/edge\/([\d.]+)/),
		QQBrowser:UA.match(/qqbrowser\/([\d.]+)/),
		WeixinBrowser:UA.match(/MicroMessenger\/([\d.]+)/)
		*/
        //采用AI简写的方法	
        IE: /(?:msie\s|trident.*rv:)([\w.]+)/,
        Chrome: /chrome\/([\d.]+)/,
        Firefox: /firefox\/([\d.]+)/,
        Opera: /opera\/([\d.]+)/,
        Safari: /version\/([\d.]+)/,
        Edge: /edge\/([\d.]+)/,
        QQBrowser: /qqbrowser\/([\d.]+)/,
        WeixinBrowser: /MicroMessenger\/([\d.]+)/
    };
    var b = {
        desktop: width > 1024 || d.Window || d.Mac,
        phone: !(d.IPad) && (d.Mac) && (d.Window)
    };
    for (var i in browserArray) {
        if (browserArray[i]) {
            //	i==='IE'?b.versions= v[i][2]:b.versions= v[i][1];
            b.versions = i === 'IE' ? UA.match(v[i])[2] : UA.match(v[i])[1];
            b.type = i;
            if (b.desktop) {
                b.os = d.Window ? 'Windows' : 'Macos';
            } else {
                b.os = d.Android ? 'Android' : 'IPhone';
            }
        }
    }
    return b;
}
/*随机颜色*/
function randomColor() {
    var r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}
/* 升级版随机颜色，可以添加参数来指定生成颜色的范围，例如最小值和最大值，从而提高函数的灵活性。*/
function generateRandomColor() {
    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var r = getRandomValue(0, 255).toString().padStart(3, '0');
    var g = getRandomValue(0, 255).toString().padStart(3, '0');
    var b = getRandomValue(0, 255).toString().padStart(3, '0');
    return "rgb(" + r + "," + g + "," + b + ")";
}
function doubleI(i) {
    return i < 10 ? '0' + i : i;
} /*添加总为2位数的字符串*/
var E = {
    singleE: function (a) {
        if (a.match(/#/g)) {
            a = a.split("#");
            return D.getElementById(a[1]);
        } else if (a.match(/./g)) {
            a = a.split(".");
            var elements = D.getElementsByClassName(a[1]);
            if (elements.length > 0) {
                return elements;
            } else {
                C("未找到" + a[1])
            }
        }
    },
    queryE: {
        id: function (b) {
            return D.getElementById(b)
        },
        tags: function (c, d) {
            return c.getElementsByTagName(d)
        },
        classNames: function (e, f) {
            return e.getElementsByClassName(f)
        },
        querys: function (g, h) {
            return g.querySelectorAll(h)
        }
    },
    styleE: function (a, b) {
        function s(c, d) {
            var l = c.length - d.length;
            return l >= 0 && c.indexOf(d, l) == l;
        }
        if (getBrowser().type === 'IE') {
            var sty = a.style,
                cssText = sty.cssText;
            if (!s(cssText, ';')) {
                cssText += ';'
            }
            sty.cssText = cssText + b;
        } else {
            a.style.cssText = b
        }
    },
    loopE: {
        loopAddImg: function (length, id, path, type) {
            for (var i = 1; i < length; i++) {
                id.innerHTML += '<img src=' + path + doubleI(i) + type + '>'
            }
        },
        loopAddLinkImg: function (num, length, id, link, path) {
            for (var i = num; num < length; num++) {
                id.innerHTML += '<a href=' + link + '><img src=' + path + '><\/a>'
            }
        }
    },
    createE: function (element, attr, value, insertlement) {
        var createE = D.createElement(element);
        var textTip = ['%c，这里的参数只能是数组哦！'];
        if (typeof attr === "number" || typeof attr === "string") {
            CW(tipMsg[0] + typeof attr + textTip[0], tipMsgColor[0], tipMsgColor[1]);
            CW(tipMsg[0] + typeof value + textTip[0], tipMsgColor[0], tipMsgColor[1]);
        } else if (attr || value instanceof Array) {
            for (var i = 0; i < attr.length; i++) {
                createE.setAttribute(attr[i], value[i])
            }
        } else if (attr || value instanceof Object) {
            C(tipMsg[0] + typeof attr + textTip[0], tipMsgColor[0], tipMsgColor[1]);
        } else {
            C(tipMsg[0] + typeof attr + textTip[0], tipMsgColor[0], tipMsgColor[1]);
            C(tipMsg[0] + typeof value + textTip[0], tipMsgColor[0], tipMsgColor[1]);
        }
        insertlement.parentNode.insertBefore(createE, insertlement);
    },
    operationE: {
        imgLazy: function () {
            var getBrowerVer = getBrowser().versions;
            var images = E.queryE.tags(document, 'img');
            if (getBrowerVer > 80 || getBrowser().type != 'IE') {
                for (var i = 0; i < images.length; i++) {
                    images[i].setAttribute('loading', 'lazy');
                }
            } else {
                C('主上，您的浏览器是：' + getBrowser().type + ",浏览器版本是：" + getBrowser().versions + '，版本较低哦！')
            }
        },
        oneslideShow: function (id, time) {
            if (time == undefined) {
                throw new Error('传入时间不能为空，而且必须为数字')
            }
            var childrenElement = id.children;
            var len = childrenElement.length;
            childrenElement[index].style.display = 'block';
            function one() {
                index++;
                if (index >= len) {
                    index = 0;
                }
                for (var i = 0; i < len; i++) {
                    childrenElement[i].style.display = 'none';
                }
                childrenElement[index].style.display = 'block';
            }
            var t = setInterval(one, time);
            for (var i = 0; i < len; i++) {
                childrenElement[i].onmouseover = function () {
                    clearInterval(t);
                    this.onmouseleave = function () {
                        t = setInterval(one, time)
                    };
                };
            }
        },
        marquee: function (id, time) {}
    },
    outputE: function (element, content) {
        element.innerHTML = content;
    }
};
var SE = E.singleE,
    QE = E.queryE,
    sE = E.styleE,
    LE = E.looPE,
    OE = E.operationE,
    CE = E.createE,
    oE = E.outputE;
var dateTime = {
    timers: function () {
        var a = new Date(),
            w = ["天", "一", "二", "三", "四", "五", "六"];
        var Dt = {
            y: a.getFullYear(),
            m: a.getMonth() + 1,
            d: a.getDate(),
            h: a.getHours(),
            mm: a.getMinutes(),
            s: a.getSeconds(),
            w: '星期' + w[a.getDay()],
            hms: a.toLocaleTimeString('en-CN', {
                hour12: false
            })
        };
        Dt.h < 6 ? hello = ' ☽凌晨好! ' : Dt.h < 9 ? hello = ' ☺早上好! ' :
            Dt.h < 12 ? hello = ' ☼上午好! ' : Dt.h < 14 ? hello = ' ☺中午好! ' :
            Dt.h < 17 ? hello = ' ❀下午好! ' : Dt.h < 19 ? hello = ' ☆傍晚好! ' :
            Dt.h < 22 ? hello = ' ☪晚上好! ' : hello = '夜深了,请早点休息! ';
        return {
            a: a,
            Dt: Dt,
            hello: hello
        };
    },
    date: function () {
        var T = dateTime.timers().Dt,
            tdate = T.y + "年" + T.m + "月" + T.d + "日";
        if (SE("#date")) {
            sE(SE("#date"), 'font-size:13px');
            oE(SE("#date"), tdate + ' ' + T.hms + ' ' + T.w + dateTime.timers().hello);
        }
    }
};
/*初始化加载器*/
document.onreadystatechange = function () {
    if (D.readyState === "complete") OE.imgLazy();
};