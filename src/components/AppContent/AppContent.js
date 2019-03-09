import React, { Component } from 'react';
import VideoNavbar from 'components/AppContent/VideoNavbar/VideoNavbar';
import VideoListLayout from './VideoListLayout/VideoListLayout';
import { Container, Row, Col } from 'reactstrap';
import Alert from '../UI/Alert/Alert';
import { Route, Switch, withRouter } from 'react-router-dom';
import Scanning from './Scanning/Scanning';
import { checkIsScanning, startFileScan } from 'store/scanning/scanning.actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showErrorAlert, hideAlert } from 'store/alert/alert.actions';
import VideoFileEdit from './VideoFileEdit/VideoFileEdit';
import { getSelectedVideo, getSelectedVideoWithFilters } from 'store/videoList/videoList.selectors';
import ManageVideoFilters from './ManageVideoFilters/ManageVideoFilters';
import classes from './AppContent.scss';
import { loadFilterOptions } from 'store/videoSearch/videoSearch.actions';
import { saveVideoFileEdits } from 'store/videoList/videoList.actions';

export class AppContent extends Component {

    state = {
        isStarted: false
    };

    componentDidMount = async () => {
        try {
            this.props.loadFilterOptions();
            await this.props.checkIsScanning();
            this.setState({ isStarted: true });
        }
        catch (ex) {
            this.props.showErrorAlert(ex.message);
        }
    };

    handleManageFilters = () => {
        this.props.history.push('/filters');
    };

    saveFileChanges = async () => {
        await this.props.saveVideoFileEdits();
        this.props.history.push('/');
    };

    static resetToRootComponent(nextProps) {
        if (nextProps.history.location.pathname === '/scanning' && !nextProps.isScanning) {
            return true;
        }

        return nextProps.history.location.pathname === '/edit' && (!nextProps.selectedVideo || Object.entries(nextProps.selectedVideo).length === 0);
    }

    componentWillUpdate(nextProps) {
        if (AppContent.resetToRootComponent(nextProps)) {
            this.props.history.push('/');
        }
    }

    render() {
        const {
            startFileScan,
            isScanning,
            checkIsScanning,
            alert,
            hideAlert,
            selectedVideo,
            filters,
            saveVideoFileEdits
        } = this.props;
        const { isStarted } = this.state;

        return (
            <div className={ classes.AppContent }>
                <VideoNavbar
                    startFileScan={ startFileScan }
                    manageFilters={ this.handleManageFilters }
                    isScanning={ isScanning }
                />
                {
                    isStarted &&
                        <Container className={ classes.container }>
                            <Row>
                                <Col xs={{ size: 8, offset: 2 }}>
                                    <Alert
                                        alert={ alert }
                                        hideAlert={ hideAlert }
                                    />
                                </Col>
                            </Row>
                            <Switch>
                                <Route
                                    path="/scanning"
                                    render={ (props) => (
                                        <Scanning
                                            { ...props }
                                            isScanning={ isScanning }
                                            checkIsScanning={ checkIsScanning }
                                        />
                                    ) }
                                />
                                <Route
                                    path="/edit"
                                    render={ (props) => (
                                        <VideoFileEdit
                                            { ...props }
                                            selectedVideo={ selectedVideo }
                                            saveFileChanges={ this.saveFileChanges }
                                            filters={ filters }
                                        />
                                    ) }
                                />
                                <Route
                                    path="/filters"
                                    render={ (props) => (
                                        <ManageVideoFilters
                                            { ...props }
                                        />
                                    ) }
                                />
                                <Route path="/"
                                       exact
                                       render={ (props) => (
                                           <VideoListLayout
                                               { ...props }
                                               isScanning={ isScanning }
                                           />
                                       ) }
                                />
                            </Switch>
                        </Container>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isScanning: state.scanning.isScanning,
    alert: state.alert,
    selectedVideo: getSelectedVideoWithFilters(state),
    filters: state.videoSearch.filters
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    checkIsScanning,
    startFileScan,
    showErrorAlert,
    loadFilterOptions,
    hideAlert,
    saveVideoFileEdits
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContent));