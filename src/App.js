import React, { useState } from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const App = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);

	return (
		<Container maxWidth="sm">
			<Box sx={{ paddingTop: 10, flexGrow: 1 }}>
				<Grid
					container
					//		spacing={{ xs: 2, md: 3 }}
					//		columns={{ xs: 4, sm: 8, md: 12 }}
				>
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
							onClick={() => setBreakLength(breakLength - 1)}
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
							onClick={() => setBreakLength(breakLength + 1)}
							id="break-increment"
						>
							<ArrowUpwardIcon />
						</Item>
					</Grid>
					<Grid paddingLeft={1} item xs={2}>
						<Item
							style={{ cursor: 'pointer' }}
							onClick={() => setSessionLength(sessionLength - 1)}
							id="session-decrement"
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
							style={{ cursor: 'pointer' }}
							onClick={() => setSessionLength(sessionLength + 1)}
							id="session-increment"
						>
							<ArrowUpwardIcon />
						</Item>
					</Grid>
					<Grid paddingTop={3} item xs={12}>
						<Item>
							<Typography id="timer-label" align="center" variant="h6">
								Session
							</Typography>
							<Typography id="time-left" align="center" variant="h2">
								25:00
							</Typography>
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingRight={1} item xs={6}>
						<Item
							id="start_stop"
							style={{ cursor: 'pointer' }}
							onClick={() => console.log('start - stop')}
						>
							<PlayCircleFilledWhiteIcon />
							<PauseIcon />
						</Item>
					</Grid>
					<Grid paddingTop={4} paddingLeft={1} item xs={6}>
						<Item
							id="reset"
							style={{ cursor: 'pointer' }}
							onClick={() => console.log('reset')}
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
