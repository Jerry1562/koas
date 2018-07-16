/* 注册中间件 */
const creatjwt = require('jsonwebtoken');
const axios = require('axios');
const sha1 = require('sha1');
module.exports=function(app,route,path,secret){
    function creatKey(){
        const now = Date.now();
        const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
        return appKey;
    }
/* 注册处理函数 */
    const register=async (ctx,next)=>{
        const newuser=ctx.request.body;//获得用户信息
        console.log(`用户${newuser.username}尝试注册`)
        
        /* 传递回数据库处理 */
        /* 判断用户是否存在 */
        /* 否，注册成功 */
        /* 是，注册失败 */
        const tokenpayload= await axios.request({
            url:'/mcm/api/user',
            method:'post',
            baseURL:'https://d.apicloud.com/',
            data:newuser,
            headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json'
            },
            timeout:3000
        })
        .then((res)=>{//无论对错都会链接成功
            console.log('请求完成');
            console.log(res.status);
            return {
                id:res.data.id,
                username:res.data.username,
                statusCode:res.status
            };
        })
        .catch((err)=>{
            console.log('请求失败');
            console.log(err);
            ctx.response.body={
                isOK:false,
                msg:'链接超时注册失败'
            };
        })
        
            
        if(tokenpayload.statusCode == 200){
            console.log(`新用户${newuser.username}已注册`);
            ctx.response.body={
                isOK:true,
                msg:'注册成功！',//200
                payload:tokenpayload
            }
        }else{
            console.log('注册失败，用户已存在');
            ctx.response.body={
                isOK:false,
                msg:'此用户已存在!',//202
                payload:tokenpayload
            }
        }
    };
    app.use(route.post(path,register));
}