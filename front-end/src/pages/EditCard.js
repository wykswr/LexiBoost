import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyCardAddition from "../components/MyCardAddition";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    return (
        <div className={"grid grid-cols-12 h-screen container mx-auto py-8 place-items-stretch"}>
            <div>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    aria-label="Vertical tabs example"
                    scrollButtons={true}
                    sx={{borderRight: 1, borderColor: 'divider'}}
                >
                    <Tab label="Card 1" {...a11yProps(0)} />
                    <Tab label="Card 2" {...a11yProps(1)} />
                    <Tab label="Card 3" {...a11yProps(2)} />
                    <Tab label="Card 4" {...a11yProps(3)} />
                    <Tab label="Card 5" {...a11yProps(4)} />
                    <Tab label="Card 6" {...a11yProps(5)} />
                    <Tab label="Card 7" {...a11yProps(6)} />
                </Tabs>
            </div>

            <div className={"col-span-11"}>
                {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (<TabPanel value={value} index={index}>
                    <MyCardAddition key={index} cardId={index}/>
                </TabPanel>))}
            </div>


        </div>
    );
}


const EditCard = () => {
    return (
        <div className={"container mx-auto py-6"}>
            <VerticalTabs/>
        </div>
    )
}

export default EditCard