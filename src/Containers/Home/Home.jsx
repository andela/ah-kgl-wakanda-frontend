import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.scss';

import { connect } from 'react-redux';

import { changeName } from '../../actions/changeName';

class Home extends Component {
    render() {
        return (
            <div id='home' className='text-center'>
                <h1>Hello World {this.props.name.team}</h1>
                <button className='button' onClick={() => this.props.changeName('Avengers')}>Change to avengers</button>
            </div>
        );
    }
}

const mapStateToProps = ({ name }) => {
    return {
        name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeName: (name) => dispatch(changeName(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
