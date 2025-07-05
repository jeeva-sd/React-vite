import { useAuth } from "~/hooks";

const Dashboard: React.FC = () => {
        const { user } = useAuth();

    return <h1>Dashboard Page {user?.username}</h1>;
};

export { Dashboard };
