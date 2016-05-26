!function () {
    "use strict";
    function a() {
        if (g && g.classList.contains("stop")) {
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0), g.dispatchEvent(a)
        }
    }

    function b() {
        var a = document.querySelector("#player-site .channel-base script"), b = a && a.innerText, c = b && b.match(/[\'\"]pl[\"\']\s?\:\s?[\'\"]([^\'^\"]+)[\"\']/);
        return c && c[1] && decodeURIComponent(c[1].split("|").join("&"))
    }

    function c() {
        var a = '.online-radio-add-button {display:block;cursor:pointer;width:19px;height:19px;margin:5px 0 0 0;float:left;background:#fff;-webkit-mask:url("' + chrome.extension.getURL("images/38.png") + '") no-repeat center;-webkit-mask-size:19px 19px;}.online-radio-add-button:hover {background:#ef8800;}', b = document.createElement("style");
        b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
    }

    function d(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState && 200 === c.status) {
                var a = JSON.parse(c.responseText), d = a.playlist.map(function (a) {
                    var b = document.createElement("a");
                    return b.href = a.file, b.origin + b.pathname
                });
                b(d.slice(0, 5))
            }
        }, c.open("GET", a, !0), c.send(null)
    }

    function e(a, b) {
        chrome.runtime.sendMessage({name: "background", action: a, data: "undefined" != typeof b ? b : null})
    }

    var f = document.querySelector(".channel-base"), g = document.querySelector(".general_play");
    if (f) {
        var h = b();
        if (h) {
            var i = document.createElement("span");
            i.className = "online-radio-add-button", i.title = chrome.i18n.getMessage("add"), i.onclick = function () {
                d(h, function (b) {
                    a();
                    var c = document.querySelector("#channel_infoblock a:not([target])"), d = document.querySelector("#player-site .channel-base h1"), f = document.querySelector("#chan_cover img");
                    e("add", {
                        title: d ? "101.ru ● " + d.innerText : "101.ru",
                        streams: b,
                        image: f && f.src,
                        url: c && c.href,
                        name: c && c.innerText
                    })
                })
            }, c(), f.insertBefore(i, f.querySelector("#airfavmsg"))
        }
    }
}();