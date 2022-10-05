import MatchesModel from '../database/models/b-Matches';
import TeamsModel from '../database/models/a-Teams';
import calculatePoints from '../funcoes/totalPoints';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import calculateGames from '../funcoes/calculateGames';
import calculateVictory from '../funcoes/calculateVictory';
import calculateDraws from '../funcoes/calculateDraws';
import calculateLosses from '../funcoes/calculateLosses';
import calculateGoalsFavor from '../funcoes/calculateGoalsFavor';
import calculateGoalsOwn from '../funcoes/calculateGoalsOwn';
import calculateBalance from '../funcoes/calculateBalance';
import calculatePerformance from '../funcoes/calculatePerformance';
import get from '../funcoes/Sort';

class LeaderBoard {

    getFinishMatches = async () => {
        const result = await TeamsModel.findAll({ include: [
          {
            model: MatchesModel,
            as: "teamHome",
            where: { inProgress: 0 },
            attributes: ['homeTeamGoals', 'awayTeamGoals'],
          },
          {  
            model: MatchesModel,
            as: "teamAway",
            where: { inProgress: 0 },
            attributes: ['awayTeamGoals', 'homeTeamGoals'],
          },
        ],});        
        return result;
      }
    
    getTable = async () => {
        const result = await this.getFinishMatches();

        const sumGoals = result.map((team) => ({ 
            name: team.teamName, 
            totalPoints: calculatePoints(team as unknown as ILeaderBoard),
            totalGames: calculateGames(team as unknown as ILeaderBoard),
            totalVictories: calculateVictory(team as unknown as ILeaderBoard),
            totalDraws: calculateDraws(team as unknown as ILeaderBoard),
            totalLosses: calculateLosses(team as unknown as ILeaderBoard),
            goalsFavor: calculateGoalsFavor(team as unknown as ILeaderBoard),
            goalsOwn: calculateGoalsOwn(team as unknown as ILeaderBoard),
            goalsBalance: calculateBalance(team as unknown as ILeaderBoard),
            efficiency: calculatePerformance(team as unknown as ILeaderBoard),
        }))

        const returnSort = get(sumGoals);

        return returnSort;
    }  

}

export default LeaderBoard;