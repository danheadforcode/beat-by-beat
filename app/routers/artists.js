const express = require('express')
const router = express.Router()
const artistsService = require ('./../services/artists')

router.get('/', (req, res) => {
    artistsService.getAllArtists()
        .then(function (data) {
            res.render('artists/index', {
                artists: data
            })
        })
})

router.get('/artists/:id/json', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    artistsService.getArtistById(req.params.id)
        .then((artist) => {
            if (!artist) {
                next()
            }
            
            return res.send({
                id: artist.sku,
               
            })
        })
        .catch((e) => {
            return res.send(e);
        });
})

router.get('/artists/:id', (req, res) => {
    artistsService.getArtistById(req.params.id)
        .then((artist) => {
            return res.render('artists/details', {
                artist: artist
            })
        })
})

module.exports = router