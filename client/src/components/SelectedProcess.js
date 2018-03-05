import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectedProcess extends React.Component {
    static propTypes = {
        primaryColor: PropTypes.string,
    };


    state={
        next: 0,
        showSuccess: false,
    }

    startProcess = () => {
        setTimeout(() => this.setState({ showSucess: false }), 1000);
        
        if(this.state.next === this.props.selectedProcess.actions.length - 1){
            this.setState({ showSuccess: true, next: 0 })  
        }
        else{
            this.setState({ showSuccess: true, next: this.state.next + 1 })
        } 

        setTimeout(() => this.setState({ showSuccess: false }), 3000);
    }

    showSuccessImage = (img) => {
        let successImage = '';
        switch(img){
            case 'nfc.png':
            successImage = 'success_nfc.png';
            break;
            case 'qrcode.png':
            successImage = 'success_qr.png';
            break;
            case 'barcode.png':
            successImage = 'success_sku.png';
            break;
            default:
            successImage = 'success_nfc.png';
        }

        return (<img
            style={{ height: '493px', width: '722px' }}
            alt="scan"
            src={
                require(`../assets/${successImage}`)
            }
        />

        );

    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection:'column',alignItems:'center' }}>
                      <div onClick={this.startProcess}>
                      {!this.state.showSuccess && <img
                        style={{ height: '493px', width: '722px', borderRadius: '10px' }}
                        alt="scan"
                        src={
                            require(`../assets/${this.props.selectedProcess.actions[this.state.next].image}`)
                        }
                    /> }
                        {this.state.showSuccess && this.showSuccessImage(this.props.selectedProcess.actions[this.state.next].image)}
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    nfc: state.tid,
});

export default connect(mapStateToProps) (SelectedProcess);