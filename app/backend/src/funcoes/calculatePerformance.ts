import calculatePoints from "./totalPoints";
import calculateGames from "./calculateGames";

const calculatePerformance = (team: any) => {

    const totalPoints = calculatePoints(team);
    const totalGames = calculateGames(team);
    const performance = totalPoints / (totalGames * 3) * 100;
    return Number(performance.toFixed(2));
}

export default calculatePerformance;