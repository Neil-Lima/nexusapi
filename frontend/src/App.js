import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './routes/Rotas';
import { ThemeProvider } from './context/ContextTheme';

function App() {
  return (
    <div className="App">
      <ThemeProvider>        
        <Rotas/>
      </ThemeProvider>
    </div>
  );
}

export default App;
