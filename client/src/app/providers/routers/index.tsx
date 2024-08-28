import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Start from '@/pages/Start.tsx';
import Gender from '@/pages/Gender.tsx';
import Periods from '@/pages/Periods.tsx';

import Seasons from "@/pages/Seasons.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import TypeTrip from "@/pages/TypeTrip.tsx";
import Result from "@/pages/Result.tsx";

const Routers = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/gender" element={<Gender />} />
                <Route path="/periods" element={<Periods />} />
                <Route path="/seasons" element={<Seasons />} />
                <Route path="/type-trip" element={<TypeTrip />} />
                <Route path="/result" element={<Result />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
);
}

const Router = ()=> <BrowserRouter><Routers/></BrowserRouter>

export default Router