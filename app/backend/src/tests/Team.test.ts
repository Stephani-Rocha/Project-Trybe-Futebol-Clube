import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/a-Teams';

chai.use(chaiHttp);

const team = {
    id: 1,
    teamName: "Avaí/Kindermann"
}

const teams = [team, team, team]

describe('/teams', () => {

    before(() => {
        sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
        sinon.stub(Teams, 'findByPk').resolves(team as Teams);
    });

    it('Deve retornar todos os times', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.equal(200);
    });
    it('Deve retornar um time por meio do ID', async () => {
        const response = await chai.request(app).get('/teams/1');
        expect(response.status).to.equal(200);
    });
});

