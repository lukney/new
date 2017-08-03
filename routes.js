module.exports=function(express,app){
	var router=express.Router();
router.get('/',function(req,res,next){
	res.render('index1',{title:'Welcome'});
})
router.get('/',function(req,res,next){
	res.render('index2',{title:'Welcome'});
})
app.use('/',router);
}