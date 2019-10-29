import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import './WSComp.scss';

export const WSComp = () => {

    const containerRef: any = React.useRef();
    const containerSpecRef: any = React.useRef();
    const containerTimelineRef: any = React.useRef();
    const wsRef: any = React.useRef();
    const sliderRef: any = React.useRef();

    React.useEffect(() => {
        wsRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#C4FC95',
            progressColor: '#89D46E',
            plugins: [
                Spectrogram.create({
                    wavesurfer: wsRef.current,
                    container: containerSpecRef.current,
                    labels: true
                }),
                Timeline.create({
                    container: containerTimelineRef.current
                })
            ]
        });

        wsRef.current.on('ready', function () {
            wsRef.current.play();
        });

        wsRef.current.load('/data/Anchicaya_LaLocaTrocha_2019.06.22_07.50.35_1_mitad.mp3');
    }, []);

    const handleColorChange = () => {
        wsRef.current.setWaveColor('#95BDFF');
        wsRef.current.setProgressColor('#2B72E9');
    }

    const handlePlayPause = () => {
        wsRef.current.playPause();
    }

    const handleSliderChange = () => {
        sliderRef.current.oninput = function () {
            var zoomLevel = Number(sliderRef.current.value);
            wsRef.current.zoom(zoomLevel);
        };
    }

    return (<div className="container">
        <div className="div-btns">
            <button id="color-change" onClick={handleColorChange}>Cambiar color de onda</button>
            <button id="play-pause" onClick={handlePlayPause}>Reproducir/Pausar</button>
            <div id="zoom-bar">
                <img src="./assets/zoom-in-icon.png" width="30"/>
                <input id="slider" type="range" min="1" max="200" onChange={handleSliderChange} ref={sliderRef} />
                <img src="./assets/zoom-out-icon.png" width="30"/>
            </div>
        </div>

        <div id="waveform" ref={containerRef} />
        <div id="timeline" ref={containerTimelineRef} />
        <div id="wave-spectrogram" ref={containerSpecRef} />
    </div>);
}