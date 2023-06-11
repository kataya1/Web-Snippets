import logo from '../logo.svg';
import '../App.css';
import Feed from './Feed/Feed';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>

      <Feed></Feed>

    </div>
  );
}

export default App;
