import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { CampaignTable } from './CampaignTable';
import { Analytics } from './Analytics';
import { Campaign } from '../../generated/graphql';


const MainTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1e145a',
  },
})(Tabs);

interface TabProps {
  label: string;
}

const TabItem = withStyles((theme: Theme) => 
  createStyles({
    root: {
      textTransform: 'uppercase',
      marginRight: theme.spacing(4),
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 16,
      color: '#757575',
      '&:hover': {
        color: '#1e145a',
        opacity: 1
      },
      '&$selected': {
        color: '#1e145a'
      },
      '&:focus': {
        color: '#1e145a'
      }
    }
  }),
)((props: TabProps) => <Tab disableRipple {...props} />);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, index, value, ...otherProps } = props;

  return (
    <div>
      {value === index && (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`nav-tabpanel-${index}`}
          aria-labelledby={`nav-tab-${index}`}
          {...otherProps}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface Props {
  campaigns: Campaign[];
}

export function NavTabs({ campaigns }: Props) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <MainTabs value={value} onChange={handleChange}>
        <TabItem label="Campaign" />
        <TabItem label="Analytics" />
      </MainTabs>
      <TabPanel index={0} value={value}>
        <CampaignTable campaigns={campaigns} />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Analytics />
      </TabPanel>
    </div>
  );
}