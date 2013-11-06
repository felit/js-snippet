module('define_class');
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


test('define_class attr_delegate', function () {
    var User = define_class(function () {
        this.attr('address');

    });
    var Address = define_class(function () {
        this.attr({street: 'default street 63',landline:'landline test'});
    });
    var user = User.create();
    var address = Address.create();
    user.address(address);
//    window.user=user;window.address=address;//to debug

    user.attr_delegate('street','landline',user.address());
    ok(user.street() == address.street(), 'attr_delegate success');
    ok(user.landline() == address.landline(), 'attr_delegate success');

    address.street('other street');
    ok(user.street() == address.street(), 'attr_delegate success after delegate target\'s updated');

    address.hello = 900;
    address.world= 800;
    address.point= 700;
    user.attr_delegate('hello','world','point',user.address());
    ok(user.hello() == address.hello, 'successful for field');
    ok(user.world() == address.world, 'successful for field');

});

test('defined_class attr_delegate', function () {
   var User = define_class(function(address){
       this.attr({address: address});
       this.attr_delegate('street', 'landline', address);
   });

    var Address = define_class(function () {
       this.attr({street:'default street 63',landline:'landline'})
    });

    var address = Address.create();
    var user = User.create(address);
    ok(address.street() == user.street(),'successful');
});

test('defined_class prototype_extend', function () {
    var User = define_class(function () {

    });
    User.prototype_extend({hello: 'world'});
    var user = User.create();
    ok(user.hello == 'world', 'prototype successful');
});