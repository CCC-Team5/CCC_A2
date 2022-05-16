// Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

// Author:

// Xinhao Chen 1230696 Melbourne
// Weimin Ouyang 340438 Melbourne
// Tianqi Yu 1221167 China
// Junjie Xia 1045673 China
// Yuling Zheng 954408 Melbourne

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
