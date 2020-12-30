import { useState } from 'react'
import axios from 'axios'

import ImageGrid from '../components/ImageGrid'
import styles from '../styles/Home.module.css'

export default function ImageSearch() {
  const [query, setQuery] = useState('')
  const [queried, setQueried] = useState('')
  const [results, setResults] = useState([])

  const executeSearch = (e) => {
    // send to the backend for image searching
    axios.get('/api/search', {
      params: {
        q: query
      }
    })
    .then(function (response) {
      console.log(response.data.photos)
      setResults(response.data.photos)
      setQueried(response.data.query)
      // $("#output").append("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      // always executed
    })
  }

  return (
    <>
      <h1 className={styles.title}>
        Image Search
      </h1>

      <p className={styles.description}>
        Get started by typing in a query, please enjoy!
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <input
        className={styles.button}
        type="submit"
        value="Search"
        onClick={executeSearch}
      />

      <p>Showing Results for: {queried}</p>

      <ImageGrid images={results}/>
    </>
  )
}
