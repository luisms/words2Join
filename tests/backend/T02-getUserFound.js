var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get of an existing data', function () {
    it('should get a 404 status', function () {
        request('http://localhost:5000').get('/api/v1/users/jose').send().end(function (err, res) {
            res.should.have.Object('password', 'jose');
                })
    });
});
