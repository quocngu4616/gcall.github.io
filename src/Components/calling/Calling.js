import React, { Component } from 'react'

export default class Calling extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    render() {
        return (
            <div className="panelCalling"
                style={{ visibility: this.props.state === "end" ? 'hidden' : 'visible' }}
            >
                <div className="closePanelCalling">
                    <div className="line"></div>
                </div>
                <div className="stateControl">
                    <h5>{this.props.phone}</h5>
                    <p>{this.props.state}</p>
                </div>
                {/* <div className="keyBoardCalling">
                    <div className="row">
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                    <div className="row">
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div> */}
                <button className="callingState"></button>
            </div>
        )
    }
}
