import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './App.scss';

import { SignUpStep1, SignUpStep2, SignUpStep3, SignUpStep4, Login, Profile } from './features/auth';
import { AccountList, EditAccountItem } from './features/account';
import { InvestmentList, AddInvestment, EditInvestment } from './features/investment';
import { AddInsurance, EditInsurance, InsuranceList } from './features/insurance';
import { TransactionList } from './features/transaction';
import { DebtList, EditDebt } from './features/debt';

import { AppLocationState } from './types';
import { LoginLayout, SignUpLayout, RegularLayout, ProfileLayout } from './components/Layout';

function App(): JSX.Element {
  const location = useLocation<AppLocationState>();
  const background = location.state && location.state.background;

  return (
    <Switch>
      <Route path={['/user/sign-up/:stepId']}>
        <SignUpLayout>
          <Switch>
            <Route exact path="/user/sign-up/1">
              <SignUpStep1 />
            </Route>
            <Route exact path="/user/sign-up/2">
              <SignUpStep2 />
            </Route>
            <Route exact path="/user/sign-up/3">
              <SignUpStep3 />
            </Route>
            <Route exact path="/user/sign-up/4">
              <SignUpStep4 />
            </Route>
          </Switch>
        </SignUpLayout>
      </Route>
      <Route path={['/user/login']}>
        <LoginLayout>
          <Switch>
            <Route exact path="/user/login">
              <Login />
            </Route>
          </Switch>
        </LoginLayout>
      </Route>
      <Route path={['/user/profile']}>
        <ProfileLayout>
          <Switch>
            <Route exact path="/user/profile">
              <Profile />
            </Route>
          </Switch>
        </ProfileLayout>
      </Route>
      <Route>
        <RegularLayout>
          <Switch location={background || location}>
            <Route exact path="/">
              <InsuranceList />
            </Route>
            <Route path="/save/investment">
              <InvestmentList />
            </Route>
            <Route path="/save/insurance">
              <InsuranceList />
            </Route>
            <Route path="/sync/balance">
              <AccountList />
            </Route>
            <Route path="/sync/transaction">
              <TransactionList />
            </Route>
            <Route path="/loan">
              <DebtList />
            </Route>
          </Switch>
          {background && (
            <Switch>
              <Route path="/save/insurance/add">
                <AddInsurance />
              </Route>
              <Route path="/save/insurance/edit/:insuranceId">
                <EditInsurance />
              </Route>
              <Route path="/save/investment/add/:investmentType">
                <AddInvestment />
              </Route>
              <Route path="/save/investment/edit/:investmentId">
                <EditInvestment />
              </Route>
              <Route path="/sync/balance/edit/:accountItemId">
                <EditAccountItem />
              </Route>
              <Route path="/loan/edit/:debtId">
                <EditDebt />
              </Route>
            </Switch>
          )}
        </RegularLayout>
      </Route>
    </Switch>
  );
}

export default App;
