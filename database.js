const{Client} = require ('pg')
const client = new Client ({ 

    
    host: "localhost",
    user: "postgres",
    password :"BRENDALINDA",
    database:"projeto",
    port: 5432
})
client.connect();
client.query(`Select * from clientes`,(err, res) =>{
    if(!err){
        console.log(res.rows); 
    }else{
        console.log(err.message);
    }
    client.end;
})
