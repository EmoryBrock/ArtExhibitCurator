import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchResultsBySourceAndId } from '../utils';

export default function ArtworkDetailPage() {
    const { sourceId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sourceId) {
            console.error("sourceId is undefined");
            return;
        }

        const fetchData = async () => {
            try {
                const source = sourceId.match(/[a-zA-Z]+/)[0];
                const id = sourceId.match(/\d+/)[0];
                const result = await fetchResultsBySourceAndId(source, id);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            }
        };

        fetchData();
    }, [sourceId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{data[0].title}</h1>
            <img
                  src={data[0].imageSmall}
                  alt={data[0].title}
                  className='w-full h-[200px] object-cover rounded-t lg'
                />
            <p>{data[0].artName}</p>
            <p>{data[0].type}</p>  
            <p>{data[0].medium}</p>  
            <p>{data[0].date}</p>
            <button>Add to collection</button>                
        </div>
    );
}
