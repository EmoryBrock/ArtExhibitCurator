import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import { getMETArtDetails, getMETArtID } from '../api'


export default function SearchBar() {
    const [query,setQuery] = useState("vincent+von+gogh")
    const [results, setResults] = useState(null)
    const [totalResults, setTotalResults] = useState(0)

    const handleSearch = async () => {
        try {
            const queryArtIds = await getMETArtID({ query }.query);

            const detailsPromises = queryArtIds.objectIDs.map(id => getMETArtDetails(id));
            const detailsResponses = await Promise.allSettled(detailsPromises);

            console.log('detailsResponses:', detailsResponses);  // Debugging log

            const successfulDetails = detailsResponses
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => {
                    console.log('fulfilled result value:', result.value) //debug of filtered data
                    return result.value;  // Safely accessing data
                    })          

            console.log('Successful details:', successfulDetails);  // Debugging log
            console.log('Successful details #:', successfulDetails.length);  // Debugging log
            setResults(successfulDetails.filter(Boolean));  // Remove any undefined elements
            setTotalResults(successfulDetails.filter(Boolean).length)
        }  catch (error) {
            console.error('Error fetching data', error)
            console.error('Error details:', error.response || error.message)
        }
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Enter Search Text Here" 
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            
            {results && (
                <div>
                    <p>Your search returned {totalResults} results</p>
                    {(Array.isArray(results) || results != null) ? results.map(result => (
                        <div key={result.objectID}>{result.objectID}</div>
                    )) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </div>
    )
}