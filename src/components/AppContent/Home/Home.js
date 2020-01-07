/* eslint-disable */ // TODO delete this
import React from 'react';
import classes from './Home.scss';
import FileChooser from '../../UI/FileChooser';

const Home = () => {

    const select = (file) => console.log('Selected', file); // TODO delete this

    return (
        <div className={ classes.Home }>
            <div className={ classes.title }>
                <h3>Welcome to VideoManager</h3>
            </div>
            <FileChooser directoriesOnly selectFile={ select } />
        </div>
    )
};

export default Home;
