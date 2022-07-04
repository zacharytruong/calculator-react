import ACTION from '../global/ACTIONS';

function MiscButton({ className, dispatch, operation }) {
  return (
    <button
      className={className}
      onClick={() =>
        dispatch({ type: ACTION.MISC, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default MiscButton;
