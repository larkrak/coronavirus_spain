import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import {prettyPrintStat} from "../../utilities/util"
import "./Status.css"
/**
 * This component displays information of cases and when it is click it trigers a function given by its parent component.
 * @param {*} title 
 * @param {*} active
 * @param {*} isRed
 * @param {*} cases
 * @param {*} param0 
 * @returns 
 */

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
