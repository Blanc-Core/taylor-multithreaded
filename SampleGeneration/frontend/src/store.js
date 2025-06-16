import { configureStore } from '@reduxjs/toolkit';

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;