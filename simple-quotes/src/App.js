import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

//Components
import Home from './components/Home/Home';
import Quotes from './components/Quotes/Quotes';
import AuthorQuotes from './components/AuthorQuotes/AuthorQuotes';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/quotes" element={<Quotes />}></Route>
                    <Route path="/author/:id" element={<AuthorQuotes />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
