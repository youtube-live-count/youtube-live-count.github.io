import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Container from "react-bootstrap/Container";
import logo from "../../images/livecount-logo.gif"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginBottom: "65px"
    },
    menuButton: {
        marginRight: "10px",
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    logo: {
        width: "180px",
        display: "flex",
        [theme.breakpoints.up("md")]: {
            width: "260px"
        },
    },
    title: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    links: {
        color: "#3d2514",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "800",
        fontFamily: "'Poppins', sans-serif",
        paddingLeft: theme.spacing(7),
        textTransform: "uppercase",
        letterSpacing: "2px",
        [theme.breakpoints.down("md")]: {
            fontSize: "11px",
        },
    },
    mobileLinks: {
        color: "#3d2514",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "800",
        fontFamily: "'Poppins', sans-serif",
        "& .MuiListItemText-primary": {
            fontSize: "18px",
            textTransform: "uppercase",
            color: "#3d2514",
            fontWeight: "600",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
            marginLeft: "auto",
            marginBottom: "15px",
            flexDirection: "column",
            textAlign: "right",
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    toolbar: {
        minHeight: "auto",
        [theme.breakpoints.up("md")]: {
            minHeight: "20px",
            alignItems: "end",
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                style={{ background: "#f62d51", color: "#fff", boxShadow: "none" }}
            >
                <Container style={{ maxWidth: "100%" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            onClick={handleDrawerOpen}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src={logo} alt="Live Count logo" height="50px" />
                        <div className={classes.sectionDesktop}>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtr" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                </List>
            </Drawer>
        </div>
    );
}
