import React, { useState, useEffect } from 'react'
import { getMETArtID } from '../api';

export default function ArtworkListCard() {
    const DataFetcher = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          getMETArtID("vincent+van+gogh")
            .then(response => {
              // Limit the data to 10 entries
              const limitedData = response.data.objectIDs.slice(0, 10);
              setData(limitedData);
              setLoading(false);
            })
            .catch(error => {
              setError(error);
              setLoading(false);
            });
        }, []);
      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
      
        console.log(getMETArtID("vincent+van+gogh"), "data fetcher")

        return (
          <div>
            <h1>Data from API</h1>
            <ul>
              {data.map(artID=> (
                <li key={artID.objectIDs}>{artID.objectIDs}</li>
              ))}
            </ul>
          </div>
        );
      };
    }
