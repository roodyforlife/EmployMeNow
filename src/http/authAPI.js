import { $authhost, $host } from "./index.js";

export const defaultLogin = async (obj) => {
    const { data } = await $host.post('api/auth/login', obj)
    return data;
}

export const googleLogin = async (email) => {
    const { data } = await $host.post(`api/auth/googleLogin?email=${email}`)
    return data;
}

export const check = async () => {
    const { data } = await $authhost.post('api/auth/checkSignIn');
    return data;
}

export const registCompany = async(form) => {
    const { data } = await $host.post('api/auth/companyReg', form);
    return data;
}

export const googleRegistCompany = async(form) => {
    const { data } = await $host.post('api/auth/companyGoogleReg', form);
    return data;
}