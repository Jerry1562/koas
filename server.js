const koa = require('koa');
const app = new koa();
const fs =require('fs');
const router =require('koa-route');
const axios = require('axios');
const sha1 = require('sha1');
const serve = require('koa-static');
const path = require('path');


function creatKey(){
    const now = Date.now();
    const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
    return appKey;
};

const main=ctx=>{
    ctx.response.type='html';
    ctx.response.body=fs.createReadStream('./template.html');
};
const gets=ctx=>{
    console.log(`${new Date()} ${ctx.request.method} ${ctx.request.url}`);
    ctx.response.type='text';
    const man ={
        'name':'jerry'
    }
    ctx.response.body=man.name;
};
const static=serve(path.join(__dirname,'./static'))

const redirect=ctx=>{
    ctx.response.redirect('/change');
}


const answer=async function(ctx,next){
    await axios.request({
        url:'/mcm/api/students',
        method:'post',
        baseURL:'https://d.apicloud.com/',
        data:{
            'name':'jerry', 
            'age':'26'
        },
        headers:{
            'X-APICloud-AppId':'A6074513694089',
            'X-APICloud-AppKey':creatKey(),
            'Content-Type':'application/json'
        },
        timeout:1000
     })
    .then((res)=>{
       ctx.response.body=res.data;
    })
    .catch((error)=>{
       ctx.response.body='error';
    })
}



app.use(async (ctx,next)=>{
  try{
    console.log('check');
    await next();
}
  catch(err){
    console.log(err.message);
    ctx.response.body="请先登录";
}
finally{
    console.log('end');
}
});
app.use(router.get('/',main));
app.use(static);
app.use(ctx=>{
    if(!ctx.request.Authorization)
    throw new Error('without token!');
});

app.use(router.get('/re',redirect));

app.use(router.get('/change',gets));
app.use(router.get('/test1',answer));
app.listen(8080);