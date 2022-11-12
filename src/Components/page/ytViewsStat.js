import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Col, Row } from 'react-bootstrap';
import ytLogo from "../../images/yt.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import "../common/style.css";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        background: "#f7f7f7",
        padding: "50px 30px",
        textAlign: "center",
        maxWidth: "100% !important",
        "& b": {
            color: "#f62d51"
        },
        "& img": {
            borderRadius: "50%",
            border: "5px solid #f62d51"
        },
    },
    card: {
        boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%) !important"
    }
}));

export default function YTVideoStat() {
    const classes = useStyles();
    const API_KEY = "AIzaSyAQcUVoCwdg54NPvcjL0w9Lo5WA_BjmWyw";
    const { id } = useParams();
    console.log("id", id);
    const [videoInfo, setVideoInfo] = useState({});
    const [accurateStat, setAccurateStat] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getChannelStat = async (videoId) => {
        setIsLoading(true);
        await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`).then(res => {
            if (res.status === 200) {
                setVideoInfo(res.data.items[0]);
                setIsLoading(false);
            }
        });
    }

    const getCurrentSubscriber = async (videoId) => {
        await axios.get(`https://api.socialcounts.org/youtube-video-live-view-count/${videoId}`).then(res => {
            if (res.status === 200) {
                setAccurateStat(res.data);
            }
        });
    }


    useEffect(() => {
        getChannelStat(id);
        getCurrentSubscriber(id);
        const interval = setInterval(() => {
            getCurrentSubscriber(id);
        }, 4000);

        return () => clearInterval(interval);
    }, [id]);

    console.log("videoInfo", videoInfo)

    return (
        <Box>
            <Container className={classes.mainDiv}>
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                {isLoading ? (
                                    <div>Loading ...</div>
                                ) : (<>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <img src={videoInfo?.snippet?.thumbnails?.high?.url} width="200px" height="200px" style={{ marginBottom: "20px" }} alt="youtube-logo" />
                                            <h1>{videoInfo?.snippet?.title}</h1>
                                            <Box id="sub"><Odometer value={accurateStat?.est_sub} /></Box>
                                        </CardContent>
                                    </Card>
                                    <Row style={{marginTop: "10px"}}>
                                        {accurateStat?.table?.map((item, i) => (
                                            <Col md={6} key={i}>
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <b>{item.name}</b>
                                                        <Odometer value={item?.count} />
                                                    </CardContent>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </>)}
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </Box >
    )
}
