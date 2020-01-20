import React, { useEffect, useState } from 'react';
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
import { change } from 'redux-form';

export const FORM_NAME = 'Settings_Form';

const Settings = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.settings.loading);
    const [state, setState] = useState({
        rootDirEditing: false
    });

    useEffect(() => {
        dispatch(loadSettings());
    }, []);

    const editRootDir = () => setState((prevState) => ({
        ...prevState,
        rootDirEditing: true
    }));

    const selectDir = (selected) => {
        setState((prevState) => ({
            ...prevState,
            rootDirEditing: false
        }));
        dispatch(change(FORM_NAME, 'rootDir', selected.filePath));
    };

    const showFileChooserClass = state.rootDirEditing ? classes.show : '';
    const showSaveClass = state.rootDirEditing ? '' : classes.show;

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
                            className={ classes.rootDirWrapper }
                            justifyContent="center"
                            alignItems="flex-end"
                        >
                            <Input
                                name="rootDir"
                                label="Directory to Scan"
                                divClassName={ classes.rootDir }
                                validate={ [
                                    isRequired
                                ] }
                                disabled
                            />
                            <Button
                                color="info"
                                onClick={ editRootDir }
                            >
                                Set
                            </Button>
                        </FlexRow>
                        <FlexRow
                            justifyContent="center"
                            className={ [classes.fileChooser, showFileChooserClass].join(' ') }
                        >
                            <FileChooser
                                directoriesOnly
                                selectFile={ selectDir }
                            />
                        </FlexRow>
                        <FlexRow
                            justifyContent="center"
                            className={ [classes.submit, showSaveClass].join(' ') }
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
