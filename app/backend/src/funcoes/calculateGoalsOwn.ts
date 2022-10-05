const calculateGoalsOwn = (team: any) => {

    const totalGoals = team.teamHome.reduce((acc: any, item: any) => {
        acc += item.awayTeamGoals;
        return acc;
    }, 0)

    return totalGoals;
}

export default calculateGoalsOwn;