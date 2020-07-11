import React, { Component } from 'react'
import del from '../img/dialpad-del.png'
import call from '../img/call.svg'
export default class Call extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChangeForm: false,
            phoneNumber: ''
        }
    }
    handleOpenForm = () => {
        // return (
        this.setState({
            isChangeForm: true
        }});
    // )
}
handleCloseForm = () => {
    // return (
    this.setState({
        isChangeForm: false
    });
}
onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
onClick = (e) => {
    e.preventDefault();
    this.props.handleCall(this.state.phoneNumber)
    // console.log(this.state.phoneNumber);

}
clickGetNumber = (num) => {
    // let phoneArr = [...this.state.phoneNumber];
    // console.log('phoneArr', phoneArr);
    let phoneArr = this.state.phoneNumber
    let stringNum = num
    console.log('typeOfStringNum', typeof stringNum);
    this.setState({
        phoneNumber: phoneArr.concat(stringNum)
    })
}
clicRemoveNumber = () => {
    let phoneArr = this.state.phoneNumber
    let result = phoneArr.substring(0, phoneArr.length - 1);
    this.setState({
        phoneNumber: result
    })
}
render() {
    return (
        <>
            <button className="buttonWrap"
                style={{ visibility: this.state.isChangeForm ? 'hidden' : 'visible' }}
                onClick={this.handleOpenForm}
            >
                <img src={call} />
                {/* <audio></audio>
        <audio></audio> */}
            </button>
            <div className="panelCall"
                style={{ visibility: this.state.isChangeForm ? 'visible' : 'hidden' }}
            >
                <div className="closePanel">
                    <div className="line" onClick={this.handleCloseForm}></div>
                </div>
                {/* {this.props.session.isInProgress() ? <p>connecting</p> : null} */}
                <div className="inputControl">
                    <input type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.onChange}
                    />
                    <button className="del" onClick={() => this.clicRemoveNumber()}>
                        <img src={del} />
                    </button>
                </div>
                <div className="keyBoard">
                    <div className="row">
                        <button onClick={() => { this.clickGetNumber('1') }}></button> {/* 1 */}
                        <button onClick={() => { this.clickGetNumber('2') }}></button>
                        <button onClick={() => { this.clickGetNumber('3') }}></button>
                    </div>
                    <div className="row">
                        <button onClick={() => { this.clickGetNumber('4') }}></button>
                        <button onClick={() => { this.clickGetNumber('5') }}></button>
                        <button onClick={() => { this.clickGetNumber('6') }}></button>
                    </div>
                    <div className="row">
                        <button onClick={() => { this.clickGetNumber('7') }}></button>
                        <button onClick={() => { this.clickGetNumber('8') }}></button>
                        <button onClick={() => { this.clickGetNumber('9') }}></button>
                    </div>
                    <div className="row">
                        <button onClick={() => { this.clickGetNumber('0') }}></button>
                    </div>
                </div>
                <button className="callState" onClick={this.onClick}></button>
            </div>
        </>
    )
}
}
