import React from 'react';
import classes from './Home.scss';
import FileChooser from '../../UI/FileChooser';

const Home = () => (
    <div className={ classes.Home }>
        <div className={ classes.title }>
            <h3>Welcome to VideoManager</h3>
        </div>
    </div>
);

export default Home;
