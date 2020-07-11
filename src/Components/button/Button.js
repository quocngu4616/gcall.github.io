import React, { Component } from 'react';
import './Button.css'
import Call from '../call/Call';
import Calling from '../calling/Calling';
import JsSIP from 'jssip'
import Session from '../Session/Session';

// import Call from '../call/Call';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            state: null,
            phone: null
        }
        this.ua = null
        // this.soundPlayer = null
    }
    componentDidMount() {
        var configuration = {
            sockets: [new JsSIP.WebSocketInterface('wss://sbc03.tel4vn.com:7444')],
            uri: '101@2-test1.gcalls.vn:50061',
            password: 'test101',
            display_name: '1008',
            authorization_user: null,
            register: true,
            register_expires: null,
            registrar_server: null,
            no_answer_timeout: null,
            session_timers: false,
            use_preloaded_route: null,
            connection_recovery_min_interval: null,
            connection_recovery_max_interval: null,
            hack_via_tcp: null,
            hack_via_ws: null,
            hack_ip_in_contact: null, user_agent: 'extension_content'
        }
        // var localCanRenegotiateRTC = () => {
        //   return JsSIP.rtcninja.canRenegotiate;
        // };

        this.soundPlayer = document.createElement("audio");
        var localStream, remoteStream;
        var selfView = document.querySelector('#my-video');//lấy ra phần tử #my-video
        var remoteView = document.querySelector('#peer-video');
        // console.log(selfView);
        // console.log(remoteView);
        // soundPlayer.volume = 1;

        this.ua = new JsSIP.UA(configuration);
        this.ua.on('newRTCSession', (data) => {   //sử lý cuộc gọi đến
            console.log('newRTCSession');

            if (data.originator === 'local')
                return;
            const session = data.session
            newCall(session)
        })
        // //create a call
        function newCall(session) {
            session.on('failed', () => {
                // audioPlayer.stop('ringing');
                this.setState(
                    {
                        session: null,
                        // incomingSession : null
                    });
            });

            session.on('ended', () => {
                this.setState(
                    {
                        session: null,
                        // incomingSession : null
                    });
            });

            session.on('accepted', () => {

                this.setState(
                    {
                        session
                        // incomingSession : null
                    });
            });

        }
        this.ua.on('connected', (e) => {
            console.log('connected');
        });
        this.ua.on('disconnected', (e) => {
            console.log('disconnected');
        });
        this.ua.on('registered', (e) => {
            console.log('registered');
        });
        this.ua.on('unregistered', (e) => {
            console.log('unregistered');
        });
        this.ua.on('registrationFailed', (e) => {
            console.log('registrationFailed');
        });

        this.ua.start();
    }
    handleCall = (phoneNum) => {
        if (phoneNum.length === 0) {
            return
        }
        const session = this.ua.call(phoneNum,
            {
                // pcConfig: null,	  obj đại diện co RTCPeerConnection 
                pcConfig: {
                    iceServers: [
                        {
                            'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
                        }
                    ]
                },
                mediaConstraints: { //obj cho biết phiên có ý định sử dụng audio hay video hay ko
                    audio: true,
                    video: false
                },
                rtcOfferConstraints: {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 0
                }
            })
        session.on('connecting', () => {
            this.setState({
                session,
                state: 'connecting',
                phone: phoneNum
            });
        });

        session.on('progress', () => {
            // console.log('progress');

        });

        session.on('failed', (data) => {
            this.setState({
                session: null
            }, () => {
                // console.log("failed");
            });
        });

        session.on('ended', () => {
            this.setState({
                session: null,
                state: 'end'
            }, () => {
                // console.log('ended');

            });
        });

        session.on('accepted', () => {
            this.soundPlayer.play()
        }, () => {
            // console.log('accepted');
        });
    }

    getState = (state) => {

        this.setState({
            state: state
        }, () => {
            // console.log("trạng thái: ", state);
        })
    }
    render() {
        return (
            <div className="callContainer">
                {/* panel call */}
                <Call handleCall={this.handleCall} />
                <div className="content">
                    {this.state.session ? <Session session={this.state.session} getState={this.getState} /> : null}
                </div>
                {/* <Session session={this.state.session} /> */}
                {/* panel calling */}
                {this.state.state !== null ?
                    <Calling state={this.state.state}
                        phone={this.state.phone}
                    // handleCancelCall={this.handleCancelCall}
                    />
                    : ''}
            </div>
        );
    }
}

export default Button;