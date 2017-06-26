### Installation Instructions

1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start -- --user=[username] --pass=[password]`

### Development Mode
1. Run `npm start -- --user=[username] --pass=[password]`
(starts the node server with the backend APIs)
2. Open a new terminal, navigate to the project folder and run `npm run dev`
(starts the webpack-dev-server; for the client-side assets)

### Troubleshooting
1. If the `EADDRINUSE` error comes up, go the Activity Monitor application that is built in
to MacOS
2.  Click on the "Network" tab and search for "node"
3.  Double-click on it and "force quit/quit" the process
4.  Resume the development instructions
