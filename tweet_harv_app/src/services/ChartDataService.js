import axios from 'axios'

const BASE_API_URL = axios.create({baseURL: 'api/index/'});
const LOCAL_URL = axios.create({baseURL: 'http://localhost:8000/index/'});
class ChartDataService{
    
    getTrendingHashtags(){
        return BASE_API_URL.get('hashtag/')
    }

    getOpportunityPercent(){
        return BASE_API_URL.get('opportunity/percent/')
    }

    getLanguageCount(){
        return BASE_API_URL.get('opportunity/language_count/')
    }

    getBirthCountry(){
        return BASE_API_URL.get('opportunity/birth_country/')
    }

    getLanguageHome(){
        return BASE_API_URL.get('opportunity/language_home/')
    }

    getHousingTrendSenti(){
        return BASE_API_URL.get('housing/trend_sentiment/')
    }

    getHousingContent(){
        return BASE_API_URL.get('housing/content/')
    }

    getCostTrendSenti(){
        return BASE_API_URL.get('cost/trend_sentiment/')
    }

    getCostContent(){
        return BASE_API_URL.get('cost/content/')
    }

    getTransTrendSenti(){
        return BASE_API_URL.get('transportation/trend_sentiment/')
    }

    getTransContent(){
        return BASE_API_URL.get('transportation/content/')
    }

    getMap(){
        return BASE_API_URL.get('map/')
    }


}

export default new ChartDataService;
