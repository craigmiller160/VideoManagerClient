import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

/* eslint-disable */ // TODO delete this

const Settings = (props) => {
    const {
        rootDirEditing
    } = props;
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.settings.loading);
    const [state, setState] = useState({
        rootDirEditing,
        rootDirModified: false
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
            rootDirEditing: false,
            rootDirModified: true // TODO add to unit tests
        }));
        dispatch(change(FORM_NAME, 'rootDir', selected.filePath));
    };

    const submit = async (values) => { // TODO add to unit tests
        const successful = await dispatch(saveSettings(values));
        if (successful) {
            setState((prevState) => ({
                ...prevState,
                rootDirModified: false
            }));
        }
    };

    const showFileChooserClass = state.rootDirEditing ? classes.show : '';
    const showSaveClass = state.rootDirEditing ? '' : classes.show;

    // Separate variable for this to make it easily extensible
    const enableSaveBtn = state.rootDirModified; // TODO add to unit tests

    return (
        <div className={ classes.Settings }>
            <FlexRow>
                <div className={ classes.title }>
                    <h3>Settings</h3>
                </div>
            </FlexRow>
            <Form
                form={ FORM_NAME }
                onSubmit={ submit }
                destroyOnUnmount={ false }
                className={ classes.form }
            >
                {
                    loading &&
                    <Spinner />
                }
                {
                    !loading &&
                    <div id="settings-form-content">
                        <FlexRow
                            id="root-dir-container"
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
                                id="set-root-dir-btn"
                                color="info"
                                onClick={ editRootDir }
                            >
                                Set
                            </Button>
                        </FlexRow>
                        <FlexRow
                            id="file-chooser-container"
                            justifyContent="center"
                            className={ [classes.fileChooser, showFileChooserClass].join(' ') }
                        >
                            <FileChooser
                                directoriesOnly
                                selectFile={ selectDir }
                            />
                        </FlexRow>
                        <FlexRow
                            id="btn-container"
                            justifyContent="center"
                            className={ [classes.submit, showSaveClass].join(' ') }
                        >
                            <Button
                                id="save-btn"
                                type="submit"
                                color="primary"
                                disabled={ !enableSaveBtn }
                            >
                                Save
                            </Button>
                        </FlexRow>
                    </div>
                }
            </Form>
        </div>
    );
};
Settings.propTypes = {
    rootDirEditing: PropTypes.bool
};
Settings.defaultProps = {
    rootDirEditing: false
};

export default Settings;
