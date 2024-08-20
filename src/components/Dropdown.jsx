

import React from 'react';

const Dropdown = ({ items, selectedItem, onSelect }) => {
    return (
        <div>
            <label htmlFor="dropdown">Select an item:</label>
            <select id="dropdown" value={selectedItem} onChange={(e) => onSelect(e.target.value)}>
                <option value="" disabled>Select an option</option>
                {items.map((item) => (
                    <option key={item.id} value={item.type_name}>
                        {item.type_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

