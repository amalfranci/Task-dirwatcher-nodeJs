# About The Project

DirWatcher is a Node.js application designed to monitor a specified directory for changes at a configured interval. It counts the occurrences of a magic string in the files and logs the details of each run. Results are exposed via a REST API.
# App Working
  please check [here](https://drive.google.com/file/d/1Fk69sih5-QZL0Iw9FVm9MOi5ns9FPhLx/view?usp=sharing)

# Code Structure

<img width="941" alt="CODE STRUCTURE_1" src="https://github.com/amalfranci/Task-dirwatcher-nodeJs/assets/65619344/47eb1a94-c44c-4adf-a31e-273ed1f6ffec">



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
npm install
```
Create a .env file
touch .env
Add the following configuration to the .env file:

```sh
DB=mongodb://localhost:27017/dirwatcher
WATCH_DIRECTORY=./watched_directory
INTERVAL=3000
MAGIC_STRING=MAGIC_STRING
PORT=3000
```


```sh
mkdir watched_directory
```
(Optional) Add some sample files to the watched directory:


Using Winston for Logging

Winston is a versatile logging library for Node.js. It allows for multiple transports, which can be used to log information to different destinations, such as the console, files, or remote logging services.


<img width="898" alt="winston" src="https://github.com/amalfranci/Task-dirwatcher-nodeJs/assets/65619344/71a89df1-8838-479e-aaf1-c89d805b635a">


Installing Winston

To use Winston in your DirWatcher project, you first need to install it:

```sh
npm install Winston

```

Using Winston

You can now use the logger in your application files. For example, in your main application file:

```sh

// app.js
const logger = require('./logger');

// Example usage
logger.info('Application started');
logger.error('An error occurred');

```


Start the application:

```sh
npm start
```

<!-- USAGE -->
Usage
Once the application is running, it will automatically monitor the specified directory and expose the results via the REST API.

For more examples, please refer to the Documentation ([API Specification Doc](https://docs.google.com/document/d/1DplxnKj0by-YCNaV7KEdKjuS0DCNcOPE/edit?usp=sharing&ouid=108635337891655763555&rtpof=true&sd=true))

### Using Postman

Postman is a popular tool to test and develop APIs. You can use it to test the DirWatcher API by following these steps:

Download and Install Postman: If you haven't already, download and install Postman from Postman's official website.

Import the Postman Collection:

Create a new collection in Postman.
Add requests for each API endpoint.

Example request for configuring a task:

Method: POST
URL: http://localhost:3000/api/tasks/config
Body:
json

```sh
{
  "watchDirectory": "./watched_directory",
  "interval": 60000,
  "magicString": "MAGIC_STRING"
}
```

Send Requests: Use the collection to send requests to your local DirWatcher API and verify the responses.

Save Responses: Save your successful responses in the Postman collection for future reference.

Also 

Method: POST
URL: http://localhost:3000/api/tasks/start

Method: POST
URL: http://localhost:3000/api/tasks/stop

Method: GET
URL: http://localhost:3000/api/tasks/runs






