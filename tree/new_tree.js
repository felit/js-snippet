var Tree = (function () {
    //代表节点
    var Item = function (key, title, parent_key, options) {
        var tree = options.tree;
        var children;
        var parent;
        this.key = function () {
            return key;
        };

        this.title = function () {
            return title;
        }

        this.parent_key = function () {
            return parent_key;
        };

        this.values = this.options = function () {
            return options;
        };

        this.children = function () {
            return children = children || tree.children(this.key());
        };
        this.parent = function () {
            return parent = parent || parent_key && tree.items(parent_key);
        };
        this.tree = function () {
            return tree;
        }
    };

    Item.prototype = {
        level: function () {
            return this.ancestors(true).length;
        }, descendants: function () {
            var result = [this];
            var children = this.children();
            for (var i = 0; i < children.length; i++) {
              result = result.concat(children[i].descendants());
            }
            return result;
        }, descendant_keys: function () {
            return array_map(this.descendants(), function (self) {
                return self.key();
            })
        }, ancestors: function (self) {
            var result = self ? [this] : [];
            for (var tmp = this; tmp.parent();) {
                tmp = this.parent();
                result.unshift(tmp);
            }
            return result;
        }, toString: function () {
            return "title:" + this.title() + ', key:' + this.key() + ', parent_key:' + this.parent_key();
        }
    };
    Item.new = function (key, title, parent_key, options) {
        return new Item(key, title, parent_key, options);
    };

    //选择器
    var Selector = function (tree, options) {
        var selected = [];
        var unselected = [];
        this.tree = function () {
            return tree;
        };
        this.selected = function () {
            return selected;
        };
        this.unselected = function (values) {
            if (values) {
                unselected = values;//TODO fixbug
            } else {
                var result = [];
                var selected = this.selected();
                for (var i = 0; i < selected.length; i++) {
                    result.concat(this.tree().items(selected[i]).descendant_keys());
                }
                return result;
            }
        }
    };

    Selector.prototype = {
        select: function (key) {
            if (!this.is_selected(key)) {
                this.selected().push(key);
            }
            return this.selected();
        }, unselect: function (key) {
            if (this.is_selected(key)) {
                array_remove(this.selected(), key);
            }
            return this.selected();
        }, is_selected: function (key) {
            return array_index(key, this.selected()) >= 0;
        }, toggle: function (key) {
            if (this.is_selected(key)) {
                this.unselect(key);
            } else {
                this.select(key);
            }
        }
    };
    var con = function (options) {
        /*if(this.constructor!==con){
         throw new Error('不可以当做函数来调用！');
         }*/
        var cache = {
            roots: null
        };
        var selector = new Selector(this, options);
        this.selector = function () {
            return selector;
        };
        var item_cache = {}; //items项的缓存
        this.roots = function () {
            var roots = cache['roots'];
            if (!roots) {
                roots = cache['roots'] = [];
                var tmp;
                for (var i in item_cache) {
                    tmp = item_cache[i];
                    if (!tmp.parent()) {
                        roots.push(tmp);
                    }
                }
            }
            return roots;
        }
        /**
         * tree.items(300,Item.new(300,'title',100,{a:1,b:2}))
         * tree.items(200)
         */
        this.items = function (key, item) {
            if (item) {//设置值
                item_cache[key] = item;
                return item_cache;
            } else if (key) {
                return item_cache[key];
            } else {
                return item_cache;
            }
        };
    }

    con.prototype = {
        debug: function () {
            console.log('items:' + this.items());
        }, children: function (key) {
            /**
             * 返回key对应的children,无则返回[]
             * @param key
             */
            var result = [];
            var items = this.items();
            for (var i in items) {
                if (key == items[i].parent_key()) { //TODO
                    result.push(items[i]);
                }
            }
            return result;
        }
    };
    con.Item = Item;
    con.new = function (adapter, options) {
        var tree = new con(options);
        if (typeof adapter === 'string') {// 内置适配器
            throw new Error('unimplement');
        } else if (typeof adapter === 'function') {// 自定义适配器
//            throw new Error('unimplement');
        } else {//默认适配器
            options = adapter;
            adapter = ObjectAdapter;
        }
        return adapter(tree, options.list);
    };
    return con;
})();

// select占位符
var Placeholder = function () {

};
/**
 * 用于构造树适配器
 * 集合类型{<key>:{<title>:'title value',<parent>:'others',others:{a:1,b:2}}}
 * @param object
 * @constructor
 */
var ObjectAdapter = function (tree, object) {
    for (var key in object) {
        var tmp = object[key];
        tree.items(key, Tree.Item.new(key, tmp.n, tmp.p, {tree: tree}));
    }
    return tree;
};

var array_index = function (elem, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (elem == arr[i]) {
            return i;
        }
    }
    return -1;
};

var Render = (function () {

})();

var array_map = function (coll, func) {
    var result = [];
    for (var i = 0; i < coll.length; i++) {
        result.push(func(coll[i]));
    }
    return result;
};

var array_reduce = function (arr, elem) {
    array_reduce_all(arr, [elem]);
};

var array_reduce_all = function (arr, elems) {

};
tree = Tree.new(ObjectAdapter, {list: {1: {n: 'name1'}, 2: {n: 'name2'}, 3: {n: 'name3', p: 2}}});

(function (tree) {
    var array_group = window.group = function (list, num, callback) { //对list进行分组
        var result = [];
        var total_rows = Math.ceil(list.length / num);
        for (var row = 0; row < total_rows; row++) {
            var rows = [];
            for (var col = row * num; col < Math.min(list.length, (row + 1) * num); col++) {
                rows.push(list[col]);
            }
            if (callback) {
                result.push(callback(rows, num));
            } else {
                result.push(rows);
            }
        }
        return result;
    };

    var object_group = window.object_group = function(object,num,callback){
        var result = [];
        var keys = [];
        for(var i in object){
            keys.push(i);
        }
        var total_rows = Math.ceil(keys.length / num);
        for (var row = 0; row < total_rows; row++) {
            var rows = [];
            for (var col = row * num; col < Math.min(keys.length, (row + 1) * num); col++) {
                rows.push(object[keys[col]]);
            }
            if (callback) {
                result.push(callback(rows, num));
            } else {
                result.push(rows);
            }
        }
        return result;
    }

    var group = window.group = function (coll, num, callback) { //对list进行分组
        return !!coll.length ? array_group(coll,num,callback) : object_group(coll,num,callback) ;
    };


    var html = group(tree.roots(), 3, function (rows) {
        var result = '<div class="group">';
        for(var i =0; i < rows.length;i++){
            var item = rows[i];
            result = result + "<div class='item'>"+item.title()+"</div>";
        }
        result = result + '</div>';
        return result;
    }).join();

    document.write(html);
})(tree);



Type={
    is_array:function(object){

    },is_object:function(object){

    },is_null:function(object){

    },is_string:function(object){

    },is_date:function(object){

    }

}

