import { atom } from "recoil";

const notificationRecoil = atom({
    key: 'notification',
    default: []
});


export { notificationRecoil }