import { useState } from "react";
import axios from "axios";

function Stats() {
    const [shortCode, setShortCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!shortCode.trim()) return;

        try {
            const response = await axios.post('http://localhost:3000/stats', {
                link: shortCode,
            });
            console.log(response.data[0].follows)
        } catch (error) {
            console.error('Error getting short link stats:', error);
        }
    }

    return (
        <>
            <h2>Stats</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter short url code"
                    onChange={(e) => { setShortCode(e.target.value) }}
                />
                <button type="submit">See the stats</button>
            </form>
        </>
    )
}

export default Stats