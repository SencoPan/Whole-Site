import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "../actions/type";

const initialState = {
    items: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };

        case DELETE_ITEMS:
            return {
                ...state,
                id: action.payload.id,
                loading: false
            };
        case ADD_ITEMS:
            return {
                ...state,
                items: [action.payload, ...state.items],
                loading: false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}