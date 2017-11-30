const express = require('express')
const router = express.Router()
const productsService = require ('./../services/home')

router.get('/', (req, res) => {
    productsService.getAllProducts()
        .then(function (data) {
            res.render('home/index', {
                products: data
            })
        })
})

router.get('/home/:id/json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    productsService.getProductById(req.params.id)
        .then((product) => {
            if (!product) {
                next()
            }
            
            return res.send({
                id: product.sku,
            })
        })
        .catch((e) => {
            return res.send(e);
        });
})

router.get('/home/:id', (req, res) => {
    productsService.getProductById(req.params.id)
        .then((product) => {
            return res.render('home/details', {
                product: product
            })
        })
})

module.exports = router