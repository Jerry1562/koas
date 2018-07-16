const axios = require('axios');
const sha1 = require('sha1');

module.exports=function(app){
    function creatKey(){
        const now = Date.now();
        const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
        return appKey;
    }
    /* 拦截器处理函数 */
    const interceptor = async function(ctx,next){
        /* 从请求头中获取token，存入payload.id */
       const payload={ 
           id:ctx.request.headers.authorization,
           userId:ctx.request.body.userId
        };
       const asktoken = await axios.request({
        url:`/mcm/api/user/${payload.userId}/accessTokens`,
        baseURL:'https://d.apicloud.com/',
        method:'get',
        headers:{
            'X-APICloud-AppId': 'A6074513694089',
            'X-APICloud-AppKey': creatKey(),
            'Content-Type':'application/json'
        },
        data:{},
        timeout:3000
    })
       .then((req)=>{
           if(req.data[0].id == payload.id){
           console.log('通过验证');
           return {
               status:req.status
           }
        }else{
            return{
                status:null
            }
        }
       })
       .catch((err)=>{
           console.log(err.message);
           return {
               status:401
           }
       });
       if(asktoken.status == 200){
           console.log('success');
           await next();
       }else{
           ctx.response.body={
               isOK:false,
               msg:'请检查网络后重新登录'
           }
       }
    };
    app.use(interceptor);
}