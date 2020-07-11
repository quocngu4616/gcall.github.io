import React, { Component } from 'react'
import classnames from 'classnames'
export default class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localHasVideo: false,
            remoteHasVideo: false,
            localHold: false,
            remoteHold: false,
            canHold: false,
            ringing: false,
            state: null
        };
        // Mounted flag
        // this._mounted = false;
        // Local cloned stream
        this._localClonedStream = null;

    }
    render() {
        const session = this.props.session
        // console.log(session);
        const state = this.state;
        const props = this.props;
        // let noRemoteVideo;
        // // var soundPlayer = document.getElementById('#audio');

        // if (props.session.isInProgress() && !state.ringing)
        //     noRemoteVideo = <div className="message">connecting ...</div>;
        // else if (state.ringing)
        //     noRemoteVideo = <div className="message">ringing ...</div>;
        // else if (state.localHold && state.remoteHold)
        //     noRemoteVideo = <div className="message">both hold</div>;
        // else if (state.localHold)
        //     noRemoteVideo = <div className="message">local hold</div>;
        // else if (state.remoteHold)
        //     noRemoteVideo = <div className="message">remote hold</div>;
        // else if (!state.remoteHasVideo)
        //     noRemoteVideo = <div className="message">no remote video</div>;
        // setTimeout(() => {
        //     if (session) {
        //         var audio = document.querySelector("#myaudio");
        //         console.log(audio)
        //         audio.volume = 1;
        //     }
        // }, 0)

        return (
            <div>

                <video
                    ref="localVideo"
                    className={classnames("local-video", {
                        hidden: !state.localHasVideo,
                    })}
                    autoPlay
                    muted
                />

                <video
                    ref="remoteVideo"
                    className={classnames("remote-video", { hidden: noRemoteVideo })}
                    autoPlay
                />
            </div>
        )
    }
    componentDidMount() {
        const localVideo = this.refs.localVideo;
        // localVideo.volume = 1;
        const session = this.props.session;
        const peerconnection = session.connection;
        const localStream = peerconnection.getLocalStreams()[0];
        const remoteStream = peerconnection.getRemoteStreams()[0];
        if (localStream) {
            // Clone local stream
            this._localClonedStream = localStream.clone();

            // Display local stream
            localVideo.srcObject = this._localClonedStream;

            setTimeout(() => {

                if (localStream.getVideoTracks()[0])
                    this.setState({ localHasVideo: true });
            }, 1000);
        }
        if (remoteStream) {

            //     this._handleRemoteStream(remoteStream);
        }
        if (session.isEstablished()) {
            setTimeout(() => {
                this.setState({ canHold: true });
            });
        }
        session.on('connecting', (data) => {
            this.setState({
                // state: "connecting"
            }, () => {

            })
        })
        session.on("progress", (data) => {
            if (session.direction === "outgoing") {
                this.setState({
                    ringing: true, state: 'process'
                }, () => {
                    this.props.getState(this.state.state)
                });
            }
        });
        session.on("accepted", (data) => {
            // if (session.direction === "outgoing") { }
            // let { resonse } = data


            this.setState({
                canHold: true, ringing: false, state: 'accepted'
            }, () => {
                this.props.getState(this.state.state)
            });
        });
        session.on("failed", (data) => {

            if (session.direction === "outgoing") this.setState({ ringing: false });
        });

        session.on("ended", (data) => {
            if (session.direction === "outgoing") {
                this.setState({
                    ringing: false,
                    // state: 'end'
                }, () => {
                    // this.props.getState(this.state.state)
                });
            }
        });
    }
    // _handleRemoteStream(stream) {

    //     const remoteVideo = this.refs.remoteVideo;

    //     // Display remote stream
    //     remoteVideo.srcObject = stream;

    //     this._checkRemoteVideo(stream);

    //     stream.addEventListener("addtrack", (event) => {
    //         const track = event.track;

    //         if (remoteVideo.srcObject !== stream) return;


    //         // Refresh remote video
    //         remoteVideo.srcObject = stream;

    //         this._checkRemoteVideo(stream);
    //     });
    // }
    // _checkRemoteVideo(stream) {
    //     const videoTrack = stream.getVideoTracks()[0];
    //     this.setState({ remoteHasVideo: Boolean(videoTrack) });
    // }
}
