import React, { useEffect } from 'react'
import useAuthorizedFetch from '../lib/useAuthorizedFetch'

function Home({ ENDPOINT }) {

  // const fetchMe = useAuthorizedFetch(`${ENDPOINT}/me`)

  // useEffect(() => {
  //   fetchMe().then(d => console.log(`authorized fetch: ${d.user.username}`))
  // }, [])



  return (
    <div>Home</div>
  )
}

export default Home