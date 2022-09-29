import LoginService from '../service/LoginService';
import { Request, Response } from 'express';

class LoginController {
    constructor(private loginService = new LoginService()) {}

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;
        const result = await this.loginService.login(email, password);
        return res.status(200).json({ token: result });
    }
}

export default LoginController;