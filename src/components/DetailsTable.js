import { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
    },
    TableContainer: {
        maxHeight: 650,
        maxWidth: 600,
        margin: "1%",
        borderRadius: "10px",
    },
    TableHeaderCell: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: '#fff',
    },
    TableRowCell: {
        fontSize: '1.2rem',
    },
    TableHeaderRow: {
        fontWeight: 'bolder',
        fontSize: '2rem',
    }
});

const dataObj = {
    first_name: '',
    last_name: '',
    salary: '',
    designation: '',
    address: '',
    date_of_birth: '',
    date_of_joining: ''
}

const DetailsTable = () => {
    const [data, setData] = useState([dataObj]);
    const classes = useStyles();

    const location = useLocation();
    const { state } = location;
    const { details } = state;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(details);
            const data = await result.json();
            setData(data);
        }
        fetchData();
    }, [details]);

    return (
        <TableContainer component={Paper} className={classes.TableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.TableHeaderRow} align='center'>DETAILS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.TableHeaderCell} align="center">First Name</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].first_name} </TableCell>
                    </TableRow >
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Last Name</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].last_name} </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Date of Birth</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].date_of_birth} </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Address</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].address} </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Date of Joining</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].date_of_joining} </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Salary</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> ${data[0].salary} </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className={classes.TableHeaderCell} align="center">Designation</TableCell>
                        <TableCell align="center" className={classes.TableRowCell}> {data[0].designation} </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default DetailsTable;