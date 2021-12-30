import { Route, Routes } from "react-router"
import Inbox from './inbox/Inbox';
import Sent from './sentItems/Sent';

const MailRouter = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Inbox/>} />
            <Route path="/sentmails" element={<Sent/>} />
        </Routes>
    )
}

export default MailRouter;