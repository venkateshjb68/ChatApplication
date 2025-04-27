import { io } from 'socket.io-client';
import Main from "./components/Main";


const socket = io('http://localhost:3000');
function App() { 
  return (
    <>
     <Main socket={socket} />
    </>
  );
}
export default App;
