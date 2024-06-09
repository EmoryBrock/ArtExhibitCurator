import { getMETAllArtworkIDs } from "./api";


export const RandomArtID = async () => {
    const allIDsResponse = await getMETAllArtworkIDs()
    const allIDs = allIDsResponse.objectIDs
    const randomIndex = Math.floor(Math.random() * allIDs.length);
    
    let randomArtID = allIDs[randomIndex]
    
    return randomArtID
}

export const mappedFetchedData = (inputIds) => {
    let fetchedData = {}

    
} 