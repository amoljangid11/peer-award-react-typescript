import React from 'react';

const Add = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="#555"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
};

export default Add;
