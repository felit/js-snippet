test('define_class',function(){
    var klass = define_class(function(){
        this.attr({a:1,b:[1,2,3,4]},'attr1',['attr2','attr3']);
    });
    var ins = klass.new();
    var ins2 = klass.new();
    ok(ins.a()==1,'attribute default value is successful!');
    ins.a(300);
    ok(ins.a()==300,'set attribute successful');
    ok(ins.a() != ins2.a(),'');
});