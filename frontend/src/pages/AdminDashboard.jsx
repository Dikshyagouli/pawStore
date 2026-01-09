import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const API_URL = 'http://localhost:5000/api/admin';

export default function AdminDashboard() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [allCarts, setAllCarts] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalCarts: 0,
        totalItems: 0,
        totalRevenue: '0.00',
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else if (!user?.isAdmin) {
            navigate('/');
        } else {
            fetchAdminData();
        }
    }, [isLoggedIn, user, navigate]);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const token = user?.token;

            // Fetch stats and carts in parallel
            const [statsResponse, cartsResponse] = await Promise.all([
                fetch(`${API_URL}/stats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
                fetch(`${API_URL}/all-carts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                setStats(statsData);
            } else {
                console.error('Stats response not OK:', statsResponse.status);
            }

            if (cartsResponse.ok) {
                const cartsData = await cartsResponse.json();
                setAllCarts(cartsData || []);
            } else {
                console.error('Carts response not OK:', cartsResponse.status);
                const errorData = await cartsResponse.json().catch(() => ({}));
                console.error('Error data:', errorData);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn || !user?.isAdmin) {
        return null; 
    }

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0" style={{ color: '#2c2c2c' }}>
                        <i className="bi bi-speedometer2 me-2" style={{ color: '#ff914d' }}></i>
                        Admin Dashboard
                    </h2>
                    <span className="badge bg-warning text-dark">Admin Only</span>
                </div>

                <div className="row g-4">
                    {/* Statistics Cards */}
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                                            <i className="bi bi-people fs-4 text-primary"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="text-muted mb-1">Total Users</h6>
                                        <h3 className="mb-0">{loading ? '...' : stats.totalUsers}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-circle bg-success bg-opacity-10 p-3">
                                            <i className="bi bi-bag-check fs-4 text-success"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="text-muted mb-1">Total Orders</h6>
                                        <h3 className="mb-0">{loading ? '...' : stats.totalOrders || 0}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-circle bg-info bg-opacity-10 p-3">
                                            <i className="bi bi-box-seam fs-4 text-info"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="text-muted mb-1">Total Items</h6>
                                        <h3 className="mb-0">{loading ? '...' : stats.totalItems}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                                            <i className="bi bi-currency-dollar fs-4 text-warning"></i>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="text-muted mb-1">Total Revenue</h6>
                                        <h3 className="mb-0">${loading ? '...' : stats.totalRevenue}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-2">

                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0" style={{ color: '#2c2c2c' }}>
                                    <i className="bi bi-people me-2" style={{ color: '#ff914d' }}></i>
                                    User Management
                                </h5>
                            </div>
                            <div className="card-body">
                                <p className="text-muted">View and manage user accounts and permissions.</p>
                                <button 
                                    className="btn w-100" 
                                    style={{ backgroundColor: '#ff914d', color: 'white' }}
                                    onClick={() => navigate('/admin/users')}
                                >
                                    Manage Users
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white">
                                <h5 className="mb-0" style={{ color: '#2c2c2c' }}>
                                    <i className="bi bi-receipt me-2" style={{ color: '#ff914d' }}></i>
                                    Order Management
                                </h5>
                            </div>
                            <div className="card-body">
                                <p className="text-muted">View and process customer orders.</p>
                                <button 
                                    className="btn w-100" 
                                    style={{ backgroundColor: '#ff914d', color: 'white' }}
                                    onClick={() => navigate('/admin/orders')}
                                >
                                    View Orders
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0" style={{ color: '#2c2c2c' }}>
                            <i className="bi bi-cart-check me-2" style={{ color: '#ff914d' }}></i>
                            All Users' Cart Items
                        </h5>
                        <button 
                            className="btn btn-sm" 
                            style={{ backgroundColor: '#ff914d', color: 'white' }}
                            onClick={fetchAdminData}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i>Refresh
                        </button>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : allCarts.length === 0 ? (
                            <p className="text-muted text-center py-4">No carts found. Users haven't added any items yet.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Email</th>
                                            <th>Items</th>
                                            <th>Total Items</th>
                                            <th>Cart Value</th>
                                            <th>Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCarts.map((cart) => (
                                            <tr key={cart._id}>
                                                <td>
                                                    <strong>{cart.user?.name || 'Unknown User'}</strong>
                                                </td>
                                                <td>{cart.user?.email || 'N/A'}</td>
                                                <td>
                                                    {!cart.items || cart.items.length === 0 ? (
                                                        <span className="text-muted">Empty cart</span>
                                                    ) : (
                                                        <div>
                                                            {cart.items.map((item, idx) => (
                                                                <div key={idx} className="mb-1">
                                                                    <span className="badge bg-secondary me-1">
                                                                        {item.name || 'Unknown Item'}
                                                                    </span>
                                                                    <small className="text-muted">
                                                                        (Qty: {item.quantity || 0}, ${(item.price || 0).toFixed(2)})
                                                                    </small>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <span className="badge bg-info">{cart.itemCount || 0}</span>
                                                </td>
                                                <td>
                                                    <strong style={{ color: '#ff914d' }}>
                                                        ${(cart.totalValue || 0).toFixed(2)}
                                                    </strong>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {cart.updatedAt ? new Date(cart.updatedAt).toLocaleDateString() : 'N/A'}
                                                    </small>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-header bg-white">
                        <h5 className="mb-0" style={{ color: '#2c2c2c' }}>
                            <i className="bi bi-info-circle me-2" style={{ color: '#ff914d' }}></i>
                            Admin Information
                        </h5>
                    </div>
                    <div className="card-body">
                        {user ? (
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Logged in as:</strong> {user.name || 'N/A'}</p>
                                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                                    <p><strong>Role:</strong> <span className="badge bg-warning text-dark">Administrator</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>User ID:</strong> <code>{user._id || 'N/A'}</code></p>
                                    <p><strong>Account Type:</strong> Admin Account</p>
                                    <p><strong>Total Admins:</strong> {loading ? '...' : stats.totalAdmins || 0}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted">Loading user information...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

