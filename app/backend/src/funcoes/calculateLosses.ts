const calculateLosses = (team: any) => {

    const totalLosses = team.teamHome.reduce((acc: any, item: any) => {
        if (item.homeTeamGoals < item.awayTeamGoals) {
            acc += 1
        }
        return acc;
    }, 0)

    return totalLosses;
}

export default calculateLosses;