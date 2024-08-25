import {customConfigAxios} from "@/api/index";


export const ApiAdapter = async (config:any)=>{
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