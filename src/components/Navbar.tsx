import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
} from '@mui/material'
import {
  AccountCircle,
  ExitToApp,
  Person,
} from '@mui/icons-material'
import Link from 'next/link'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    handleMenuClose()
  }

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        {/* Logo/Title */}
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Open Impact
          </Typography>
        </Link>

        {/* Auth Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {status === 'loading' ? (
            <Chip label="Loading..." size="small" />
          ) : session ? (
            <>
              {/* User Menu */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Welcome, {session.user?.name || 'User'}
                </Typography>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  sx={{ ml: 1 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  {session.user?.image ? (
                    <Avatar
                      src={session.user.image}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      <Person />
                    </Avatar>
                  )}
                </IconButton>
              </Box>

              {/* User Menu Dropdown */}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircle />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <ExitToApp />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Sign In Button */}
              <Link href="/auth" passHref>
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}