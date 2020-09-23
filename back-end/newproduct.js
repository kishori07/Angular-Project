var express=require("express");
var app=express();
var mysql=require("mysql");

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myproducts",
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers",    "Origin, X-Requested-With, Content-Type, Accept"  );  
    res.setHeader("Access-Control-Allow-Methods",    "GET, POST, PATCH, PUT, DELETE, OPTIONS"  );  
    next();
  });

  con.connect(function(err){
    if (err){
        console.log(err);
        throw err;
    }
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/productList",function(req,res){
    con.query("select * from itemList",function(err,result){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            const dt=JSON.stringify(result);
            res.send(dt);
         }
    });
});
app.get("/productList/:id",function(req,res){
    const id=req.params.id;
    con.query("select * from itemList where id=?",[id],function(err,result){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            // const data=JSON.stringify(result);
            if(result.length>0){
                res.json(result[0]);
            }
                else{
                    res.json(null); 
                }
            }
        });
});
app.delete("/productList/:id",function(req,res){
    const id=req.params.id;
    con.query("delete from itemList where id=?",[id],function(err,result){
        if(err){
            console.log(err);
        }else{
            if(result.affectedRows>0){
            res.json("Data deleted");
            }
            else{
                res.json("data not deleted/not found");
            }
        }
    });
});

app.put("/productList/:id",function(req,res){
    const data=req.body;
    console.log(data);
    const id=req.params['id'];
    con.query("update itemList set code=?, pname=?,price=?,qty=? where id=?",[data.code,data.pname,data.price,data.qty,id],(err,result)=>{
        const r={};
        if(err){
            console.log(err);
            r.status="Fail",
            r.message=err.sqlMessage;
        }else{
            if(result.affectedRows>0){
            r.status="Success";
            r.message=`Data Updated for id: ${id}`;
            }else{
                r.status="Fail";
                r.message=`Data not found for id: ${id}`;
            }
        }
        res.json(r);
    });

});


app.post("/productList",function(req,res){
    const data=req.body;
    console.log(data);
    const id=data.id;
    const code=data.code;
    const nm=data.pname;
    const price=data.price;
    const qty=data.qty;

    const a=[id,code,nm,price,qty];

    con.query("insert into itemList values(?,?,?,?,?)",a,function(err,result){
        const r={};
        if(err){
            console.log(err);
            r.status="Fail",
            r.message=err.sqlMessage;
        }else{
            const c=result.affectedRows;
            r.status="Success";
            r.message="Data Inserted"+c;
        }
        res.json(r);
    });
});

app.listen(3000,function(){
    console.log("Server ready on port 3000");
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
    console.log('Closing mysql connection.');
    con.end((err) => {
        console.log(err);
    }, () => {
        console.log("MySQL Closed");
    });
});



