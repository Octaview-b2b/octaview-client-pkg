import OctaviewClient from "./octaview-client"

function App() {
  const obj = {
    url: "http://localhost:5000/api/jobs/ext/672c7f7d9e5a43c5cc0839bc",
    background: "#FAF3DD", // Light Cream
    textColor: "#2F4F4F",  // Dark Slate Gray
    buttonColor: "#FF7F50", // Coral
    api:'esdjg;lkioletn;regtrhth'
  };

  return (
    <>
      <OctaviewClient {...obj} />
    </>
  );
}

export default App;
