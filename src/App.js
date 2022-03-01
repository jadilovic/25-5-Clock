import React, { useState, useEffect, useRef } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import beep from './sound/beep.mp3';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const App = () => {
	const [breakLength, setBreakLength] = useState(0);
	const [sessionLength, setSessionLength] = useState(0);
	const [timeDisplay, setTimeDisplay] = useState(0);
	const [intervalId, setIntervalId] = useState(0);
	const [runningTimer, setRunningTimer] = useState(false);
	let countSession = useRef(0);
	let countBreak = useRef(0);
	const isSession = useRef(true);

	const toChangeCount = () => {
		isSession.current = !isSession.current;
	};

	const handleStartStop = (stopInterval) => {
		console.log('test', stopInterval);
		if (stopInterval === true) {
			clearInterval(intervalId);
			setIntervalId(0);
			setRunningTimer(false);
			return;
		}
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(0);
			setRunningTimer(false);
			return;
		}

		const newIntervalId = setInterval(() => {
			console.log('change count : ', isSession.current);
			setRunningTimer(true);
			if (countSession.current >= 0) {
				setTimeDisplay((prevCount) => prevCount - 1);
				countSession.current--;
				if (countSession.current === 0) {
					playAudio();
				}
				if (countSession.current < 0) {
					toChangeCount();
					countBreak.current = breakLength * 60;
					setTimeDisplay((prevCount) => (prevCount = countBreak.current));
				}
			} else {
				setTimeDisplay((prevCount) => prevCount - 1);
				countBreak.current--;
				if (countBreak.current === 0) {
					playAudio();
				}
				if (countBreak.current < 0) {
					toChangeCount();
					countSession.current = sessionLength * 60;
					setTimeDisplay((prevCount) => (prevCount = countSession.current));
				}
			}
		}, 1000);
		setIntervalId(newIntervalId);
	};

	const getMinutes = () => {
		const num = Math.floor(timeDisplay / 60);
		return num.toString().padStart(2, '0');
	};

	const getSeconds = () => {
		const num = timeDisplay % 60;
		return num.toString().padStart(2, '0');
	};

	useEffect(() => {
		setSessionLength(25);
		setBreakLength(5);
	}, []);

	useEffect(() => {
		setTimeDisplay(sessionLength * 60);
		countSession.current = sessionLength * 60;
		countBreak.current = breakLength * 60;
	}, [sessionLength, breakLength]);

	const handleSessionLength = (eventId) => {
		if (runningTimer) {
			return;
		}
		if (eventId === 'session_increment') {
			if (sessionLength >= 60) {
				return;
			}
			setSessionLength(sessionLength + 1);
		} else {
			if (sessionLength <= 1) {
				return;
			}
			setSessionLength(sessionLength - 1);
		}
	};

	const handleBreakLength = (eventId) => {
		if (runningTimer) {
			return;
		}
		if (eventId === 'break_increment') {
			if (breakLength >= 60) {
				return;
			}
			setBreakLength(breakLength + 1);
		} else {
			if (breakLength <= 1) {
				return;
			}
			setBreakLength(breakLength - 1);
		}
	};

	const handleReset = () => {
		stopAudio();
		handleStartStop(true);
		setBreakLength(5);
		setSessionLength(25);
		isSession.current = true;

		setTimeDisplay(sessionLength * 60);
		countSession.current = sessionLength * 60;
		countBreak.current = breakLength * 60;
	};

	const playAudio = () => {
		var audio = document.getElementById('beep');
		console.log(audio);
		audio.play();
	};

	const stopAudio = () => {
		var audio = document.getElementById('beep');
		audio.pause();
		audio.currentTime = 0.0;
	};

	console.log('session : ', timeDisplay);
	console.log('change count current : ', isSession.current);

	return (
		<Container maxWidth="sm">
			<Box sx={{ paddingTop: 10, flexGrow: 1 }}>
				<Grid container>
					<Grid item xs={12}>
						<Item>
							<Typography align="center" variant="h3">
								25 + 5 Clock
							</Typography>
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingRight={1} item xs={6}>
						<Item>
							<Typography id="break-label" align="center" variant="h6">
								Break Length
							</Typography>
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingLeft={1} item xs={6}>
						<Item>
							<Typography id="session-label" align="center" variant="h6">
								Session Length
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={2}>
						<Item
							style={{ cursor: 'pointer' }}
							onClick={() => handleBreakLength('break_decrement')}
							id="break-decrement"
						>
							<ArrowDownwardIcon />
						</Item>
					</Grid>
					<Grid item xs={2}>
						<Item>
							<Typography id="break-length" align="center" variant="h6">
								{breakLength}
							</Typography>
						</Item>
					</Grid>
					<Grid paddingRight={1} item xs={2}>
						<Item
							style={{ cursor: 'pointer' }}
							onClick={() => handleBreakLength('break_increment')}
							id="break-increment"
						>
							<ArrowUpwardIcon />
						</Item>
					</Grid>
					<Grid paddingLeft={1} item xs={2}>
						<Item
							id="session-decrement"
							style={{ cursor: 'pointer' }}
							onClick={() => handleSessionLength('session_decrement')}
						>
							<ArrowDownwardIcon />
						</Item>
					</Grid>
					<Grid item xs={2}>
						<Item>
							<Typography id="session-length" align="center" variant="h6">
								{sessionLength}
							</Typography>
						</Item>
					</Grid>
					<Grid item xs={2}>
						<Item
							id="session-increment"
							style={{ cursor: 'pointer' }}
							onClick={() => handleSessionLength('session_increment')}
						>
							<ArrowUpwardIcon />
						</Item>
					</Grid>
					<Grid paddingTop={3} item xs={12}>
						<Item>
							<Typography id="timer-label" align="center" variant="h6">
								{isSession.current ? 'Session' : 'Break'}
							</Typography>
							<Typography id="time-left" align="center" variant="h2">
								{`${getMinutes()}:${getSeconds()}`}
								<audio id="beep" src={beep} />
							</Typography>
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingRight={1} item xs={6}>
						<Item
							id="start_stop"
							style={{ cursor: 'pointer' }}
							onClick={handleStartStop}
						>
							<PlayCircleFilledWhiteIcon />
							<PauseIcon />
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingLeft={1} item xs={6}>
						<Item
							id="reset"
							style={{ cursor: 'pointer' }}
							onClick={() => handleReset()}
						>
							<RestartAltIcon />
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default App;
