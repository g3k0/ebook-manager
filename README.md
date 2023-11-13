# Ebooks Manager

## Description
Ebook manager, in the context of handling ebooks, is designed to accomplish a single use case, described as follow:<br />
The user has a folder containing a certain quantity of ebooks, maybe some of them compressed in zip format, maybe compressed in .rar format, or not compressed at all. The user wants  to:

* unzip or unrar the compressed ebooks;
* the user wants to import only ebooks with specific file extensions (.epub, .mobi, .pdf, .docx);
* thew user wants to put all the ebooks in a destination folder so then it will be easy for him/her to import the ebooks in a ebooks library software (e.g. [calibre](https://calibre-ebook.com/));

## How it works

### Prerequisites

To run Ebook Manager you need to have [Node.js](https://nodejs.org/en) installed in your machine.<br />

### Run the Ebook Manager

The following steps need to be run only once:

1. Clone this repository;
2. Go with a terminal in the root folder of this project;
3. Install the dependencies with the command `npm install`;

The Ebook Manager exposes a CLI interface, to run the program, from the root folder of the application simply run:

`node .`

Then, follow the instructions printed in the terminal.

## Disclaimer

This software is absolutely **not production ready**, it was developed to accomplish only one single task.<br />
The code works but is not optimized, and it's not tested at all. Run at your own risk. 