import React, { useState, useEffect }  from 'react'
import { getMETAllArtworkIDs, getMETArtDetails } from '../api'
import { RandomArtID } from '../utils'

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(()=>{
    const fetchArtDetails = async () => {
      try {
        const artID = await RandomArtID()
        const fetchedData = await getMETArtDetails(artID)
        setData(fetchedData)
        setIsLoading(false)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchArtDetails()
  },[])

  if (isLoading) return <p>Loading...</p>
  return (<>
    <section>
    <div><h3>Featured Artwork</h3></div>
    <p>{data.objectID}</p>
    <p>{data.title}</p>
    <p><img src={data.primaryImageSmall} alt="" /></p>
    <p>{data.artistDisplayName}</p>
    <p>{data.objectIDs}</p>
    </section>
  </>)
}
