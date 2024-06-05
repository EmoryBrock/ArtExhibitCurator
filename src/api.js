import axios from "axios"

const metArtAPI = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/"
})

// const chicagoArtAPI = axios.create({
//     baseURL: 
// })

// export const getMETArtID = () => {
//     return metArtAPI
//     .get("/")
//     .then((response)=> {
        
//     })
// }

export const getMETArtDetails = (art_id) => {
    return metArtAPI
    .get(`/collection/v1/objects/${art_id}`)
    .then((response)=> {
        return response.data
    })
}