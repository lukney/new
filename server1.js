var app       =     require("express")();
var mysql     =     require("mysql");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var fs        =     require("fs");  
var util      =     require("util");
/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'fbstatus1',
      debug             :   false
});


app.get("/",function(req,res){
    res.sendFile(__dirname + '/index1.html');
});
app.get("/index2",function(req,res){
    res.sendFile(__dirname + './index2.html');
});
/*  This is auto initiated event when Client connects to Your Machien.  */


  
io.on('connection',function(socket){  
    console.log("A user is connected");
    socket.on('status added',function(status){
     
    fs.appendFileSync('message4.txt', util.inspect(status)+"\n",'utf8');
      });
   
fs.readFile('message4.txt','utf8', function (err, data) {
        if(err){
return console.log(err);
      } 
   
var arr=data.split('\n');
    console.log(arr);
for(i=0;i<arr.length;i++){
var dataelement=arr[i].split(',');
console.log(dataelement);


}
});
});

  var stream = fs.createReadStream('message3.txt');
   stream.setEncoding('utf8');
   stream.on('data', function (chunk) {
     var text=chunk.toString('utf8');
     //here is the error i.e invalid syntax in MySQL query
	 pool.getConnection(function(err,connection){
        if (err) {
          callback(false);
          return;
        }
      connection.query('insert into status1(text) values(?)', [text], function(err,data){
    //...
  })        
   });

   });
    

    
   http.listen(3008,function(){
    console.log("Listening on 3008");
});