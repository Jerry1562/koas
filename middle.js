const Koa = require('koa');
const app = new Koa();

const one =async (ctx, next) => {
  console.log('>> one');
  await next();
  console.log('<< one');
}

const two = async (ctx, next) => {
  console.log('>> two');
  await new Promise((resolve,reject)=>{
      setTimeout(()=>{
      
      resolve();
  },5000)
  })
  .then(()=>{
      console.log('done');
    })
  .catch(()=>{})
   next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
   next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);