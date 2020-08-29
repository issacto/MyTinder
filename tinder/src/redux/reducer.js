import { combineReducers } from 'redux';
import { UPDATE_AUTH, UPDATE_SETTINGS } from './action';

const updateAuth = (auth = { loggedin: false }, action) => {
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