import { useState, useEffect } from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, makeStyles, TablePagination, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
    },
    TableContainer: {
        maxHeight: 650,
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
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#fff",
        }

    },

});


const MakeTable = () => {
    const [tableData, setTableData] = useState([]);
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigate = useNavigate();

    const clickHandler = (row) => {
        navigate('/details', {
            state: {
                details: row.details
            }
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees');
            const data = await result.json();
            setTableData(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <TableContainer component={Paper} className={classes.TableContainer}>
                <Table className={classes.table} aria-label="simple table" stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell className={classes.TableHeaderCell} align="center">Id</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">First Name</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Last Name</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Date of Birth</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Address</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Date of Joining</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Salary</TableCell>
                            <TableCell className={classes.TableHeaderCell} align="center">Designation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        className={classes.TableRowCell}
                                        onClick={() => clickHandler(row)}
                                    >
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.first_name} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.last_name} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.date_of_birth} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.address} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.date_of_joining} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> ${row.salary} </TableCell>
                                    <TableCell align="center" className={classes.TableRowCell}> {row.designation} </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="contained" color="primary" onClick={() => navigate('/hierarchy')}>
                Go to Hierarchy
            </Button>
        </>
    );
}

export default MakeTable;