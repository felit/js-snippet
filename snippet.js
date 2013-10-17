a = (function () {
    var node_cache;//缓存
    var Item = function (key) {

    };
    return function(key){
        return node_cache[key] = node_cache[key] || new Item(key);
    };
})();


a(100);




//缓存清除方法
function clean() {//调用时再刷新，适合：粗力度，省时

};
function fresh() {//更新时刷新，适合：细粒度,耗时

}


//验证for语句   的调用次数
for(var i= 0,num=0; i < (function(){console.log(++num);return 20})(); i++){ }
b=[1,2,3,4,5,6,7,8]

for(var i= 0,len= b.length;i<len;i++){

}
//递归
var children_keys = function (parent_key) {
    var children = self.items(parent_key).children();
    var result = [].concat(children);
    for (var i = 0; i < children.length; i++) {
        result.concat(children_keys(children[i].key()));
    }
    return result;
};


var k = function(item){
    var result = [item];
    var children = item.children();
    for(var i=0 ;i < children.length; i++) {
        result.concat(k(children[i]));
    }
    return result;
}