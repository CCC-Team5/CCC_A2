
// Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

// Author:

// Xinhao Chen 1230696 Melbourne
// Weimin Ouyang 340438 Melbourne
// Tianqi Yu 1221167 China
// Junjie Xia 1045673 China
// Yuling Zheng 954408 Melbourne

// 'hashtags/trending'
function (doc) {
    if(doc.tweet.entities.hashtags.length > 0 && Date.parse(doc.tweet.created_at) >= new Date().setDate(new Date().getDate() - 14)){
        for (var i = 0; i < doc.tweet.entities.hashtags.length; i++){
          if (doc.tweet.entities.hashtags[i].tag){
            emit(doc.tweet.entities.hashtags[i].tag, 1);
          }
          else {
            emit(doc.tweet.entities.hashtags[i].text, 1)
          }
        }
    }
}
// reduce: _sum


// 'hashtags/by-year'
function (doc) {
    if(doc.tweet.entities.hashtags.length > 0){
        for (var i = 0; i < doc.tweet.entities.hashtags.length; i++){
          if (doc.tweet.entities.hashtags[i].tag){
            emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.entities.hashtags[i].tag);
          }
          else {
            emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.entities.hashtags[i].text)
          }
        }
    }
}


// 'lang/lang-count'
function (doc) {
    if (doc.tweet.lang && doc.tweet.lang != 'und') {
      emit(doc.tweet.lang, 1);
    }
}
// reduce: _sum


// 'geo/coordinates-count-1'
// stream & historic format
function (doc) {
    if (doc.tweet.coordinates.coordinates) {
        emit(doc.tweet.coordinates.coordinates, 1);    
    }
}
// reduce: _sum


// 'geo/coordinates-count-2'
// timeline format
function (doc) {
    if (doc.tweet.geo.coordinates.coordinates) {
        emit(doc.tweet.geo.coordinates.coordinates, 1);    
    }
}
// reduce: _sum


// 'geo/coordinates-tweet-1'
// stream & historic format
function (doc) {
    if (doc.tweet.coordinates.coordinates) {
        emit(doc.tweet.coordinates.coordinates, doc.tweet.text);    
    }
}


// 'geo/coordinates-tweet-2'
// timeline format
function (doc) {
    if (doc.tweet.geo.coordinates.coordinates) {
        emit(doc.tweet.geo.coordinates.coordinates, doc.tweet.text);    
    }
}


// 'time/before-covid-tweet'
function (doc) {
    if(Date.parse(doc.tweet.created_at) <= Date.parse("Apr 01 00:00:00 +0000 2020")){
        emit(doc._id, doc.tweet.text);
    }
}


// 'time/before-covid-count'
function (doc) {
    if(Date.parse(doc.tweet.created_at) <= Date.parse("Apr 01 00:00:00 +0000 2020")){
        emit(doc._id, 1);
    }
}
// reduce: _sum


// 'time/after-covid-tweet'
function (doc) {
    if(Date.parse(doc.tweet.created_at) > Date.parse("Apr 01 00:00:00 +0000 2020")){
        emit(doc._id, doc.tweet.text);
    }
}


// 'time/after-covid-count'
function (doc) {
    if(Date.parse(doc.tweet.created_at) > Date.parse("Apr 01 00:00:00 +0000 2020")){
        emit(doc._id, 1);
    }
}
// reduce: _sum


// 'time/by-year-tweet'
function (doc) {
    if(doc.tweet.created_at){
        emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.text);
    }
}


// 'time/by-year-count'
function (doc) {
    if(doc.tweet.created_at){
        emit(new Date(doc.tweet.created_at).getFullYear(), 1);
    }
}
// reduce: _sum


// 'text/housing'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/housing|house price|\brent|property|real estate/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.text);
    }
  }


// 'text/housing-count'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/housing|house price|\brent|property|real estate/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), 1);
    }
  }
// reduce: _sum


// 'text/transportation'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/transport|traffic|roadwork/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.text);
    }
  }


// 'text/transportation-count'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/transport|traffic|roadwork/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), 1);
    }
  }
// reduce: _sum


// 'text/cost'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/cost of living|petrol price|grocery price|utility bill/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), doc.tweet.text);
    }
  }


// 'text/cost-count'
function(doc) {
    if (doc.tweet.text.toLowerCase().match(/cost of living|petrol price|grocery price|utility bill/)) {
      emit(new Date(doc.tweet.created_at).getFullYear(), 1);
    }
  }
// reduce: _sum



// For results DB

// 'cost/all' & 'housing/all' & 'transportation/all'
function (doc) {
  emit(doc._id, doc);
}

// 'cost/text' & 'housing/text' & 'transportation/text'
function (doc) {
  emit(doc.year, doc.text);
}


// For AURIN data DB

// 'bith/country'
function (doc) {
  emit(doc.country, doc.values);
}

// 'home/lang'
function (doc) {
  emit(doc.country, doc.values);
}

// 'lang/code'
function (doc) {
  emit(doc.code, doc.language);
}





