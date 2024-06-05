import React from 'react'

export default function ArtworkDetailCard({data}) {
console.log(data, "parsed data")

// const artworkDetailInfo = data.map((artwork)=> {
//   const {objectID, title, artistDisplayName} = artwork

  return (
    <section className="artworkCard" key={data.objectID}>
    <div><h2>results</h2></div>
    <p>{data.objectID}</p>
    <p>{data.title}</p>
    </section>
  )
  }