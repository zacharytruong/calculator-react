## This project is a coding assessment for CryptoFi.
 
# Calculator was written with React JS
 
## Get started
### For Mac and Linux users
From the terminal:
- Run `npm i`
- Run `npm start`
 
### For Windows users
- Edit `package.json` row `15`:
 - from `"start": "PORT=8000 react-scripts start",`
 - to `"start": "set PORT=8000 && react-scripts start"`
- From the terminal:
 - Run `npm i`
 - Run `npm start`
 
## UI Display
- When users are on devices with a screen’s width > 420px, the calculator is floating in the center of the screen.
- When users are on devices with a screen’s width < 420px, the calculator takes a full-screen display for the best mobile experience.
 
## Functionalities
- Users can click on num pads to input a number, then perform the following math calculations:
 - Add
 - Subtract
 - Multiply
 - Divide
 - Percentage
 - Convert that number to its negative integer
- Users can subsequently click the math operator; the calculator will perform math operations based on the chosen operator, then save the result as the starting number.
- Users can click the AC button to clear all existing context.
- Display numbers are formatted in international "en-us" format.
