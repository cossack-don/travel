import * as React from 'react';
import { Link } from 'react-router-dom';
import { Counter } from '@/features/counter/Counter';
import {UICheckBox} from "../shared/UI";
import {useState} from "react";

export default function Start() {


    return (
        <div>

            Start <Link to="/gender">Начать</Link>
        </div>
    );
}
