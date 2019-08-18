import React from 'react';
import moment from 'moment';
import handTrack from './getHandTrack';

import './index.scss';

class HandTracker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.imgRef = React.createRef();
    this.runDetection = this.runDetection.bind(this);
    this.moves = [];
    this.state = {
      model: null,
      isVideo: false,
      widthMultiplicationRatio: 0,
      heightMultiplicationRatio: 0
    };
  }

  componentDidMount() {
    const modelParams = {
      flipHorizontal: true, // flip e.g for video
      maxNumBoxes: 1, // maximum number of boxes to detect
      iouThreshold: 0.5, // ioU threshold for non-max suppression
      scoreThreshold: 0.6 // confidence threshold for predictions.
    };
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const widthMultiplicationRatio = windowWidth / 640;
    const heightMultiplicationRatio = windowHeight / 480;
    if (window.handTrackModel) {
      this.setState(
        {
          model: window.handTrackModel,
          widthMultiplicationRatio,
          heightMultiplicationRatio
        },
        () => {
          this.startVideo();
        }
      );
    } else {
      handTrack.load(modelParams).then(lmodel => {
        window.handTrackModel = lmodel;
        this.setState(
          {
            model: lmodel,
            widthMultiplicationRatio,
            heightMultiplicationRatio
          },
          () => {
            this.startVideo();
          }
        );
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.detectionInterval);
  }

  startVideo() {
    var me = this;
    handTrack.startVideo(this.videoRef.current).then(function(status) {
      if (status) {
        me.setState({ isVideo: true }, () => {
          me.props.onModelsLoaded();
          me.detectionInterval = setInterval(me.runDetection, 50);
        });
      } else {
        console.log('no video started');
      }
    });
  }

  runDetection() {
    this.state.model.detect(this.videoRef.current).then(predictions => {
      if (predictions.length > 0) {
        this.prediction = moment();
        if (this.imgRef) {
          this.imgRef.current.classList.remove('hide');
          this.imgRef.current.style.left = `${predictions[0].bbox[0] *
            this.state.widthMultiplicationRatio}px`;
          this.imgRef.current.style.top = `${predictions[0].bbox[1] *
            this.state.heightMultiplicationRatio}px`;
        }
        this.moves.push(predictions[0].bbox[0]);
      } else {
        this.imgRef.current.classList.add('hide');
        if (
          this.moves.length > 0 &&
          this.prediction &&
          moment().diff(this.prediction) > 500
        ) {
          const firstValue = this.moves[0];
          const lastValue = this.moves[this.moves.length - 1];
          if (firstValue - lastValue > 100) {
            console.log('moving left');
            this.props.onHandTrack('left');
          }
          if (firstValue - lastValue < -100) {
            console.log('moving right');
            this.props.onHandTrack('right');
          }
          this.moves = [];
        }
      }
    });
  }

  render() {
    return (
      <div className="some-container">
        <img ref={this.imgRef} className="hand-icon hide" src="hand.png" />
        <div className="hand-video">
          <video
            ref={this.videoRef}
            className="videobox canvasbox"
            autoPlay="autoplay"
            id="myvideo"
          />
        </div>
      </div>
    );
  }
}

export default HandTracker;
