WeChat Official Account Year-end Digest Program
============

[![GitHub repo size](https://img.shields.io/github/repo-size/chenzibin2019/mp-annual-report.svg)](https://img.shields.io/github/repo-size/chenzibin2019/mp-annual-report.svg)

MPAnnualReport is a year-end digest tool for WeChat official accounts. It fetches data from WeChat open platform and summarizes the operating statistics of officially-verified accounts. 


#### Table of Contents

- [Environment setup](#environment-setup)
    - [NodeJS](#node-js)
    - [Electron](#electron)
- [Build and install MPAnnualReport](#build-and-install-mpauunal-report)
- [Usage](#usage)


## Environment setup

The following dependencies are needed for MPAnnual-Report.

- nodejs
- npm
- react (>= 6.5.2)
- ant-design
- ant-design/pro-layout
- react-chartjs-2
- electron-js

### Node JS

**Node JS** can be installed from [their official site](https://nodejs.org/).

Dependencies can be installed using `npm install` command running from the root directory of this project. 

### Electron

You should automatically install Electron and Electron-packager by using command `npm install`. If not, please install manually by `npm i electron --dev` and `npm i electron-packager --dev`. 

## Build and install Plankton-neo

```sh
$ npm install 
$ npm run # start up development server
$ npm run app  # start up Electron
$ npm run build  # build the software for packaging
$ cd build
$ npm run build-app-{PLATFORM}-{ARCH}  # package the software. valid platform: darwin (mac) win32 linux. valid arch: x64
```

## Usage

Run the application packaged by Electron-packager. On macOS, run .app file, on Windows, run .exe file, on Linux, run the binary file. 