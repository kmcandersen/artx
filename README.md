# ArTX mobile app

Connects street artists in Austin, TX (“ATX”) with fans, and potential clients interested in commissioning original murals. The project is inspired by the [clickable prototype](https://xd.adobe.com/view/d0fec993-89bb-4a7f-b98e-7d6e63b4f987-85ad/?fullscreen) my team created during the Adobe/General Assembly Creative Jam, a 70-hour design challenge in August 2020. See [artx-server](https://github.com/kmcandersen/artx-server) repo for server-side code.

**Demo videos**

- [Register, update user info, add artwork](https://youtu.be/eAsAg6jiul4)
- [Browse artwork & artists](https://youtu.be/d0aFMypvmRU)

**Expo project page:**
[expo.dev/@kmcandersen/artx-frontend](https://expo.dev/@kmcandersen/artx-frontend)

### Features

- Add, delete, and update artwork
- Add artwork images and artist profile photo from camera roll
- Add, update user details
- User authentication
- View artwork locations on a map

### Technologies

###### Front end:

- React Native
- Expo
- Firebase authentication
- Form validation with Formik & Yup
- Image upload to Cloudinary
- react-native-maps library

###### Back end (see artx-server repo):

- Node/Express
- MongoDB/Mongoose

## Screenshots

<p>
<img src="https://kristenandersen.online/assets/artx-screenshots/welcome.jpg" alt="App welcome screen" height="30%" width="30%" style="padding: 5px;"/>
<img src="https://kristenandersen.online/assets/artx-screenshots/browse-list.jpg" alt="App list screen" height="30%" width="30%"style="padding: 5px;"/>
<img src="https://kristenandersen.online/assets/artx-screenshots/browse-map.jpg" alt="App map screen" height="30%" width="30%" style="padding: 5px;"/>
</p>
<p>
<img src="https://kristenandersen.online/assets/artx-screenshots/artwork.jpg" alt="App artwork screen" height="30%" width="30%" style="padding: 5px;"/>
<img src="https://kristenandersen.online/assets/artx-screenshots/artwork-add.jpg" alt="App add artwork screen" height="30%" width="30%" style="padding: 5px;"/>
<img src="https://kristenandersen.online/assets/artx-screenshots/artist.jpg" alt="App artist profile screen" height="30%" width="30%" style="padding: 5px;"/>
</p>
