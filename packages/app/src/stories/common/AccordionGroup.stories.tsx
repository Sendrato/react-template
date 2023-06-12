import { Typography } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import AccordionGroup from '@modules/common/AccordionGroup';

const meta: Meta<typeof AccordionGroup> = {
  title: 'Common/AccordionGroup',
  component: AccordionGroup,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The colapsed accordion text.',
    },
    children: {
      description: 'The content of Accordion.',
    },
  },
};

type Story = StoryObj<typeof AccordionGroup>;

export const Default: Story = {
  args: {
    title: 'Details',
    children: (
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt earum
        ipsum iste neque fuga voluptatibus officia voluptas! Debitis neque
        voluptate quidem eum, libero dolore est velit dolorem doloremque placeat
        officia.
      </Typography>
    ),
  },
};

export default meta;
