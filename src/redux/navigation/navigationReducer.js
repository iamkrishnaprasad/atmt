/* eslint-disable default-param-last */
import { OPEN_SIDEBAR, CLOSE_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM } from './navigationTypes';

const initialState = {
  sidebarOpened: false,
  activeItem: JSON.parse(localStorage.getItem('staticSidebar')) ? window.location.pathname : null,
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { ...state, sidebarOpened: true };
    case CLOSE_SIDEBAR:
      return { ...state, sidebarOpened: false };
    case CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem,
      };
    default:
      return state;
  }
}
