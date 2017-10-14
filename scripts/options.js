require.config({
    baseUrl: "scripts",
    paths: {jquery: "lib/jquery.min"},
    waitSeconds: 0
}), require(["jquery", "utils/Translator"], function (a, b) {
    "use strict";

    function c(a) {
        var b = document.createElement("a"),
            c = new Blob([a], {encoding: "UTF-8", type: "application/json;charset=UTF-8"});
        b.href = URL.createObjectURL(c), b.download = "OnlineRadio.json", b.click()
    }

    function d(a) {
        var b = document.createElement("input");
        b.type = "file", b.multiple = !1, b.accept = ".json,application/json", b.addEventListener("change", function () {
            var c = b.files[0], d = new FileReader;
            d.onload = function (b) {
                a(b.target.result)
            }, d.onerror = function () {
                a(null)
            }, d.readAsText(c)
        }), b.click()
    }

    function e(c, d) {
        var e = a("<div/>", {
            "class": "station" + (d.isHidden() ? " hidden" : ""),
            "data-name": c,
            "data-type": d.type
        });
        return a("<div/>", {"class": "image"}).css("backgroundImage", d.image ? "url(" + d.image + ")" : "").appendTo(e), a("<i/>", {
            "class": "icon icon-delete",
            title: b.translate("delete")
        }).appendTo(e), a("<i/>", {
            "class": "icon icon-restore",
            title: b.translate("restore")
        }).appendTo(e), d.isUserStation() && a("<i/>", {
            "class": "icon icon-edit",
            title: b.translate("edit")
        }).appendTo(e), a("<h3/>", {"class": "title", text: d.title}).appendTo(e), e
    }

    function f() {
        if (window.location.hash) {
            var b = window.location.hash.substring(1);
            switch (b = b.split("#"), b[0]) {
                case"add":
                    h.apply(null, b);
                    break;
                case"flash":
                    j();
                    break;
                case"changelog":
                    a("#changelog").find(".message").show(), k();
                    break;
                default:
                    i()
            }
        }
    }

    function g() {
        var c = a("#addStation").html(), d = a(c);
        return b.translateAll(d), d
    }

    function h(b, c, d, e) {
        var f = g(), h = a('section[data-page="add"]');
        "string" == typeof b && (f.find('[name="title"]').val(c || ""), f.find('[name="streams"]').val(d || ""), f.find('[name="url"]').val(e || "")), a("body").attr("data-page", "add"), h.find(".addStation").remove(), h.append(f)
    }

    function i() {
        a("body").attr("data-page", "stations"), a('section[data-page="stations"]').find(".edit").removeClass("edit").find(".addStation").remove()
    }

    function j() {
        a("body").attr("data-page", "flash")
    }

    function k() {
        a("body").attr("data-page", "changelog")
    }

    function l() {
        chrome.tabs.create({url: "chrome://extensions/configureCommands"})
    }

    function m() {
        a("body").attr("data-page", "export"), a("#export").find(".export > textarea").val(r.exportData())
    }

    function n() {
        a("body").attr("data-page", "import")
    }

    function o() {
        var b = a("#corestations").empty(), c = a("#userstations").empty(), d = a("#hiddenstations").empty(),
            f = r.getStations();
        a.each(f, function (a, f) {
            var g = e(a, f);
            f.isHidden() ? d.append(g) : f.isUserStation() ? c.append(g) : b.append(g)
        }), a(".stationslist:empty").prev("h3").hide(), a(".stationslist:not(:empty)").prev("h3").show()
    }

    function p() {
        a("ul.menu").on("click", 'li[data-page="add"]', h).on("click", 'li[data-page="stations"]', i).on("click", 'li[data-page="flash"]', j).on("click", 'li[data-page="hotkeys"]', l).on("click", 'li[data-page="export"]', m).on("click", 'li[data-page="import"]', n).on("click", 'li[data-page="changelog"]', k), a("#userstations").on("click", ".station > .icon-edit", function (c) {
            c.preventDefault();
            var d = a(this).parent(".station");
            if (d.hasClass("edit")) return void d.removeClass("edit").find(".addStation").remove();
            var e = d.data("name"), f = r.getStationByName(e), h = g().data("name", e);
            h.find('[name="title"]').val(f.title), h.find('[name="url"]').val(f.url || ""), h.find('[name="image"]').val(f.image || "");
            for (var i = Object.keys(f.streams), j = h.find('[name="streams"]').val(f.streams[i[0]]), k = 1, l = i.length; l > k; k++) j = j.clone().val(f.streams[i[k]]).insertAfter(j);
            h.find('[type="submit"]').val(b.translate("save")), d.addClass("edit").append(h)
        }), a("#corestations, #userstations").on("click", ".station > .icon-delete", function (c) {
            c.preventDefault();
            var d = a(this).parent(".station"), e = d.data("name");
            window.confirm(b.translate("reallyDelete")) && (r.deleteStation(e), o())
        }), a("#hiddenstations").on("click", ".station > .icon-restore", function (b) {
            b.preventDefault();
            var c = a(this).parent(".station"), d = c.data("name");
            r.restoreStation(d), o()
        }), a(document).on("click", ".field-streams > .icon-add", function (b) {
            b.preventDefault();
            var c = a(this).siblings("input:last");
            c.clone().val("").insertAfter(c)
        }).on("click", ".field-streams > .icon-delete", function (b) {
            b.preventDefault(), a(this).siblings("input:last").remove()
        }).on("submit", ".addStation", function (b) {
            b.preventDefault();
            var c = a(this), d = {name: c.data("name")};
            c.serializeArray().forEach(function (a) {
                "streams" === a.name ? (d[a.name] = d[a.name] || [], d[a.name].push(a.value)) : d[a.name] = a.value
            }), r.addStation(d), o(), i()
        }), a("#export").on("click", ".savefile", function (a) {
            a.preventDefault(), c(r.exportData())
        }), a("#import").on("click", ".loadfile", function (b) {
            b.preventDefault(), d(function (b) {
                var c = a("#import"), d = c.find(".error"), e = c.find(".success"), f = c.find("textarea");
                b ? (f.val(b).trigger("paste"), d.hide()) : (e.hide(), d.show())
            })
        }).on("click", ".importdata", function (b) {
            b.preventDefault();
            var c = a("#import"), d = c.find(".error"), e = c.find(".success"), f = c.find("textarea"),
                g = r.importData(f.val());
            d.toggle(!g), e.toggle(g), o()
        }).on("input propertychange paste", "textarea", function () {
            a("#import").find(".importdata").attr("disabled", !this.value.length || !this.value.trim())
        })
    }

    var q = chrome.extension.getBackgroundPage(), r = q.getStorage();
    f(), o(), p(), b.translateAll()
});