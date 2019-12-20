const request = require('supertest');

const server = require('../api/server.js');

const db = require('../database/dbConfig');

describe('Authrouter', function() {
    describe('environment', function() {
        it('should set the environment to testing', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
    // LOGIN POST TESTs
    describe('Post /', function() {
        beforeEach(async function() {
            await db('users').truncate();
        });
        describe('add user', function() {
            it('should return a 201 OK', function() {
                return request(server)
                    .post('/api/login')
                    .send({ username: 'Zack', password: 'Testing' })
                    .then(res => {
                        expect(res.status).toBe(201);
                    })
            })
        })
    })
})


