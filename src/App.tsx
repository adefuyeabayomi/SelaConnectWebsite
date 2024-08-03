import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Pay } from './Payment';

function App():React.JSX.Element {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' Component={Pay}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
