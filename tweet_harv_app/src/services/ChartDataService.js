import axios from 'axios'

const BASE_API_URL = axios.create({baseURL: 'api/index/'});
const BASE_API_URL1 = axios.create({baseURL: 'api1/index/'});
class ChartDataService{
    
    getTrendingHashtags(){
        return BASE_API_URL.get('hashtag/')
    }

    getOpportunitydata(){
        return BASE_API_URL1.get('opportunity/')
    }

    getHousingTrendSenti(){
        return BASE_API_URL1.get('housing/trend_sentiment/')
    }

    getHousingContent(){
        return BASE_API_URL1.get('housing/content/')
    }

    getCostTrendSenti(){
        return BASE_API_URL1.get('cost/trend_sentiment/')
    }

    getCostContent(){
        return BASE_API_URL1.get('cost/content/')
    }

    getTransTrendSenti(){
        return BASE_API_URL1.get('transportation/trend_sentiment/')
    }

    getTransContent(){
        return BASE_API_URL1.get('transportation/content/')
    }

    getMap(){
        return BASE_API_URL.get('map/')
    }


}

export default new ChartDataService;
