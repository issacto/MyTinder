
export const UPDATE_AUTH = 'UPDATE_AUTH';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const updateAuth = payload => ({
    type: UPDATE_AUTH,
    payload: payload
})

export const updateSettings = payload => ({
    type: UPDATE_SETTINGS,
    payload: payload
})