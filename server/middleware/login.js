/* 登录中间件 */
const creatjwt = require('jsonwebtoken');
const axios = require('axios'); 
const sha1 = require('sha1');

module.exports=function(app,route,path,secret){
    function creatKey(){
        const now = Date.now();
        const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
        return appKey;
    }
    
/* 登录处理函数 */
    const login=async (ctx,next)=>{
        const user=ctx.request.body;
        console.log(`用户${user.username}正在登录中`);
    
        /* 传递回数据库处理 */
        const tokenpayload = await axios.request({
            url:'/mcm/api/user/login',
            method:'post',
            baseURL:'https://d.apicloud.com/',
            data:user,
            headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json'
            },
            timeout:3000
            })
        .then((res)=>{//登录成功则使用触发then，登录失败则触发catch
            console.log('请求完成');
            console.log(res.status);
            return {
                userId:res.data.userId,
                id:res.data.id,
                statusCode:res.status
            }
        }
        )
        .catch((err)=>{
            console.log(err.response.status);
            console.log(err.response.statusText)
            return {
                statusCode:err.response.status,
                statusText:err.response.statusText
            }
        })
        if(tokenpayload.statusCode == 200){
            console.log(`用户${user.username}已登录`)
            ctx.response.body={
                isOK:true,
                msg:'登录成功！',
                payload:tokenpayload
            };
        }else{
            console.log('登录失败')
            ctx.response.body={
                isOK:false,
                msg:'用户名或密码出错',
                payload:tokenpayload
            };
        }
    
    }; 

    app.use(route.post(path,login));
}
