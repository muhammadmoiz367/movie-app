import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetailsPage from './views/MovieDetailsPage/movieDetailsPage';
import FavouritePage from './views/FavouritePage/favouritePage';
import SearchMovie from './views/SearchPage/searchMovie';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/search/:search" component={Auth(SearchMovie, null)} />
          <Route exact path="/favourites" component={Auth(FavouritePage, null)} />
          <Route exact path="/movies/:movieId" component={Auth(MovieDetailsPage, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
