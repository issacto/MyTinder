import { combineReducers } from 'redux';
import { UPDATE_AUTH, UPDATE_SETTINGS,UPDATE_EMAIL } from './action';

const updateAuth = (auth = { loggedin: false, name:'' }, action) => {
    if (action.type === UPDATE_AUTH) return action.payload
    return auth
}

const updateSettings = (settings = {}, action) => {
    if (action.type === UPDATE_SETTINGS) return action.payload
    return settings
}

const reducer = combineReducers({
    auth: updateAuth,
    settings: updateSettings,
});

export default reducer;