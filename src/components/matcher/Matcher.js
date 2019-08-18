import React, { PureComponent } from 'react';
import Webcam from 'react-webcam';
import Container from "@material-ui/core/Container";
import { get } from 'lodash';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';
import { JSON_PROFILE } from '../../descriptors/profile';

import './index.scss';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class Matcher extends PureComponent {
    constructor(props) {
        super(props);
        this.webcam = React.createRef();
    }

    componentWillMount() {
        loadModels();
        this.setInputDevice();
        this.matcher();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    matcher = async () => {
        const faceMatcher = await createMatcher(JSON_PROFILE);
        this.setState({ faceMatcher });
    };

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
            let inputDevice = await devices.filter(
                device => device.kind === 'videoinput'
            );
            if (inputDevice.length < 2) {
                await this.setState({
                    facingMode: 'user'
                });
            } else {
                await this.setState({
                    facingMode: { exact: 'environment' }
                });
            }
            this.startCapture();
        });
    };

    startCapture = () => {
        this.interval = setInterval(() => {
            this.capture();
        }, 1500);
    };

    capture = async () => {
        const me = this;
        if (!!this.webcam.current) {
            await getFullFaceDescription(
                this.webcam.current.getScreenshot(),
                inputSize
            ).then(async (fullDesc) => {
                const descriptors = fullDesc.map(fd => fd.descriptor);
                let match = await descriptors.map(descriptor =>
                    this.state.faceMatcher.findBestMatch(descriptor)
                );
                me.props.onMatch && me.props.onMatch(get(match, '0._label', ''));
            });
        }
    };

    render() {
        const facingMode = 'user';
        const videoConstraints = {
            width: WIDTH,
            height: HEIGHT,
            facingMode: facingMode
        };
        return (
            <Container className="camera-container">
                <Webcam
                    audio={false}
                    width={WIDTH}
                    height={HEIGHT}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </Container>
        )
    }
};

export default Matcher;