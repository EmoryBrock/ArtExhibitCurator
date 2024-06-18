import React from 'react';
import { useParams } from 'react-router-dom';

function TestPage() {
    const { sourceId } = useParams();
    console.log(sourceId); // Should log the sourceId

    return (
        <div>
            <h1>Test Page</h1>
            <p>Source ID: {sourceId}</p>
        </div>
    );
}

export default TestPage;
