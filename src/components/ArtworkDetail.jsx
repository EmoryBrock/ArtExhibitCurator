import React from 'react'

export default function ArtworkDetail() {

  const responseData = {

    title:"The Potato Peeler (reverse: Self-Portrait with a Straw Hat)",
    artist:"Vincent van Gogh",
    image: "https://images.metmuseum.org/CRDImages/ep/web-large/DT1503.jpg",
    medium: "Oil on canvas",
    artYear: "1885",
    artType: "Painting"
  };

  return (
    <><div><h2>{responseData.title}</h2></div><>{responseData.artist}</><><img src={responseData.image} alt="" /></><>{responseData.artYear}</><>Artwork Type: {responseData.artType}</><>{responseData.medium}</></>
    
  )
}
