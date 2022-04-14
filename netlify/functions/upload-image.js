const sanity = require("@sanity/client")
const _ = require('lodash')

const client = sanity({
    projectId: process.env.VITE_SANITY_ID,
    dataset: "production",
    token: process.env.VITE_SANITY_TOKEN,
    useCdn: false,
})

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async (event, context) => {
    console.log(event)
    const contentType = _.get(event, 'headers["content-type"]', "image/jpeg")
    console.log(contentType)
    // const imageBuffer = toBuffer(event.body)
    // if(body.isBase64Encoded) {
    const imageBuffer = Buffer.from(event.body, "base64")
    console.log(imageBuffer)
    client.assets.upload('image', imageBuffer, { contentType: contentType }).then((document) => {
        console.log('The image was uploaded!', document)
        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify(document)
        };
    }).catch((error) => {
        console.error('Upload failed:', error.message)
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify(error.message)
        };
    })
}