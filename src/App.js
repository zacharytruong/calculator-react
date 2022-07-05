import { useReducer } from 'react';
import './App.css';
import MiscButton from './components/MiscButton';
import Numpad from './components/Numpad';
import OperationButton from './components/OperationButton';
import ACTIONS from './global/ACTIONS';
import INTEGER_FORMATTER from './global/INTEGER_FORMATTER';

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        };
      }
      // User clicks multiple zeros at the beginning,
      // return the old value (string) instead of updating it.
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      // User clicks the period at the beginning
      if (payload.digit === '.' && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: '.'
        }
      }
      
      // User clicks multiple period during input,
      // return the old value (string) instead of updating it.
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.CHOOSE_OPERATION:
      // If user didn't input any value and choose an operator first,
      // return current state value
      if (state.previouseOperand == null && state.currentOperand == null) {
        return state;
      }

      // User selected a number, then an operator, then change to a different operator
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        };
      }

      // When user select an operator, convert user input to previous operand,
      // then clear the current operand to prepare for new input.
      if (state.previouseOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previouseOperand: state.currentOperand,
          currentOperand: null
        };
      }

      return {
        ...state,
        previouseOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      };

    case ACTIONS.EVALUATE:
      if (
        state.previouseOperand == null ||
        state.currentOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        overwrite: true,
        operation: null,
        previouseOperand: null
      };

    case ACTIONS.MISC:
      if (state.currentOperand == null) return state;
      return {
        ...state,
        currentOperand: evaluateMisc(state, payload)
      };

    default:
      throw new Error();
  }
}

function evaluate({ previouseOperand, currentOperand, operation }) {
  const prev = parseFloat(previouseOperand);
  const cur = parseFloat(currentOperand);

  let result;
  if (isNaN(prev) || isNaN(cur)) return '';
  switch (operation) {
    case '+':
      result = prev + cur;
      break;
    case '-':
      result = prev - cur;
      break;
    case '*':
      result = prev * cur;
      break;
    case '÷':
      result = prev / cur;
      break;
    default:
      throw new Error();
  }
  return result.toString();
}

function evaluateMisc({ currentOperand }, { operation }) {
  const cur = parseFloat(currentOperand);
  let result;
  if (isNaN(cur)) return '';
  switch (operation) {
    case '±':
      if (cur > 0) {
        result = -Math.abs(cur);
        break;
      }
      result = Math.abs(cur);
      break;
    case '%':
      result = cur / 100;
      break;
    default:
      throw new Error();
  }
  return result.toString();
}

function formatInteger(value) {
  if (value == null) return;
  const [integer, decimal] = value.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previouseOperand, operation }, dispatch] =
    useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatInteger(previouseOperand)} {operation}
        </div>
        <div className="current-operand">{formatInteger(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <MiscButton operation="±" dispatch={dispatch} />
      <MiscButton operation="%" dispatch={dispatch} />
      <OperationButton operation="÷" dispatch={dispatch} />
      <Numpad digit="7" dispatch={dispatch} />
      <Numpad digit="8" dispatch={dispatch} />
      <Numpad digit="9" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <Numpad digit="4" dispatch={dispatch} />
      <Numpad digit="5" dispatch={dispatch} />
      <Numpad digit="6" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <Numpad digit="1" dispatch={dispatch} />
      <Numpad digit="2" dispatch={dispatch} />
      <Numpad digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <Numpad className="span-two bottom-right" digit="0" dispatch={dispatch} />
      <Numpad digit="." dispatch={dispatch} />
      <button
        className="bottom-left"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
