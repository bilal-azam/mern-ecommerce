import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Sales Overview</h2>
                {/* Add sales chart component here */}
                <p>Total Sales: $X,XXX</p>
            </div>
            <div>
                <h2>Product Performance</h2>
                {/* Add product performance chart here */}
                <p>Top Selling Product: XYZ</p>
            </div>
        </div>
    );
};

export default AdminDashboard;