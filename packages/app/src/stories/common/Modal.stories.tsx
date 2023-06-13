import { Button, Grid, TextField } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Modal from '@modules/common/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The modal title.',
    },
    open: {
      description: 'The Modal opening indicator.',
    },
    close: {
      description: 'The function for close modal.',
    },
    width: {
      description: 'The Modal width.',
    },
    mobileScreen: {
      description:
        'A property that indicates whether to display the modal window on mobile devices in full screen.',
    },
    children: {
      description: 'The Modal content.',
    },
    actions: {
      description: 'The React Elements in the bottom of Modal.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Modal component is a versatile and interactive component that provides a modal dialog overlay to display additional content or interactions on top of the main application screen. It offers a flexible way to present focused information, gather user input, or trigger specific actions in a modal window. The Modal component allows you to create custom modal dialogs by providing the necessary structure and functionality. You can easily control the visibility of the modal, customize its content, and define the actions or interactions available within the modal.',
      },
    },
  },
};

const Template: StoryFn<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Click to open modal
      </Button>
      <Modal
        open={isOpen}
        close={() => setIsOpen(false)}
        title="Create Location"
        actions={<Button variant="contained">Enter</Button>}
      >
        <Grid container flexDirection={'column'}>
          <TextField
            name="Id"
            type="text"
            label="ID of location"
            helperText={'This is the ID of the event attraction'}
          />

          <TextField
            name="Name"
            type="text"
            label="Name of location"
            helperText={'This is the name of the event attraction'}
          />
        </Grid>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  open: false,
  actions: <Button variant="outlined">Add</Button>,
  title: 'Create Modal',
};

export default meta;
