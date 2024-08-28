import {customConfigAxios} from "@/shared/api/index.ts";


export const apiAdapter = async (config)=>{
    try {
        const response = await customConfigAxios(config)

        return Promise.resolve({
            kind:'success',
            ...response
        })
    } catch (error){
        console.log(error)
        //code

        return Promise.reject(error)
    }

}