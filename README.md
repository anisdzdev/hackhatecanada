# Project Title

An application meant to educate, warn and hopefully stop the propagation of hate on the internet. It makes use of a web crawler to analyze as many websites as possible and identify if they are hateful or not using our own homebrew algorithm. There is also a Google Chrome extension that the users can install to get warned before visiting a website identified as harmful. Users can also submit words they deem hateful to be added to our detection algorithm.

---
## Requirements

For development, you will only need Node.js and a node global package, such as NPM, on your machine. You will also need Python 3.3.* installed in order to run the crawler.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Python installation
- #### Node installation on Windows

  Just go on [official Python website](https://www.python.org/) and download the installer.
Also, be sure to have `pip` available in your PATH

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install python3

---

## Install

    $ git clone https://github.com/anisdzdev/hackhatecanada
    $ cd hackhatecanada/server
    $ npm install

## Running the project

    $ cd hackhatecanada/server
    $ npm run dev
    $ cd ../webpage-parser/hackhatespiders/hackhatespiders/spiders
    $ scrapy crawl hackhate