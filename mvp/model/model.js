/**
 * 对底层数据的抽象, 基于JSON的数据库,应用于前端的后台部分
 * 1、轻量级:不使用数据库时，不产生流量
 * 2、格式灵活: 可使用 JSON XML YAML TXT等任意文件格式
 * 3、接口友好：
 * 4、数据集之间可以关联
 *
 *  --------------------------------
 *            Data API
 *  --------------------------------
 *          Data module
 *  --------------------------------
 *  AJAX XML JSON YAML TXT HTML
 *  --------------------------------
 *
 *  Model.create({
 *          products: {
 *               url:'/api/products',adapter:function(txt){
 *               }
 *          }
 *  });
 *
 *
 *  Model.create({products:{url:'/api/products.json'}})
 *  var products = Model('products')
 *  products.find('56')
 *
 *  var books = Model('books').extend(authors,function(author,book){});
 *  var the_authors = books.first.authors
 *
 *
 */



