import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import navigationReducer from './navigation/navigationReducer';
import usersReducer from './users/usersReducer';
import branchesReducer from './branches/branchesReducer';
import brandsReducer from './brands/brandsReducer';
import clientsReducer from './clients/clientsReducer';
import categoriesReducer from './categories/categoriesReducer';
import paymentsTermsReducer from './paymentTerms/paymentsTermsReducer';
import productsReducer from './products/productsReducer';
import userRolesReducer from './userRoles/userRolesReducer';
import vatPercentagesReducer from './vatPercentages/vatPercentagesReducer';
import vendorsReducer from './vendors/vendorsReducer';
import profileReducer from './profile/profileReducer';
import purchaseOrdersReducer from './purchaseOrders/purchaseOrdersReducer';
import unitTypesReducer from './unitTypes/unitTypesReducer';
import invoicesReducer from './invoices/invoicesReducer';
import searchReducer from './search/searchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  profile: profileReducer,
  users: usersReducer,
  branches: branchesReducer,
  brands: brandsReducer,
  clients: clientsReducer,
  categories: categoriesReducer,
  paymentTerms: paymentsTermsReducer,
  products: productsReducer,
  userRoles: userRolesReducer,
  vatPercentages: vatPercentagesReducer,
  vendors: vendorsReducer,
  purchaseOrders: purchaseOrdersReducer,
  unitTypes: unitTypesReducer,
  invoices: invoicesReducer,
  search: searchReducer,
});

export default rootReducer;
