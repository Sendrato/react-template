import { memo } from 'react';

const UploadIcon = memo(() => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_479_9938)">
        <rect
          x="0.5"
          width="40"
          height="40"
          rx="20"
          fill="#3460DC"
          fillOpacity="0.12"
        />
        <path
          d="M22.5 10H14.5C13.4 10 12.51 10.9 12.51 12L12.5 28C12.5 29.1 13.39 30 14.49 30H26.5C27.6 30 28.5 29.1 28.5 28V16L22.5 10ZM26.5 28H14.5V12H21.5V17H26.5V28ZM16.5 23.01L17.91 24.42L19.5 22.84V27H21.5V22.84L23.09 24.43L24.5 23.01L20.51 19L16.5 23.01Z"
          fill="#3460DC"
        />
      </g>
      <defs>
        <clipPath id="clip0_479_9938">
          <rect
            width="40"
            height="40"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
});

UploadIcon.displayName = 'UploadIcon';

export default UploadIcon;
