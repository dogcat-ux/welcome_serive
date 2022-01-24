import mockjs from 'mockjs';
// import Random from "";

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

const proxy = {
  'GET /api/org/0': mockjs.mock({
    "code": 0,
    "data": {
      "applyLink": "1212313",
      "introductionDoc": "string",
      "logo": mockjs.Random.image(),
      "mark": "string",
      "orgId": 0,
      "orgName": "string",
      "recruitingGroup": "string",
      "starLevel": 0,
      "videoLink": "string"
    },
    "msg": "string"
  }),
  'GET /api/college/abbr': mockjs.mock({
    "code": 200,
    "msg": "",
    "data|1-10": [
      {
        "collegeId|1-20": 1,
        "collegeAbbr|+1": [
          "物信学院", "电气学院", "数计学院","梅努斯","文学学院","语言学院","机械学院","土木学院","建筑学院",
            "环资学院","化学学院"
        ],
      }
    ]
    // "data": [
    //   {
    //
    //     "collegeId": 1,
    //     "collegeAbbr": "物信学院"
    //   },
    // ]
  })
}
export default proxy;
