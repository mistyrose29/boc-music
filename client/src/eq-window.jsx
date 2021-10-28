import React, {useEffect, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';

function EqualizerWindow() {
    const [EQSettings, setEQSettings] = useState(0);

    //need to run wavesurfer after everything loaded
    useEffect(() => {
          //below will need to replace with sung's files
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#D2EDD4',
      progressColor: '#46B54D'
    });
    wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
    document.getElementById('app').addEventListener('click', () => {
      wavesurfer.on('ready', () => {
        //load audio file
        
        wavesurfer.play();
        console.log('Success');
  
    
      })
      console.log('clicked');
    })


    })


    


    return (
        <div className="container">
        <h2>EQ Edit</h2>
    
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">edit audio</button>
      
  
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
          
            
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title">editing track: </h4>
              <div id='eq-editor'>
                <div id= 'player'>
                  <div id='audio'></div>
                  <canvas id='canvas'></canvas>
                </div>
          {/* here put sung's wavesurfer audio waveform and player. then we will build on top of it */}
                  <div id = 'equalizer'>
                    <div id='waveform'></div> </div>
                
              </div>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                
              </div>
              <div className="modal-body">
                <p>put the eq button here</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">save</button>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    )
}

export default EqualizerWindow;