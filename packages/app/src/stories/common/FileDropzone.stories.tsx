import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import FileDropzone from '@components/common/FileDropzone';

const meta: Meta<typeof FileDropzone> = {
  title: 'Common/FileDropzone',
  component: FileDropzone,
  tags: ['autodocs'],
  argTypes: {
    setFile: {
      description: 'SetState action for store file in React state.',
    },
    file: {
      description: 'The uploaded file.',
    },
    setBase64: {
      description: 'SetState action for store file in React state as base64 string.',
    },
    base64: {
      description: 'The uploaded file in the base64 format.',
    },
    accept: {
      description: 'The accepted file types.',
    },
    displayFile: {
      description: 'Use property if needed display file.',
    },
    maxSize: {
      description: 'Max size of file.',
    },
    setSizes: {
      description: 'SetState action for store file size in React state.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The FileDropzone component is a convenient wrapper around the react-dropzone library, providing an intuitive and efficient way to create an input field for file uploads. It simplifies the process of accepting and handling files from users. Additionally, the FileDropzone component includes built-in functionality to convert uploaded files to base64 format. This feature enables convenient handling and manipulation of file data within your application, opening up possibilities for various use cases.',
      },
    },
  },
};

const Template: StoryFn<typeof FileDropzone> = (args) => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  return (
    <FileDropzone {...args} setFile={setFile} file={file} base64={base64} setBase64={setBase64} />
  );
};

export const ImageDropzone = Template.bind({});

ImageDropzone.args = {
  accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'] },
};

export const TextFileDropzone = Template.bind({});

TextFileDropzone.args = {
  accept: { 'text/*': ['.csv'] },
};

export const DisplayOnlyName = Template.bind({});

DisplayOnlyName.args = {
  accept: { 'text/*': ['.csv'] },
  displayFile: false,
};

export default meta;
