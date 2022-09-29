import UserModel from '../database/models/Users';
import IToken from '../interfaces/IToken';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '';

class LoginService {
    private model = UserModel

    login = async (email: string, password: string): Promise<IToken> => {
        const result = await this.model.findOne({ where: { email }, raw: true })

        if (!result) {
            throw new Error('Usuário não encontrado')
        }

        if(!bcrypt.compareSync(password, result.password)) {
            throw new Error('Senha não encontrada')
        }

        const token = jwt.sign({ email }, JWT_SECRET, {
            expiresIn: '1d'
        })        
        return token as unknown as IToken;
    }
}

export default LoginService;