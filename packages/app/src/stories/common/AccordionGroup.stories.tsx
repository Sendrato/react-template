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
  parameters: {
    docs: {
      description: {
        component:
          'The AccordionGroup component is the efficient component that simplifies the creation of accordion elements within your application. The AccordionGroup component is particularly useful when you need to display collapsible sections of content, such as FAQs, collapsible panels, or nested information. It manages the state and behavior of the accordion items, providing a seamless user experience.',
      },
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
