import axios from 'axios';

export const FETCH_POST = 'fetch_Post';
export const FETCH_POSTS = 'fetch_Posts';
export const CREATE_POST = 'create_post';
export const UPDATE_POST = 'update_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'https://cko-dev-test.firebaseio.com/cko/Tia22';

//fetch a list of posts from the api and return it to the reducers
export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts.json`).then((data) => data.data);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function updatePost(id, values) {
    const request = axios.patch(`${ROOT_URL}/posts/${id}.json`, values)
        .then(() => {
            this.fetchPosts();
        });

    return {
        type: UPDATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}.json`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts.json`, values)
        .then(() => {
            this.fetchPosts();
        });

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}.json`).then(() => {
        this.fetchPosts();
    });

    return {
        type: DELETE_POST,
        payload: id
    }
}
