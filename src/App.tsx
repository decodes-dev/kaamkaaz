import {useState, useMemo} from 'react'
import styled from 'styled-components'
import {
    Stack,
    Text,
    DefaultButton,
    SearchBox,
    Image,
    IColumn,
    ShimmeredDetailsList,
    SelectionMode,
    DetailsRow,
    IDetailsRowStyles,
    IDetailsListStyles,
} from '@fluentui/react'
import {initializeIcons} from '@fluentui/font-icons-mdl2'

// Initialize icons for Fluent UI
initializeIcons()

// Define worker categories
const categories = ['Maid', 'Cook', 'Daily Wage Labour', 'Gardener', 'Driver']

// Define worker interface
interface Worker {
    id: number
    name: string
    category: string
    experience: number
    phone: string
    price: number
}

// Sample worker data
const workers: Worker[] = [
    {id: 1, name: 'Alice', category: 'Maid', experience: 3, phone: '+91 98765 43210', price: 500},
    {id: 2, name: 'Bob', category: 'Cook', experience: 5, phone: '+91 98765 43211', price: 800},
    {id: 3, name: 'Charlie', category: 'Daily Wage Labour', experience: 2, phone: '+91 98765 43212', price: 400},
    {id: 4, name: 'David', category: 'Gardener', experience: 4, phone: '+91 98765 43213', price: 600},
    {id: 5, name: 'Eve', category: 'Driver', experience: 6, phone: '+91 98765 43214', price: 1000},
    {id: 6, name: 'Frank', category: 'Maid', experience: 1, phone: '+91 98765 43215', price: 450},
    {id: 7, name: 'Grace', category: 'Cook', experience: 7, phone: '+91 98765 43216', price: 1200},
    {id: 8, name: 'Henry', category: 'Daily Wage Labour', experience: 2, phone: '+91 98765 43217', price: 420},
]

// Styled components
const AppContainer = styled.div`
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f3f2f1;
    min-height: 100vh;
`

const Title = styled.h1`
    color: #0078d4;
    text-align: center;
    margin-bottom: 20px;
`

const CategoryButton = styled(DefaultButton)`
    margin: 5px;
    border-radius: 20px;

    &:hover {
        background-color: #deecf9;
    }
`

const SearchContainer = styled.div`
    margin: 20px 0;
    max-width: 300px;
`

const WorkerImage = styled(Image)`
    margin-right: 10px;
    border-radius: 25px;
`

// Custom styles for DetailsRow
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
}

// Custom styles for DetailsList
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
}

// Main App component
function App() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredWorkers = useMemo(() => {
        return workers.filter(worker =>
            (selectedCategory ? worker.category === selectedCategory : true) &&
            (searchQuery ? worker.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
        )
    }, [selectedCategory, searchQuery])

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
    ]

    return (
        <AppContainer>
            <Title>Worker Categories</Title>
            <Stack horizontal wrap tokens={{childrenGap: 10}}>
                <CategoryButton
                    onClick={() => setSelectedCategory(null)}
                    primary={selectedCategory === null}
                >
                    All Categories
                </CategoryButton>
                {categories.map(category => (
                    <CategoryButton
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        primary={selectedCategory === category}
                    >
                        {category}
                    </CategoryButton>
                ))}
            </Stack>
            <SearchContainer>
                <SearchBox
                    placeholder="Search workers..."
                    onChange={(_, newValue) => setSearchQuery(newValue || '')}
                />
            </SearchContainer>
            <Text variant="large" block style={{margin: '20px 0'}}>
                {selectedCategory ? `Workers in ${selectedCategory} category:` : 'All Workers:'}
            </Text>
            <ShimmeredDetailsList
                items={filteredWorkers}
                columns={columns}
                selectionMode={SelectionMode.none}
                setKey="set"
                styles={customListStyles}
                onRenderRow={(props) => {
                    if (props) {
                        return <DetailsRow {...props} styles={customRowStyles}/>
                    }
                    return null
                }}
            />
        </AppContainer>
    )
}

export default App