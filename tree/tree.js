/**
 * 关于树进行处理类 (不变集合)
 * TODO构造器可扩展
 */
(function (win) {
    //选择器
    var Selector = function () {

    };
    var Tree = win.Tree = (function () {
        var header;
        var selected;
        var constructor = function () {

        };

        return constructor;
    })();
    Tree.prototype = {
        root:function(){ //返回数组，可以是多个根的树

        }, descendant: function () {

        }, ancestors: function () {

        }, siblings: function () {

        }, parent: function () {

        }, children: function () {

        }, next: function () {

        }, prev: function () {

        }
    };

    // 构造适配器
    var ConstructAdapter = function (hash) {
        return new Tree();
    }
    var ArrayAdapter = function (list) {

    };
    // 渲染器
    var Render = function (tree) {

    };

    // 占位符
    var Placeholder = function () {

    }
})(window);