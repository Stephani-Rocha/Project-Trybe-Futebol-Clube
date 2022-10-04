import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/c-Users';

chai.use(chaiHttp);

const user = {
    email: "admin@admin.com",
    password: "secret_admin"
}

describe('/login', () => {

    before(() => {
        sinon.stub(Users, 'create').resolves({ id: 1, ... user} as Users);
    });

    it('Deve fazer o login com sucesso', async () => {
        const response = await chai.request(app).post('/login').send(user)
        expect(response.status).to.equal(200);
    });
});