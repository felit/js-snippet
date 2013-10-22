test('define_class',function(){
    var klass = define_class(function(){
        this.attr({a:1,b:[1,2,3,4],c:true},'attr1',['attr2','attr3']);
    });
    var ins = klass.create();
    var ins2 = klass.create();
    ok(ins.a()==1,'attribute default value is successful!');
    ins.a(300);
    ok(ins.a()==300,'set attribute successful');
    ok(ins.a() != ins2.a(),'');

    ok(ins.c() === true, '');
    ins.c(false);
    ok(ins.c() === false, '');


});
test('define_class attr_reader', function () {
    var klass = define_class(function () {
        this.attr_reader({a: 100, b: 200, c: 300});
    });
    var ins = klass.create();
    ok(ins.a() == 100, 'attr_reader is ok!');
    ok(ins.b() == 200, 'attr_reader is ok!');
    ins.c(400);
    ok(ins.c() == 300, 'attr_reader is ok!');
});