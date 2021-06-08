import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { MdKeyboardArrowDown } from 'react-icons/md'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
      padding: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    marginBottom: -1,
    minHeight: 56,
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#003363',
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({summary, details}) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <span>{summary}</span><MdKeyboardArrowDown/>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}