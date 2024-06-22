import React from 'react'

export default function ArtworkDetailCard({data}) {

  if(!Array.isArray(data)) {
  return (
    <section className="artworkCard" key={data.objectID}>
    <div><h2>results</h2></div>
    <p>{data.objectID}</p>
    <p>{data.title}</p>
    <p>{data.artistDisplayName}</p>
    </section>
  )}

  const artworkDetailInfo = data.map((artwork)=> {
    const {objectID, title, artistDisplayName} = artwork

    return (
    <section className='artworkCard' key={objectID}>
      <p>ArtworkID: {objectID}</p>
      <p>Artwork Title: {title}</p>
      <p>Artist: {artistDisplayName}</p>
    </section>
    )
  })

  return (
    <div>{artworkDetailInfo}</div>
  )
  }