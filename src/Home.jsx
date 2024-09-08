import React, { useState, useEffect, useContext } from "react";
import AppContext from './AppContext';
import MainCarousel from "./materials/MainCarousel";
import Search from "./Search";
import { Box } from "@mui/material";
import AdvancedSearch from "./AdvancedSearch";
import TrailsApi from "./TrailsApi";
import Loader from "./Loader"
import SearchResults from "./SearchResults";
import TrailDetail from "./TrailDetail";

const images = [
    {
        'tag': "Angels Landing, Zion National Park",
        'imgPath': "/src/assets/angels_landing_zion.png"
    },
    {
        'tag': "Avalanche Lake, Glacier National Park",
        'imgPath': "/src/assets/avalanche_lake_glacier.png"
    },
    {
        'tag': "Devils Bridge, Coconino National Forest",
        'imgPath': "/src/assets/devils_bridge.png"
    },
    {
        'tag': "Skyline Loop, Mount Rainier National Park",
        'imgPath': "/src/assets/mt_rainier.png"
    },
    {
        'tag': "Narrows, Zion National Park",
        'imgPath': "/src/assets/narrows.png"
    },
    {
        'tag': "Old Rag Mountain, Shenandoah National Park",
        'imgPath': "/src/assets/oldrag_shen.png"
    },
    {
        'tag': "Queens Garden Trail, Bryce Canyon National Park",
        'imgPath': "/src/assets/Queens-Navajo-Banner.png"
    },
    {
        'tag': "White Oak Canyon, Shenandoah National Park",
        'imgPath': "/src/assets/whiteoak_canyon.png"
    }
]

const Home = () => {
    const { appData } = useContext(AppContext);
    const { updateAlertMsg } = useContext(AppContext);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [query, setQuery] = useState({ term: '', page: 1, limit: 10, filters: {}, submit: false });
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false)


    const updateQuery = (key, value) => {

        setQuery(prevQuery => {
            const newQuery = { ...prevQuery, [key]: value };

            if (key !== 'page' && key !== 'submit') {

                newQuery.page = 1
                setSearchResults(null);
            }

            return newQuery;
        });
    }

    useEffect(() => {
        const goSearch = async () => {
            try {

                setLoading(true);
                const searchTerm = query.term === '' ? null : query.term;
                const searchFilters = Object.keys(query.filters).length > 0 ? query.filters : null;
                const result = appData.user
                    ? await TrailsApi.loggedInSearch(appData.user, searchTerm, query.page, query.limit, searchFilters)
                    : await TrailsApi.search(searchTerm, query.page, query.limit, searchFilters)

                updateQuery('submit', false)
                setSearchResults(result);
                setLoading(false);

            } catch (e) {
                updateAlertMsg("error", e.message);
                updateQuery('submit', false)
                setLoading(false);
            }

        }
        if (query.submit) {
            goSearch()
        }
    }, [query.submit])



    return (
        <Box sx={{ display: 'flex', flexDirection: "column", width: '100%' }}>
            <MainCarousel imgArr={images} delay={5000} />
            <Search
                setShowAdvanced={setShowAdvanced}
                showAdvanced={showAdvanced}
                query={query}
                updateQuery={updateQuery}
            />
            {showAdvanced && <AdvancedSearch
                open={showAdvanced}
                setOpen={setShowAdvanced}
                query={query}
                updateQuery={updateQuery}
            />
            }

            <Box sx={{ width: '100%' }}>
                {loading && <Loader />}
                {searchResults && <SearchResults data={searchResults} page={query.page} updateQuery={updateQuery} />}
                {appData.showTrailModal && <TrailDetail />}
            </Box>
        </Box>
    )
}

export default Home;