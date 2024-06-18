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

    console.log(data, "artwork data")
    return (
        <div>
            <h1>Source ID: {sourceId}</h1>
            {/* Add more fields to display if necessary */}
        </div>
    );
}
