const calculateVictory = (team: any) => {

    const totalVictory = team.teamHome.reduce((acc: any, item: any) => {
        if (item.homeTeamGoals > item.awayTeamGoals) {
            acc += 1
        }
        return acc;
    }, 0)

    return totalVictory;
}

export default calculateVictory;