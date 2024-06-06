import axios from "axios"

const metArtAPI = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
})

// const chicagoArtAPI = axios.create({
//     baseURL: 
// })

export const getMETArtID = (searchTerm) => {
    return metArtAPI
    .get(`/search?artistOrCulture=true&q=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}

export const getMETArtDetails = (art_id) => {
    return metArtAPI
    .get(`/objects/${art_id}`)
    .then((response)=> {
        return response.data
    })
}

export const getMETAllArtworkIDs = () => {
    return metArtAPI
    .get(`/objects`)
    .then((response)=> {
        return response.data
    })
}