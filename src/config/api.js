import axios from "axios"

const metArtAPI = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
})

// MET API call to search by artist or culture
export const getMETArtIDbyArtist = (searchTerm) => {
    return metArtAPI
    .get(`/search?artistOrCulture=true&q=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}
// MET API call to search by any field
export const getMETArtIDGeneral = (searchTerm) => {
    return metArtAPI
    .get(`/search?q=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}

//MET API Call to search by title
export const getMETArtIDbyTitle = (searchTerm) => {
    return metArtAPI
    .get(`/search?title=true&q=${searchTerm}`)
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

const clevelandArtAPI = axios.create({
    baseURL: "https://openaccess-api.clevelandart.org/api/artworks"
})

// CLE API call to search any field
export const getCLEArtDetailsGeneral = (searchTerm) => {
    return clevelandArtAPI
    .get(`/?q=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}

// CLE API call to search by Artist
export const getCLEArtDetailsByArtist = (searchTerm) => {
    return clevelandArtAPI
    .get(`/?artists=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}

// CLE API call to search by Title
export const getCLEArtDetailsByTitle = (searchTerm) => {
    return clevelandArtAPI
    .get(`/?title=${searchTerm}`)
    .then((response)=> {
        return response.data
    })
}

export const getCLEArtDetailsByID = (id) => {
    return clevelandArtAPI
    .get(`/${id}`)
    .then((response)=> {
        return response.data
    })
}


    // (/?title for search against title)
    // (/?artist for artist)
    // https://openaccess-api.clevelandart.org/api/artworks/{id} (specific artwork)      

