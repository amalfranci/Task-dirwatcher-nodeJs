## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

DirWatcher is a Node.js application designed to monitor a specified directory for changes at a configured interval. It counts the occurrences of a magic string in the files and logs the details of each run. Results are exposed via a REST API.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Winston](https://github.com/winstonjs/winston)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Node.js (v14.x or higher)
* npm (v6.x or higher)
* MongoDB (running locally or accessible remotely)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/amalfranci/Task-dirwatcher-nodeJs.git
   cd dirwatcher
Install NPM packages

```sh
Copy code
npm install
Create a .env file
```
```sh
Copy code
touch .env
Add the following configuration to the .env file:

env
Copy code
DB=mongodb://localhost:27017/dirwatcher
WATCH_DIRECTORY=./watched_directory
INTERVAL=3000
MAGIC_STRING=MAGIC_STRING
PORT=3000
Create the directory to be watched:
```



sh
Copy code
mkdir watched_directory
(Optional) Add some sample files to the watched directory:

sh
Copy code
echo "This is a sample file with MAGIC_STRING" > watched_directory/sample1.txt
echo "Another sample file without the magic string" > watched_directory/sample2.txt
Start the MongoDB server:
Ensure MongoDB is running locally or accessible remotely.

Start the application:

sh
Copy code
npm start
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- USAGE -->
Usage
Once the application is running, it will automatically monitor the specified directory and expose the results via the REST API.

For more examples, please refer to the Documentation

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- API DOCUMENTATION -->
API Documentation
Base URL
bash
Copy code
http://localhost:3000/api/tasks
Endpoints
1. Configure Task
URL: /config
Method: POST
Description: Configures the task with a new watch directory, interval, and magic string.
Request Body:
json
Copy code
{
  "watchDirectory": "./watched_directory",
  "interval": 60000,
  "magicString": "MAGIC_STRING"
}
Response:
Success (200):
json
Copy code
{
  "message": "Task configured successfully",
  "task": {
    "_id": "60f8b1bc9e7b8f4a7c2b9e31",
    "watchDirectory": "./watched_directory",
    "interval": 60000,
    "magicString": "MAGIC_STRING",
    "__v": 0
  }
}
Error (500):
json
Copy code
{
  "message": "Server error",
  "error": "Error details"
}
2. Get Task Runs
URL: /runs
Method: GET
Description: Retrieves the details of all task runs.
Response:
Success (200):
json
Copy code
[
  {
    "_id": "60f8b1e09e7b8f4a7c2b9e32",
    "taskId": "60f8b1bc9e7b8f4a7c2b9e31",
    "startTime": "2021-07-21T18:00:00.000Z",
    "endTime": "2021-07-21T18:01:00.000Z",
    "runtime": 60000,
    "filesAdded": ["sample1.txt", "sample2.txt"],
    "filesDeleted": ["sample3.txt"],
    "magicStringCount": 3,
    "status": "success"
  }
]
Error (500):
json
Copy code
{
  "message": "Server error",
  "error": "Error details"
}
3. Start Task
URL: /start
Method: POST
Description: Manually starts the directory watch task.
Response:
Success (200):
json
Copy code
{
  "message": "Directory watch task started"
}
Error (500):
json
Copy code
{
  "message": "Server error",
  "error": "Error details"
}
4. Stop Task
URL: /stop
Method: POST
Description: Manually stops the directory watch task.
Response:
Success (200):
json
Copy code
{
  "message": "Directory watch task stopped"
}
Error (500):
json
Copy code
{
  "message": "Server error",
  "error": "Error details"
}
Example cURL Commands
Configure Task
bash
Copy code
curl -X POST http://localhost:3000/api/tasks/config \
-H "Content-Type: application/json" \
-d '{
  "watchDirectory": "./watched_directory",
  "interval": 60000,
  "magicString": "MAGIC_STRING"
}'
Get Task Runs
bash
Copy code
curl -X GET http://localhost:3000/api/tasks/runs
Start Task
bash
Copy code
curl -X POST http://localhost:3000/api/tasks/start
Stop Task
bash
Copy code
curl -X POST http://localhost:3000/api/tasks/stop
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- ROADMAP -->
Roadmap
 Add configuration endpoint
 Add task run details retrieval
 Add manual task start/stop endpoints
 Add support for multiple directories
