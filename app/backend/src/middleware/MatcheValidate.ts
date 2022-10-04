import { Response, Request, NextFunction } from "express";
import TeamsModel from '../database/models/a-Teams'
class MatcheValidation {

    private model = TeamsModel;

    public verifyTeams = (req: Request, res: Response, next: NextFunction) => {
        const { homeTeam, awayTeam } = req.body;

        if(homeTeam === awayTeam) {
            return res.status(401).json({"message": "It is not possible to create a match with two equal teams"});
        }
        next();
    }

    public teamsValidation = async (req: Request, res: Response, next:NextFunction) => {
        const { homeTeam, awayTeam } = req.body;

        const team1 = await this.model.findByPk(homeTeam);
        const team2 = await this.model.findByPk(awayTeam);

        if(!team1 || !team2) {
            return res.status(404).json({ message: "There is no team with such id!" })
        }
    next();    
    }
}

export default MatcheValidation;