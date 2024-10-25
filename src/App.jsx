import OctaviewClient from "./octaview-client"

function App() {
const obj ={
    url: "http://localhost:3030/jobs", 
    background: "#f0f0f0", 
    textColor: "#000000",
  
}

  return (
    <>
   <OctaviewClient {...obj}/>
    </>
  )
}

export default App
