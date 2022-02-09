// -- React and related libs
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

// -- Custom Components
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
// import Breadcrumbs from '../Breadbrumbs/Breadcrumbs';

import Dashboard from '../../pages/dashboard/Dashboard';
import ProductsPage from '../../pages/products';
import ClientsPage from '../../pages/clients';
import EstimatesPage from '../../pages/estimates';
import InvoicesPage from '../../pages/invoices';
import DeliveryNotesPage from '../../pages/deliverynotes';
import VendorsPage from '../../pages/vendors';
import PurchaseOrdersPage from '../../pages/purchaseorders';
import BranchesPage from '../../pages/branches';
import UserRolesPage from '../../pages/userroles';
import UsersPage from '../../pages/users';
import BrandsPage from '../../pages/brands';
import CategoriesPage from '../../pages/categories';
import PaymentTermsPage from '../../pages/paymentterms';
import VATPercentagesPage from '../../pages/vatPercentages';
import UnitTypesPage from '../../pages/unittypes';

// -- Component Styles
import styles from './index.module.scss';
import {
  fetchBranches,
  fetchBrands,
  fetchCategories,
  fetchClients,
  fetchPaymentTerms,
  fetchProfile,
  fetchUnitTypes,
  fetchUserRoles,
  fetchVATPercentages,
  fetchVendors,
} from '../../redux';
import { getProfileData } from '../../services/profile';

function Layout() {
  const profile = getProfileData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.length === 0) {
      dispatch(fetchProfile());
    }
    dispatch(fetchBrands());
    dispatch(fetchVATPercentages());
    dispatch(fetchCategories());
    dispatch(fetchVendors());
    dispatch(fetchClients());
    dispatch(fetchPaymentTerms());

    // Masters Redux
    dispatch(fetchBranches());
    dispatch(fetchUserRoles());
    dispatch(fetchUnitTypes());

    // const initialValue = document.body.style.zoom;

    // // Change zoom level on mount
    // document.body.style.zoom = '65%';

    // return () => {
    //   // Restore default value
    //   document.body.style.zoom = initialValue;
    // };
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.wrap}>
        <Header />
        <Sidebar />
        <main className={styles.content}>
          {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/sales" render={() => <Redirect to="/products" />} />
              <Route path="/products" component={ProductsPage} />
              <Route path="/clients" component={ClientsPage} />
              <Route path="/estimates" component={EstimatesPage} />
              <Route path="/invoices" component={InvoicesPage} />
              <Route path="/deliverynotes" component={DeliveryNotesPage} />
              <Route path="/purchases" render={() => <Redirect to="/vendors" />} />
              <Route path="/vendors" component={VendorsPage} />
              <Route path="/purchaseorder" component={PurchaseOrdersPage} />
              <Route path="/masters" render={() => <Redirect to="/branches" />} />
              <Route path="/branches" component={BranchesPage} />
              <Route path="/userroles" component={UserRolesPage} />
              <Route path="/users" component={UsersPage} />
              <Route path="/brands" component={BrandsPage} />
              <Route path="/categories" component={CategoriesPage} />
              <Route path="/paymentterms" component={PaymentTermsPage} />
              <Route path="/vatpercentage" component={VATPercentagesPage} />
              <Route path="/unittypes" component={UnitTypesPage} />
              <Route path="*" render={() => <Redirect to="/error" />} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={ProductsPage} />
              <Route path="/sales" render={() => <Redirect to="/products" />} />
              <Route path="/products" component={ProductsPage} />
              <Route path="/clients" component={ClientsPage} />
              <Route path="/estimates" component={EstimatesPage} />
              <Route path="/invoices" component={InvoicesPage} />
              <Route path="/deliverynotes" component={DeliveryNotesPage} />
              <Route path="/purchases" render={() => <Redirect to="/vendors" />} />
              <Route path="/vendors" component={VendorsPage} />
              <Route path="/purchaseorder" component={PurchaseOrdersPage} />
              {/* <Route path="*" render={() => <Redirect to="/error" />} /> */}
            </Switch>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(Layout);
