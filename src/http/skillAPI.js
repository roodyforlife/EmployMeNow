import { $authhost, $host } from "./index.js";

export const getSkills = async () => {
    const { data } = await $host.get(`api/tags/get`)
    return data;
}

export const createSkill = async (name) => {
    const { data } = await $authhost.post(`api/tags/add?tagName=${name}`)
    return data;
}

export const deleteSkillById = async(id) => {
    const { data } = await $authhost.post(`api/tags/remove?skillId=${id}`)
    return data;
}