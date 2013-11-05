var Klass = (function () {
    var private_static_field = 'private_static_field';
    var private_static_method = function (instance) {//替代实例的私有方法，且只用于计算

    };

    var constructor = function () {
//        console.log(arguments);
        var private_instance_field = 'private_instance_field';
        var private_method = function () {//会创建多次，意义不大，不如用类的私有方法
            return private_instance_field;
        };

        this.public_instance_field = 'public_instance_field';
        this.public_instance_method = function () {//每创建一个实例会创建一个函数
//            console.log(private_method());
//            console.log(this.protected_instance_method());
            return private_instance_field;
        }

    };

    constructor.public_class_field = 'public_class_field';
    constructor.public_class_method = function () {
        return private_static_field;
    };

    constructor.prototype.protected_instance_field = 'protected_instance_field';//作为默认值
    constructor.prototype.protected_instance_method = function () {//用于实例的助手方法，优点是：只创建一次
        //只可访问 public_instance_field与public_instance_method
        return this.public_instance_field;
    };

    constructor.new = function () {
        return new constructor(arguments);
    }
    return constructor;
})();

/*var Default = function (state) {
 var inner_state = state;
 this.state = function () {
 return inner_state || this.default.state();
 };

 var attr_reader = this.constructor.prototype;
 attr_reader['default'] = attr_reader['default'] || console.log('default') || this;
 };

 var OtherDefault = (function () {
 return {
 new: function () {
 return new Default(arguments);
 }
 };
 })();*/

//带有内部状态的Default系统
var Default = (function () {
    var constructor = function () {
        var inner_state = arguments[0];
        this.state = function () {
            return inner_state || this.default.state();
        };

        var fields = this.constructor.prototype;
        fields['default'] = fields['default'] || this;// console.log('default') ||
    };
    new constructor(arguments);// init
    return {
        new: function () {
            return new constructor(arguments);
        }, default: function () {
            return  constructor.prototype.default;
        }
    };
})();

var SingletonClass1 = {};
//包含内部状态的单态类
var SingletonClass = (function () {
    var inner_state = 'inner_state';
    return {
        state: function () {
            return inner_state;
        }
    };
})();


/**
 * TODO 添加过滤器功能
 * 定义类的实用方法
 * 添加create方法,new 方法不与IE兼容
 * 为实例添加attr方法
 * Klass = define_class(function(){
 *    this.attr({name:'class_name'});
 *    this.attr({attr1:400})
 * });
 *
 * var ins = Klass.create()
 * ins.name()-->class_name
 * ins.attr1()-->400
 *
 */
var define_class = (function () {
    /**
     * TODO 创建大量拥有大量属性的对象是的性能问题
     *
     * attr({a:300, b:200 },'hello','world')
     *
     * @param attr
     */
    var attr_accessor = function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            var attr = arguments[i];
            if (attr.constructor === Object) {
                for (var a in attr) {
                    this.attr(a);
                    this[a](attr[a]);
                }
            } else if (attr.constructor === Array) {
                for (var e = 0, l = attr.length; e < l; e++) {
                    this.attr(attr[e]);
                }
            } else if (attr.constructor === String) {
                this[attr] = (function () {
                    var inner_attr;
                    return function (_attr) {
                        return inner_attr = _attr === undefined ? inner_attr : _attr;
                    };
                })();
            } else {
                throw new Error('error');
            }
        }
    };
    var attr_reader = function (attributes) {
        for (var attr in attributes) {
            this[attr] = (function (inner_attr) {
                return function () {
                    return inner_attr;
                };
            })(attributes[attr]);
        }
    };

    /**
     * 属性代理功能，但代理后为方法，以用于即时更新
     * this.attr_delegate('street','landline',address)
     * this.street()
     * address.landline='13287654321'
     * this.landline(); //->13287654321
     * @param attributes
     * @param object
     */
    var attr_delegate = function () {
        var object = arguments[arguments.length - 1];
        var attributes = [];
        for (var e = 0, l = arguments.length - 1; e < l; e++) {
            attributes.push(arguments[e]);
        }
        for (var i = 0, len = attributes.length, attr; i < len; i++) {
            attr = object[attributes[i]];
            this[attributes[i]] = (function (attr) {
                if (typeof attr === 'function') {
                    return function () {
                        return attr.apply(object, arguments);
                    }
                } else {
                    return this[attributes[i]] = function () {
                        return attr;
                    };
                }
            })(attr);
        }
    };

    var prototype_extend = function (object) {
        for(var elem in object){
            this.prototype[elem] = object[elem];
        }
    };
    return function (func) {
        if (typeof func === 'function') {
            func.prototype.attr = attr_accessor;
            func.prototype.attr_reader = attr_reader;
            func.prototype.attr_delegate = attr_delegate;
            func.prototype_extend = prototype_extend;
            func.create = function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {//TODO 最多十个参数
                return new func(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
            };
        } else {
            throw new Error('');
        }
        return func;
    };
})();