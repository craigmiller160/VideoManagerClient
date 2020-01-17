/* eslint-disable */  // TODO delete this
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Settings.scss';
import FlexRow from '../../UI/Grid/FlexRow';
import Spinner from '../../UI/Spinner/Spinner';
import { loadSettings, saveSettings } from '../../../store/settings/settings.actions';
import Form from '../../UI/form/Form/Form';
import Input from '../../UI/form/Input/Input';
import { Button } from 'reactstrap';
import { isRequired } from '../../../utils/validations';
import FileChooser from '../../UI/FileChooser';

export const FORM_NAME = 'Settings_Form';

const Settings = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.settings.loading);

    useEffect(() => {
        dispatch(loadSettings());
    }, []);

    return (
        <div className={ classes.Settings }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>Settings</h3>
                </div>
            </FlexRow>
            <Form
                form={ FORM_NAME }
                onSubmit={ (values) => dispatch(saveSettings(values)) }
                destroyOnUnmount={ false }
                className={ classes.form }
            >
                {
                    loading &&
                    <Spinner />
                }
                {
                    !loading &&
                    <>
                        <FlexRow
                            justifyContent="center"
                        >
                            <Input
                                name="rootDir"
                                label="Directory to Scan"
                                divClassName={ classes.rootDir }
                                validate={ [
                                    isRequired
                                ] }
                            />
                        </FlexRow>
                        <FlexRow
                            justifyContent="center"
                        >
                            <FileChooser
                                directoriesOnly
                            />
                        </FlexRow>
                        <FlexRow
                            justifyContent="center"
                        >
                            <Button
                                type="submit"
                                color="primary"
                            >
                                Save
                            </Button>
                        </FlexRow>
                    </>
                }
            </Form>
        </div>
    );
};

export default Settings;
