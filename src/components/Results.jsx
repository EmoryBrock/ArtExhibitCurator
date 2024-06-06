import React, { useState, useEffect } from 'react'
import { getMETArtDetails } from '../api'
import ArtworkDetail from './ArtworkDetailCard.jsx'

export default function Results() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        getMETArtDetails(438722)
        .then((fetchedData) => {
            setData(fetchedData)
            setIsLoading(false)
        })
        .catch((error)=>{
            console.log(error.response)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>

  return (
    <>
    <section className='main-searchResultList'>
        <p>Here are artworks to explore based on your inputs</p>
        <div id="artworkList">
        <ArtworkDetail data={data}/>
        </div>
    </section>
    </>

  )
}
