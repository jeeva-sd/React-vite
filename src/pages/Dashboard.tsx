import { useAuth } from "~/hooks";
import { useAuthUser } from "~/store";

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { data: authUser, setAuthUser } = useAuthUser();

    return <>
        <h1>Dashboard Page {user?.username} - Auth User: {authUser?.name}</h1>
        <button onClick={() => setAuthUser({ name: 'New User', id: 2 })}>click</button>
    </>;
};

export { Dashboard };
