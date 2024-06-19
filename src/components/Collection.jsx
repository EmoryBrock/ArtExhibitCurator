import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDocs, collection } from 'firebase/firestore'

export default function Collection() {
  const [artCollection, setArtCollection] = useState([])

  const artCollectionRef = collection(db, "ArtCollection")

  useEffect(() => {
    const getArtCollection = async () => {

      try {
      const data = await getDocs(artCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log(filteredData, "data returned from firebase")
      setArtCollection(filteredData)
      } catch (err) {
        console.error(err)
      }
    }

    getArtCollection()
  }, [])


  return (
    <>
      <div>Collection</div>
      <div>
        {artCollection.map((collection) => (
          <div key={collection.id}>
            <h1>{collection.colName}</h1>
          </div>
        ))}
      </div>
    </>
  )
}