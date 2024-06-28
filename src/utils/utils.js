import { getCLEArtDetailsByID, getMETAllArtworkIDs, getMETArtDetails } from "../config/api.js";
import noImagePicture from '../assets/img/No-Image-Placeholder.svg'
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'

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
    imageSmall: (artwork) => artwork.primaryImageSmall || noImagePicture,
    imageBig: (artwork) => artwork.primaryImage || noImagePicture,
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
      artwork.images && artwork.images.web ? artwork.images.web.url : noImagePicture,
    imageBig: (artwork) =>
      artwork.images && artwork.images.print ? artwork.images.print.url : noImagePicture,
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
  const arrayCheckObj1 = Array.isArray(obj1) ? obj1: []
  const arrayCheckObj2 = Array.isArray(obj2) ? obj2: []
  return [...arrayCheckObj1, ...arrayCheckObj2];
};

export const fetchResultsBySourceAndId = async (source, id) => {
  // console.log(`Fetching art details from source: ${source}, with id: ${id}`);
  let mappedArtData;

  try {
    if (source === "MET") {
      const ArtData = await getMETArtDetails(id);
      mappedArtData = convertMETData(ArtData);
    } else {
      const ArtData = await getCLEArtDetailsByID(id);
      mappedArtData = convertCLEData(ArtData);
    }
  } catch (error) {
    console.error(`Error fetching art details for source: ${source}, id: ${id}`, error);
  }

  return mappedArtData;
};

export const removeArtworkFromCollection = async (collectionId, artworkID) => {
  try {
    // Document in Firestore
    const collectionRef = doc(db, 'ArtExhibit', collectionId);
    // console.log(`Document reference: ${collectionRef.path}`);
    // console.log(artworkID, "ID to be removed")

    // Retrieve the current document data
    const docSnapshot = await getDoc(collectionRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const currentArtworkIDs = data.artworkIDs || [];
      console.log("Current artworkIDs:", currentArtworkIDs);

      // Error-> if artworkID exists in the array
      if (!currentArtworkIDs.includes(artworkID)) {
        console.log(`Artwork ID ${artworkID} not found in the collection.`);
        return;
      }

      // Create a new array with the selected artworkID removed [look to refactor]
      const updatedArtworkIDs = currentArtworkIDs.filter(id => id !== artworkID);
      // console.log("Updated artworkIDs:", updatedArtworkIDs);

      // Update the document with the new array
      await updateDoc(collectionRef, {
        artworkIDs: updatedArtworkIDs
      });

      // Verify the update - for development testing
      // const verifyDocSnapshot = await getDoc(collectionRef);
      // if (verifyDocSnapshot.exists()) {
      //   const verifyData = verifyDocSnapshot.data();
      //   console.log("Verified artworkIDs after update:", verifyData.artworkIDs);
      // } else {
      //   console.log("Document does not exist after update.");
      // }

      console.log(`Artwork ${artworkID} removed from collection ${collectionId}`);
    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.error("Error removing artwork:", error);
    throw error; 
  }
};

export const handleNewCollection = async (newCollectionName, setSelectedCollection, setShowOverlay, currentUser, sourceId) => {
  if (newCollectionName) {
    try {
      const collectionRef = doc(db, `ArtExhibit/${newCollectionName}`);
      await setDoc(collectionRef, {
        createdAt: new Date(),
        exhibit_name: newCollectionName,
        owner: currentUser.displayName,
        artworkIDs: [sourceId],
      });

      setSelectedCollection(newCollectionName);
      setShowOverlay(false);
      alert(`New collection '${newCollectionName}' created and artwork added`);
    } catch (error) {
      alert(`Failed to create new collection. ${error} `);
    }
  }
}