import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class FooterIcon extends React.Component {
  render() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00003 14C7.8227 14 7.65336 13.93 7.52803 13.804L2.35003 8.61732C0.992698 7.25732 0.992698 5.04466 2.35003 3.68466C3.00536 3.02866 3.8807 2.66666 4.81336 2.66666C5.74603 2.66666 6.62136 3.02866 7.2767 3.68466L8.00003 4.40932L8.7227 3.68532C9.3787 3.02866 10.254 2.66666 11.1867 2.66666C12.1194 2.66666 12.9947 3.02866 13.65 3.68466C15.0074 5.04466 15.0074 7.25732 13.6507 8.61732L8.47203 13.8047C8.3467 13.93 8.17736 14 8.00003 14Z"
          fill="#FF5668"
        />
        <mask id="footer" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="2" width="14" height="12">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00003 14C7.8227 14 7.65336 13.93 7.52803 13.804L2.35003 8.61732C0.992698 7.25732 0.992698 5.04466 2.35003 3.68466C3.00536 3.02866 3.8807 2.66666 4.81336 2.66666C5.74603 2.66666 6.62136 3.02866 7.2767 3.68466L8.00003 4.40932L8.7227 3.68532C9.3787 3.02866 10.254 2.66666 11.1867 2.66666C12.1194 2.66666 12.9947 3.02866 13.65 3.68466C15.0074 5.04466 15.0074 7.25732 13.6507 8.61732L8.47203 13.8047C8.3467 13.93 8.17736 14 8.00003 14Z"
            fill="white"
          />
        </mask>
        <g mask="url(#footer)">
          <rect width="16" height="16" fill="#FF5668" />
        </g>
      </svg>
    );
  }
}

export default FooterIcon;
