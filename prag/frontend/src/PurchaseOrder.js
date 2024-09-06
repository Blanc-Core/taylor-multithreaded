import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Container, TextField, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jsPDF from 'jspdf';

// Header Component
const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('User logged out');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <img src="logo.png" alt="Company Logo" style={{ marginRight: '16px', width: '40px' }} />
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => window.location.href = '/purchase-orders'}>
                    Purchase Orders
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => window.location.href = '/settings'}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

// ProjectSelector Component
const ProjectSelector = ({ onProjectChange }) => {
    const [projects, setProjects] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState('');
    const [shippingAddress, setShippingAddress] = React.useState('');

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        const dummyProjects = [
            { id: '1', name: 'Project Alpha', shippingAddress: '123 Alpha St, City A' },
            { id: '2', name: 'Project Beta', shippingAddress: '456 Beta Ave, City B' },
            { id: '3', name: 'Project Gamma', shippingAddress: '789 Gamma Rd, City C' },
        ];
        setProjects(dummyProjects);
    };

    const handleProjectChange = (event) => {
        const selectedId = event.target.value;
        setSelectedProject(selectedId);

        const selectedProject = projects.find(project => project.id === selectedId);
        if (selectedProject) {
            setShippingAddress(selectedProject.shippingAddress);
            onProjectChange(selectedProject.shippingAddress);
        } else {
            setShippingAddress('');
        }
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
                <TextField
                    select
                    label="Select a Project"
                    value={selectedProject}
                    onChange={handleProjectChange}
                    fullWidth
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    <option value="" disabled>
                        Select a Project
                    </option>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Shipping Address"
                    value={shippingAddress}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    variant="outlined"
                />
            </Grid>
        </Grid>
    );
};

// MainContentArea Component
const MainContentArea = () => {
    const [formData, setFormData] = React.useState({
        project: '',
        date: new Date(),
        items: [],
        shippingAddress: '',
        item: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProjectChange = (address) => {
        setFormData({ ...formData, shippingAddress: address });
    };

    React.useEffect(() => {
        updatePreview(formData);
    }, [formData]);

    const updatePreview = (data) => {
        console.log('Preview updated with data:', data);
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
    };

    const handleAddItem = () => {
        if (formData.item.trim() === '') return;

        const newItem = {
            name: formData.item,
            quantity: 1,
            unitPrice: 100
        };

        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
            item: ''
        }));
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ padding: 2 }}>
                        <ProjectSelector onProjectChange={handleProjectChange} />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={formData.date}
                                onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Item"
                            name="item"
                            placeholder="Enter item"
                            value={formData.item}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" color="primary" onClick={handleAddItem}>
                            Add Item
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6">Real-Time Preview</Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body1"><strong>Shipping Address:</strong> {formData.shippingAddress || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>Date:</strong> {formData.date.toISOString().substring(0, 10)}</Typography>
                        <Typography variant="body1"><strong>Items:</strong></Typography>
                        <List>
                            {formData.items.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`${item.name} - Quantity: ${item.quantity}, Unit Price: $${item.unitPrice}`} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body1"><strong>Total:</strong> ${calculateTotal(formData.items)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Footer Component
const Footer = () => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(20, 20, 'Purchase Order');
        doc.save('purchase_order.pdf');
    };

    return (
        <Paper sx={{ padding: 2, marginTop: 4 }}>
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={exportToPDF}>
                        Export to PDF
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => alert('Purchase Order Submitted')}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

// Exporting the entire component as default
export default function CreatePurchaseOrder() {
    return (
        <div>
            <Header />
            <MainContentArea />
            <Footer />
        </div>
    );
}
