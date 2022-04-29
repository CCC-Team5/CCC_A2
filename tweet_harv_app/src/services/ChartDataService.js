import axios from 'axios'

const HASHTAG_API_BASE_URL = "http://localhost:8000/index/hashtag"

class ChartDataService{
    
    getTrendingHashtags(){
        return axios.get(HASHTAG_API_BASE_URL)
    }

}

export default new ChartDataService;
