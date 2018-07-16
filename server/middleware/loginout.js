const axios = require('axios');
const sha1 = require('sha1');
module.exports=function(app,route,path){
    function creatKey(){
        const now = Date.now();
        const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
        return appKey;
    }
    
    const logout =async function(ctx,next){

        const payload=ctx.request.body
        console.log(`${payload.username}正在尝试注销`);
        const code=await axios.request({
            url:'/mcm/api/user/logout',
            baseURL:'https://d.apicloud.com/',
            method:'post',
            headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json',
                'authorization':payload.token
            },
            timeout:3000
        })//注销成功触发then，注销失败触发catch
        .then((res)=>{
            console.log(res.status);
            console.log('注销成功');
            return res.status;
        })
        .catch((err)=>{
            console.log(err.response.status);
            console.log('注销失败');
            return err.response.status;
        })
        if(code==200){
            ctx.response.body={
                isOK:true,
                msg:'注销成功'
            }
        }else{
            ctx.response.body={
                isOK:false,
                msg:'注销失败'
            }
        }
    };
    app.use(route.post(path,logout));

}