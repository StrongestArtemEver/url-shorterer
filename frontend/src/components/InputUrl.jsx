import '../css/InputUrl.css'
import { createShortLink } from '../services/api.js';

function InputUrl() {
    const handleClick = async () => {
        try {
            const shortLink = await createShortLink();
            console.log(shortLink);
        } catch (error) {
            console.error('Error creating short link:', error);
        }
    };

    return (
        <div className='wrapper'>
            <input
                type="text"
                placeholder="Enter URL"
                className="input-url"
            />
            <button onClick={() => { console.log("Short link created") }}>Create short link</button>
        </div>
    );
}

export default InputUrl;