import { React, useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Box,
    Badge
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/users";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
    const [users, setUsers] = useState()
    useEffect(() => {
        getUsers().then(resp => setUsers(resp.data)).catch(err => console.log("error fetch list user: ", err))
    }, [])
    return (
        <div>
            <h3 > List user</h3>
            <nav aria-label="main mailbox folders">
                <List sx={{ width: '100%', maxWidth: 360 }}> 
                    {users && users.map(item => {
                        return (
                            <Link to={`/users/${item._id}`} style={{ textDecoration: 'none' }}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.first_name + " " + item.last_name} onClick={() => {

                                        }} />
                                         <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Badge badgeContent={0} color="success" />
                                        <Badge
                                            badgeContent={0}
                                            color="error"
                                            onClick={() => {}}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    </Box>
                                    </ListItemButton>
                                   

                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </nav>
        </div>
    );
}

export default UserList;
