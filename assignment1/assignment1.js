const fs=require("fs");
const http=require("http");
const PORT=8899;
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        fs.readFile('assignment1.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    })
    }
    else if(req.url=="/createfile"){
        if(fs.existsSync("neosoft.txt")){
            res.end("<html><body><h2>Already exists</h2></body></html>");
            // res.write("location.assign('/')");
        }
        else{
            fs.writeFile('neosoft.txt',"Welcome to Neosoft!",(err)=>{
                if(err) throw err
                else res.end('<html><body><h2>File Created</h2></body></html>');
            })
        }
    }
    else if(req.url=="/readdata"){
        if(fs.existsSync("neosoft.txt")){
            let data=fs.readFileSync("neosoft.txt");
            res.end(data.toString());
        }
        else{
            res.end("<html><body><h2>File is not exists</h2></body></html>");
        }
    }
    else if(req.url=="/deletefile"){
        if(fs.existsSync("neosoft.txt")){
            fs.unlink("neosoft.txt",(err)=>{
                if(err) throw err
                else res.end("<html><body><h2>File deleted</h2></body></html>");
            })
        }
        else{
            res.end("<html><body><h2>File is not exists</h2></body></html>");
        }
    }
    else if(req.url=="/append"){
        if(fs.existsSync("neosoft.txt")){
            fs.appendFile("neosoft.txt"," Data added!",(err)=>{
                if(err) throw err;
                else res.end("<html><body><h2>Data Updated</h2></body></html>");
            })
        }
        else{
            res.end("<html><body><h2>File is not exists</h2></body></html>");
        }
    }
})
server.listen(PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`Server work on ${PORT}`);
    }
})
console.log("Program End");