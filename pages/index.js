import Head from 'next/head'
import ImageSearch from '../components/ImageSearch'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ImageSearch/>
      </main>
    </div>
  )
}
