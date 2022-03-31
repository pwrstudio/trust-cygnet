import { verifyToken } from '../_jwt.js'
import { authorizedClient } from '../_authorizedClient.js';

export const post = async (event) => {
  const body = await event.request.json()
  const decodedToken = await verifyToken(body.authorization)
  // console.log('decodedToken', decodedToken)
  // const userId = decodedToken.sub.replace(DISCORD_PREFIX, "")
  const res = await authorizedClient
    .patch(body.proposalId)
    .set({ submitted: true })
    .commit()
  console.log(res)
  return {
    body: JSON.stringify(res)
  };
};