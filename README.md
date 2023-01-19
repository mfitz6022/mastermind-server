# Mastermind

This mastermind project encompasses all the features required for the REACH interview plus addition features such as creating users, time, scoreboard, varying difficulty, and online multiplayer and chat functionality.

## Running the application
There  are two ways in which the app can be run. This application is fully deployed with AWS EC2 instances therefore the application can by run through the user's internet browser. The application can also be run on the  user's local machine. However, the code in it's current state is configured to work with the EC2 instances IP addresses therefore the application must be reconfigured to be run locally.

# Running the application in the browser only
Simply enter the following text in your browsers address bar: http://54.151.2.48:8080

# Running the application locally
Please first ensure that you have installed PostgreSQL v14.6 or later and node v16.16.0 or later. Next, clone mastermind-server and mastermind-frontend separately. In mastermind-server navigate to index.js and change line 14 from "origin: 'http://54.151.2.48:8080'" to "origin: 'http://localhost:8080'". Next in the root directory create a .env file and populate it as following:

PORT=3000

PGHOST='localhost'

PGUSER= * your postgresql user *

PGNAME='mastermind'

PGPASSWORD=''

PGPORT=5432

Next, to create the database, please first make sure postgresql is running on your machine. You can do so by opening a terminal and entering  the command: psql. Then in the mastermind-server repository, navigate to the mastermind-backend directory and then, in the terminal enter the command: npm install to install all dependencies. Once complete enter the command: npm run dbStart. Now to launch the server, in the same mastermind-backend directory, enter the command: npm start.

Now you can configure and launch the client. Clone the mastermind-frontend repository to your local machine. Next, navigate to the /helper_functions directory in the /src directory. You will need to reconfigure both the httpRequests.js and sockets.js files. In the httpRequests.js file change line 8 from "const URLmastermindServer = 'http://54.67.49.166:3000';" to "const URLmastermindServer = 'http://localhost:3000';". Next, navigate to sockets.js and make the same change on line 5 from "const URL = 'http://54.67.49.166:3000';" to "const URL = 'http://localhost:3000';". Finally, to run the client, navigate back to the /mastermind-frontend directory and run the command: npm install, then once complete, enter the command: npm start.

Once the client, server, and postgresql database are all properly configured and running, open your broswer and enter the following in the address bar: http://localhost:8080

## Code structure
The application can be divided into three main components the client: mastermind_frontend, the server: mastermind_backend, and the postgresql mastermind database. Starting with the client, there are 6 directories: boards, helper_functions, leaderboards, login, menu, and Misc.

# Client-side structure
The boards directory contains all components related to the main "board" interface that the user interacts with. This includes the display of each input area, feedback, score, time, number of attempts, and even a chat box during online play. It also contains post-game summary pages. The Guess.jsx component in boards/gameplay handles players' guesses using functions imported from src/helper_functions/guessFunctions.js as well as intercommunicating user inputs with other connected users via web socket events.

The helper_functions directory contains functions utilized throughout the application. GuessFunctions.js features the function "takeGuess". This function takes in a code, a user's guess, and the number of attempts. The function creates a mutable boolean variable titled "isCorrect". This is used to keep track of whether or not the guess is correct and is set to true by default. The variable "feedBack" is used to keep track of correct numbers and positions at index 1 and correct numbers incorrect positions at index 0. Next, the function uses the given code to populate the "codeObject" variable. This allows the function to check guess values against the code values to see if they exist without additional iterations therefore optimizing time complexity. The function iterates over the guess input. It checks the value at the current index and compares it with the given code at the current index. It also checks if the value at the current index exists in the codeObject. Next a string is created to reflect the feedback values in a more user friendly manner. Next index 1 of the feedback array is checked for a value four indecating that all numbers in the guess were correct. If not, it changes isCorrect to false. Lastly if isCorrect is true, the function returns true, if not and the attempt count is less than 9, it returns the feedback string, in all other cases, it returns false.
The httpRequests.js file exports function that handle sending http requests to both the server and the random number generator API. The socket.js file handles and exports client-side web socket configurations as well as http requests related to the websocket rooms.

