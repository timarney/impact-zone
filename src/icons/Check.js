import React from "react";

const CheckIcon = ({ className }) => {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 507.2 507.2"
    >
      <circle cx="253.6" cy="253.6" r="253.6" fill="#32BA7C" />
      <path
        d="M188.8 368l130.4 130.4c108-28.8 188-127.2 188-244.8v-7.2L404.8 152l-216 216z"
        fill="#0AA06E"
      />
      <g fill="#FFF">
        <path d="M260 310.4c11.2 11.2 11.2 30.4 0 41.6l-23.2 23.2c-11.2 11.2-30.4 11.2-41.6 0L93.6 272.8c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0L260 310.4z" />
        <path d="M348.8 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6l-176 175.2c-11.2 11.2-30.4 11.2-41.6 0l-23.2-23.2c-11.2-11.2-11.2-30.4 0-41.6l176-175.2z" />
      </g>
    </svg>
  );
};

export default CheckIcon;
