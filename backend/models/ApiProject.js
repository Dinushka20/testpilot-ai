// backend/models/ApiProject.js
const mongoose = require("mongoose");

// Blueprint for a single test case
const TestCaseSchema = new mongoose.Schema({
    description: String,
    expectedStatus: String
});

// Blueprint for an endpoint (contains multiple test cases)
const EndpointSchema = new mongoose.Schema({
    method: String,
    path: String,
    testCases: [TestCaseSchema]
});

// Blueprint for the whole project (contains multiple endpoints)
const ApiProjectSchema = new mongoose.Schema({
    name: { type: String, default: "My Swagger API" },
    endpoints: [EndpointSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ApiProject", ApiProjectSchema);