import {
    Routes,
    Route
} from 'react-router-dom';
import Home from './home/Home';
import Mail from './mail/Mail';

const PageRouter = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mails/*" element={<Mail/>} />
            <Route path="*" element={<div>404 not found</div>}/>
        </Routes>
    )
}

export default PageRouter;