import TeamsModel from '../database/models/a-Teams';

class TeamsService {
    model = TeamsModel;

    getTeams = async () => {
        const result = await this.model.findAll();
        return result;
    }

    getById = async (id: string) => {
        const result = await this.model.findByPk(id);
        return result;
    }
}

export default TeamsService;