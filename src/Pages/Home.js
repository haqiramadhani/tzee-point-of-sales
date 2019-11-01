import React, {useEffect, useState} from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import POS from "../Main/POS";
import Products from '../Main/Products';
import Categories from '../Main/Categories';
import Purchases from '../Main/Purchases';
import Sales from '../Main/Sales';
import Navbar from '../Component/Navbar';
import './styles.css';

const Home = () => {
  if (localStorage.getItem('token') === null) return <Redirect to={'/login'}/>
  return (
    <div className='root'>
        {/* ==================== Headers ==================== */}
        <div className='header'>
            <Navbar/>
        </div>
        {/* ================== End Headers ================== */}
        {/* ==================== Sidebar ==================== */}
        {/* ================== End Sidebar ================== */}
        {/* ==================== Content ==================== */}
            <Switch>
                <Route path='/products'>
                    <Products/>
                </Route>
                <Route path='/categories'>
                    <Categories/>
                </Route>
                <Route path='/purchases'>
                    <Purchases/>
                </Route>
                <Route path='/sales'>
                    <Sales/>
                </Route>
                <Route path='/'>
                    <POS/>
                </Route>
        </Switch>
        {/* ================== End Content ================== */}
    </div>
  )
};

export default Home;
