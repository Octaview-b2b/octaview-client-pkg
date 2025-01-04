import OctaviewClient from "./octaview-client";

function App() {
  const obj = {
    background: "#F5F5F5", // Light Gray for a clean, professional background
    textColor: "#2F4F4F",  // Dark Slate Gray for readability
    buttonColor: "#00796B", // Teal for a professional but distinct button color
    api: 'esdjg;lkioletn;regtrhth', // API key (keep secure)
    userId: "675d58a04ecf93555922208f",
  };

  return (
    <>
      <OctaviewClient {...obj} />
    </>
  );
}

export default App;
