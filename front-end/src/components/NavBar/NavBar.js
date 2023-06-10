import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, alpha } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const NavigationBar = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    LexiBoost
                </Typography>
                <div sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div sx={{ position: 'relative', ml: 2, flexGrow: 1 }}>
                        <SearchIcon sx={{ color: 'inherit', position: 'absolute', pointerEvents: 'none', top: '50%', transform: 'translateY(-50%)', ml: 1 }} />
                        <InputBase
                            placeholder=" Search Cards..."
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{
                                borderRadius: '4px',
                                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
                                padding: '6px 8px',
                                transition: (theme) => theme.transitions.create('width'),
                                width: '100%',
                                pl: '30px',
                                '&:focus': {
                                    width: '250px',
                                },
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">View Card Decks</Button>
                    <Button color="inherit">My Card Decks</Button>
                    <Button color="inherit">Profile</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;