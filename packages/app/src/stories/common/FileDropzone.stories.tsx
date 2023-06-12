import { Meta, StoryObj } from '@storybook/react';
import { base64 } from 'stories/table/assets/data';

import FileDropzone from '@modules/common/FileDropzone';

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
      description:
        'SetState action for store file in React state as base64 string.',
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
    maxFiles: {
      description: 'Max count of files.',
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

type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {
  args: {
    setFile: () => null,
    file: null,
    base64: null,
    setBase64: () => null,
  },
};

export const UploadedFile: Story = {
  args: {
    setFile: () => null,
    file: null,
    base64,
    setBase64: () => null,
  },
};

export default meta;
