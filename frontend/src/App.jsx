import './css/App.css'
import InputUrl from './components/InputUrl.jsx';
import Stats from './components/Stats.jsx';
import { useState } from 'react';

function App() {
    const [shortLink, setShortLink] = useState('');

    return (
        <>
            <h1>Site to shorten your URL link</h1>
            <InputUrl setShortLink={setShortLink} />
            <a href={shortLink} target='_blank'>{shortLink}</a>
            <Stats />
        </>
    )
}

export default App
