import React, { Component } from 'react';
import VideoNavbar from '../../components/VideoNavbar/VideoNavbar';
import Layout from '../../components/Layout/Layout';

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

export default AppContent;