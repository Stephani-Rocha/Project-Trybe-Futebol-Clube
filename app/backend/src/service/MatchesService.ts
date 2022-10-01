import MatchesModel from '../database/models/b-Matches';
import TeamsModel from '../database/models/a-Teams';

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
}

export default MatchesService;