import { getMETAllArtworkIDs } from "./api";


export const RandomArtID = async () => {
    const allIDsResponse = await getMETAllArtworkIDs()
    const allIDs = allIDsResponse.objectIDs
    const randomIndex = Math.floor(Math.random() * allIDs.length);
    
    let randomArtID = allIDs[randomIndex]
    
    return randomArtID
}

export const convertMETData = (METFetchedData) => {
    let convertedData = []

    METFetchedData.forEach(artwork => {
        let objFormat = {};
        
        objFormat.id = artwork.objectID;
        objFormat.title = artwork.title;
        objFormat.imageSmall = artwork.primaryImageSmall || 'default image';
        objFormat.imageBig = artwork.primaryImage || 'default image 2';
        objFormat.artistName = artwork.artistDisplayName;
        objFormat.medium = artwork.medium;
        objFormat.date = artwork.objectDate;
        objFormat.type = artwork.objectNae
        objFormat.source = "MET"

        convertedData.push(objFormat);
    });

    return convertedData;
}

export const convertCLEData = (CLEFetchedData) => {
    let convertedData = []

    CLEFetchedData.forEach(artwork => {
        let objFormat = {};
        
        objFormat.id = artwork.data.id;
        objFormat.title = artwork.data.title;
        objFormat.imageSmall = artwork.data.images.web.url || 'default image';
        objFormat.imageBig = artwork.data.images.print.url || 'default image 2';
        objFormat.artistName = artwork.data.artistDisplayName;
        objFormat.medium = artwork.data.technique;
        objFormat.date = artwork.data.creation_date;
        objFormat.type = artwork.data.type
        objFormat.source = "CLE"

        convertedData.push(objFormat);
    });

    return convertedData;
}


export const combinedFetchedDatatoRender = (obj1, obj2) => {
    return { ...(obj1 ?? {}), ...(obj2 ?? {}) };
}