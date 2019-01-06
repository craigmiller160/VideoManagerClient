import React, { Component } from 'react';
import VideoNavbar from '../../components/VideoNavbar/VideoNavbar';

class AppContent extends Component {
    render() {
        return (
            <div>
                <VideoNavbar/>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default AppContent;