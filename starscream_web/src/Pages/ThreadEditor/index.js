import React from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Question } from './../ThreadDetails'


function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`thread-editor-tabpanel--${index}`}
            aria-labelledby={`thread-editor-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

export default function ThreadEditor({...props}) {
    const [tab, setTab] = React.useState(0);

    const [thread, setThread] = React.useState({summary: null, description: null});

    function handleChangeTab(event, newValue) {
        setTab(newValue);
    }

    function handleInput(event) {
        setThread({...thread, [event.target.name]: event.target.value});
    }

    return (
        <Grid item xs={12}>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
                variant={'fullWidth'}
            >
                <Tab label="Edit" />
                <Tab label="Preview" />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <List>
                    <ListItem>
                        <Typography variant={'h6'}>
                            Create new thread
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <TextField
                            label={'Sumarry'}
                            value={thread.summary || ''}
                            required
                            fullWidth
                            variant={'outlined'}
                            name={'summary'}
                            onChange={handleInput}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label={'Description'}
                            value={thread.description || ''}
                            required
                            fullWidth
                            variant={'outlined'}
                            multiline
                            rows={10}
                            name={'description'}
                            onChange={event => handleInput(event, 'description')}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            variant={'outlined'}
                        >
                            Submit
                        </Button>
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Question
                    author={{username: 'Andreev Danil'}}
                    thread={{
                        summary: thread.summary || 'Fill the summary input line',
                        description: thread.description || 'Fill the description input line',
                    }}
                />
            </TabPanel>
        </Grid>
    );
}