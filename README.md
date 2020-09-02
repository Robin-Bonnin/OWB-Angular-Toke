## Testing the bug

1. Go to the contracts folder and run the VS Code emulator
2. Deploy contracts on accounts 2 to 5 according to the files names
3. Start the angular server (ng serv)
4. Start the fcl wallet (npm run dev:wallet)
5. Login with any credential
6. Click on setup admin account 
    1. In the console, you will see 2 logs and then an error about the http.request


PS : I applied the following fix to allow angular to build the project : https://github.com/improbable-eng/grpc-web/issues/191#issuecomment-392400876
