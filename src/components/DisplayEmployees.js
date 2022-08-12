import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Typography
} from "@material-ui/core";
import { useState, Fragment } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15)
    },
    designation: {
        fontSize: theme.typography.pxToRem(12),
        background: red[500],
        padding: 3,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: "white",
        fontWeight: "bold"
    }
}));

const DisplayEmployees = ({ userData, empid, data }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <Accordion expanded={open} onChange={() => setOpen(!open)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${empid}-content`}
                    id={`${empid}-header`}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography className={classes.heading}>
                                {data?.first_name} {data?.last_name}
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent="flex-start" alignItems="flex-start">
                            <Typography className={classes.designation}>
                                {data?.designation}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="column">
                        {open &&
                            userData &&
                            userData?.getChildrenByEmployeeId(empid).map((item) => (
                                <Grid item key={item.id}>
                                    <DisplayEmployees
                                        empid={item.id}
                                        data={item.data}
                                        userData={userData}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}
export default DisplayEmployees;
