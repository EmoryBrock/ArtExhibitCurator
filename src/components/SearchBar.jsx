import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import { getMETArtDetails, getMETArtID } from '../api'
import SearchResults from './SearchResults'
import { combinedFetchedDataToRender, convertMETData } from '../utils'


export default function SearchBar() {
    const [query,setQuery] = useState("vincent+von+gogh")
    const [results, setResults] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const queryArtIds = await getMETArtID({ query }.query);
            const detailsPromises = queryArtIds.objectIDs.map(id => getMETArtDetails(id));
            const detailsResponses = await Promise.allSettled(detailsPromises);
            const successfulDetails = detailsResponses
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value);
    
            let configDataSet1 = convertMETData(successfulDetails.filter(Boolean));
            let configDataSet2 = {};
            let dataToRender = combinedFetchedDataToRender(configDataSet1, configDataSet2);
    
            console.log(dataToRender, "data to pass to child");
            console.log(dataToRender.length, "data object length")
            setResults(dataToRender);
            setTotalResults(Object.keys(dataToRender).length);
        } catch (error) {
            console.error('Error fetching data', error);
            console.error('Error details:', error.response || error.message);
        } finally {
            setIsLoading(false);
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
            
            {isLoading ? (
                <p>Retrieving data...</p>  // Display loading message
            ) : (
                results && results.length > 0 ? (
                    <div>
                        <SearchResults results={results} totalResults={totalResults} />
                    </div>
                ) : (
                    <p>No results found.</p>
                )
            )}
        </div>
    );
}