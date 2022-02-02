import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get('code')
const client_id = "ea85890d26bd4c3f849d48a6d7e4c665"
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="+client_id+"&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20app-remote-control"


function App() {
  return code ? <Dashboard code={code} /> : <Login AUTH_URL={AUTH_URL}/>
}

export default App;
