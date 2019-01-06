import React, { Component } from 'react';
import VideoNavbar from '../../components/VideoNavbar/VideoNavbar';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';

class AppContent extends Component {
    render() {
        return (
            <div>
                <VideoNavbar />
                <Layout />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);