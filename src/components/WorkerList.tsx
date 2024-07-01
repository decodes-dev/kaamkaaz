import React, {useMemo} from 'react';
import {
    ShimmeredDetailsList,
    IColumn,
    SelectionMode,
    DetailsRow,
    IDetailsRowStyles,
    IDetailsListStyles,
    Image,
} from '@fluentui/react';
import styled from 'styled-components';
import {Worker} from '../types';

const WorkerImage = styled(Image)`
    margin-right: 10px;
    border-radius: 25px;
`;

const customRowStyles: Partial<IDetailsRowStyles> = {
    root: {
        selectors: {
            '&:hover': {
                backgroundColor: '#f3f2f1',
            },
        },
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    },
};

const customListStyles: Partial<IDetailsListStyles> = {
    root: {
        overflowX: 'auto',
        selectors: {
            '.ms-DetailsRow-cell': {
                display: 'flex',
                alignItems: 'center',
            },
        },
    },
};

interface WorkerListProps {
    workers: Worker[];
    selectedCategory: string | null;
    searchQuery: string;
}

export const WorkerList: React.FC<WorkerListProps> = ({workers, selectedCategory, searchQuery}) => {
    const filteredWorkers = useMemo(() => {
        return workers.filter(worker =>
            (selectedCategory ? worker.category === selectedCategory : true) &&
            (searchQuery ? worker.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
        );
    }, [workers, selectedCategory, searchQuery]);

    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 200,
            maxWidth: 250,
            isResizable: true,
            onRender: (item: Worker) => (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <WorkerImage src="/assets/user-icon.jpg" width={50} height={50}/>
                    <span>{item.name}</span>
                </div>
            )
        },
        {key: 'category', name: 'Category', fieldName: 'category', minWidth: 100, maxWidth: 150, isResizable: true},
        {
            key: 'experience',
            name: 'Experience (years)',
            fieldName: 'experience',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true
        },
        {key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 150, maxWidth: 200, isResizable: true},
        {
            key: 'price',
            name: 'Price (INR)',
            fieldName: 'price',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            onRender: (item: Worker) => <span>₹{item.price}</span>
        },
    ];

    return (
        <ShimmeredDetailsList
            items={filteredWorkers}
            columns={columns}
            selectionMode={SelectionMode.none}
            setKey="set"
            styles={customListStyles}
            onRenderRow={(props) => {
                if (props) {
                    return <DetailsRow {...props} styles={customRowStyles}/>;
                }
                return null;
            }}
        />
    );
};