import React from 'react';

const Base64 = ({
  value,
  type = 'image/jpeg',
  height = '50',
  width = 'auto',
}: {
  value?: string;
  type?: string;
  height?: string;
  width?: string;
}) => {
  if (value) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        height={height}
        width={width}
        alt="location kind"
        src={`data:${type};base64,${value}`}
      />
    );
  }

  return null;
};

export default Base64;
