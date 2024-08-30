import { ReactNode } from 'react';
import {UIHeader} from "@/shared/UI";
type Props = {
    children: ReactNode;
}

const MainDashboardLayout = ({children}:Props) => {
    return (
        <div className='gg'>
            header
            {children}
        </div>
    )
}

export default MainDashboardLayout
