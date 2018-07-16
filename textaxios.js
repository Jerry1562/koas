const axios = require('axios');
const sha1 = require('sha1');

function creatKey(){
    const now = Date.now();
    const appKey = sha1("A6074513694089"+"UZ"+"8BE4C513-C37A-3675-0A3E-BB90E653EEFD"+"UZ"+now)+"."+now;
    return appKey;
}

axios.request({
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
   console.log(res.data);
})
.catch((error)=>{
   console.log('error');
})