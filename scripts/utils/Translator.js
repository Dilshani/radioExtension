define(["jquery"], function (a) {
    "use strict";
    function b(a) {
        return chrome.i18n.getMessage(a)
    }

    function c(c) {
        c = c || a(document), c.find("[data-i18n]").each(function () {
            var c = a(this), d = c.data("i18n");
            c.html(b(d))
        }), c.find("[data-i18n-title]").each(function () {
            var c = a(this), d = c.data("i18n-title");
            c.attr("title", b(d))
        }), c.find("[data-i18n-placeholder]").each(function () {
            var c = a(this), d = c.data("i18n-placeholder");
            c.attr("placeholder", b(d))
        }), c.find("[data-i18n-value]").each(function () {
            var c = a(this), d = c.data("i18n-value");
            c.attr("value", b(d))
        })
    }

    return {translate: b, translateAll: c}
});