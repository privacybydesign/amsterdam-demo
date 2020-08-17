const reducer = (state, action) => {
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
        hasError: action.payload.hasError
      };

    case 'setError':
      return {
        ...state,
        hasError: true
      };

    default:
      return state;
  }
};

export default reducer;