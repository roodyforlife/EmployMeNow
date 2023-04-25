import { $authhost } from "./index.js";

export const ban = async ({email}) => {
    await $authhost.post(`api/adminActions/ban?email=${email}`)
}

export const unBan = async ({email}) => {
    await $authhost.post(`api/adminActions/unban?email=${email}`)
}