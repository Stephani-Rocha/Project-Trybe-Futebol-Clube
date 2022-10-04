import MatchesModel from '../database/models/b-Matches';
import TeamsModel from '../database/models/a-Teams';
import IMatche from '../interfaces/IMatche';

class MatchesService {
    model = MatchesModel;

    getMatches = async () => {
        const result = await MatchesModel.findAll({
          include: [
            {
              model: TeamsModel,
              association: "teamHome",
              attributes: ['teamName'],
            },
            {
              model: TeamsModel,
              association: "teamAway",
              attributes: ['teamName'],
            },
          ],
        });
        return result;
      };
    
    createMatche = async (body: IMatche): Promise<IMatche | null> => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;
      if(inProgress !== true) {
        return null;
      }
      const result = await MatchesModel.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
      })
      return result as unknown as IMatche;
    } 

    updateMatche = async (id: string) => {
      const result = await MatchesModel.update({ inProgress: false }, { where: { id }})
      return result;
    }
}

export default MatchesService;