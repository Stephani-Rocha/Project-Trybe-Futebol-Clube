import { Request, Response } from "express";
import LeaderBoardService from '../service/LeaderboardService';

class LeaderBoardController {
    constructor(private leaderboardService = new LeaderBoardService()) {}

    get = async (req: Request, res: Response) => {
        const result = await this.leaderboardService.getTable();
        return res.status(200).json(result);
    }
}

export default LeaderBoardController;