The leaderboards directory handles the leaderboard components and functionality. GlobalScores.jsx access data from all users and UserScores.jsx accesses data only from the currently signed in user. ScoardBoard.jsx processes the data from either GlobalScores.jsx or UserScores.jsx and renders the values accordingly.

The login directory handles the initial sign-in/sign-up process. SignIn.jsx takes a username and password input, validates them, then sends them to the server for authentication, if they credentials are authenticated, the user can proceed. SignUp.jsx takes a username and password input, validates them, then sends them to the server for the values to processed and stored in the database. InputFields.jsx handles the input logic for both SignIn.jsx and SignUp.jsx.

The menu directory contains the menu components and associated logic. MainMenu.jsx provides a path to all functionalities of the application. OnlineMenu.jsx displays lists of both public and private game rooms as well as allowing users to create there own private rooms. The room-associated functionalities are handled by functions exported from CreatePrivateRoomModal.jsx and JoinPrivateRoom.jsx.

The Misc directory handles some useful additional features for the user such as instructions on how to play in HowToPlay.jsx and providing a difficulty selection and account deletion functionality in Options.jsx.

# Server-side structure
The mastermind_backend repository supplies the client with connections to the postgresql database as well as enabling multiplayer functionality through web sockets. All server logic is contained within the server directory.

the controllers directory handles the requests their contents from the client and provides and retrieves information from the postgresql database then sends that information back to the client.
gameplay.js handles socket broadcasting to clients in target rooms. It broadcast gameplay functionalities such as setting clients in a room with a single code, synchronizing players' guess attempts, and a ready/unready option to indicate when players are ready for their guess to be submitted (Ready/unReady functionality is in place for future implementation, but is not currently used).
global.js communicates leaderboard data for all users to the client. messages.js handles the room joining/leaving functionality as well as real-time text chat communication between users. rooms.js provides the client with the list of public and private rooms as well as it provides the database with data for new rooms and authenticates users joining private rooms. user.js handles all logic and data pertaining to users. It handles creating, authenticating, and deleting users as well as posting and retrieving users' leaderboard data.
The /routes directory contains the necessary routes for http requests and web socket event listening. routes.js contains all http routes whereas socketRoutes.js contains the event listeners for web socket communication.
index.js configures the express server as well as the socket.io connection. It encorporates middleware to provide the user with security againt common attacks such as XSS, CORS policy configurations, and JSON parsing.

# Database
The database consists of three tables: private_rooms, user_scores, and users. The private_rooms table stores all data regarding client-created rooms. This includes a room_id, the creater of the room (owner column), the name of the room (room_name column), and the room password (room_password column). The user_scores table contains scoreboard data for each user. It keeps track of users' posted usernames, times, difficulty, attempts, and score. Lastly, the users table contains basic information on users. This includes an id, a username, and an associated password (passwords are hashed using blowfish cypher and combined with salt values. This is handled by the server).

## Additional features
The Mastermind application features several additional features. It provides users with their own accounts that they can log into. If so desired, users can also delete their accounts. Users can store/retrieve there own scoreboard data from previous games in addition to viewing other players scores. This Mastermind application also features a helpful how-to-play page for new users to familiarize themselves with the game rules and some features of the app. Users can also select from 'easy', 'medium', and hard difficulties. Each game will keep track of the users' attempts, time, and score. The application is fully deployed with EC2 instances and is therefore accessible to anyone with the IP address. Lastly, this application provides users' with multiplayer gameplay. Users can create their own private rooms and join them with friends who have the password, or players can join open public rooms. In these rooms, players can chat and strategize using the real-time chatbox, and all inputs/submissions by players are synchronized with eachother. That is to say, a player can see the other players guesses/attempts in real-time.

## Known issues
There is a known issue within the multiplayer gameplay. A player joining a room, upon receiving the code for the game in-progress, may receive the code infintely. This can cause delays in the player's actions and could even result in the page becoming unusable, requiring a refresh. Players are highly likely to encouter this within 1-2 online games. The bug is most likely caused either by a miss-configured web socket listening/emitter, or by an unintentional react component re-render, all though the later is less likely.
Furthermore, several console.logs have been kept in the code for easier future code development. This can be an issue pertaining to cheating as a player can open their dev console to view the current code and be able to immediately solve it.