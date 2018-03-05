import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

class Process extends React.Component {
    static propTypes = {
        primaryColor: PropTypes.string,
    };


    render() {
        return (
            <div style={{ width: '100%', border: '2px solid white', borderRadius: '10px'}}>
               {/* <div>{this.props.process.label}</div> */}
               <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                {this.props.process.actions.map((action,i=0) => <div style={{ display: 'flex'}}>
                <img
                    style={{ height: '100px', width: '150px' }}
                    alt="Switches Logo"
                    src={
                        require(`../assets/${action.image}`)
                    }
                    />
                        {i !== this.props.process.actions.length - 1 &&
                        <FontAwesome
                            className="fas fa-arrow-right"
                            name="arrow-right"
                            size="2x"
                            style={{ color: 'white', margin: '20px', marginTop: '25px' }}
                    />} </div>)}
                </div>
            </div>
        );
    }
}


export default Process;
