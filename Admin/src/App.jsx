import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Sidebar from './Components/Sidebar/Sidebar'


const App=()=>{
  return(
    <div>
      <Navbar/>
      <Admin/>
      {/* <Sidebar/> */}
      
    </div>
  )
}

export default App