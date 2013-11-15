(function (win) {
    var href = win.document.location.href;
    var URI = (function (href) {
        var reg = /^\w*:\/\/[.*@]?.*[:\d]{1,5}[\/]/;
        var r = reg.exec(href);
        return {
            hostname:href.hostname,
            port:href.port,
            protocol:href.protocol,
            pathname:href.pathname,
            search:function(){},
            hash:href.replace(/^#/)
        };

    })(href);
    var i =0;
    var normalize = function (query_string,value) {
        var name = query_string.match(/[^\[|\]]*/);
        var str = query_string.replace(new RegExp('^' + name), '');
        if(i++ > 10){
            return;
        }

        var result = {};
        console.log(name, query_string);
        if(name&&name[0].length==query_string.length){
            result[name] = value;
            return result;
        }else if (!name&&query_string.slice(0,2)=='[]'){
            if(query_string=='[]'){
                return [value];
            } else{
               return [normalize(query_string.slice(2,query_string.length),value)];
            }
        }else{
            var rex = new RegExp('^\\[?([^\\[|\\]]{1,})\\]?');
            console.log(str.replace(rex, '$1'));
            result[name]= normalize(str.replace(rex, '$1'),value);
            return result;
        }
    };
    window.normalize = normalize;
    win.Env = function () {

    };
})(window);