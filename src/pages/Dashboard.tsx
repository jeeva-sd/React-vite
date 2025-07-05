import { useInfiniteProducts } from "~/queries";
import { useStore } from "~/stores";

const Dashboard: React.FC = () => {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteProducts({ limit: 5 });

    const store = useStore();

    // Flatten all products from all pages
    const allProducts = data?.pages.flatMap(page => page.products) || [];

    return (
        <>
            <h1>Dashboard Page</h1>
            {store.count}
            <button onClick={() => store.increment()}>Increment</button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && allProducts.map(e => {
                return (
                    <div key={e.id}>
                        <h2>{e.title}</h2>
                        <p>{e.description}</p>
                    </div>
                );
            })}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load More Products'}
                </button>
            )}
        </>
    );
};

export { Dashboard };
