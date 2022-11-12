import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import AutoLista from './AutoLista';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CarShop
          </Typography>
      </Toolbar>
      </AppBar>
        <AutoLista/>
    </div>
  );
}

export default App;
