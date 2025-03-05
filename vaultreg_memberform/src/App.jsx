import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MemberForm from './components/MemberForm'
import RedirectPage from './components/RedirectPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>    
    <Router>
      <Routes>
        <Route path='/' element={<MemberForm />} />
        <Route path='/vaulthanks' element={<RedirectPage />} />
    </Routes>
    </Router>
    <Toaster position='top-center'/>
    </>

  )
}

export default App
