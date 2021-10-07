import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatUrl(query) {
    return `https://hn.algolia.com/api/v1/search?query=${query}`;
}

export function HackerNews() {
    const [query, setQuery] = useState("react");
    const [url, setUrl] = useState(() => formatUrl(query));
    const [data, setData] = useState({ hits: [] });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get(
                    url,
                );
                setData(result.data);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [url]);

    if (error) {
        return (
            <div>Error {error.message}</div>
        );
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
            <button type="button" onClick={() => setUrl(formatUrl(query))}>
                Search
            </button>
            <ul>
                {data.hits.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
