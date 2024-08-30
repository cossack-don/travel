import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';

import Start from '@/pages/Start.tsx';
import Gender from '@/pages/Gender.tsx';
import Periods from '@/pages/Periods.tsx';

import Seasons from "@/pages/Seasons.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import TypeTrip from "@/pages/TypeTrip.tsx";
import Result from "@/pages/Result.tsx";
import CreateApp from "@/pages/CreateApp";
import TemplateApp from "@/pages/TemplateApp";
import Stepper from "@/pages/Stepper";

import DefaultLayout from "@/app/providers/layouts/DefaultLayout";
import WrapperTypeLayout from "@/app/providers/layouts/WrapperTypeLayout";

const Routers = () => {
    return (

            <Routes>

                <Route path="/" element={
                    <WrapperTypeLayout name='default'>
                        <Index />
                    </WrapperTypeLayout>}
                />
                <Route path="/dashboard" element={
                    <WrapperTypeLayout name='dashboard'>
                        <Dashboard />
                    </WrapperTypeLayout>}
                />

                <Route path="/dashboard/create-app" element={
                    <WrapperTypeLayout name='dashboard'>
                        <CreateApp />
                    </WrapperTypeLayout>}
                />

                <Route path="/dashboard/app/:id" element={
                    <WrapperTypeLayout name='dashboard'>
                        <TemplateApp />
                    </WrapperTypeLayout>}
                />

                <Route path="/dashboard/app/:id/stepper" element={
                    <WrapperTypeLayout name='dashboard'>
                        <Stepper />
                    </WrapperTypeLayout>}
                />

                        {/*<Route path="id-app-edit" element={<CreateApp />}>*/}
                        {/*<Route path="/start" element={<Start />} />*/}
                        {/*<Route path="/gender" element={<Gender />} />*/}
                        {/*<Route path="/periods" element={<Periods />} />*/}
                        {/*<Route path="/seasons" element={<Seasons />} />*/}
                        {/*<Route path="/type-trip" element={<TypeTrip />} />*/}
                        {/*<Route path="/result" element={<Result />} />*/}
                    {/*</Route>*/}


                <Route path="*" element={<NotFoundPage />} />
            </Routes>

);
}

const Router = ()=> <BrowserRouter><Routers/></BrowserRouter>

export default Router