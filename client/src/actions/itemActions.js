import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING} from "./type";

export const getItems = () => dispatch => {
    dispatch(setiIemsLoading());
    axios
        .get('/react')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }));
};

export const deleteItem = id => {
    return {
        type: DELETE_ITEMS,
        payload: id
    }
};

export const addItem = item => {
    return {
        type: ADD_ITEMS,
        payload: item
    }
};
export const setiIemsLoading = item => {
    return {
        type: ITEMS_LOADING
    }
};