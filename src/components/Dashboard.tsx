import React from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";

type Datum = { title: string; value: string };

type DashboardProps = {
  username: string;
  data: Datum[];
  onLogout: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ username, data, onLogout }) => (
  <Paper elevation={1} sx={{ p: 3, width: '100%', maxWidth: 600, mx: 'auto' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        Welcome, {username}!
      </Typography>
      <Button
        variant="text"
        size="small"
        color="inherit"
        onClick={onLogout}
        sx={{ textDecoration: 'underline' }}
      >
        Logout
      </Button>
    </Box>
    
    <Typography variant="h6" fontWeight={600} mb={2}>
      Your Data
    </Typography>
    
    {data.length === 0 ? (
      <Typography color="text.secondary">
        No data added yet.
      </Typography>
    ) : (
      <List>
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary={item.title}
                secondary={item.value}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
            {idx < data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    )}
  </Paper>
);

export default Dashboard;