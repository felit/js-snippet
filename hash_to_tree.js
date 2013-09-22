var Tree = (function () {
    var VERSION = '0.0.1';
    var DESCRIPTION = 'convert array or hash to tree structure';
    var Record = function (key, attrs) {//TODO update parent_key name
        var key = key;
        var parent_key = attrs.p;
        var title = attrs.n;
        var children;
        this.children = function () {
            children = children || [];//TODO to check
            return children;
        };
    };
    Record.prototype={
        is_top:function(){
            return !this.parent_key;
        },has_parent:function(){
            return !!this.parent_key;
        },has_children:function(){
            return this.children().length > 0;
        },add_child:function(child){
            this.children().push(child);
            return this;
        },level:function(){

        }
    };
    var constructor = function (hash) {
        var cache_hash = hash;//TODO clone method
        if (!this.valid_data(hash)) {
            throw new Error('the argument has a error type!');
        } else if (this.is_array(hash)) {
            var hash_pointers = {};
            for (var i in cache_hash) {
//                hash_pointers[i];
            }
        }

        var record;
        for (var i in cache_hash) {
            record = cache_hash[i];
            if (record.has_parent()) {
                var children = cache_hash[record.p] = cache_hash[record.p] || [];
                children.push(i);
            }
        }
        this.find = function(key){
            return new Record(key, cache_hash[key]);
        }
    };

    constructor.prototype = {
        version:function(){
            return VERSION;
        },desc:function(){
            return DESCRIPTION;
        }, is_array: function (data) {

        }, is_hash: function (data) {

        }, valid_data: function (data) {
            return this.is_array(data) || this.is_hash(data);
        },inspect:function(){

        },to_s:function(){

        },roots:function(){

        },root:function(){
            return this.roots()[0];
        }
    };

    return constructor;
})();
