import { useNavigate } from "react-router-dom";
import {mockApp} from "@/shared/mockData/mockApp";

const CreateApp = ()=> {
    let navigate = useNavigate();

    return (
        <>
            <input type="text"/>
            <button onClick={()=>navigate(`/dashboard/app/${mockApp.hashApp}`)}>Save App</button>
        </>
    )
}
export default CreateApp