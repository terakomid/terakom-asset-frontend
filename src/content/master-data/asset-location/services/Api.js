import http from '../../../../component/api/Api'

export const getAll = () => {
    return http.get("/location");
};
export const getByCode = (code) => {
    return http.get("/location/" + code);
};
export const getByCodeId = (data) => {
    return http.get("/location?code=" + data.code + "&id=" + data.id);
};
export const getAllParentLocation = () => {
    return http.get("/parent_location");
};
export const create = (data) => {
    return http.post("/location", data);
};
export const update = (id, data) => {
    return http.put(`/location/${id}`, data);
};
export const remove = (id) => {
    return http.delete(`/location/${id}`);
};