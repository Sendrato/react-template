import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { getBase64 } from 'utils';

import CloseIconModal from '@modules/common/icons/CloseIconModal';
import UploadIcon from '@modules/common/icons/UploadIcon';

export interface ISize {
  width: number;
  height: number;
}

interface IProps {
  setFile: Dispatch<SetStateAction<null | File>>;
  file: File | null;
  base64: null | string;
  setBase64: Dispatch<SetStateAction<null | string>>;
  setSizes?: Dispatch<SetStateAction<null | ISize>>;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  displayFile?: boolean;
}

const FileDropzone = ({
  file,
  setFile,
  base64,
  setBase64,
  accept = {
    'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'],
  },
  setSizes,
  maxFiles = 1,
  maxSize = 100000000,
  displayFile = true,
}: IProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setSizes && setSizes({ width: img.width, height: img.height });
        };
        img.src = event.target?.result?.toString() || '';
      };

      reader.readAsDataURL(file);
    },
    [setSizes],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    onDrop: setSizes && onDrop,
  });

  const acceptKeys = Object.keys(accept);

  const formats = acceptKeys
    .map((key) => {
      return accept[key].map((item) =>
        item.toUpperCase().substring(1, item.length),
      );
    })
    .flat()
    .join(', ');

  const getFileSize = (bytes: number) => {
    if (bytes < 1000) {
      return `${bytes}B`;
    }
    const kbytes = Math.round(bytes / 1000);

    if (kbytes < 1000) {
      return `${kbytes}KB`;
    }

    return `${Math.round(kbytes / 1000)}MB`;
  };

  useEffect(() => {
    if (acceptedFiles) {
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, setFile]);

  useEffect(() => {
    const toBase64 = async () => {
      if (file && typeof file !== 'string') {
        const base64 = await getBase64(file);

        setBase64(base64);
      }
    };

    if (file) {
      toBase64();
    }
  }, [file, setBase64, setFile]);

  useEffect(() => {
    return () => {
      setBase64(null);
      setFile(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return file || base64 ? (
    <UploadedWrapper>
      {displayFile && base64 && (
        <ProductImage
          alt="item img"
          variant="square"
          src={`data:image/jpeg;base64,${base64.split('base64,')[1] || base64}`}
        />
      )}

      {acceptedFiles?.[0] ? (
        <Box width="100%">
          <FileName variant="body1">{acceptedFiles[0].name}</FileName>
          <FileSize variant="body1">{`${getFileSize(
            acceptedFiles[0].size,
          )} • Complete`}</FileSize>
        </Box>
      ) : null}
      <CloseIconModal
        sx={{ margin: '0 1rem', cursor: 'pointer' }}
        onClick={() => {
          setFile(null);
          setBase64(null);
        }}
      />
    </UploadedWrapper>
  ) : (
    <DropzoneWrapper {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <UploadIcon />
      <UploadText variant="body1">
        <span>Click to upload</span>
        {' or drag and drop'}
      </UploadText>
      <TypographyStyled
        variant="body2"
        color="rgba(0, 0, 0, 0.6)"
        fontWeight={400}
      >
        {` ${formats} (max. ${maxSize / 1000000}MB)`}
      </TypographyStyled>
    </DropzoneWrapper>
  );
};

const UploadedWrapper = styled(Grid)`
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductImage = styled(Avatar)`
  width: 90px;
  height: 90px;
  margin-right: 1rem;

  img {
    object-fit: scale-down !important;
  }
`;

const FileName = styled(Typography)`
  white-space: break-spaces;
  word-break: break-word;
`;

const FileSize = styled(Typography)`
  color: gray;
`;

const DropzoneWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 1.5rem;
`;

const UploadText = styled(Typography)`
  cursor: pointer;
  margin: 0.5rem 0;
  text-align: center !important;
  span {
    color: #3460dc;
    text-decoration: underline;
  }
`;

const TypographyStyled = styled(Typography)`
  text-align: center !important;
`;

export default FileDropzone;
