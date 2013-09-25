/**
 * fragment:代表代码片段
 *
 * var fragment = Fragment.new('page-publishing',{elem:root_elem,url:url,order:'created_at',order_type:'desc',page:1,per_page:20,immediate:true,method:'post'});
 *
 * var page_fresh = fragment.fresh
 * page_fresh({page:10})
 *
 * <a href="javascript:void(0);" onclick="fragment.fresh({page:2})">2</a>
 * fragment.fresh(function(elem,data,jqXHR){
 *
 * });
 * fragment.fresh({page:2},function(elem,data,jqXHR){
 *
 * });
 * @type {Function}
 */
var Fragment = (function ($) {
    var instances = {};
    var extract_params = ['url', 'method', 'immediate', 'elem', 'callback'];
    var con = function (name, options) {
        options = options || {};
        var args = inners.extract(extract_params, options, true);
        var values = {elem: args.element, url: args.url, method: args.method, options: options};
        this.name = function () {
            return name;
        };
        this.values = function () {
            return values;
        };
        if (args.immediate === true) {
            this.fresh();
        }
    };
    con.prototype = {
        url: function (data) {
            var url = this.value('url');
            if (data && this.method() == "POST") {
                url = url + (url.match(/\?\w+/) ? "&" : "") + $.param(data);
            }
            return url;
        }, elem: function () {
            return this.value('elem');
        }, callback: function () {
            return this.value('callback');
        }, has_callback: function () {
            return !!this.callback();
        }, method: function () {
            return this.value('method').toUpperCase();
        }, is_post: function () {
            return this.method() == 'POST';
        }, options: function () {
            return this.value('options');
        }, merge: function (options) {
            return $.extend(this.options(), options);
        }, value: function (key) {
            return this.values[key];
        }, fresh: function (options) {
            var data = this.merge(options);
            var callback = inners.extract(['callback'], options);
            var self = this;
            var params = {
                method: this.method(), error: function (jqXHR, textStatus, errorThrown) {
                    report_bug("请求失败:" + self.url);
                }, success: function (data, textStatus, jqXHR) {
                    if (callback) {
                        callback(self.elem, data, jqXHR);
                    } else if (self.has_callback()) {
                        self.callback()(self.elem(), data, jqXHR);
                    } else {
                        $(self.elem).html(data);//替换HTML
                    }
                }
            };
            if (this.is_post()) {
                params.data = data;
            }
            $.ajax(this.url(data), params);
        }
    };

    return {
        new: function (name, options) {
            var instance = new con(name, options);
            instances[name] = instance;
            return instance;
        }, instances: function () {
            return instances;
        }, find: function (name) {
            return instances[name];
        }
    };
})(jQuery);