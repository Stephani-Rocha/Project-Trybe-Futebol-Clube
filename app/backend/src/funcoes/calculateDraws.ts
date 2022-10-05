const calculateDraws = (team: any) => {

    const totalDraws = team.teamHome.reduce((acc: any, item: any) => {
        if (item.homeTeamGoals === item.awayTeamGoals) {
            acc += 1
        }
        return acc;
    }, 0)

    return totalDraws;
}

export default calculateDraws;