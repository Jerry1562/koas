/* 信息页中间件 */
/* 
****************************
输入对象:
****************************
添加add
payload:{
    userId:用户id
    message:{
        titel:标题,
        body:内容
    }
}
删除所有deleteall
payload:{
    userId:''
}    
删除deletes
payload:{
    userId:'',
    id:''
}    
获取takeall
payload:{
    userId:''
}
***************************
输出对象:
***************************
获取takeall
{
    isOK:true/false,
    msg:[{项目1},{项目2}]
}
添加add
{
    isOK:true/false;
    msg:{
        id:'',
        user(uz*R*id):用户id,
        message:'',
        ...(time)
    }
}
删除所有deleteall
{
    isOK:true/false,
    msg:''
}
删除deletes
{
    isOK:'',
    msg:''
}
    */
const creatjwt = require('jsonwebtoken');
const axios = require('axios');
const sha1 = require('sha1');
module.exports=function(app,route,path,secret){
    
    function creatKey(){
        const now = Date.now();
        const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
        return appKey;
    }
    /* 信息页处理函数 */
    const informations=async (ctx,actions)=>{
        const payload = ctx.request.body;
        /* 获取数据库中所有TODO */
       if(actions == 'takeall'){
        console.log(`用户${payload.userId}正在尝试获取所有TODO`);
        const take = await axios.request({
            url:`/mcm/api/user/${payload.userId}/data`,
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
            console.log(`${payload.userId}成功获取数据！`);
            return {
                status:req.status,
                data:req.data
            }
        })
        .catch((err)=>{
            console.log(`${payload.userId}获取数据失败，请检查网络`)
            console.log(err.message);
            return {
                status:null
            }
        })
        if(take.status == 200){
            ctx.response.body={
                isOK:true,
                msg:take.data
            }
        }else{
            ctx.response.body={
                isOK:false,
                msg:'请检查网络后重试'
            }
        }
       }
/* 删除数据库中全部数据 */
       if(actions == 'deleteall'){
        console.log(`用户${payload.userId}正在尝试删除所有TODO`);
        const deleteall = await axios.request({
            url:`/mcm/api/user/${payload.userId}/data`,
            baseURL:'https://d.apicloud.com/',
            method:'delete',
            headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json'
            },
            data:{},
            timeout:3000
        })
        .then((req)=>{
            console.log(`${payload.userId}成功删除所有数据！`);
            console.log(req.statusText);
            return {
                status:req.status
            }
        })
        .catch((err)=>{
            console.log(`${payload.userId}获取数据失败，请检查网络`)
            console.log(err.message);
            return {
                status:null
            }
        });
        if(deleteall.status == 200){
            ctx.response.body={
                isOK:true,
                msg:'所有数据都已经被删除！'
            }
        }else{
            ctx.response.body={
                isOK:false,
                msg:'请检查网络后重试'
            }
        }
       }


/* 删除数据库中某个TODO */
       if(actions == 'deletes'){
           console.log(`用户${payload.userId}正在删除id为${payload.id}的数据`);
           const deleted = await axios.request({
               url:`/mcm/api/datas/${payload.id}`,
               baseURL:'https://d.apicloud.com/',
               method:'delete',
               headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json'
               },
               data:{},
               timeout:3000
           })
           .then((res)=>{
               console.log(`用户${payload.userId}id为${payload.id}的数据已成功删除！`);
               return res.status;
               
           })
           .catch((err)=>{
               console.log(err.message);
               console.log(`${payload.userId}删除链接超时请重试`);
           });
           if(deleted == 200){
               ctx.response.body={
                   isOK:true,
                   msg:'删除成功！'
               }
           }else{
               ctx.response.body={
                   isOK:false,
                   msg:'网路不好请稍后重试'
               }
           }
       }



/* 新增TODO */
       if(actions == 'add'){
           console.log(`用户${payload.userId}正在存入新项目`);
           const add = await axios.request({
               url:`/mcm/api/user/${payload.userId}/data`,
               baseURL:'https://d.apicloud.com/',
               method:'post',
               headers:{
                'X-APICloud-AppId': 'A6074513694089',
                'X-APICloud-AppKey': creatKey(),
                'Content-Type':'application/json'
               },
               data:{
                   message:payload.message
               },
               timeout:3000
           })
           .then((req)=>{
               console.log(`用户${payload.userId}成功创建新的项目`);
               return {
                   status:req.status,
                   dtat:req.data
               }
           })
           .catch((err)=>{
               console.log(`用户${payload.userId}创建失败，请检查网络`);
               console.log(err.message);
               return null;
           });
           if(add){
               ctx.response.body={
                   msg:add,
                   isOK:true
                };
           }else{
               ctx.response.body={
                msg:"请求超时，请检查网络后重试",
                isOK:false
                };
           }
       } 
    };
    app.use(route.post(path,informations));
}

    
