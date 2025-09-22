import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Open Impact
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {session ? (
            <>
              <Button color="inherit" component={Link} href="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/auth">
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;