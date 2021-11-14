# Music Share
![logo](https://drive.google.com/uc?export=view&id=1qCFn0zSNdOogfUSno84p2bxl81hIgKAR)

**RPP29 Blue Ocean Project**

**Team Members**

* [Abdulhameed Nouraldean](https://github.com/a-nouraldean)
* [Helena Tanubrata](https://github.com/heltan)
* [Jason Mollerup](https://github.com/Jason-Mollerup)
* [Louis La](https://github.com/Louis-La)
* [Quinn Lima](https://github.com/quinn-lima)
* [Sung Jae Yoo](https://github.com/jajh90)
---

**Introduction**

Blue Ocean is a collaborative group project for building a web and mobile friendly application. The goal was to create an app according to our client's request for a music editing/sharing application.

---

**Overview**

Music Share is a mobile view friendly app that allows the user to edit music files and share it with their friends. Users can edit their music by adjusting the with the equalizer and distortion. In addition, users can record their own sounds to input into their files.

On the homepage of the application, users can view all public music projects as well as their own and friends' projects. On the navigation pane, users can change their profile information and view their friends list.

---

**Tech Stack**

*Front-end*
* Reactjs
* Bootstrap React
* CSS
* HTML

*Back-end*
* Express
* Firebase (Authentication, Firestore, Firestorage)
* NodeMailer
* Twillio

*Other*
* Jest
* AWS (EC2)

---

**Video Demo**

[![gif video](https://media2.giphy.com/media/Ah8JWdtipJAaUeESTq/giphy.gif)](https://www.youtube.com/watch?v=-A1HHzpb7sg)


[Demo - YouTube Video Link](https://www.youtube.com/watch?v=-A1HHzpb7sg)

---

**App Features**

*Login/Signup*
- Users can login to the app using their Google, Facebook, Twitter, Github, or phone number. In addition, Users can register an account with their an email/password.
- Firebase Authentication was used on the backend to verify the user's external social media accounts and email/passwords.
![login](https://drive.google.com/uc?export=view&id=1dPP7s2i6w_XiC5KURTndo2HbT0ADwYC5)

*Audio Player*
- Users can easily play and pause the music.

*Layering*
- Multiple music tracks can be uploaded for layering and all tracks can be played at once. The user can control which tracks to play together.

*EQ Editing*
- An equalizer button allows the user to make adjustments to their music track(s).
![eq](https://drive.google.com/uc?export=view&id=1Yxf6PRCLmCAYIG-Cd5V05kaD0Y-4SsnH)

*Distortion*
- A distortion button is available for users to toggle on/off to adjust their music track(s).

*Waveform*
- Users can view the waveform of their music tracks by clicking the waveform icon
![waveform](https://drive.google.com/uc?export=view&id=1uesaR4rVDe-RnASf1Au8fisFkvD89M2U)

*Friends list*
- Users can send friend requests by entering in their emails.
- The friends list can be used to share the edited music tracks to them via email or phone number.

*Email/Text Notifications*
- Users can send and receive notifications for shared tracks or friend requests.

*Download*
- A download button is available for users when a music track complete. Clicking the button will compile all the edits/effects and trackers into a single .wav file for download.

---

**Steps to start the App**

* A .env file with the appropriate keys are required at root
  * Firebase Authentication, Firestore and Firestorage needs to be setup
  * In addition, the App Id/App Secret for each social media authentication needs to be setup through Firebase Authentication
  * A Twilio account and token is needed

**Installation**

1) Install all packages by running the following commands in your terminal.
```
npm install
```
2) Start the server.
```
npm run server
```
3) On a separate terminal, run webpack.
```
npm run webpack:dev
```

---
