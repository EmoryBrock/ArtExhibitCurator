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
        objFormat.type = artwork.objectName
        objFormat.source = "MET"

        convertedData.push(objFormat);
    });

    return convertedData;
}

export const convertCLEData = (CLEFetchedData) => {
    const artInfoData = CLEFetchedData.data
    
    console.log(artInfoData, "data set")
    console.log(artInfoData[0].images.web.url, "accessing the images obj in data")

    let convertedData = []

    artInfoData.forEach(artwork => {
        let objFormat = {};
        
        objFormat.id = artwork.id;
        objFormat.title = artwork.title;
        objFormat.imageSmall = artwork.images && artwork.images.web ? artwork.images.web.url : '';
        objFormat.imageBig = artwork.images && artwork.images.print ? artwork.images.print.url : '';
        objFormat.artistName = artwork.creators && artwork.creators.length > 0 ? artwork.creators[0].description : 'Unknown Artist';
        objFormat.medium = artwork.technique;
        objFormat.date = artwork.creation_date;
        objFormat.type = artwork.type
        objFormat.source = "CLE"

        convertedData.push(objFormat);
    });
    console.log(convertedData, "conversion of CLE data")
    return convertedData;
}


export const combinedFetchedDataToRender = (obj1, obj2) => {
    // console.log(obj1, "dataset 1 in utils")
    // console.log(obj2, "dataset 2 in utils")
  
    const combinedObj = [].concat(obj1, obj2)

    console.log(combinedObj, "combined obj")
    return combinedObj;
}