const reducer = (state, action) => {
  console.log('reducer', state, action);

  switch (action.type) {
    case 'validateForm':
      return {
        ...state,
        formValid: true,
        owner: action.payload.owner
      };

    case 'invalidateForm':
      return {
        ...state,
        formValid: false,
      };

    case 'setProperties':
      return {
        ...state,
        hasResult: true,
        name: action.payload.name,
        street: action.payload.street,
        city: action.payload.city,
        telephone: action.payload.telephone,
      };

    default:
      return state;
  }
};

export default reducer;