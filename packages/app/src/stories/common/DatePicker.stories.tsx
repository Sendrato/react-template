import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import DatePicker from '@components/common/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Common/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    minDate: {
      description: 'The object with value, label, and error for input with min date.',
    },
    maxDate: {
      description: 'The object with value, label, and error for input with max date.',
    },
    handleChangeMaxDate: {
      description: 'Function for change max date',
    },
    handleChangeMinDate: {
      description: 'Function for change min date',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The DatePicker component is a user-friendly and customizable component that enables users to select dates from a calendar-style interface. It provides an intuitive way to capture and display date inputs within your application.',
      },
    },
  },
};

const Template: StoryFn<typeof DatePicker> = () => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  return (
    <DatePicker
      minDate={{
        value: minValue,
        label: 'From',
      }}
      handleChangeMinDate={setMinValue}
      maxDate={{
        value: maxValue,
        label: 'To',
      }}
      handleChangeMaxDate={setMaxValue}
    />
  );
};

export const Default = Template.bind({});

export default meta;
