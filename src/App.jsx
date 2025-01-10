import OctaviewClient from "./octaview-client";

function App() {
  const obj = {
    background: "#F5F5F5", // Light Gray for a clean, professional background
    textColor: "#2F4F4F",  // Dark Slate Gray for readability
    buttonColor: "#00796B", // Teal for a professional but distinct button color
    api: '15a6cd8f2c70da987f918e51470bbe4e01fd6bed7b1ae67eb280aacce39c36a3',
    userId: "675d58a04ecf93555922208f",
  };

  return (
    <>
      <OctaviewClient {...obj} />
    </>
  );
}

export default App;
