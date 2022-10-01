import { Request, Response } from "express";
import MatchesService from '../service/MatchesService';

class MatchesController {
    constructor(private matchesService = new MatchesService()) {}

    getMatches = async (req: Request, res: Response) => {
        const result = await this.matchesService.getMatches();
        return res.status(200).json(result);
    }
}

export default MatchesController;