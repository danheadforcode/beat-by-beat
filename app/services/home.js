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
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                   query {
                        allProducts {
                            name,
                            id,
                            price,
                            song,
                            sku,
                            style, 
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.allProducts)
            })
            .catch((e) => {
                reject(e)
            })
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            client.query({
                query: gql`
                    query {
                        Product(id: "${id}") {
                            name,
                            id,
                            sku,
                            song,
                            style,
                            price,
                        }
                    }
                `
            })
            .then((response) => {
                resolve(response.data.Product)
            })
            .catch((e) => {
                reject(e)
            })
        })
    }
}