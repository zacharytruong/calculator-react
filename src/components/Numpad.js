import ACTION from '../global/ACTIONS';

function Numpad({ className, dispatch, digit }) {
  return (
    <button
      className={className}
      onClick={() => dispatch({ type: ACTION.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default Numpad;
