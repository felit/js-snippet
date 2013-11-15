(function () {
    /**
     * autocomplete(element,url)
     *
     */
    var autocomplete = (function () {
        var con = function () {
            var fields = { url: '', element: null, defer: null};
            //TODO 键盘时间
            //TODO JSON 回调
            //TODO 延时处理
            //TODO 鼠标事件 选中事件
            //TODO 分可编辑与不可编辑
            this.fields = function () {
                return fields;
            };
            this.defer = function () {
                return fields.defer = fields.defer || Defer.new(300, function(){

                });
            }
        };
        con.prototype = {
            init: function () {
                var element = this.fields('element');
                $(element).keyup(function () {

                });
            }
        };
        return con;
    })();


    /**
     * var defer = Defer.new(300,function(){})
     * defer.exec(function(){
     *
     * })
     */
    var Defer = (function () {
        var con = function (time_len, func) {
            attr_reader({time_len:time_len,func:func},'timer_handler','completed')
            attr_reader(['timer_handler','completed'])
            var timer_handler;
            var completed;
            this.completed = function (_completed) {
                if (_completed===undefined) {
                    completed = _completed;
                }
                return completed;
            }
            this.attr()
            this.time_len = function (_time_len) {
                return time_len = _time_len || time_len ;
            };
            this.timer_handler = function (handler) {
                return timer_handler = handler || timer_handler;
            };
            this.func=function(){
                return func;
            }
        };
        return con;
    })();

    Defer.prototype = {
        exec: function (func) {
            window.clearTimeout(this.timer_handler());
            var self = this;
            func = this.func();
            var handler = window.setTimeout(function () {
                func();
                self.completed(true);
            }, this.time_len());
            this.timer_handler(handler);
        }, clear: function () {
            window.clearTimeout(this.timer_handler());
        }
    };
    Defer.new = function (time_len, func) {
        return new Defer(time_len, func);
    };
    window.Defer = Defer;
})();