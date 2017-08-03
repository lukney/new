var express =require('express'),
    app     =express(),
    path    =require('path')

    app.set('public',path.join(__dirname,'public'));
    app.engine('html',require('hogan-express'));
    app.set('view-engine','html');
    app.use(express.static(path.join(__dirname,'public')));
  require('./public/routes.js')(express,app);

    app.listen(3000,function(){
       console.log('listening on 3000');
    });