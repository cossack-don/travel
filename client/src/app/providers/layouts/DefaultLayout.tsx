import { ReactNode } from 'react';
type Props = {
    children: ReactNode;
}

const DefaultLayout = ({children}:Props) => {
    return (
        <div>
            header
            {children}
        </div>
    )
}

export default DefaultLayout
