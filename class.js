var Klass = (function () {
    var private_static_field = 'private_static_field';
    var private_static_method = function (instance) {//替代实例的私有方法，且只用于计算

    };

    var constructor = function () {
        console.log(arguments);
        var private_instance_field = 'private_instance_field';
        var private_method = function () {//会创建多次，意义不大，不如用类的私有方法
            return private_instance_field;
        };

        this.public_instance_field = 'public_instance_field';
        this.public_instance_method = function () {//每创建一个实例会创建一个函数
            console.log(private_method());
            console.log(this.protected_instance_method());
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

    var fields = this.constructor.prototype;
    fields['default'] = fields['default'] || console.log('default') || this;
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
        fields['default'] = fields['default'] || console.log('default') || this;
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