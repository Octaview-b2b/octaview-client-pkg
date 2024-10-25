
# octaview-client 

The octaview-client is a React component designed to integrate job listing functionalities into your application. It fetches job data from a specified URL and renders it with customizable styles.


## Features

- Dynamic Job Listings: Fetches job data in real-time from your backend application.
- Customizable Appearance: Easy customization options for background and text color to match your website's theme.
- Seamless Integration: Built as a React component, it can be easily integrated into existing React applications or other frameworks.


## Installation

To use octaview-client in your React application, follow these steps:

### Install the Package

```bash
  npm install octaview-client
```
### Import the Component
Once installed, import OctaviewClient into your React component where you want to use it:
```javascript
import OctaviewClient from 'octaview-client';

```
    
## Usage/Examples
To use the OctaviewClient component, you need to provide it with props that define its behavior and appearance.

### Props
The OctaviewClient component accepts the following props:

`url`   `string` The endpoint to fetch job data from.

`background` `string` The background color for the component.

`textColor` `string` The text color for the displayed content.




```javascript
import React from 'react';
import OctaviewClient from 'octaview-client';

function App() {
  const props = {
    url: "http://localhost:3030/jobs",
    background: "#f0f0f0",
    textColor: "#000000"
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <OctaviewClient {...props} />
    </div>
  );
}

export default App;

```

