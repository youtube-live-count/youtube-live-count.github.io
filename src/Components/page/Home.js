import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from '@material-ui/core';
import { Col, Row } from 'react-bootstrap';
import ytLogo from "../../images/yt.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";
import ParticlesBg from "particles-bg";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        background: "transparent",
        padding: "80px 30px",
        textAlign: "center",
        maxWidth: "100%",
        "& b": {
            color: "#f62d51"
        }
    },
    tools: {
        background: "#f7f7f7",
        padding: "80px 30px",
        textAlign: "center",
        maxWidth: "100%",
        "& h4": {
            margin: "0"
        },
        "& .MuiCard-root": {
            boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%) !important",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.5s all"
        },
        "& .MuiCard-root:hover": {
            transform: "scale(1.05)",
            transition: "0.5s all"
        },
        "& a": {
            textDecoration: "none"
        }
    }
}));
export default function Home() {
    const classes = useStyles();

    return (
        <Box>
            <Container className={classes.mainDiv}>
                <Row>
                    <Col md={12}>
                        <Box>
                            <img src={ytLogo} width="80px" style={{ marginBottom: "20px" }} alt="youtube-logo" />
                            <h1>Live Counts for Youtube.</h1>
                            <p>If you want to see the live statistics of <b>Youtube Channel / Youtube Video</b>. You are at right Place.</p>
                        </Box>
                        <ParticlesBg type="cobweb" bg={{
                            position: "absolute",
                            zIndex: -1,
                            width: "100%",
                            left: 0,
                            top: 0,
                            height: 415
                        }} num={30} />
                    </Col>
                </Row>
            </Container>
            <Container className={classes.tools}>
                <Row>
                    <Col md={6}>
                        <Link to="/youtube-live-subscriber-counter"><Card elevation={5}>
                            <CardContent>
                                <img src={ytLogo} width="40px" style={{ marginBottom: "20px" }} alt="youtube-logo" />
                                <h4>Youtube Live Subscriber Count</h4>
                            </CardContent>
                        </Card></Link>
                    </Col>
                    <Col md={6}>
                        <Link to="/youtube-live-views-counter"><Card elevation={5}>
                            <CardContent>
                                <img src={ytLogo} width="40px" style={{ marginBottom: "20px" }} alt="youtube-logo" />
                                <h4>Youtube Live View Count</h4>
                            </CardContent>
                        </Card></Link>
                    </Col>
                </Row>
            </Container>
        </Box>
    )
}