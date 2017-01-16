var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get of an existing data', function () {
    it('should get a 404 status', function () {
        request('http://localhost:10000').get('/api/v1/individualGames/axdasdasdadasdasda').send().end(function (err, res) {
            res.status.should.be.equal(200);
        })
    });
});
