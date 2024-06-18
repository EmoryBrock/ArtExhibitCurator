import { getCLEArtDetailsByID, getMETAllArtworkIDs, getMETArtDetails } from "./api";

export const RandomArtID = async () => {
  const allIDsResponse = await getMETAllArtworkIDs();
  const allIDs = allIDsResponse.objectIDs;
  const randomIndex = Math.floor(Math.random() * allIDs.length);

  let randomArtID = allIDs[randomIndex];

  return randomArtID;
};

const normalizeToArray = (data) => {
  return Array.isArray(data) ? data : [data]}

const convertArtData = (fetchedData, mapping) => {

  const dataArray = normalizeToArray(fetchedData);

  return dataArray.map((artwork) => {
    let objFormat = {};

    for (const [key, value] of Object.entries(mapping)) {
      if (typeof value === "function") {
        objFormat[key] = value(artwork);
      } else {
        objFormat[key] = value;
      }
    }

    return objFormat;
  });
};


export const convertMETData = (METFetchedData) => {
  const mapping = {
    id: (artwork) => artwork.objectID,
    title: (artwork) => artwork.title,
    imageSmall: (artwork) => artwork.primaryImageSmall || "default image",
    imageBig: (artwork) => artwork.primaryImage || "default image 2",
    artistName: (artwork) => artwork.artistDisplayName,
    medium: (artwork) => artwork.medium,
    date: (artwork) => artwork.objectDate,
    type: (artwork) => artwork.objectName,
    source: "MET",
  };

  return convertArtData(METFetchedData, mapping);
};

export const convertCLEData = (CLEFetchedData) => {
  const artInfoData = CLEFetchedData.data;
  const mapping = {
    id: (artwork) => artwork.id,
    title: (artwork) => artwork.title,
    imageSmall: (artwork) =>
      artwork.images && artwork.images.web ? artwork.images.web.url : "",
    imageBig: (artwork) =>
      artwork.images && artwork.images.print ? artwork.images.print.url : "",
    artistName: (artwork) =>
      artwork.creators && artwork.creators.length > 0
        ? artwork.creators[0].description
        : "Unknown Artist",
    medium: (artwork) => artwork.technique,
    date: (artwork) => artwork.creation_date,
    type: (artwork) => artwork.type,
    source: "CLE",
  };

  return convertArtData(artInfoData, mapping);
};

export const combinedFetchedDataToRender = (obj1, obj2) => {
  return [...obj1, ...obj2];
};

export const fetchResultsBySourceAndId = async (source, id) => {
  let mappedArtData;

  if (source === "MET") {
    const ArtData = await getMETArtDetails(id);
    mappedArtData = await convertMETData(ArtData);    
  } else {
    const ArtData = await getCLEArtDetailsByID(id);
    mappedArtData = await convertCLEData(ArtData);
  }

  return mappedArtData;
};

