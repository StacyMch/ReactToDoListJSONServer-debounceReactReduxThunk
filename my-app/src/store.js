import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import {
	newNoteInputReducer,
	notesReducer,
	noteReducer,
	searchReducer,
	sortingReducer,
} from './reducers';

const reducer = combineReducers({
	newNoteInputState: newNoteInputReducer,
	notesState: notesReducer,
	noteState: noteReducer,
	searchState: searchReducer,
	sortingState: sortingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
