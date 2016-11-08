#__BGgram__

Welcome to BGgram, home of the best and most user friendly online image
and background editor. Choose your like from millions of trending images, 
and edit it to your desires.

The website is held on the `public/` directory. 

The main entry point is `index.html`.
All other html files are in `html/`.
All css files are in `css/`.
All used script files are in `scripts/`.
All local images are in `images/`.

Current placeholder images were obtained on:
* https://unsplash.it/

Currently used API:
* __Pixabay__ : https://pixabay.com/api/docs/ 
* __Pixlr__ : https://apps.pixlr.com/developer/api/

You may access the site from __Heroku Server__ at:
* https://bggram.herokuapp.com/html/index.html 

You may access the site from __Firebase Server__ at:
* https://bggram-d9ba0.firebaseapp.com/

GitHub hosted website:
* https://bluedrag.github.io/BGgram/public/html/index.html 

The GitHub repository is located at:
* https://github.com/bluedrag/BGgram

The GitHub releases are located at:
* https://github.com/bluedrag/BGgram/releases


##Scenarios 
Scenarios that should be tested for HW8 will are scenario 1,2 and 4.

For testing purposes can use __username__: test@gmail and __password__: testing, sign in with a gmail account or create a new account.

All scenarios have been implemented.

###__Scenario one - Using Firebase__: 
* The user will have the ability to login to his account using an account he registers, which will save the information in the Firebase database.
* After the user logs in, he will be able to access to his “myuploads” page where he can upload an image to his account and see the images he has already uploaded or the users have uploaded and have made public. The image’s storage location is the Firebase database and storage.
* After the user clicks the upload button, the image path in the database will be created using the users and image information and then uploaded.
* The database is then going to retrieve the photos and update ‘myuploads’ page.
* The user now has the ability to log in using his/her google account.

###__Scenario two - Browse Images__:
User can search any image they want on the browse page. If they like an image, they can edit it by clicking the ‘edit’ button and save it to their desktop. The edit button will open up the pixlr editor with the current image. Users will be able to use the full functionality of the editor.

*API used*:
* Pixlr (Image Editor)
* Pixabay (Image search engine)

*Current Restrictions*:
* Toggle between different views(ex. ‘popular’ vs ‘most recent’) not supported. Default is ‘popular’
* Safesearch is always on.
* Browse page is limited to MAX of 12 images. No page functionality(pg 1, pg 2, etc.)

###__Scenario three - Data manipulation with D3.js__:
* The user has have the ability to see data visualizations containing information about most liked photos and photos with most views.
* The browse page has have toggle abilities between different types of views.
* Pictures are browseable using tags.
* Photos have a like button and BGgram photos now have a theme type.

###__Scenario four - Gallery View__:
* Browse page features a toggle between Pixlr gallery mode or BGgram gallery mode.
* Photos are searchable between these two different galleries. 
* Normal mode have __expanded__ div on hover.

