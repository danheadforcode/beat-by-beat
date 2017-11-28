fetch = require('node-fetch')
const config = require('./../../config.json')
const Apollo = require('apollo-client')
const gql = require('graphql-tag')
const ApolloClient = Apollo.ApolloClient
const createNetworkInterface = Apollo.createNetworkInterface


const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: config.apiEndpoint
    })
})

module.exports = {
    getAllArtists: () => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                   query {
                        allArtists {
                            name,
                            id,
                            sku,
                            profilePicture,
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.allArtists)
            })
            .catch((e) => {
                reject(e)
            })
        })
    },
    getArtistById: (id) => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                    query {
                        Artist(id: "${id}") {
                            name,
                            id,
                            sku,
                            profilePicture,
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.Artist)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
}