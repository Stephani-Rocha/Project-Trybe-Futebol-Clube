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
        try {
            jwt.verify(authorization as string, JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'Token must be a valid token' });
          }

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

    updateMatcheInProgress = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { homeTeamGoals, awayTeamGoals } = req.body;

        const data = {
            id,
            homeTeamGoals,
            awayTeamGoals,
        }

        const result = await this.matchesService.updateMatcheInProgress(data);
        return res.status(200).json(result);
    }
}

export default MatchesController;