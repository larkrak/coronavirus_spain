import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'


const Landing = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            background: "linear-gradient(black, white)",
            backgroundColor: "cyan",
            height:"100vh",
            boxShadow: "2px 2px 5px 2px black",
            display: "flex",
            justifyContent:"center",
            alignItems: "center"
        },
        transform:{
            textDecoration: "none",
            fontSize:"2rem",
            color:"white",
        },
        backgroundSpain:{
            backgroundImage: "url("+props.background+")",
            height:"100vh",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            backdropFilter: "blur(10px)",
            textShadow:"text-shadow: 0 0 2px #fff",
            background: "linear-gradient(to bottom, red 0%, 100%)"
        },
        contrastText:{
            textShadow: "-1px -1px 2px black, 1px -1px 0 black, -1px 1px 2px #000, 1px 1px 2px black"
        },
        
      }));
      
    const classes = useStyles();

    const [hovered, setHovered] = useState(false);

    const toggleHover = () => setHovered(!hovered);


    //E <br />S <br />P <br />A <br />Ñ <br />A 

    return (
 
        <Grid item xs={12} md={12} sm={12} lg={hovered ? 6 : 3} 
            className={`${classes.root} ${classes.backgroundSpain}` }  
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{transition:"0.3s ease all"}}
        >
            <a className={`${classes.transform} ${classes.contrastText}`} href={props.router}> {props.name} </a>        
        </Grid>
    )
}


export default Landing