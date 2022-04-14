const sanity = require("@sanity/client")

const client = sanity({
    projectId: process.env.VITE_SANITY_ID,
    dataset: "production",
    token: process.env.VITE_SANITY_TOKEN,
    useCdn: false,
})

const toBuffer = (ab) => {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async (event, context) => {
    // console.log(event)
    // const imageBuffer = toBuffer(event.body)
    // if(body.isBase64Encoded) {
    const imageBuffer = await Buffer.from(event.body, "base64")
    console.log(imageBuffer)
    const document = await client.assets.upload('image', imageBuffer)
    console.log('The image was uploaded!', document)
    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(document)
    };
}