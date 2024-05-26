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


Start the application:

```sh
npm start
```

<!-- USAGE -->
Usage
Once the application is running, it will automatically monitor the specified directory and expose the results via the REST API.

For more examples, please refer to the Documentation ([https://nodejs.org/](https://docs.google.com/document/d/1DplxnKj0by-YCNaV7KEdKjuS0DCNcOPE/edit?usp=sharing&ouid=108635337891655763555&rtpof=true&sd=true))



