const koa = require('koa');
const jwt = require('koa-jwt');
const sha1 = require('sha1');
const body  = require('koa-body');//处理post请求数据
const route = require('koa-route');
const login = require('./middleware/login');
const register = require('./middleware/register');
const informations = require('./middleware/imformatios/informations');
const errorReceiver = require('./middleware/errorReceiver');
const loginout = require('./middleware/loginout');
const limit = require('./interceptor/interceptor');


const app = new koa();

const secret = sha1('ozj.'+Date.now()+'lzb.'+Date.now());//设置密钥



/* 设置最外层错误收集件 */
errorReceiver(app);

app.use(body());


/* 登录中间件 */
login(app,route,'/login',secret);

/* 注册中间件 */
register(app,route,'/register',secret);

/* 拦截器 */
limit(app);

/*信息中间件*/
informations(app,route,'/infopage/:actions',secret);

/* 注销中间件 */
loginout(app,route,'/loginout');

app.listen(8080);