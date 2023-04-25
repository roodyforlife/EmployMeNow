import { $host } from "./index.js";

export const getWorkers = async () => {
    const { data } = await $host.get(`api/workers/get`)
    return data;
}

export const getCV = async (email) => {
    const {data} = await $host.get(`api/workers/getCV/${email}`)
    if (!data?.trim()){
        alert("The worker hasn't CV");
    } else {
        const linkSource = `data:application/pdf;base64,${data}`;
        const downloadLink = document.createElement("a");
        const fileName = `CV-${email}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
}