import OctaviewClient from "./octaview-client";

function App() {
  const obj = {
    url: "http://localhost:5000/api/jobs/ext/672c7f7d9e5a43c5cc0839bc",
    background: "#F5F5F5", // Light Gray for a clean, professional background
    textColor: "#2F4F4F",  // Dark Slate Gray for readability
    buttonColor: "#00796B", // Teal for a professional but distinct button color
    api: 'esdjg;lkioletn;regtrhth' // API key (keep secure)
  };

  return (
    <>
      <OctaviewClient {...obj} />
    </>
  );
}

export default App;
