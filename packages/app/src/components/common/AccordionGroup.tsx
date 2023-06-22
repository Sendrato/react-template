import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { StyledPaper } from '../styled-mui';

interface IProps {
  children: ReactNode;
  title: string;
}

const AccordionGroup = ({ children, title }: IProps) => {
  return (
    <StyledPaper>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ height: '2rem', width: '2rem' }} />}>
          <Typography variant="body1" p={'0 1rem'}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ overflowX: 'auto' }}>{children}</AccordionDetails>
      </Accordion>
    </StyledPaper>
  );
};

export default AccordionGroup;
