const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

const secret = (()=>{
    const data=Date.now();
    return sha1('UZ'+data+'UZ'+'.'+data);  //生成密钥
})();
/* 使用Promise控制流程，模拟静态服务器中的处理过程 */
new Promise((resolve,reject)=>{
const token=
jwt.sign({
    username:'jerry',
    password:13556535195
},secret,{expiresIn:'55s'},function(err,token){
    console.log(token);
    resolve(token);
});
})
/* 模拟拿到http头中的token，对其进行处理 */
.then((token)=>{
const decodes=
jwt.verify(token,secret,function(err,decode){
    if(err){
        throw err;          //抛出错误
    }else{
        return decode;      //返回解码结果
    }
});
console.log(decodes);
}
)
.catch((err)=>{
    console.log(err.name);  //错误被.catch()拿到，进行处理
})
