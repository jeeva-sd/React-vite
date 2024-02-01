import { useDispatch } from 'react-redux';
import './page.scss';
import { exampleAction } from '~/store/example/slice';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useEffect } from 'react';

const Dashboard = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.example);

    useEffect(() => {
        dispatch(exampleAction());
    }, []);

    return (
        <div className="dashboard">{JSON.stringify(data)}</div>
    );
};

export default Dashboard;