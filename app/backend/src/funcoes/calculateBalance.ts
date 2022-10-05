import calculateGoalsFavor from "./calculateGoalsFavor";
import calculateGoalsOwn from "./calculateGoalsOwn";

const calculateBalance = (team: any) => {

    const goalsFavor = calculateGoalsFavor(team);
    const goalsOwn: any = calculateGoalsOwn(team);

    const balance = goalsFavor - goalsOwn;

    return balance;
}

export default calculateBalance;