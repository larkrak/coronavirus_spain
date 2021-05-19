import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import {prettyPrintStat} from "../../utilities/util"
import "./Status.css"


function Status({title, active, isRed, cases, total , ...props}) {
    return (
        <Card
          onClick={props.onClick}
          className={`infoBox ${active && "infoBox--selected"} ${
            isRed && "infoBox--red"
          }`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
              {prettyPrintStat(cases)}
            </h2>
            <Typography className="infoBox__total" color="textSecondary">
              {prettyPrintStat(total)} Total
            </Typography>
          </CardContent>
        </Card>
      );
}

export default Status
