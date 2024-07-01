import Papa from 'papaparse';
import {Worker} from '../types';

export interface WorkerData {
    workers: Worker[];
    categories: string[];
}

export async function fetchWorkerData(url: string): Promise<WorkerData> {
    try {
        const response = await fetch(url);
        const csvData = await response.text();

        console.log(response);

        const parsedData = Papa.parse(csvData, {header: true, dynamicTyping: true});
        const workers = parsedData.data as Worker[];

        // Extract unique categories
        const categories = Array.from(new Set(workers.map(worker => worker.category)));

        return {workers, categories};
    } catch (error) {
        console.error('Error fetching worker data:', error);
        return {workers: [], categories: []};
    }
}