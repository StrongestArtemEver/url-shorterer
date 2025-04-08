import './css/App.css'
import InputUrl from './components/InputUrl.jsx';
import Stats from './components/Stats.jsx';
import { useState } from 'react';

function App() {
    const [linksList, setLinksList] = useState([]);

    return (
        <>
            <h1>Site to shorten your URL link</h1>
            <InputUrl linksList={linksList} setLinksList={setLinksList} />
            {/* <a href={shortLink} target='_blank'>{shortLink}</a> */}
            <Stats linksList={linksList} />
        </>
    )
}

export default App
