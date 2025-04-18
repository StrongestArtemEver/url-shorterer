import { useState } from 'react';
import '../css/InputUrl.css';
import axios from 'axios';

function InputUrl({ linksList, setLinksList }) {
    const [link, setLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!link.trim()) return;

        try {
            const shortLink = await axios.post('http://localhost:3000/short', {
                link: link,
            });
            const follows = await axios.post('http://localhost:3000/stats', {
                link: shortLink.data.slice(-6)
            })
            const newListEl = {
                originalUrl: link,
                shortLink: shortLink.data,
                follows: follows.data[0].follows,
            }
            setLinksList([
                ...linksList,
                newListEl
            ])
        } catch (error) {
            console.error('Error creating short link:', error);
        }
    };

    return (
        <form className='wrapper' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter URL"
                className="input-url"
                onChange={(e) => { setLink(e.target.value) }}
            />
            {link ? <button type='submit'>Create short link</button> :
            <button type='submit' disabled >Create short link</button>}
        </form>
    );
}

export default InputUrl;