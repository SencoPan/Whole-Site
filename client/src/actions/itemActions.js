import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING} from "./type";

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/react/get')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }));
};

export const deleteItem = id => dispatch => {
    dispatch(setItemsLoading());
    console.log(id);
    axios.post(`/react/delete`, {id})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
};

export const addItem = item =>  dispatch => {
    dispatch(setItemsLoading());
    axios.post(`/react/create`, { item })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    /*return {
        type: ADD_ITEMS,
        payload: item
    }*/
};
export const setItemsLoading = item => {
    return {
        type: ITEMS_LOADING
    }
};