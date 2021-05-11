export default (express, bodyParser, fs, cookieParser) => {
    const users = new Set();
    const app = express();

    app
    .use(cookieParser())
    .get('/login/', (req, res) => res.send('akrillsm9003'))   
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/profile', r => {
      const { user } = r.cookies;
      r.res.send(users.has(user) ? `Вы нашлись: ${user}`: 'вас не нашли :(' );
    })
    .get('/set/:user', r => {
      const { user } = r.params;
      const cookieHead = {'Set-Cookies': `user=${user};path=/;max-age=60`};
      users.add(user);
      r.res.set(cookieHead).send(`Установлено: ${user}`)
    })
    .get('/*', r => r.res.send('11.05.2021'));

    return app;
}