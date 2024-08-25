import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import Gender from '@/pages/One';
import Season from '@/pages/Two';
import NotFoundPage from "@/pages/NotFoundPage";

export default function Routers() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Gender />} />
    <Route path="/one" element={<Season />} />
    {/*<Route path="/period" element={<Period />} />*/}
    {/*<Route path="/list-things" element={<ListThings />} />*/}
    {/*<Route path="/type-trip" element={<TypeTrip />} />*/}

    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
);
}
