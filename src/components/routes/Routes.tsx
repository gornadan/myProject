import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../404/Error404";
import { Login } from "../login/Login";
import PasswordRecovery from "../PasswordRecovery";
import Profile from "../Profile";
import EnteringNewPassword from "../EnteringNewPassword";
import Testing from "../Testing";
import { Forgot } from "../forgot/Forgot";
import Registered from "../registred/Registered";
import Packs from "../packs/Packs";
import Cards from "../cards/Cards";
import { LearnPage } from "../learn_page/LearnPage";

export const PATH = {
  LOGIN: "/login",
  REGISTRED: "/registred",
  CHECK_IN: "/check-in",
  PROFILE: "/profile",
  TESTING: "/testing",
  PASSWORD_RECOVERY: "/password-recovery",
  ENTERING_NEW_PASSWORD: "/set-new-password/:token",
  FORGOT: "/forgot",
  PACKS: "/packs/",
  CARDS: "/cards/:id",
  LEARN: "/learn/:id",
};

function Routes() {
  return (
    <Switch>
      <Route path={"/"} exact render={() => <Redirect to={PATH.LOGIN} />} />

      <Route path={PATH.LOGIN} render={() => <Login />} />
      <Route path={PATH.REGISTRED} render={() => <Registered />} />
      <Route path={PATH.FORGOT} render={() => <Forgot />} />
      <Route path={PATH.PROFILE} render={() => <Profile />} />
      <Route path={PATH.TESTING} render={() => <Testing />} />
      <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery />} />
      <Route path={PATH.ENTERING_NEW_PASSWORD} render={() => <EnteringNewPassword />} />
      <Route path={PATH.PACKS} render={() => <Packs />} />
      <Route path={PATH.CARDS} render={() => <Cards />} />
      <Route path={PATH.LEARN} render={() => <LearnPage />} />

      <Route render={() => <Error404 />} />
    </Switch>
  );
}

export default Routes;
