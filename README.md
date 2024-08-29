**Required Packages:**

- express - `npm install express`
- recoil - `npm install recoil`
- concurrently - `npm install --save-dev concurrently`

`.env` file:

```
REACT_APP_LOCAL_HOST=http://localhost:3000
PORT=3001
```

`package.json` scripts:

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "server": "node server/server.js",
    "dev": "concurrently \"npm run server\" \"npm start\""
  },
```

**To start app:**

`npm run dev`

**Visit:** 

http://localhost:3001/

**User is able to:**

- view all tasks
- filter tasks by
    - ID
    - Status
    - Priority
    - Date Range
- create a new task
- edit or delete an existing task
- view more task details by clicking on an existing task