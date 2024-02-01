import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, exampleAction, updateNumber } from '~/store';
import './page.scss';

const Dashboard = (): ReactNode => {
    const dispatch = useDispatch();
    const { loading, data, number } = useSelector((state: RootState) => state.example);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        dispatch(exampleAction(randomNumber));
    }, []);

    return (
        <div className="dashboard">
            {loading ? <>Loading...</> : JSON.stringify(data)}
            <button onClick={(() => dispatch(updateNumber(number + 5)))}>{number}</button>
        </div>
    );
};

export default Dashboard;