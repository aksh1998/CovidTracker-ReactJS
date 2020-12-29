import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import CountUp from "react-countup";
import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return "Loading...";
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={4} justify="center">
                {confirmed
                    ?
                    <Grid
                        item
                        component={Card}
                        xs={12}
                        md={3}
                        className={cx(styles.card, styles.infected)}>
                        <CardContent>
                            <Typography color="textPrimary" varient="h3" gutterBottom>
                                Infected
                        </Typography>
                            <Typography varient="h5">
                                <CountUp
                                    start={0}
                                    end={confirmed.value}
                                    duration={3}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {lastUpdate ? new Date(lastUpdate).toDateString() : null}
                            </Typography>
                            <Typography color="textSecondary" varient="h5">"Number of people being Infected so far"</Typography>
                        </CardContent>
                    </Grid>
                    : null}
                {recovered
                    ?
                    <Grid
                        item
                        component={Card}
                        xs={12}
                        md={3}
                        className={cx(styles.card, styles.recoverd)}>
                        <CardContent>
                            <Typography color="textPrimary" varient="h3" gutterBottom>
                                Recovered
                        </Typography>
                            <Typography varient="h5">
                                <CountUp
                                    start={0}
                                    end={recovered.value}
                                    duration={3}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {lastUpdate ? new Date(lastUpdate).toDateString() : null}
                            </Typography>
                            <Typography color="textSecondary" varient="h5">"Number of people being Recovered so far"</Typography>
                        </CardContent>
                    </Grid>
                    : null}

                {deaths
                    ?
                    <Grid
                        item
                        component={Card}
                        xs={12}
                        md={3}
                        className={cx(styles.card, styles.deaths)}>
                        <CardContent>
                            <Typography color="textPrimary" varient="h3" gutterBottom>
                                Deaths
                        </Typography>
                            <Typography varient="h5">
                                <CountUp
                                    start={0}
                                    end={deaths.value}
                                    duration={3}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">
                                {lastUpdate ? new Date(lastUpdate).toDateString() : null}
                            </Typography>
                            <Typography color="textSecondary" varient="h5">"Total number of death"</Typography>
                        </CardContent>
                    </Grid>
                    : null}

            </Grid>
        </div>
    );
};

export default Cards;
