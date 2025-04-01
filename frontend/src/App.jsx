import './css/App.css'
import InputUrl from './components/InputUrl.jsx';

function App() {
  const stats = [{
    shortLink: 'https://short.ly/abc123',
    originalLink: 'https://www.example.com/some/long/url',
    clicks: 10,
    createdAt: '2023-10-01',
  },
  {
    shortLink: 'https://short.ly/xyz789',
    originalLink: 'https://www.example.com/another/long/url',
    clicks: 5,
    createdAt: '2023-10-02',
  }];

  return (
    <>
      <h1>Site to shorten your URL link</h1>
      <InputUrl />
      <div className="stats">
        <h2>Statistics</h2>
        <table>
          <thead>
            <tr>
              <th>Short Link</th>
              <th>Original Link</th>
              <th>Clicks</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.shortLink}</td>
                <td>{stat.originalLink}</td>
                <td>{stat.clicks}</td>
                <td>{stat.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
