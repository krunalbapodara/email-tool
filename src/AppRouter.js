import {
    Routes,
    Route
} from 'react-router-dom';
import Login from './pages/login/Login';
import Page from './pages/Page';

const AppRouter = (props) => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/marvel/*" element={<Page/>} />
        </Routes>
    )
}

export default AppRouter;