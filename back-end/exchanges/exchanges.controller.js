const express = require('express');
const router = express.Router();
const exchangeService = require('./exchange.service');

// routes
router.post('/', create);
router.get('/', getAll);
//router.get('/:id', getById);
//router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
  console.log(req.body, req.user.sub);
    exchangeService.create(req.user.sub, req.body)
        .then((linkedExchange) => linkedExchange ? res.json(linkedExchange) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    exchangeService.getAll(req.user.sub)
        .then(linkedExchanges => res.json(linkedExchanges))
        .catch(err => next(err));
}

/*
function getById(req, res, next) {
    exchangeService.getById(req.params.id, req.params.exchangeId)
        .then(exchange => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
*/

/*
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
*/

function _delete(req, res, next) {
    exchangeService.delete(req.user.sub, req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}