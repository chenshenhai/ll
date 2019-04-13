const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = './portal';

app.use(static(
  path.join( __dirname,  staticPath)
))

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

const port = 3001;
app.listen(port, () => {
  console.log(`[logoless] portal server is starting at port ${port}`)
})