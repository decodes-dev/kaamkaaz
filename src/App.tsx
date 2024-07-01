import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
    Stack,
    Text,
    DefaultButton,
    SearchBox,
} from '@fluentui/react';
import {initializeIcons} from '@fluentui/font-icons-mdl2';
import {WorkerList} from './components/WorkerList';
import {fetchWorkerData} from './utils/csvFetcher';
import {Worker} from './types';

initializeIcons();

const AppContainer = styled.div`
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f3f2f1;
    min-height: 100vh;
`;

const Title = styled.h1`
    color: #0078d4;
    text-align: center;
    margin-bottom: 20px;
`;

const CategoryButton = styled(DefaultButton)`
    margin: 5px;
    border-radius: 20px;

    &:hover {
        background-color: #deecf9;
    }
`;

const SearchContainer = styled.div`
    margin: 20px 0;
    max-width: 300px;
`;

function App() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const csvUrl = 'https://firebasestorage.googleapis.com/v0/b/decodes-goodwill.appspot.com/o/worker-data.csv?alt=media';
        fetchWorkerData(csvUrl).then(data => {
            setWorkers(data.workers);
            setCategories(data.categories);
        });
    }, []);

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
            <WorkerList
                workers={workers}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
            />
        </AppContainer>
    );
}

export default App;