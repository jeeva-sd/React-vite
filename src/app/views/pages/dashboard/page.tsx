import { ReactNode, useEffect } from 'react';
import { RootState, exampleAction } from '~/store';
import { useDispatch, useSelector } from 'react-redux';
import './page.scss';

const Dashboard = (): ReactNode => {
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.example);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        dispatch(exampleAction(randomNumber));
    }, []);

    return (
        <div className="dashboard">{loading ? <>Loading...</> : JSON.stringify(data)}</div>
    );
};

export default Dashboard;