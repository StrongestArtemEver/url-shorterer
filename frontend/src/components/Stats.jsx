import '../css/Stats.css';

function Stats({ linksList }) {
    const list = linksList.map(link => (
        <p key={link.shortLink}>
            <a href={link.originalUrl} title='Original Link'>{link.originalUrl}</a> |
            <a href={link.shortLink} title='Shortened Link'>{link.shortLink}</a> |
            {link.follows}
        </p>
    ));

    return (
        <>
            {linksList.length > 0 ? (
                <>
                    <h2>Stats</h2>
                    <div className='list'>{list}</div>
                </>
            ) : (
                <h2>No links to show stats</h2>
            )}
        </>
    );
}

export default Stats;