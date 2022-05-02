## 进度

欧阳的Data Analysis大体上， 完成了与后端的结合；后端的views渲染，路由跳转等已经配置好

### 存在的问题

- 总体上的需求比较模糊，大致4/30的开发进度比较糊弄，只是大体上拼接完成，细节很粗糙
- 前端、数据组、后端需要明确
  - 需要几张网页
  - 每张网页里面有几张图，每张图对应哪个数据分析的功能，每张图具体需要的数据格式
  - 需要确定，前端是否有发送数据到后端的情况？例如复选框、单选框，输入框等等？如有，需要确定传输的数据

## 2022/5/2会议摘要

### Opportunity

Data Analysis: 

心昊

languages, top_n_birth_country, top_n_spoken_at_home

views1       views2                views3

url1          url2                  url3

欧阳

languages, top_n_birth_country, top_n_spoken_at_home

              views1
              
              url1
              
### 分工  tianqiyu && junjiexia
| Theme                          | Data Analysis Function                                       |             Views              | URL                                   |
| ------------------------------ | ------------------------------------------------------------ | :----------------------------: | ------------------------------------- |
| Now trending                   | now_trending(db, N)                                          |            hashtag             | /index/hashtag/                       |
| Opportunity                    | 1)top_n_lang_spoken_at_home(file_path, langCode_path, N)  2)top_n_birth_country(file_path, N)   3)top_n_lang_count(db, langCode_path, N) |       language_and_birth       | /index/opportunity/                   |
| Housing-trend&sentiment        | 1)topic_trend(db, housing)  2)topic_sentiment(housing)       |    housing_trend_sentiment     | /index/housing/trend_sentiment        |
| Housing-content                | def topic_wordcloud(query_db, housing)                       |        housing_content         | /index/housing/content                |
| Cost-trend&sentiment           | 1)topic_trend(db, cost)  2)topic_sentiment(cost)             |      cost_trend_sentiment      | /index/cost/trend_sentiment           |
| Cost-content                   | def topic_wordcloud(query_db, cost)                          |          cost_content          | /index/cost/content                   |
| transportation-trend&sentiment | 1)topic_trend(db, transportation)  2)topic_sentiment(transportation) | transportation_trend_sentiment | /index/transportation/trend_sentiment |
| transportation-content         | def topic_wordcloud(query_db, transportation)                |     transportation_content     | /index/transportation/content         |

