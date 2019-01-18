import React, { Component } from 'react';
import classes from './VideoList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class VideoList extends Component {

    render() {
        return (
            <div className={ classes.VideoList }>VideoList</div>
        );
    }

}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);