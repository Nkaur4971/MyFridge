/*Get display list of items Page
*/
module.exports.displayList = function(req, res){
res.render('displayList', { title: 'Express MEAN' });
};
/*Get Creating and editing an item Page
*/
module.exports.createEdit = function(req, res){
res.render('createEdit', { title: 'Express MEAN' });
};