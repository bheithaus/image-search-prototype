import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import ImageOverlay from '../components/ImageOverlay'

import styles from '../styles/Home.module.css'

const SIZES = {
  75: 's',//  cropped square
  150: 'q',//  cropped square
  100: 't',
  240: 'm',
  320: 'n',
  400: 'w',
  640: 'z',
  800: 'c',
  1024: 'b',
}

// FLICKR image URL formatter
function formatImageURL(data, modal) {
  if (!modal) {
    return `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_${SIZES[150]}.jpg`
  }

  // request 800px size for modal
  return `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_${SIZES[800]}.jpg`
}

export default function ImageGrid(props) {
  if (!props.images.length) {
    return (
      <p>No Results</p>
     )
  }

  const [modalSrc, setModalSrc] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const images = props.images.map((imageData, i) => {
    return (
      <a
        className={styles.card}
        onClick={()=>{
          setModalSrc(formatImageURL(imageData, true))
          setModalOpen(true)
        }}
        key={i}
        >
        <img src={formatImageURL(imageData)}></img>
      </a>
    )
  })

  return (
    <>
      <div className={styles.grid}>
        { images }
      </div>

      <ImageOverlay open={modalOpen} src={modalSrc} onClose={() => setModalOpen(false)}/>
   </>
  )
}
