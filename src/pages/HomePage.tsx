import React from 'react';
import { useProducts } from '~/queries';

const HomePage: React.FC = () => {
    const { data: productList, isFetching } = useProducts();

    return (
        <>
            <h1>Welcome to the Home Page</h1>
            {isFetching ? 'Loading...' : null}
            {productList && productList.length > 0 && (
                <ul>
                    {productList.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export { HomePage };
