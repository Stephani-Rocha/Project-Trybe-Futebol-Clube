const calculateGoalsFavor = (team: any) => {

    const totalGoals = team.teamHome.reduce((acc: any, item: any) => {
        acc += item.homeTeamGoals;
        return acc;
    }, 0)

    return totalGoals;
}

export default calculateGoalsFavor;