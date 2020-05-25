import React from 'react'
import {coreRequest} from '../../Utilities/Rest'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Question from './../ThreadDetails/Components/Question'
import {useHistory} from 'react-router-dom';
import MenuItem from "@material-ui/core/MenuItem";
import {useAuth} from "../../Utilities/Auth";


function TabPanel({children, value, index, ...other}) {
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
    const [thread, setThread] = React.useState({title: '', body: ''});
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState(null);
    const [errors, setErrors] = React.useState({title: null, body: null, category: null});
    const history = useHistory();
    const {user} = useAuth();

    function changeRoute(route) {
        history.push(route);
    }

    React.useEffect(() => {
        coreRequest().get('categories')
            .then(response => {
                setCategories(response.body.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function checkFields() {
        let error = false;
        if (!thread.title) {
            setErrors(last => ({...last, title: 'Заповніть обов\'язкове поле'}));
            error = true;
        } else {
            setErrors(last => ({...last, title: null}))
        }
        if (!thread.body) {
            setErrors(last => ({...last, body: 'Заповніть обов\'язкове поле'}));
            error = true;
        } else {
            setErrors(last => ({...last, body: null}))
        }
        if (!category) {
            setErrors(last => ({...last, category: 'Виберіть категорію'}));
            error = true;
        } else {
            setErrors(last => ({...last, category: null}))
        }

        return !error;
    }

    function handleSubmit() {
        if (!checkFields()) {
            return null;
        }

        try {
            coreRequest().post('questions')
                .send({...thread, category_id: category, body: thread.body.replace(/(\n\n\n)+/g, '\n'), title: thread.title.replace(/\n/g, '')})
                .then(response => {
                    setErrors({title: null, body: null, category: null});
                    changeRoute(`/thread/${response.body.data.id}`);
                })
                .catch(error => {
                    switch (error.status) {
                        case 401:
                            changeRoute('?login=true');
                            break;
                    }
                });
        } catch(error) {
            console.error(error);
        }
    }

    function handleChangeTab(event, newValue) {
        setTab(newValue);
    }

    function handleInput(event) {
        setThread({...thread, [event.target.name]: event.target.value});
    }

    function handleCategorySelect(event) {
        setCategory(event.target.value);
    }

    return (
        <Grid item xs={12}>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
                variant={'fullWidth'}
            >
                <Tab label="Редагування"/>
                <Tab label="Перегляд"/>
            </Tabs>
            <TabPanel value={tab} index={0}>
                <List>
                    <ListItem>
                        <Typography variant={'h6'}>
                            Створити питання
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <TextField
                            error={!!errors.title}
                            helperText={errors.title}
                            label={'Питання'}
                            value={thread.title || ''}
                            required
                            fullWidth
                            variant={'outlined'}
                            name={'title'}
                            onChange={handleInput}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            error={!!errors.body}
                            helperText={errors.body}
                            label={'Детально'}
                            value={thread.body || ''}
                            required
                            fullWidth
                            variant={'outlined'}
                            multiline
                            rows={10}
                            name={'body'}
                            onChange={event => handleInput(event, 'body')}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            error={!!errors.category}
                            helperText={errors.category}
                            select
                            name={'category_id'}
                            label={'Категорія'}
                            value={category || ''}
                            onChange={handleCategorySelect}
                            fullWidth
                            variant={'outlined'}
                        >
                            {categories.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            variant={'outlined'}
                            onClick={handleSubmit}
                        >
                            Підтвердити
                        </Button>
                    </ListItem>
                </List>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Question
                    author={{username: 'Andreev Danil'}}
                    preview
                    thread={{
                        title: thread.title || 'Заповніть поле питання щоб продовжити',
                        body: thread.body || 'Заповніть поле детально щоб продовжити',
                    }}
                    author={user}
                />
            </TabPanel>
        </Grid>
    );
}