import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './app.css';

//Components
import Home from './components/Home/Home';
import Quotes from './components/Quotes/Quotes';
import AuthorQuotes from './components/AuthorQuotes/AuthorQuotes';
import Authors from './components/Authors/Authors';
import SearchResults from './components/SearchResults/SearchResults';
import NotFound from './components/NotFound/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/quotes" element={<Quotes />}></Route>
                <Route path="/author/:id" element={<AuthorQuotes />}></Route>
                <Route path="/authors" element={<Authors />}></Route>
                <Route path="/search" element={<SearchResults />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
