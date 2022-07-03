import ACTION from '../global/ACTIONS';

function OperationButton({ className, dispatch, operation }) {
  return (
    <button
      className={className}
      onClick={() =>
        dispatch({ type: ACTION.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
