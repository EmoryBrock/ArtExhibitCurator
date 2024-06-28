# ArtiQuest - A Web-based Art Curation and Exhibit App

## Project Background

This web application was created with the objective of using collate art information from multiple sources and allow a user to create their own collection/exhibitions. An online version of ArtiQuest may be found at [insert link here]
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
 - [My Collections](#my-collections)

[Links](#links)


------
## Project Description

### Purpose
As stated in the project background, the web-based application is designed to allow a user to create their own collections/exhibits from across multiple eras, medium, etc.

### Features
ArtiQuest allows the user to search artwork from across two API sources. It allows the user to filter the results received and view more in-depth information on a specific artwork.

### Technologies/Frameworks
ArtiQuest was created using the following frameworks and plugins: Firebase for a non-relational back end solution and React for the front end. The Cleveland Museum of Art Open Access API [https://openaccess-api.clevelandart.org/] and The Metropolitan Museum of Art Collection API [https://metmuseum.github.io/] for the artwork information. Axios is used to fetch data from the two APIs. TailwindCSS is used to develop/create the CSS for the project. Here is a list of the resources used.  

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
npm install react-router-dom@latest
```

_TailwindCSS_
```
npm install -D tailwindcss postcss autoprefixer
```

With the dependencies installed, you are now ready to create the .env file for your local application. Place this file in the first level of the Front End folder and copy the below text block into it. This will allow you to connect to the Firebase database for ArtiQuest.

To start the using ArtiQuest, confirm that you have navigated in your terminal to the ArtCurator folder. There you will enter the following prompt

```
npm run dev
```

Follow the prompts to view the application in a web browser.

## How to navigate ArtiQuest

### Sign up / Log in
When first accessing ArtiQuest, the user will be asked to Sign In or Sign Up via the buttons provided.

For a new user, the user will select Sign Up. On this screen, the user will need to provide a email and password.  Both of these have validation checks. Upon completion, the user will click on "Click Here to Proceed". ArtiQuest will then redirect the user to the sign in page and the process will be the same as an existing user.

For a returning user, the user will select Sign In. On this screen the user will need to provide their username and password credentials and click on the Click Here to Proceed button.  From here, ArtiQuest will navigate the user to the **Profile** page.

### Home page
On the Home page the user will have the ability to navigate across the entire site using the navigation bar.  Additionally the user can search for artwork by clicking on the *Search*. 


### Search

To look for a particular artwork, the user can enter a search text into the search bar and choose the type of search - General, Title or Artist. Click magnifying glass and ArtiQuest will return a list of artworks related to the search terms. The user can click the artwork card to be taken to a page with more information about the artwork.

The show card for each artwork displays the following information:

<ul>
<li>image of the artwork (or no image picture)</li>
<li>artist name</li>
<li>date of artwork</li>
</ul>

Each card is clickable and will take the user to a page with more information that artwork. -->
### My Collection
This is accessible when a user is logged in. This page contains the users curated collections. (TBC)


### Future Considerations
Here are some features for future considerations:
<ul>
<li>Add a User Profile page that allows the user to update passwords and a avatar</li>
<li>Add the ability for a user to view the image in a larger window</li>
<li>Add a Artist focused detail page for information about the artist</li>
<li>Add a "Similar Artwork Section" below the artwork info on the Artwork Detail page</li>
<li>Add the ability for a user to add artwork via the search results -if user is signed in</li>
</ul> 


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