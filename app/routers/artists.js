const express = require('express')
const router = express.Router()
const artistsService = require ('./../services/artists')

router.get('/', (req, res) => {
    artistsService.getAllArtists()
        .then(function (data) {
            console.log(data)
            res.render('artists/index', {
                artists: data
            })
        })
})

router.get('/artists/:id/json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    artistsService.getArtistById(req.params.id)
        .then((artists) => {
            if (!artists) {
                next()
            }
            
            return res.send({
                id: artists.sku,
               
            })
        })
        .catch((e) => {
            return res.send(e);
        });
})

router.get('/artists/:id', (req, res) => {
    artistsService.getArtistsById(req.params.id)
        .then((artists) => {
            return res.render('artists/details', {
                artists: artists
            })
        })
})

module.exports = router