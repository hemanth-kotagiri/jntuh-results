import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  let data: any[] = []
  try {
    let urls: string[] = [
      'https://results-restapi.up.railway.app/notifications?refresh=true',
      'https://results-restapi.up.railway.app/new/all/regular?refresh=true',
      'https://results-restapi.up.railway.app/new/all/supply?refresh=true',
    ]
    const requests = urls.map((url) => axios.get(url))
    const responses = await axios.all(requests)
    responses.forEach((response) => {
      data.push(response.data)
    })
  } catch (e) {
    res.status(500).send({
      success: 'false',
      error: 'could not fetch data' + e,
    })
  }
  res.status(200).send({ success: 'true', data: data })
}
