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
    res.sendFile(__dirname + '/index3.html');
});

/*  This is auto initiated event when Client connects to Your Machien.  */

io.on('connection',function(socket){  
    console.log("A user is connected");
    socket.on('status added',function(status){
      fs.appendFileSync('message4.txt', util.inspect(status)+"\n",'utf8');
    });
});

//deleting the dATA  LINE BY LINE
var filePath = './message4.txt'; // path to file

fs.readFile(filePath, function(err, data) { // read file to memory
    if (!err) {
        data = data.toString(); // stringify buffer
        var position = data.toString().indexOf('\n'); // find position of new line element
        if (position != -1) { // if new line element found
            data = data.substr(position + 1); // subtract string based on first line length

            fs.writeFile(filePath, data, function(err) { // write file
                if (err) { // if error, report
                    console.log (err);
                }
            });
        } else {
            console.log('no lines found');
        }
    } else {
        console.log(err);
    }
});


//I am reading the xml file from path using this code
   var stream = fs.createReadStream('message4.txt');
   stream.setEncoding('utf8');
   stream.on('data', function (chunk) {
     var text=chunk.toString('utf8');
	 console.log(text);
	 console.log(text.endsWith('!'));
	 if(text.startsWith("'$SIWI"))
	 {
	 
	 var textnew= text.substring(2,text.length-12);
	var arr=textnew.split(',');
	 
	console.log(arr[0]);
	console.log(arr[33]);
     //here is the error i.e invalid syntax in MySQL query
	 pool.getConnection(function(err,connection){
        if (err) {
          callback(false);
          return;
        }
    connection.query('insert into device2 (MessageStart,vts_unit_no,msg_serial_no,reason,command_code,Commandkeyvalue,ignition,power_cut,box_open,msg_key,odometer,speed,sat_visible,gps_fixed,lat,lang,altitude,direction,time,date,gsm_strength,gsm_register,gprs_server_data,reserved_1,in_battery,ext_battery,digital_io,analog_in_1,analog_in_2,analog_in_3,analog_in_4,hw_version,sw_version,data_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12],arr[13],arr[14],arr[15],arr[16],arr[17],arr[18],arr[19],arr[20],arr[21],arr[22],arr[23],arr[24],arr[25],arr[26],arr[27],arr[28],arr[29],arr[30],arr[31],arr[32],arr[33]], function(err,data){
    //...
  });        
   });
	 }
	 
   });
http.listen(80,function(){
    console.log("Listening on 80");
});