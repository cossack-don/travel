import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import Start from '@/pages/Start';
import Gender from '@/pages/Gender';
import Periods from '@/pages/Periods';

import Seasons from "@/pages/Seasons";
import NotFoundPage from "@/pages/NotFoundPage";
import TypeTrip from "@/pages/TypeTrip";
import Result from "@/pages/Result";

export default function Routers() {
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
