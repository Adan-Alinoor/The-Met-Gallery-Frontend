import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/tickets');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        setSelectedItem(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dropdown">Select an item:</label>
            <select id="dropdown" value={selectedItem} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div>
                Selected Item ID: {selectedItem}
            </div>
        </div>
    );
};

export default Dropdown;