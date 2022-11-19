const { check } = require("express-validator")
const validateResults = require("../handleValidator")

const validatorCreateClient = [
    check("").exist().notEmpty().isLength({min:5, max:10}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateClient }