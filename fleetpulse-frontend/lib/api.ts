const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Vehicles
export const getVehicles = () => fetchAPI('/vehicles');
export const createVehicle = (data: any) => fetchAPI('/vehicles', { method: 'POST', body: JSON.stringify(data) });
export const updateVehicle = (id: string, data: any) => fetchAPI(`/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteVehicle = (id: string) => fetchAPI(`/vehicles/${id}`, { method: 'DELETE' });

// Drivers
export const getDrivers = () => fetchAPI('/drivers');
export const createDriver = (data: any) => fetchAPI('/drivers', { method: 'POST', body: JSON.stringify(data) });
export const updateDriver = (id: string, data: any) => fetchAPI(`/drivers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteDriver = (id: string) => fetchAPI(`/drivers/${id}`, { method: 'DELETE' });

// Alerts
export const getAlerts = () => fetchAPI('/alerts');
export const resolveAlert = (id: string) => fetchAPI(`/alerts/${id}/resolve`, { method: 'PUT' });

// Analytics
export const getDashboardKPIs = () => fetchAPI('/analytics');
