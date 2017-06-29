var getDom = function(id) {
        return document.getElementById(id);
    } //获取id的对象
var getClass = function(id, cls) {
        var el = document.getElementById(id) || document;
        var al = el.getElementsByTagName("*");
        var a = [];
        for (var i = 0; i < al.length; i++) {
            if (al[i].className.indexOf(cls) != -1) {
                a.push(al[i]);
            }
        }
        return a;
    } //获取class的对象

var getTagName = function(id, tagname) {
        var el = getDom(id) || document;
        return el.getElementsByTagName(tagname);
    } //获取标签的对象


function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
} //获取对象的css属性


var addEvent = function(id, e, fn) {
        var el = getDom(id) || document;
        if (el.addEventListener) {
            el,
            addEventListener(e, fn, false);
        }
        else if (el.attachEvent) {
            el.attachEvent('on' + event, fn);
        }
    } //绑定事件

//封装事件代理函数：
var onEvent = function(target, event, fn) {
    addEvent(document, event, function(e) {
        if (e.target.nodeName == target.toUpperCase()) {
            fn.call(e.target);
        }
    });
};

var ajaxget = function(url, callback) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parsr(xhr.responseText));
        }
    }
    xhr.open('get', url, true);
    xhr.send(null);
}
var ajaxpost = function(url, string, callback) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('post', url, true);
    xhr.send(string); //要传到服务器的值
}
