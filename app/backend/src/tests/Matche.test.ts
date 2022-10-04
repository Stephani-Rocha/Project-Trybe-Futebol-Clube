import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/b-Matches';

chai.use(chaiHttp);

const matche = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
}

const matches = [matche, matche, matche];  

describe('/matches', () => {

    before(() => {
        sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]);
    });

    it('Deve retornar todos os matches', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.equal(200);
    });
});