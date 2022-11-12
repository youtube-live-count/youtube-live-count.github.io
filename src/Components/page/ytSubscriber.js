import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Col, Row } from 'react-bootstrap';
import ytLogo from "../../images/yt.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import Skeleton from '@material-ui/lab/Skeleton';
import { LinearScale } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        background: "#f7f7f7",
        padding: "80px 30px",
        textAlign: "center",
        maxWidth: "100% !important",
        "& b": {
            color: "#f62d51"
        }
    },
    searchBox: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        marginTop: "10px",
        marginBottom: "20px",
        boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%) !important"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    channelCards: {
        padding: "10px 20px",
        border: "2px solid #999",
        borderRadius: "10px",
        cursor: "pointer",
        textAlign: "left",
        transition: "0.3s all",
        background: "#fff",
        "& img": {
            borderRadius: "50%"
        },
        "& b": {
            fontSize: "12px"
        },
        "& h4": {
            margin: "0"
        },
        "&:hover": {
            transform: "scale(1.02)"
        }
    }
}));

function validateYouTubeUrl(urlToParse){
    if (urlToParse) {
        var regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (urlToParse.match(regExp)) {
            return true;
        }
    }
    return false;
}

export default function YTSubscriber() {
    const classes = useStyles();
    const API_KEY = "AIzaSyAQcUVoCwdg54NPvcjL0w9Lo5WA_BjmWyw";

    const [channelUrl, setChannelUrl] = useState("");
    const [channelList, setChannelList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChannelUrl = (e) => {
        setChannelUrl(e.target.value);
    }

    const searchChannel = async () => {
        setIsLoading(true);
        let username;
        if (validateYouTubeUrl(channelUrl)) {
            const splittedUrl = channelUrl.split("/");
            if (splittedUrl[4] !== undefined) {
                username = splittedUrl[4];
            }
        } else {
            username = channelUrl;
        }
        await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${username}&key=${API_KEY}`).then(res => {
            if (res.status === 200) {
                setChannelList(res.data.items);
                setTimeout(() => setIsLoading(false), 1000);
            }
        });
    }
    return (
        <Box>
            <Container className={classes.mainDiv}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <Box>
                                    <img src={ytLogo} width="80px" style={{ marginBottom: "20px" }} alt="youtube-logo" />
                                    <h1>YouTube Live Subscriber Counter</h1>
                                    <Paper component="div" className={classes.searchBox}>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="Channel URL / Username"
                                            inputProps={{ 'aria-label': 'Channel URL / Username' }}
                                            value={channelUrl}
                                            onChange={(e) => handleChannelUrl(e)}
                                            onKeyPress={(e) => e.keyCode === 13 ? searchChannel() : null}
                                        />
                                        <IconButton type="submit" className={classes.iconButton} onClick={() => searchChannel()} aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                    {!isLoading && channelList.length > 0 && (
                                        <Box>
                                            {channelList.map((item, index) => (<Link to={`/youtube-live-subscriber-counter/${item?.snippet?.channelId}`} style={{
                                                textDecoration: "unset",
                                                color: "unset"
                                            }}>
                                                <Box className={classes.channelCards} key={index}>
                                                    <Row style={{ alignItems: "center" }}>
                                                        <Col md={2}>
                                                            <img src={item?.snippet?.thumbnails?.high?.url} width={80} height={80} />
                                                        </Col>
                                                        <Col md={10}>
                                                            <h4>{item?.snippet?.title}</h4>
                                                            <b>{item?.snippet?.channelId}</b>
                                                        </Col>
                                                    </Row>
                                                </Box></Link>))}
                                        </Box>
                                    )}
                                    {isLoading && channelList.length === 0 && (
                                        <Box>
                                            {[...Array(5)].map((i, v) => (<Box className={classes.channelCards}>
                                                <Row style={{ alignItems: "center" }}>
                                                    <Col md={2}>
                                                        <Skeleton variant="circle" width={80} height={80} animation="wave" />
                                                    </Col>
                                                    <Col md={10}>
                                                        <Skeleton variant="text" width={200} height={20} animation="wave" style={{ borderRadius: "10px", marginBottom: "10px", transform: "unset", backgroundColor: "#999" }} />
                                                        <Skeleton variant="text" width={100} height={10} animation="wave" style={{ borderRadius: "6px", transform: "unset" }} />
                                                    </Col>
                                                </Row>
                                            </Box>))}
                                        </Box>
                                    )}
                                </Box>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}
