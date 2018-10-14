import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, POST_SAVE_SUCCESS, UPDATE_POST } from "../actions";

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POST:
            return {...state, postData: action.payload.data};
        case FETCH_POSTS:
            return action.payload;
        //not needed as it falls under default
        // case UPDATE_POST:
        //     return state;
        default:
            return state;
    }
}