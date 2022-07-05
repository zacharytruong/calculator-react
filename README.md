#### This project is a coding assessment for CryptoFi.
 
# Calculator app, written with React JS

## Table of Content

* [Get started](https://github.com/zacharytruong/calculator-react#get-started)
    * [For Mac and Linux users](https://github.com/zacharytruong/calculator-react#for-mac-and-linux-users)
    * [For Windows users](https://github.com/zacharytruong/calculator-react#for-windows-users)
* [Live Demo](https://github.com/zacharytruong/calculator-react#live-demo)
* [UI Display](https://github.com/zacharytruong/calculator-react#ui-display)
* [Functionalities](https://github.com/zacharytruong/calculator-react#functionalities)
* [The process of building this project](https://github.com/zacharytruong/calculator-react#The-process-of-building-this-project)
    * [Design/Layout](https://github.com/zacharytruong/calculator-react#design-layout)
    * [The reducer function](https://github.com/zacharytruong/calculator-react#The-reducer-function)
    * [The evaluate function](https://github.com/zacharytruong/calculator-react#The-evaluate-function)
    * [The evaluateMisc function](https://github.com/zacharytruong/calculator-react#The-evaluateMisc-function)
    * [Formatting our display numbers](https://github.com/zacharytruong/calculator-react#Formatting-our-display-numbers)


## Get started
### For Mac and Linux users
From the terminal:
* Run `npm i`
* Run `npm start`
 
### For Windows users
* Edit `package.json` row `15`:
    * from `"start": "PORT=8000 react-scripts start",`
    * to `"start": "set PORT=8000 && react-scripts start"`
* From the terminal:
    * Run `npm i`
    * Run `npm start`
 
## Live Demo
A live version of this project is hosted on 👉 [Github Page](https://zacharytruong.github.io/calculator-react)

## UI Display
* When users are on devices with a screen’s width > 420px, the calculator is floating in the center of the screen.
    * <img src="https://raw.githubusercontent.com/zacharytruong/calculator-react/main/src/media/large-screen-ss.jpg" alt="App on large screen" width="300">
* When users are on devices with a screen’s width < 420px, the calculator takes a full-screen display for the best mobile experience.
    * <img src="https://raw.githubusercontent.com/zacharytruong/calculator-react/main/src/media/small-screen-ss.jpg" alt="App on small screen" width="300">
## Functionalities
* Users can click on num pads to input a number, then perform the following math calculations:
  * Add
  * Subtract
  * Multiply
  * Divide
  * Percentage
  * Convert that number to its negative integer
* Users can subsequently click the math operator; the calculator will perform math operations based on the chosen operator, then save the result as the starting number.
* Users can click the AC button to clear all existing context.
* Display numbers are formatted in international "en*us" format.

## The process of building this project

### Design/Layout
The calculator layout is based on the calculator app in Mac OS. The app has five groups of buttons:
* The Numpad: button 0 - 9, and period.
* The operator buttons: + - * /
* The AC button
* The evaluate/equal button requires previous, current, and operation value present.
* The Misc buttons: plus-minus and percentage, which only require a current value (or current input).

The calculator also has a group of displays:
* The previous input value and the operator.
* The current input value.

The calculator app requires the following values to perform a simple calculation: previous value, current value, and operation. React has a useReduce hook to support the management of complex state objects with previous/current paired values.

`const [state, dispatch] = useReduce(reducer, {})`

We can deconstruct the `state` object to `{previousOperand, currentOperand, operation}` for better visibility.

The reducer function handles the operation logic; when the user clicks on any button, it takes two parameters: `state` and `actions.` We will provide the `actions` param using the `dispatch` method as the component's property. We can deconstruct the `actions` param to `{type, payload}` for better visibility.

`function reducer(state, {type, payload})`

Because the values of the `type` property are constant values based on the value of our button groups, we can set them as global values as `ACTIONS` objects to reduce manual spelling and human error.

### The reducer function
Here are the scenarios when the user interacts with the calculator app controlled by our `reducer` function:
* User clicks on the Numpad buttons:
    * The app will update the `currentOperand` value to the user's input by appending a new digit to the end of the `currentOperand`.
    * If the `currentOperand` is "0", and the new user's input is also "0", the calculator app should not display "00" or "000" and so on; we discard the new input by returning the same `state` object.
    * If the `currentOperand` includes a period, and the new user's input is another period, the calculator app should not allow more than one period (for decimal number); we discard the new input by returning the same `state` object.
* User clicks on the AC button:
    * We return an empty `state` object to clear all existing context.
* User clicks on operator buttons:
    * If the user didn't have any prior input, or the `previousOperand` and `currentOperand` values are `null`, we discard the new input and return the same `state` object.
    * The calculator will calculate using the' evaluate' function if the user has all `previousOperand`, `currentOperand`, and `operation` values. The calculation result will replace the value of `previousOperand`, set the value of `operation` to the new user's input, then clear the `currentOperand` to make it ready for new input.
    * If the user got `previousOperand`, and `operation`, then clicks on a new operation button, the calculator should keep the same `previousOperand` value and change the `operation` value to the new user's input.
    * If the user does not have a `previousOperand` value, the calculator should update the `previousOperand` with the value of `currentOperand`, set the `operation` value to the user's input, then clear the `currentOperand` to make it ready for new input.
* User clicks on the evaluate button:
    * If the user didn't provide all `previousOperand`, `currentOperand`, and `operation` values, we discard the new input by returning the same `state` object.
    * The calculator will calculate using the' evaluate' function if the user provides all `previousOperand`, `currentOperand`, and `operation` values. The calculation result will replace the value of `currentOperand`; we clear the `operation` and `previousOperand` values. Suppose the user clicks on a Numpad after performing an evaluation action. In that case, the calculator should start a fresh round of input instead of adding the new input to the result of the previous evaluation. We add a new `overwrite` property and set its value to `true` to the `state` object to control this workflow.
    * We update the top condition when the user clicks on the Numpad; if the `overwrite` is true, we will replace the `currentOperand` with the new input instead of adding it. We also change `overwrite` value to `false` to return to the standard input workflow.
* User clicks on the misc buttons:
    * If the user does not have an active `currentOperand`, we discard the new input by returning the same `state` object.
    * The calculator will execute an `evaluateMisc` function to calculate the new `currentOperand` based on the user input type: plus-minus or percentage.

### The evaluate function
The `evaluate` function takes the `state` objection as a parameter, and we can deconstruct it to `{previousOperand, currentOperand, and operation}`.
First, we convert `previousOperand` and `curretnOperand` to numbers using `parseFloat()` method to `prev` and `cur` numbers.
Then, the calculator will check if any `prev` or `cur` is not a number; if it happens, we discard the rest of the calculation. If both `prev` and `cur` are present and numbers, we perform the calculation based on the `operation` param: + - * /
Lastly, we convert the result to a string, then return that string as the final result of the execution of the `evaluation` function.

### The evaluateMisc function
Similiar to the `evaluate` function; however, the `evaluateMis` function only needs `{currentOperand}, payload` params. For better visibility, we desconstruct `payload` to `{operation}`.
We convert the `currentOperand` to a number as `cur`, then perform a type check for `cur`. If `cur` is not a number, we discard the rest of the calculation. If `cur` is a number, we perform the calculation based on the deconstructed `operation`:
* "±": it will convert the `cur` to the value of its absolute's value using `Math.abs(cur)` if `cur` is greater than 0. Otherwise, it will have a value of `-Math.abs(cur)`.
* "%" will divide the `cur` with 100.
Lastly, we convert the result to a string, then return that string as the final result of execution of the `evaluationMisc` function.

### Formatting our display numbers
Our `output` container has 2 rows:
* History row displays `previousOperand` `operation`.
* Current input row display `currentOperand`.

We create a global integer formatter component in `global` folder; the formatter uses `Intl.NumberFormat` method. The `formatInteger` function uses the formatter to format `previousOperand` and `currentOperand`. For each value, we would not want the `formatInteger` function to format our decimal values for better accuracy, so after checking whether the value exists or not, we split it to `[integer, decimal]`, then we format `integer` part only.

The end.

[Back To Top](https://github.com/zacharytruong/calculator-react#get-started)
