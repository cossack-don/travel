import {useParams, Link,useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {mockApp} from "@/shared/mockData/mockApp";

const TemplateApp = ()=>{
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(params)
    },[])

    return(<div>
        HASH APP - {params.id}
        <br/>

    <button onClick={()=>navigate(`/dashboard/app/${mockApp.hashApp}/stepper`)}>Собрать вещи</button>
    </div>)
}

export default TemplateApp