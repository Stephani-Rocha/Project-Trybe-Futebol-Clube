import { Request, Response } from "express";
import MatchesService from '../service/MatchesService';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || '';
class MatchesController {
    constructor(private matchesService = new MatchesService()) {}

    getMatches = async (req: Request, res: Response) => {
        const result = await this.matchesService.getMatches();
        return res.status(200).json(result);
    }

    createMatche = async (req:Request, res: Response) => {
        const { body } = req;
        const { authorization } = req.headers;

        const verifyToken = jwt.verify(authorization as unknown as string, JWT_SECRET) as any;
        if(!verifyToken) return res.status(400).json({ messagem: 'Token inválido'})
        const result = await this.matchesService.createMatche(body);
        if(!result) return res.status(400).json({ messagem: 'erro ao criar time'})
        return res.status(201).json(result);
    }

    updateMatche = async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await this.matchesService.updateMatche(id);
        if(!result) return res.status(400).json({ message: 'Erro ao fazer atualização' });
        return res.status(200).json({ message: 'Finished' })
    }
}

export default MatchesController;