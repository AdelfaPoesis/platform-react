import {ADD_MATERIAL, RECEIVE_ALL_MATERIAL} from "./actionTypes";
import {MATERIALS_API, PLATFORM_API, ADD_MATERIAL_API, DELETE_MATERIAL} from "../../config/api.config";


export const receiveAllMaterial = materials => {
    return {
        type: RECEIVE_ALL_MATERIAL,
        materials
    };
};
export const addMaterial = (title, skill_id, text) => {
    return dispatch => {
        const route = PLATFORM_API + ADD_MATERIAL_API;
        console.log(JSON.stringify({title: title, skill_id: skill_id, text: text}));
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({title: title, skill_id: skill_id, text: text})
        }).then(res => res.json())
            .then(data => dispatch(fetchMaterials()));
    };
};

export const deleteMaterial = material_id => {
    return dispatch => {
        const route = PLATFORM_API + DELETE_MATERIAL + material_id;
        return fetch(route, {
            method: 'delete'
         }).then(res => res.json())
        .then(data => dispatch(fetchMaterials()));
    }
};

export const fetchMaterials = () => {
    return dispatch => {
        const rote = PLATFORM_API + MATERIALS_API;

        return fetch(rote)
            .then(res => res.json())
            .then(data => dispatch( receiveAllMaterial(data) ));
    };
};