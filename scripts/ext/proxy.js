!function (a) {
    "use strict";
    function b(a, b) {
        d.postMessage({action: a, data: "undefined" != typeof b ? b : null})
    }

    function c(b, c) {
        var d = {type: "fallback_to", action: b, data: "undefined" != typeof c ? c : null};
        a.postMessage(d, "*")
    }

    if (a !== a.top) {
        var d = chrome.runtime.connect({name: "proxy"});
        d.onMessage.addListener(function (a) {
            c(a.action, a.data)
        }), a.addEventListener("message", function (c) {
            c.source === a && c.data.hasOwnProperty("type") && "fallback_from" === c.data.type.toString() && b(c.data.action, c.data.data)
        }, !1)
    }
}(window);