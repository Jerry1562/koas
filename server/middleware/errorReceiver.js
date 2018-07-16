/* 中间件栈错误收集中间件 */
module.exports=function(app){
    /* 错误收集函数 */
    const receiveError=async (ctx,next)=>{
        try{
            console.log('star');
            await next();
        }
        catch(err){
            if(err.status === 401){
                console.log(err.message);
                ctx.response.status=401;
                ctx.response.body='Protected resource, use Authorization header to get access\n';
            }else{
                console.log(err.message);
            }
        }
        finally{
            console.log('end');
        }
    };
    app.use(receiveError);
}