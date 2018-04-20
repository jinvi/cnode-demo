function s(id, num) {
    /*元素选择*/

    if (typeof id === "string") {
        num = num || 0;

        if (document.querySelector) {
            return document.querySelector(id);
        } else {
            if (/^#/.test(id)) {
                return document.getElementById(id.substr(1))
            } else if (/^\./.test(id)) {
                return document.getElementsByClassName(id.substr(1))[num];
            } else if (/^[^#\.]/.test(id)) {
                return document.getElementsByTagName(id)[num];
            }
        }
    }
}
function c(value, mar) {
    if (!mar) {
        mar = ""
    } else {
        mar = "__" + mar + "__"
    }

    try {
        if (!value) {
            throw value;
        } else {
            console.log(value);
            if (mar) {
                console.log(mar /*+ typeof value*/);
                console.log('');
            }
        }
    } catch (e) {
        console.log(e);
        if (mar)console.log(mar);
    }
}
function getClass(oParent, sClass, num) {
    /*获取类元素，num参数为要选择元素的序号（非数组下标）*/

    var aEles = oParent.getElementsByTagName("*");
    var aResult = [];

    for (var i = 0; i < aEles.length; i++) {
        if (aEles[i].className == sClass) {
            aResult.push(aEles[i]);
        }
    }

    if (num) {
        return aResult[num - 1];
    } else {
        return aResult;
    }
}
function getTag(name, num) {
    /*返回具体标签对象，num参数为要选择元素的序号（非数组下标）*/

    if (num) {
        return document.getElementsByTagName(name)[num - 1];
    } else {
        return document.getElementsByTagName(name);
    }
}
function setStyle(oj, json) {
    /*设置样式*/

    for (var attr in json) {
        oj.style[attr] = json[attr];
    }
}
function getStyle(ele, style) {
    /*获取元素计算后的样式，样式要明确，比如backgroundColor,width*/

    if (ele.currentStyle) {  // 兼容ie方法

        return ele.currentStyle[style];

    } else {  // 兼容火狐、chome

        return getComputedStyle(ele)[style];

    }
}
function setCookie(name, value, day) {
    /*设置cookie，名字/值/过期天数*/
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}

function getCookie(name) {
    /*获取cookie的值*/
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return arr[2];
    else
        return null;
}

function removeCookie(name) {
    /*删除cookie*/
    var oDate = new Date();
    oDate.setDate(oDate.getDate() - 1);
    document.cookie = name + "=;expires=" + oDate;
}
function addListener(el, type, fn, useCapture) {
    /*绑定事件*/

    useCapture = useCapture || false;

    if (el.addEventListener) {
        el.addEventListener(type, fn, useCapture);
    } else {
        el.attachEvent("on" + type, fn);  //兼容IE this指向window
    }
}
function removeListener(el, type, fn) {
    /*解除绑定事件*/

    if (el.addEventListener) {
        el.removeEventListener(type, fn, false);
    } else {
        el.detachEvent("on" + type, fn)
    }
}
function stopPro(ev) {
    /*阻止事件冒泡，为兼容firefox需把事件参数传进来*/

    ev = ev || event;

    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else {
        ev.cancelBubble = true;  //兼容IE
    }
}
function drag(id) {
    //拖拽目标元素

    var oId = document.getElementById(id);

    oId.style.cssText += "position: absolute";

    oId.onmousedown = function (ev) {

        var oEvent = ev || event;
        var x = oEvent.clientX - oId.offsetLeft;
        var y = oEvent.clientY - oId.offsetTop;

        document.onmousemove = function (ev) {

            var oEvent = ev || event;

            oId.style.left = oEvent.clientX - x + "px";
            oId.style.top = oEvent.clientY - y + "px";
        };

        document.onmouseup = function () {

            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
function ajaxProm(url, fnDone) {
    var prom = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('get', url, true);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                //请求完成
                if (request.status == 200) {
                    //请求成功
                    fnDone(request.responseText);
                } else {
                    //请求失败
                    reject(Error(request.statusText))
                }
            }
        };

        request.onerror = function () {
            reject(Error('There was a network error.'));
        };

        request.send();
    });

    return prom.then(fnDone, function (Error) {
        console.log(Error);
    })
}
function ajax(url, fnDone, fnFalse) {
    var oAJAX;

    if (window.XMLHttpRequest) {
        oAJAX = new XMLHttpRequest();
    } else {
        //兼容IE5/6
        oAJAX = new ActiveXObject("Microsoft.XMLHTTP");
    }

    oAJAX.open("GET", url, true);
    oAJAX.send();

    oAJAX.onreadystatechange = function () {
        if (oAJAX.readyState == 4) {
            //请求完成
            if (oAJAX.status == 200) {
                //请求成功
                fnDone(oAJAX.responseText);
            } else {
                //请求失败
                if (fnFalse) {
                    fnFalse();
                }
            }
        }
    };
}
function distinct(arr) {
    //去掉数组重复项

    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                break;
            }
        }
    }
    return arr;
}
function trimCustom(str) {
    /*去掉字符串开头和结尾的空格*/
    return str.replace(/^\s+|\s+$/g, "");
}
function quickSort(arr) {
    /*快速排序，利用递归方法*/

    //判断终止递归条件
    if (arr.length <= 1) {
        return arr;
    }

    var aLeft = [];
    var aRight = [];
    var nCompare = arr.splice(0, 1);
    var i;

    for (i = 0; i < arr.length; i++) {
        if (arr[i] < nCompare) {
            aLeft.push(arr[i]);
        } else {
            aRight.push(arr[i]);
        }
    }

    return arguments.callee(aLeft).concat(nCompare, arguments.callee(aRight))
}
function mySort() {
    //参数排序

    var tags = new Array();

    tags = Array.prototype.slice.apply(arguments);

    tags.sort(function (a, b) {
        return a - b;
    });

    return tags;
}
function sum(numArr, float) {
    //求和

    float = float || 3;
    var result = 0;
    var pow = Math.pow(10, float);

    for (var i = 0; i < numArr.length; i++) {
        result += !isNaN(numArr[i]) && parseFloat(numArr[i]) || 0
    }

    return result.toFixed(float) * pow / pow
}
function ranArr(arr) {
    const result = [];

    for (let i = 0, l = arr.length; i < l; i++) {
        const num = Math.floor(Math.random() * arr.length);
        result.push(arr[num]);
        arr.splice(num, 1)
    }

    return result;
}
function escapeRegExp(string) {
    //将用户输入转义为正则表达式中的一个字面字符串
    //$&表示整个被匹配的字符串
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$&");
}
function toTop(el,displayScreenScale,speedScale) {
    //页面置顶

    var oTop = el,screenHeight,
        scrollTop,
        scrollTopEnd,
        timer,
        speed;

    oTop.onclick = function () {
        timer = setInterval(function () {
            if (scrollTop <= 0) {
                clearInterval(timer)
            }
            speed = Math.ceil(scrollTop / speedScale);
            scrollTop -= speed;
            document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
        }, 30);
    };

    window.onscroll = function () {
        screenHeight = window.innerHeight || document.documentElement.clientHeight;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if (scrollTop >= screenHeight * displayScreenScale) {
            setStyle(oTop, {display: "block"});
        } else {
            setStyle(oTop, {display: "none"});
            scrollTopEnd = document.body.scrollTop || document.documentElement.scrollTop;
        }
    };

    function setStyle(oj, json) {
        /*设置样式*/
        for (var attr in json) {
            oj.style[attr] = json[attr];
        }
    }
}

//export {s,c,setStyle,getStyle,stopPro,addListener,removeListener};
module.exports = {s, c, ranArr, getStyle, setStyle};