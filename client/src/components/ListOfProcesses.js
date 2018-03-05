import React from 'react';
import PropTypes from 'prop-types';
import ProcessComponent from './Process';
import SelectedProcess from './SelectedProcess';
import { connect } from 'react-redux';
import { scanNFC } from '../modules/Actions';
import { socketConnect } from 'socket.io-react';


class Action {
    constructor(type, label, image, successImage) {
        this.type = type;
        this.lable = label;
        this.image = image;
    }
}

class Process {
    constructor(label, actions) {
        this.label = label;
        this.actions = actions;
    }
}


class ListOfProcesses extends React.Component {
    static propTypes = {
        primaryColor: PropTypes.string,
    };

    constructor(props){
        super(props);
        const nfcImage='nfc.png';
        const barcodeImage = 'barcode.png';
        const qrImage = 'qrcode.png';
        const successImage = 'success.png';

        const nfcAction = new Action('NFC', 'Tap NFC', nfcImage, successImage);
        const barcodeAction = new Action('BARCODE', 'Scan Barcode', barcodeImage, successImage);
        const qrcodeAction = new Action('QRCODE', 'Scan QR Code', qrImage, successImage);


        const processes = [new Process('NFC -> BARCODE -> QRCODE', [nfcAction, barcodeAction, qrcodeAction]),
        new Process('NFC -> BARCODE', [nfcAction, barcodeAction]),
        new Process('NFC -> QRCODE', [nfcAction, qrcodeAction])];
        this.state.processes = processes;
    }

    state = {
        processes: [],
        selectedProcess: '',
    };

    componentDidMount(){
        this.props.socket.on('scanNFC', obj => { this.props.dispatch(scanNFC(obj.tid)); console.log("tid:",obj.tid)});
        this.props.socket.emit('my other event', 'Hello world!');  
    }

    render() {
        return (
            <div>
                <div style={{ margin: '20px', cursor: 'pointer', textAlign: 'right', color: 'white'}} onClick={() => this.setState({ selectedProcess: ''})}><b>Quit</b></div>
                { !this.state.selectedProcess && <div className='formContainer'>
                    <div style={{ margin: '20px', width: '80%' }} onClick={() => this.setState({ selectedProcess: this.state.processes[0] })}><ProcessComponent process={this.state.processes[0]}/></div>
                    <div style={{ margin: '20px', width: '80%' }} onClick={() => this.setState({ selectedProcess: this.state.processes[1] })}><ProcessComponent process={this.state.processes[1]} /></div>
                    <div style={{ margin: '20px', width: '80%' }} onClick={() => this.setState({ selectedProcess: this.state.processes[2] })}><ProcessComponent process={this.state.processes[2]} /></div></div>}
                {this.state.selectedProcess && <div className='formContainer' ><SelectedProcess selectedProcess={this.state.selectedProcess}/></div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(socketConnect(ListOfProcesses));
