var app       =     require("express")();
var mysql     =     require("mysql");
var fs        =     require("fs");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var util      =     require("util");
/* Creating POOL MySQL connection.*/

var pool    =    mysql.createPool({
      connectionLimit   :   100,
      host              :   'localhost',
      user              :   'root',
      password          :   '',
      database          :   'real',
      debug             :   false
});

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index1.html');
});
 


/*  This is auto initiated event when Client connects to Your Machien.  */

io.on('connection',function(socket){  
    console.log("A user is connected");
    socket.on('status added',function(status){
     
    fs.appendFileSync('message1.json', util.inspect(status)+"\n",'utf8');
      });
   
});
fs.readFile('message1.json','utf8', function (err, data) {
        if(err){
return console.log(err);
        }

var arr=data.split('\n');
    console.log(arr);
for(i=0;i<arr.length;i++){
var dataelement=arr[i].split(',');
console.log(dataelement);
add_status(dataelement,function(res){
        if(res){
            io.emit('refresh feed',dataelement);
        } else {
            io.emit('error');
        }
      });
}

});


var add_status = function (dataelement,callback) {
pool.getConnection(function(err,connection){
        if (err) {
          callback(false);
          return;
        }
    connection.query("INSERT INTO `device` (`s_text`) VALUES ('"+dataelement[0]+"')",function(err,rows){
            connection.release();
            if(!err) {
              callback(true);
            }
        });
    connection.on('error', function(err) {
              callback(false);
              return;
        });
});
}
http.listen(3006,function(){
    console.log("Listening on 3006");
});