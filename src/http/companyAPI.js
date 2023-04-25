import { $authhost, $host } from "./index.js";

export const getAll = async () => {
    const { data } = await $authhost.get('api/companies/get')
    return data;
}

export const getOne = async() => {
    const { data } = await $authhost.get('api/companyAction/companyInfo')
    return data;
}

export const addNewJob = async({jobName, description, tagIdes}) => {
    const { data } = await $authhost.post(`api/companyAction/addJob`, {jobName, description, tagIdes})
    return data;
}

export const getOneJob = async(id) => {
    const { data } = await $host.get(`api/jobs/get/${id}`)
    return data;
}

export const setFeadbackResult = async(id, accept) => {
    const { data } = await $authhost.post(`api/companyAction/setFeadbackResult?feadbackId=${id}&isAccepted=${accept}`)
    return data;
}

export const updateCompany = async(form) => {
    const { data } = await $authhost.post(`api/companyAction/updateCompany`, form)
    return data;
}