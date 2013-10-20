var comparator = function (a, b) {
//    console.log(a, b);
    return a >= b;
};


var attr_reader = function (attr) {
//        this[attr] = new Function('_'+attr,'return ' + attr + '= _' + attr + '||' + attr);
    this[attr] = function (_argument) {
        return eval(attr) || _argument;
    }

};





/**
 * TODO 创建大量拥有大量属性的对象是的性能问题
 * attr({a:300,
 *       b:[200,function(){
 *
 *       }]
 * },'hello','world')
 * @param attr
 */
var attr = function () {
    for(var i= 0,len=arguments.length;i<len;i++){
        var attr = arguments[attr];
        if(is_object){

        }else if(is_array){

        }else if(is_string){
            console.log(attr);
            this[attr] = new Function('var ' + attr + ';return function(_'+attr+'){return ' + attr + ' = ' + attr + ' || _'+attr +'}')();
        }else{
            throw new Error('');
        }
    }
};
/**
 * new 方法
 * 类属性
 */
var cattr ;
var klass = function () {
     console.log(this.constructor)
//    this.attr('h');
};
//klass.prototype.attr = attr;
//klass.prototype = extend(klass.prototype,define_helper)





