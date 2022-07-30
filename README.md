# Thesis project: SAFE mobile application

## About

This mobile app created with Express.js, MongoDB, and React Native was my thesis project in spring 2022. Below you can read the abstract of the thesis, which gives a short introduction to the project.

>Developing mobile applications can be challenging, especially with so many ways to build the application and different technologies existing.
>
>The objective of this thesis was to introduce one option for developing a full-stack cross-platform mobile application using React Native, Express, and MongoDB. The objective was achieved through a case study of an application that makes it possible for women to send their location information quickly via text messages to pre-saved phone numbers whenever they do not feel safe. This type of mobile application is especially significant in Finland because there do not exist any viable mobile apps regarding women’s safety that are available in Finnish.
>
>As a result, a first prototype of the application was created. The user can create credentials and use them to log in, save and delete contacts to and from the app, and send their location data through text messages to multiple contacts simultaneously. The functions worked as anticipated, and the used technologies can be an excellent choice for a modern mobile application. However, it is critical to assess what the requirements for the application being developed are and whether this particular solution is right for it.

You can read the whole thesis [here](https://urn.fi/URN:NBN:fi:amk-2022060415337).

Please note that the app is not by any means complete and still has quite a few bugs. This is just a rough first prototype.

## Run and test the app

### Prerequisites

* Node.js (https://nodejs.org/en/download/)
* Expo CLI (https://docs.expo.io/get-started/installation/)
* Expo app on your android device (https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)
* MongoDB database of your own either locally or in the cloud (https://www.mongodb.com/)

First install Node.js and Expo CLI.

Once you have cloned the repository to yourself, create a ```.env``` file inside the back-end folder. The file should contain a link to your MongoDB database:
```
DB_URL=<replace this with your link>
```

Next navigate to the project root and install node module with:
```
npm install
```

If node has trouble starting, make sure your PATH system variable has: 
```
%SystemRoot%\system32
```

Then replace the ip andress in both ```CreateNewUserScreen``` and ```LoginScreen```:
```
const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://<add your ip address here>:3000';
```

Then you can run the app with ```npm start``` which starts the front-end and the back-end at the same time.

Scan the QR code with the Expo app to run the app on your phone

OR 

Enable USB-debugging on your android device, and connect it to your PC with a USB cable. In the website that opened in your browser, select CONNECTION: Local and then Run on Android device/emulator to run the application on your device

OR

Run the app on your computer with Android Studio emulator


If you read this far, here's a fun fact: the app's fonts are inspired by the HBO series Euphoria.