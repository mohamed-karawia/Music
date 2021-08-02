import React from 'react'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const BeatsPlayer = (props) => {
    return (
        <div>
            <ReactJkMusicPlayer
                showMediaSession
                glassBg
                showReload={false}
                showMiniModeCover={true}
                showPlayMode={false}
                audioLists={props.playList}
                theme="dark"
                onDestroyed={props.clearPlayList}
                onAudioListsChange={props.changePlayList}
                showDownload={props.isAuth}
                customDownloader={props.customDownloader}
                defaultPosition={{ top: '10%', right: 0 }}
                onAudioPause={props.onAudioPause}
                showPlay={false}/>
        </div>
    )
}

export default BeatsPlayer
