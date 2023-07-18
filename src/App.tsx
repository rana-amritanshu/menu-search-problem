import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import data from './data.json'

function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [searchText, setSearchText] = React.useState("");
  const [items, setItems] = React.useState(data)

  useEffect(() => {
    setItems(data)
  })

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    setSearchText(searchTerm)
    if (searchTerm) {
      const itemData = items.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setItems(itemData)
    } else {
      setItems(data)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-center mt-[10rem]">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className='p-3'>
          <input type="text" name='search' placeholder='search' value={searchText} onChange={handler} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>
        <Divider />
        {items.map((data, index) => (
          <MenuItem key={index} onClick={handleClose}>{data.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default App;
