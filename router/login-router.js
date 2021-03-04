const loginService = require('../service/login-service');

const router = require('./router-factory')('/login');

router.get('/', async (ctx) => {
  const query = ctx.request.query;
  const obj = {
    username: query.username,
    password: query.password
  }
  const list = await loginService.login(obj);
  if (list.length > 0) {
    ctx.body = R.success(list[0]);
  } else {
    ctx.body = R.fail(1, '用户名或密码错误');
  }
});

module.exports = router;