import { useCallback, useEffect, useState } from "react";
import { Emp } from "./utils/EmpHandler";
import { Grid } from "@material-ui/core";
import DisplayEmployees from "./DisplayEmployees";

export default function Hierarchy() {
    const [userData, setuserData] = useState(new Emp());

    const getData = useCallback(async () => {
        try {
            const result = await fetch('https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees');
            const data = await result.json();

            setuserData(() => {
                const emp = new Emp();

                data.forEach((item) => {
                    emp.addNode(item.id, item.manager_id, item);
                });
                return emp;
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Grid container direction="column">
            {userData &&
                userData.getRoot().map((member) => {
                    return (
                        <Grid item key={member.id}>
                            <DisplayEmployees
                                userData={userData}
                                empid={member.id}
                                data={member.data}
                            />
                        </Grid>
                    );
                })}
        </Grid>
    );
}
