// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import autocorrect from '../../lib/autocorrect'

const SEARCH_API_URL = 'https://api.flickr.com/services/rest'
const TEAPOT_ERROR_CODE = 418
const SUCCESS_CODE = 200

// do autocorrect algorithm
function correctQuery (query) {
  let corrected
  try {
    corrected = autocorrect(query)
  } catch (e) {
    console.error(e)
  }

  return corrected
}

export default function SearchRequestHandler (req, res) {
  // for now, we'll only accept the first word
  let corrected = req.query.q.split(' ')[0]

  corrected = correctQuery(corrected)

  if (!corrected) {
    res.statusCode = TEAPOT_ERROR_CODE
    return res.json({ error: 'autocorrect not possible for your query' })
  }

  // specific to FLICKR API
  let requestParams = {
    params: {
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: 1,  // request raw json response
      text: corrected,
      api_key: process.env.FLICKR_KEY,
      per_page: 25
    }
  }

  console.log('3rd party API request url: ', SEARCH_API_URL)
  console.log('3rd party API request params: ', requestParams)

  axios.get(SEARCH_API_URL, requestParams)
  .then((response) => {
    // console.log('FLICKR API response :', response)
    if (response.status == SUCCESS_CODE) {
      res.statusCode = SUCCESS_CODE
      // just return the 1st page for now
      res.json({ photos: response.data.photos.photo, query: corrected })
    } else {
      throw new Error("no results")
    }
  })
  .catch((error) => {
    console.error(error)
    res.statusCode = TEAPOT_ERROR_CODE
    res.json({ error: error })
  })
}
