import React from 'react'
import Feed from '../Feed'

const Home = ({posts}) => {
  return (
    <main className='Home'>
      {posts.length ? <Feed posts={posts}/> : <p style={{'margin-top':'2rem', 'font-weight':'800'}}>There is no post more add post in Post section</p>}
    </main>
  )
}

export default Home
