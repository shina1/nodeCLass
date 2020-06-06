const fs = require('fs');

const server = require('http');

const url = require('url');

// const chalk = require('chalk');

// reading and writing file in node js with an fs module
 const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//  console.log(textIn);

 
// blocking synchronous way 
 const textFinal = fs.readFileSync('./txt/final.txt', 'utf-8');

//  console.log(textFinal);

 const textOutput = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;

 fs.writeFileSync('./txt/output.txt', textOutput);

 const read = fs.readFileSync('./txt/output.txt', 'utf-8');

//  console.log(read);

//  Non-Blocking Asynchronous Way
fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=>{
        // console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err,data3)=>{
            // console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err=>{
                // console.log('your file has been written');
            });
        });
    });
});

// console.log('will read file ...');

// Working on the server now
const data = fs.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const serCreated =  server.createServer((req,res)=>{
    const parthName = req.url;
    if(parthName === '/overview'){
        res.end('This is overview');
    }else if(parthName === '/product'){
        res.end('This is Product');
    }else if(parthName === '/'){
        res.end('This is landing');
    } else if(parthName === '/api'){
        res.writeHead(200, {'Content-type':'application/json'});
            res.end(data);  
    }
     else{
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header':'This is an error'
        });
        res.end('<h1>This page can not be found</h1>'); 
    }
    
});

serCreated.listen(3000, '127.0.0.1',()=>{
    console.log('Listening to request on port 3000');
});

// routing
