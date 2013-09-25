utils = {
    define_package:function(package_name){
        /**
         *  utils.define_package('hello.package.test');
         * @type {Array}
         */
        var packages = package_name.split('.');
        for (var i = 0, object = window, name = null; i < packages.length;i++){
            name = packages[i];
            object[name] = object[name] || {};
            object = object[name];
        }
        return object;
    }
};