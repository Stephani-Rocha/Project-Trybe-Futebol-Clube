import LoginService from '../service/LoginService';
import { Request, Response } from 'express';
import IToken from '../interfaces/IToken';

class LoginController {
    constructor(private loginService = new LoginService()) {}

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;
        const result = await this.loginService.login(email, password);
        if (!result) {
            return res.status(401).json({ message: 'Incorrect email or password'})
        }
        return res.status(200).json({ token: result });
    }

    roleValidation = async (req: Request, res: Response): Promise<Response> => {
        const { authorization } = req.headers;
        const result = await this.loginService.roleValidation(authorization as unknown as IToken);
        return res.status(200).json(result)
    }
}

export default LoginController;