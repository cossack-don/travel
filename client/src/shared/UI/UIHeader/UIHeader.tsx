import { Link } from "react-router-dom";
import styles from './UIHeader.module.css'


const UIHeader = ()=>{
    return (
        <>

        <div className={`row between-xs ${styles.header}`}>
            <div className="col-xs-6">
                <div className="box">
                    LOGO
                </div>
            </div>
            <div className="col-xs-6">
                <div className="box">
                    <div className="row end-xs">
                        <div className="col-xs-6">
                            <div className="box">
                                <Link to='/dashboard'>Вход</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></>)
}

export default UIHeader