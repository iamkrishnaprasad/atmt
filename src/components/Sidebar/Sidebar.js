/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames';
import LinksGroup from './LinksGroup/LinksGroup';
import { changeActiveSidebarItem } from '../../redux';

import styles from './Sidebar.module.scss';

import logo from '../../assets/logo.svg';
import { getProfileData } from '../../services/profile';

function Sidebar() {
  const sidebarOpened = useSelector((state) => state.navigation.sidebarOpened);
  const activeItem = useSelector((state) => state.navigation.activeItem);
  const profile = getProfileData();
  const dispatch = useDispatch();

  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpened) {
      setBurgerSidebarOpen(true);
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false);
      }, 0);
    }
  }, [sidebarOpened]);

  return (
    <nav className={classnames(styles.root, { [styles.sidebarOpen]: burgerSidebarOpen })}>
      <header className={styles.logo}>
        <img src={logo} alt="logo" style={{ width: '100px' }} />
      </header>
      <ul className={styles.nav}>
        {profile?.userRoleId === 'USRRL00001' || profile?.userRoleId === 'USRRL00002' ? (
          <>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Dashboard"
              isHeader
              iconName={<i className="eva eva-home-outline" />}
              link="/"
              index="dashboard"
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Sales"
              isHeader
              iconName={<i className="eva eva-layers-outline" />}
              link="/sales"
              index="sales"
              childrenLinks={[
                {
                  header: 'Products',
                  link: '/products',
                  index: 'products',
                },
                {
                  header: 'Clients',
                  link: '/clients',
                  index: 'clients',
                },
                // {
                //   header: 'Estimates',
                //   link: '/estimates',
                //   index: 'estimates',
                // },
                {
                  header: 'Invoices',
                  link: '/invoices',
                  index: 'invoices',
                },
                // {
                //   header: 'Delivery Notes',
                //   link: '/deliverynotes',
                //   index: 'deliverynotes',
                // },
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Purchases"
              isHeader
              iconName={<i className="eva eva-file-outline" aria-hidden="true" />}
              link="/purchases"
              index="purchases"
              childrenLinks={[
                {
                  header: 'Vendors',
                  link: '/vendors',
                  index: 'vendors',
                },
                {
                  header: 'Purchase Order',
                  link: '/purchaseorder',
                  index: 'purchaseorder',
                },
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Masters"
              isHeader
              iconName={<i className="eva eva-folder-add-outline" aria-hidden="true" />}
              link="/masters"
              index="masters"
              childrenLinks={[
                {
                  header: 'Branches',
                  link: '/branches',
                  index: 'branches',
                },
                {
                  header: `User Roles`,
                  link: '/userroles',
                  index: 'userroles',
                },
                {
                  header: `Users`,
                  link: '/users',
                  index: 'users',
                },
                {
                  header: `Brands`,
                  link: '/brands',
                  index: 'brands',
                },
                {
                  header: `Categories`,
                  link: '/categories',
                  index: 'categories',
                },
                {
                  header: `Payment Terms`,
                  link: '/paymentterms',
                  index: 'paymentterms',
                },
                {
                  header: `VAT Percentage`,
                  link: '/vatpercentage',
                  index: 'vatpercentage',
                },
                {
                  header: `Unit Types`,
                  link: '/unittypes',
                  index: 'unittypes',
                },
              ]}
            />
          </>
        ) : (
          <>
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Products"
              isHeader
              iconName={<i className="eva eva-shopping-bag-outline" />}
              link="/products"
              index="products"
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Clients"
              isHeader
              iconName={<i className="eva eva-people-outline" />}
              link="/clients"
              index="clients"
            />
            <LinksGroup
              onActiveSidebarItemChange={(activeItem) => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Invoices"
              isHeader
              iconName={<i className="eva eva-file-text-outline" />}
              link="/invoices"
              index="invoices"
            />
          </>
        )}
      </ul>

      <div className="bg-widget d-flex mt-auto ml-1">
        {/* <Button
          className="rounded-pill my-3 body-2 d-none d-md-block"
          type="submit"
          color="secondary-red"
        >
          Unlock Full Version
        </Button> */}
      </div>
    </nav>
  );
}

export default withRouter(Sidebar);
