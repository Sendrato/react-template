import { Meta, StoryObj } from '@storybook/react';
import { base64 } from 'stories/table/assets/data';
import { createThemeProvider } from 'stories/utils';

import FileDropzone from '@modules/common/FileDropzone';

const meta: Meta<typeof FileDropzone> = {
  decorators: [createThemeProvider()],
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
