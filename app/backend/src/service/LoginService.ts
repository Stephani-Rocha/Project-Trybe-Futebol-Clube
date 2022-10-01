import UserModel from '../database/models/c-Users';
import IToken from '../interfaces/IToken';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { verify } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || '';

class LoginService {
    private model = UserModel

    login = async (email: string, password: string): Promise<IToken | boolean> => {
        const result = await this.model.findOne({ where: { email }, raw: true })

        if (!result) {
            return false
        }

        if(!bcrypt.compareSync(password, result.password)) {
            return false
        }

        const token = jwt.sign({ email }, JWT_SECRET, {
            expiresIn: '1d'
        })        
        return token as unknown as IToken;
        
    }

    roleValidation = async (authorization: IToken) => {
        const { email } = jwt.verify(authorization as unknown as string, JWT_SECRET) as any;

        const result = await this.model.findOne({ where: { email }, raw: true})
        if (!result) {
            return false
        }

        return { role: result.role }
    }
}

export default LoginService;