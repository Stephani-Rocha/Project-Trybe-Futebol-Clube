import * as express from 'express';
import LoginController from './controller/LoginController';
import LoginService from './service/LoginService'
import LoginValidate from './middleware/LoginValidate'
import TeamsController from './controller/TeamsController';
import TeamsService from './service/TeamsService';
import MatchesService from './service/MatchesService';
import MatchesController from './controller/MatchesController';
import MatcheValidation from './middleware/MatcheValidate';

const loginService = new LoginService;
const loginController = new LoginController(loginService);
const loginValidate = new LoginValidate;
const teamsService = new TeamsService;
const teamsController = new TeamsController(teamsService);
const matchesService = new MatchesService;
const matchesController = new MatchesController(matchesService);
const matcheValidation = new MatcheValidation;
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
    this.app.get('/teams', teamsController.getController)
    this.app.get('/teams/:id', teamsController.getById)
    this.app.get('/matches', matchesController.getMatches)
    this.app.post('/matches', matcheValidation.teamsValidation, matcheValidation.verifyTeams,
    matchesController.createMatche);
    
    this.app.patch('/matches/:id/finish', matchesController.updateMatche);

    this.app.patch('/matches/:id', matchesController.updateMatcheInProgress)
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
