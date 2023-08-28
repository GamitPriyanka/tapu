import { useEffect, useRef, useState } from 'react'
import './App.sass';
import Wishes from './Wishes'
import ReactPlayer from 'react-player';
import birthdaySong from './assets/music/birthday-song.mp3'
import { Box, CircularProgress, Typography } from '@mui/material';

function App() {
    const [appState, setAppState] = useState({
        loading: false,
        message: '',
        audioPlay: false,
        progress: 10
    });
    const [progress, setProgress] = useState(10);
    const tick: any = useRef();

    useEffect(() => {
        if (appState.loading) {
            tick.current = setInterval(() => { // <-- set tick ref current value
                setProgress((prevState) => (prevState >= 100 ? 0 : prevState + 10));
            }, 1000);
        } else {
            console.log("Else Tick", tick)
            clearInterval(tick.current); // <-- access tick ref current value
        }
        console.log("Tick", tick);
        return () => clearInterval(tick.current)
    }, [appState.loading]);

    useEffect(() => {
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * Wishes.length);
            setAppState((prevState: any) => ({ ...prevState, message: Wishes[index] }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!appState.loading) {
            setAppState((prevState: any) => ({ ...prevState, loading: true }))
        }
        if (progress === 100) {
            setAppState((prevState: any) => ({ ...prevState, loading: false, audioPlay: true }))
        }
    }, [progress]);
    return (
        <>
            {appState.loading ? (
                <>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" value={progress} />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.primary"
                            >{`${Math.round(progress)}%`}</Typography>
                        </Box>
                    </Box>

                </>
            ) :
                <div>
                    <div className="card">
                        <div className="back"></div>
                        <div className="front">
                            <div className="imgset">
                                <img width="100%" src="https://1.bp.blogspot.com/-Mgj9-rbs65E/XfMoPSD5gtI/AAAAAAAAURk/NBokE2gSS2cTSJ2em5lZ5hJDuTtRN7UVwCLcBGAsYHQ/s1600/2713997.png" />
                            </div>
                        </div>
                        <div className="text-container">
                            <p id="head">Happy Birthday!</p>
                            <h4>પ્રિયંકા(ફોઈ) તરફથી</h4>
                            <div
                                className="birthday-wishes-container"
                                dangerouslySetInnerHTML={{ __html: appState.message }}
                            />
                        </div>
                    </div>
                    <ReactPlayer
                        url={birthdaySong}
                        playing={appState.audioPlay}
                        loop={true}
                        width={0}
                        height={0}
                    />

                </div>}
        </>
    )
}

export default App
