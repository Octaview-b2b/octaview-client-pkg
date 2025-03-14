import OctaviewClient from "./octaview-client";

function App() {
  const obj = {
    background: "#F5F5F5", 
    textColor: "#2F4F4F",  
    buttonColor: "#00796B", 
    api: '98b1254a2a28509bb517ebaec68332bc929fd6bde9f6fd1e1343583ef91b0b98',
    userId: "67cb155bb5e40fd43cbb388d",
  };

  return (
    <>
      <OctaviewClient {...obj} />
    </>
  );
}

export default App;
