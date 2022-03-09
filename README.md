# SimpleMusicApp

### Requirements
  - NodeJS, MongoDB

### To run in local
  - Clone the repo: *git clone https://github.com/impavido-7/SimpleMusicApp.git*
  - cd SimpleMusicApp/client and install the node_modules using *npm install*
  - cd SimpleMusicApp/server and install the node_modules using *npm install*
  - To start the application open the terminal in SimpleMusicApp and run the command ***npm start***. This will start both the client & server
  - The client will be running in the port **3000** & the server will be running in the port **3001**
  - When the application is running, open the url ***http://localhost:3000***. Here you can see the list of audio files available.
  - In order to upload a new audio file browse ***http://localhost:3000/postFile***

### How it works?
  - Whenever you upload a file using */postFile* the .mp3 file is converted to binary data using the **FormData** class of JavaScript and this binary data will be send to the server.
  - In server, we made use of **express-fileupload** package to get this binary data and once we got it we will move this file to the *uploads* folder and we save this relative path wrt uploads in the MongoDB database
  - When we hit *http://localhost:3000* in the browser we will get the list of files we uploaded in the database but before that we need to serve these audio files over an server and we can do it using the ***http-server*** package.
    - To install it: *npm i -g http-server*
    - To serve our music files, we need to open the terminal in uploads folder and give the command ***http-server ./***. This will serve all the files available in uploads folder.
    - Generally, it will run in ***http://localhost:8080***.
    - Everything on there will be allowed to be got.
      - **Example**: http://localhost:8080/abc.mp3
