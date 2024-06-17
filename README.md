# ArtiQuest - A Web-based Art Curation and Exhibit App

## Project Background

This web application was created with the objective of using collate art information from multiple sources and allow a user to create their own collection/exhibitions. 

------
## Table Of Contents

[Project Description](#project-description)
 - [Purpose](#purpose)
 - [Features](#features)
 - [Technologies/Frameworks](#technologiesframeworks)
 <!-- - [Challenges](#challenges)
 - [Future considerations](#future-considerations) 
 - To be included upon completion of initial project phase-->

[How to install & run the ArtiQuest](#how-to-install-and-run-the-project)

[How to use ArtiQuest](#how-to-navigate-ArtiQuestl)
 - [Home](#home-page)
 - [Search](#search)
 - [Profile](#profile)
 - [My Collections](#my-collections)

[Links](#links)


------
## Project Description

### Purpose
As stated in the project background, the web-based application is designed to allow a user to create their own collections/exhibits from across multiple eras, medium, etc.

### Features
ArtiQuest allows the user to search artwork from across two API sources. It allows the user to filter the results received and view more in-depth information on a specific artwork.

### Technologies/Frameworks
ArtiQuest was created using the following frameworks and plugins: Firebase for a non-relational back end solution. The Cleveland Museum of Art Open Access API [https://openaccess-api.clevelandart.org/] and The Metropolitan Museum of Art Collection API [https://metmuseum.github.io/] for the artwork information. Axios is used to fetch data from the two APIs. Here is a list of the resources used. TailwindCSS is used to develop/create the CSS for the project.  

<ul>
<li>Axios</li>
<li>Firebase</li>
<li>React-icons</li>
<li>React Router</li>
<li>TailwindCSS</li>
</ul>

More information on the above can be found in our [Links](#links).


<!-- ### Challenges
to include if needed -->

### Future Considerations
Here are some features for future considerations:
<!-- <ul>
<li> Incorporate AI for game recommendations</li>
<li> Adding a user's game type interests to their profile to allow for a more sophisticated matching algorithm</li>
</ul> 
This section to be completed once inital build phase is completed
-->

## How to Install and Run the Project

To run ArtiQuest locally, you will need to clone the repo:

```
git clone https://github.com/EmoryBrock/ArtExhibitCurator.git
```
Once cloned, navigate to the "ArtExhibitCurator" folder inside the project folder and install the necessary dependencies:


```
npm install
```

This should update your local repo with all the dependencies needed to run ArtiQuest.

<!-- A possible error that you may encounter a peer dependency error.  To solve this enter the following:
To update once project phase is completed-->

In case you are still missing dependencies, I have listed the individual ones below:

_Axios_
```
npm i axios
```

_Firebase_
```
npm install --save firebase
```
_React Icons_
```
npm install react-icons --save
```

_React Router_
```
npm install react-router-dom 
```

_TailwindCSS_
```
npm install -D tailwindcss postcss autoprefixer
```

With the dependencies installed, you are now ready to create the .env file for your local application. Place this file in the first level of the Front End folder and copy the below text block into it. This will allow you to connect to the Firebase database for ArtiQuest.

<!-- ```
The info is to be updated once project phase in completed
VITE_APIKEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
``` -->

To start the using ArtiQuestn, confirm that you have navigated in your terminal to the ArtCurator folder. There you will enter the following prompt

```
npm run dev
```

Follow the prompts to view the application in a web browser.

## How to navigate ArtiQuest
**NOTE**: This section will be updated once project is completed

### Sign up / Log in
When first accessing ArtiQuest, the user will be asked to Sign In or Sign Up via the buttons provided.

For a new user, the user will select Sign Up. On this screen, the user will need to provide a email and password.  Both of these have validation checks. Upon completion, the user will click on "Click Here to Proceed". ArtiQuest will then redirect the user to the sign in page and the process will be the same as an existing user.

For a returning user, the user will select Sign In. On this screen the user will need to provide their username and password credentials and click on the Click Here to Proceed button.  From here, ArtiQuest will navigate the user to the **Profile** page.

### Home page
<!-- On the Home page the user will have the ability to navigate across the entire site using the navigation bar.  Additionally the user can search for artwork by clicking on the *Search*. Below this is a List of artworks with cards showing the following information:

<ul>
<li></li>
</ul>

Each card is clickable and will take the user to a page with more information that artwork. -->

### Search

To look for a particular artwork, the user can enter a search text into the search bar and choose the type of search - General, Title or Artist. Click "Search" and ArtiQuest will return a list of artworks related to the search terms. The user can click the artwork card to be taken to a page with more information about the artwork.

### Profile

<!-- Features and UX will be placed here once project phase is completed-->

### My Collection

<!-- Features and UX will be placed here once project phase is completed-->

## Links
<table>
<tr>
<td>Axios</td>
<td>https://axios-http.com/</td>
<tr>
<td>Firebase</td>
<td>https://firebase.google.com/</td>
</tr>
<tr>
<td>React Icons</td>
<td>https://react-icons.github.io/react-icons/</td>
</tr>
<tr>
<td>React Router</td>
<td>https://reactrouter.com/en/main</td>
</tr>
<tr>
<td>TailwindCSS</td>
<td>https://tailwindui.com/</td>
</tr>
<tr>
</table>


Readme version 1.0