import http from '../../../../component/api/Api'

export const getAll = () => {
    return http.get("/vendor");
};
export const getByCode = (code) => {
    return http.get("/vendor/" + code);
};
export const getByCodeId = (data) => {
    return http.get("/vendor?code=" + data.code + "&id=" + data.id);
};
export const create = (data) => {
    return http.post("/vendor", data);
};
export const update = (id, data) => {
    return http.put(`/vendor/${id}`, data);
};
export const remove = (id) => {
    return http.delete(`/vendor/${id}`);
};