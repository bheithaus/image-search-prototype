// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import autocorrect from '../../lib/autocorrect'

const SEARCH_API_URL = 'https://api.flickr.com/services/rest'

function correctQuery (query) {
  // remove non alphanumeric characters
  let cleanedQuery = query.replace(/[^0-9a-z]/gi, '')
  console.log('cleaned query', cleanedQuery)

  // do autocorrect algorithm
  let corrected
  try {
    corrected = autocorrect(cleanedQuery)
  } catch (e) {
    console.log(e)
  }

  return corrected
}

export default function SearchRequestHandler (req, res) {
  // for now, we'll only accept the first word
  let corrected = req.query.q.split(' ')[0]

  corrected = correctQuery(corrected)

  if (!corrected) {
    res.statusCode = 500
    return res.json({ error: 'autocorrect not possible for your query' })
  }

  // specific to FLICKR API
  let requestParams = {
    params: {
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: 1,  // request raw json response
      text: corrected,
      api_key: process.env.FLICKR_KEY
    }
  }

  console.log('3rd party API request url:', SEARCH_API_URL)
  console.log('3rd party API request params:', requestParams)

  axios.get(SEARCH_API_URL, requestParams)
  .then((response) => {
    console.log('FLICKR API response', response)

    if (response.status == 200) {
      res.statusCode = 200
      // just return the 1st page for now
      res.json({ photos: response.data.photos.photo, query: corrected })
    } else {
      throw new Error("no results")
    }
    // $("#output").append("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
  })
  .catch((error) => {
    console.log(error)
    res.statusCode = 500
    res.json({ error: error })
  })
}
