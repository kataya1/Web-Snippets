
import '../tailwind.css';

import '../output.css'
import { useState } from 'react';
import UserNameInput from './components/UserNameInput/UserNameInput';
import ConnectWebSocket from './components/ConnectWebSocket/ConnectWebSocket';
import { useEffect } from 'react';


function App() {
  const [userName, setUserName] = useState('')

  return (
    <div className="max-w-70vw mx-auto">
      {userName ?
        <ConnectWebSocket userName={userName}></ConnectWebSocket>
        :
        <UserNameInput setUserName={setUserName}></UserNameInput>
      }
    </div>
  )
}
export default App
