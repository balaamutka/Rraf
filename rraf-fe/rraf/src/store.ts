import { create } from 'zustand';

interface LocationPython {
    name: string;
    Region: string;
}

interface LocationDOTNET {
    name: string;
    region: string;
}

interface LocationStore {
    locationsDOTNET: LocationDOTNET[];
    locationPython: LocationPython[];
    fetchLocationsPython: () => Promise<void>;
    fetchLocationsDOTNET: () => Promise<void>;
}

export const useLocationStore = create<LocationStore>((set) => ({
    locationsDOTNET: [],
    locationPython: [],
    locations: [],
    fetchLocationsPython: async () => {
        // example with python backend endpoint
        const response = await fetch('http://127.0.0.1:5000/rraf-get-locations');
        const data = await response.json();
        set({ locationPython: data });
    },
    fetchLocationsDOTNET: async () => {
        // example with C# .NET backend endpoint
        const response = await fetch('https://localhost:7086/WeatherForecast/rraf-get-locations');
        const data = await response.json();
        set({ locationsDOTNET: data });
    },
}));