const koa = require('koa')

const app = new koa();

app.use(async (ctx,next)=>{
    try{
        next();
        console.log('star');
    }
    catch(err){
        console.log(err);
    }
    finally{
        console.log('end in star');
        
    }
})
app.use((ctx)=>{
    throw 'err4500';
})

app.listen(8080);