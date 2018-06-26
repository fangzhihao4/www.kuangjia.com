var api = require("../../api.js"), app = getApp(), is_no_more = !1, is_loading = !1, p = 2;

Page({
    data: {
        status: -1,
        list: [],
        hidden: -1
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        is_loading = is_no_more = !1, p = 2, this.GetList(t.status || -1);
    },
    GetList: function(t) {
        var a = this;
        a.setData({
            status: parseInt(t || -1)
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.request({
            url: api.share.get_order,
            data: {
                status: a.data.status
            },
            success: function(t) {
                a.setData({
                    list: t.data
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    click: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            hidden: this.data.hidden == a ? -1 : a
        });
    },
    onReachBottom: function() {
        var s = this;
        is_loading || is_no_more || (is_loading = !0, app.request({
            url: api.share.get_order,
            data: {
                status: s.data.status,
                page: p
            },
            success: function(t) {
                if (0 == t.code) {
                    var a = s.data.list.concat(t.data);
                    s.setData({
                        list: a
                    }), 0 == t.data.length && (is_no_more = !0);
                }
                p++;
            },
            complete: function() {
                is_loading = !1;
            }
        }));
    }
});