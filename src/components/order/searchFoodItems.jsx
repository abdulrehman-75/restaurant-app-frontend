import React, { useState, useEffect } from 'react';
import { createApiEndpoint, API_ENDPOINTS } from '../../API';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SearchFoodItems = ({ values, addFoodItem }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const foodApi = createApiEndpoint(API_ENDPOINTS.FOODITEM);
    foodApi.fetchAll()
      .then((res) => {
        setFoodItems(res.data);
        setSearchList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = foodItems.filter(item =>
      item.foodItemName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      values.orderDetails.every(i => i.foodItemId !== item.foodItemId)
    );
    setSearchList(filtered);
  }, [searchQuery, values.orderDetails, foodItems]);

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, marginBottom: 2 }}>
        <Input
          fullWidth
          placeholder="Search food items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Paper>

      <Paper elevation={2} sx={{ maxHeight: 300, overflowY: 'auto', borderRadius: 2 }}>
        <List dense>
          {searchList.length > 0 ? (
            searchList.map((item) => (
              <ListItem
                key={item.foodItemId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label={`add ${item.foodItemName}`}
                    onClick={() => addFoodItem(item)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.foodItemName || 'Unnamed Item'}
                  secondary={`Price: $${item.price?.toFixed(2) || 'N/A'}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ padding: 2, textAlign: 'center' }}>
              No items found
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default SearchFoodItems;