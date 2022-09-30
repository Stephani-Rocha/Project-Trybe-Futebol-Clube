import * as express from 'express';
import LoginController from './controller/LoginController';
import LoginService from './service/LoginService'
import LoginValidate from './middleware/LoginValidate'

const loginService = new LoginService;
const loginController = new LoginController(loginService);
const loginValidate = new LoginValidate;
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidate.emailValidation,
    loginValidate.incorrectEmail, loginValidate.incorrectPassowrd ,loginController.login)

    this.app.get('/login/validate', loginController.roleValidation)
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
