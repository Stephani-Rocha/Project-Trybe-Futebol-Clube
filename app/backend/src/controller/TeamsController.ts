import { Request, Response } from "express";
import TeamsService from '../service/TeamsService';

class TeamsController {
    constructor(private teamsService = new TeamsService()) {}

    getController = async (req: Request, res: Response) => {
        const result = await this.teamsService.getTeams();
        return res.status(200).json(result);
    }

}

export default TeamsController;
