const sha1 = require('sha1');
const axios = require('axios');
function creatKey(){
    const now = Date.now();
    const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
    return appKey;
};
axios.request({
    url:'/mcm/api/user/5b34e345022c3b147c6f856d/message',
    method:'post',
    baseURL:'https://d.apicloud.com/',
    data:{
        'name':'jerry',
        'age':'23',
        'role':'student'
    },
    headers:{
        'X-APICloud-AppId':'A6074513694089',
        'X-APICloud-AppKey':creatKey(),
        'Content-Type':'application/json'
    },
    timeout:1000
 })
.then((res)=>{
   console.log(res.data);
})
.catch((error)=>{
    console.log(error);
   
})