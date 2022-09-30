import TeamsModel from '../database/models/Teams';

class TeamsService {
    model = TeamsModel;

    getTeams = async () => {
        const result = await this.model.findAll();
        return result;
    }
}

export default TeamsService;