import axios from 'axios'

const url = "https://shazam-core.p.rapidapi.com/"

const requestOptions = {
    headers: {
        'X-RapidAPI-Key': "353bc911a2mshd728a2db2466f0bp1f6450jsn205269405a13",
        'X-RapidAPI-Host': "shazam-core.p.rapidapi.com"
    }
}

export const getRecommendedTracks = async (trackId = 554591360) => {

    const options = {
        ...requestOptions,
        params: {
            track_id: trackId
        }
    }

    const recommendedTracks = await axios.get(`${url}v1/tracks/related`, options);

    return recommendedTracks.data;
}

export const getTopChartTracks = async () => {

    const recommendedTracks = await axios.get(`${url}v1/charts/world`, requestOptions);
    return recommendedTracks.data;
}

export const getSongDetails = async (trackId) => {

    const options = {
        ...requestOptions,
        params: {
            track_id: trackId
        }
    }

    const track = await axios.get(`${url}v1/tracks/details`, options)

    return track.data;
}

export const getSearchQuery = async (query) => {

    const options = {
        ...requestOptions,
        params: {
            query, search_type: 'SONGS_ARTISTS'
        }
    }

    const search = await axios.get(`${url}v1/search/multi`, options)

    return search.data;
}