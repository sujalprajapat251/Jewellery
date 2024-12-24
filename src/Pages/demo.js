import React, { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go'; // Import heart icons

const Demo = () => {
    const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`); // Generate 10 items
    const [likedItems, setLikedItems] = useState([]); // Tracks liked items
    const [loadingItems, setLoadingItems] = useState([]); // Tracks loading state

    const toggleHeart = (item) => {
        // Show loader for 3 seconds
        setLoadingItems([...loadingItems, item]);

        setTimeout(() => {
            // Remove loader and toggle liked state
            setLoadingItems((prev) => prev.filter((loadingItem) => loadingItem !== item));

            setLikedItems((prev) =>
                prev.includes(item)
                    ? prev.filter((likedItem) => likedItem !== item) // Remove from liked
                    : [...prev, item] // Add to liked
            );
        }, 3000);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px',
                        border: '1px solid #ccc',
                        margin: '5px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    <span>{item}</span>
                    <span onClick={() => toggleHeart(item)} style={{ fontSize: '24px' }}>
                        {loadingItems.includes(item) ? (
                            <span>{item}</span> // Replace with a loader if needed
                        ) : likedItems.includes(item) ? (
                            <GoHeartFill style={{ color: 'red' }} />
                        ) : (
                            <GoHeart style={{ color: 'grey' }} />
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Demo;
