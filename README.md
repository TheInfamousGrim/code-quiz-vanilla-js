# code-quiz-vanilla-js

## Table of Contents

1. [Description](#description)
2. [Screenshots](#screenshots)
3. [Usage](#usage)
4. [Technology](#technology)
5. [Features](#features)
6. [Badges](#badges)
7. [Credits](#credits)
8. [License](#license)
9. [Feedback](#feedback)

## Description

A vanilla JavaScript multiple choice quiz app that is timed.

the user is presented with the startup page and has the option to start the quiz or to view the locally stored high scores.

Whilst taking the quiz the user has a lot of useful data being displayed such as:

- Current time left
- How many questions they've answered
- their current score from the questions
- They also have the option to quit the quiz and view the high scores

Once they've completed the quiz they're presented with a CONGRATULATIONS as well as their score. They then have the option to:

- Play again
- Look at the rules again
- Or to submit their score with a name of their choice

After choosing to submit their high score, they're then presented with the high score page, where they can view other users (or there own if they're that way inclined) scores.

Only the top five will be displayed! Are you brave enough to conquer the quiz???

### User Story

AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

### What did I Learn

I went a little bit beyond what was expected. I decided to use a quiz api, specifically [QuizAPI.io](https://quizapi.io/). So I learned a lot about how to sort and display JSON data. Because of that I further deepened my knowledge of working with objects.

Some of the other things I learned were:

- How to purify html injected using innerHTML and to only use it when users are inputting data
- How to generate HTML elements, hide or remove them and navigate the DOM with purpose
- I also picked up how to make a basic page loader thanks to [w3schools](https://www.w3schools.com/howto/howto_css_loader.asp)
- Convert objects into arrays and use array methods such as sort, map and filter to display the
- Updating UI elements based on user input
- Sanitize dirty strings so that they can be used for generating user input HTML thanks to [DOMPurify](https://github.com/cure53/DOMPurify)

## Screenshots

### Home Page

![The homepage of the multiple choice quiz app, explaining the rules of the game](/Assets/README-imgs/quiz-intro-page-screenshot.png)

### Quiz Game Page

![The quiz game page showing a hud, the question being asked and multiple answers to choose](/Assets/README-imgs/quiz-game-page-screenshot.png)

### Quiz Completed Page

![The page displayed when the quiz is over, showing your final score and a name submission form](/Assets/README-imgs/quiz-completed-page-screenshot.png)

### High Score Page

![A page showing the high scores that are being stored in the local storage](/Assets/README-imgs/high-score-page-screenshot.png)

## Usage

If you would like to use this application please follow [this link]()

## Technology

The technology used for the development of this site was:

- [github pages](https://pages.github.com/)
- HTML
- CSS
- Flexbox
- JavaScript
- [QuizAPI.io](https://quizapi.io/)
- [DOMPurify](https://github.com/cure53/DOMPurify)

## Features

- Randomized question order based on data being fetched from API
- Multiple choice questions to test your knowledge of JavaScript
- The ability to save your score (with your name) to the local storage and if you're in the top five you can compare to other users
- The ability to clear the high score table, if you're feeling down

## Badges

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Credits

Made with the help of:

- [University of Birmingham Coding Bootcamp](https://www.birmingham.ac.uk/postgraduate/courses/cpd/coding-boot-camp.aspx)
- [QuizAPI.io](https://quizapi.io/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [w3schools](https://www.w3schools.com/howto/howto_css_loader.asp)
- [Favicon.io](https://favicon.io/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License](/LICENSE)

## Feedback

Any feedback please email [George Fincher](mailto:finchergeorge1@gmail.com)
