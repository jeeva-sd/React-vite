import { useProducts } from "~/queries";

const Dashboard: React.FC = () => {
    const { data: products, isLoading } = useProducts({ page: 1, limit: 10 });

    return (
        <>
            <h1>Dashboard Page</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && products?.map(e => {
                return (
                    <>
                        <div key={e.id}>
                            <h2>{e.title}</h2>
                            <p>{e.description}</p>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export { Dashboard };
