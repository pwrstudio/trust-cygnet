import { authorizedClient } from '../_authorizedClient.js';

const toBuffer = (ab) => {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

export const post = async (event) => {
    const body = await event.request.arrayBuffer()
    const imageBuffer = toBuffer(body)
    const document = await authorizedClient.assets.upload('image', imageBuffer)
    console.log('The image was uploaded!', document)
    return {
        body: JSON.stringify(document)
    };
};
