
plz only send me text, voice or pic will result in crash(now it is fixxed)
## Install
npm install

## City list
### Now the weather API need we to provide complete names of citys, here are some of them for testing(seleted from city.list.json):
If we use abbreviation like SF or LA, the API can't recognize it now. I will add the function to deal with it in the future</br>
1. Hurzuf</br>
2. Alupka</br>
3. New York</br>
4. San Francisco</br>
5. Los Angeles</br>
6. Palo Alto</br>
7. Sacramento</br>
8. San Diego</br>
9. San Bruno</br>
10. Miami</br>

## Introduction
I started to check kaggle.com's datasets so that I can find one I take interest in. I found two datasets(wine records and JcPenny) at last. However, useful information is in the the field of description which means I need to parse it.</br>
So, I desided to call weather/forecast API to build a simple weather chat bot.</br>

## Design
I found most of my friends would like to talk with a bot via snapchat, wechat or facebook messenger instead of downloading an App or web brower. Then I chose to implement it with FB messenger.
I got the main idea of design from professor Zhou Yu's paper[1]. Due to short time, I simplify some part of it. The flow chart is as follows:</br>
![dialogsystem_flow_chart](https://user-images.githubusercontent.com/21259611/35221216-36b73692-ff2e-11e7-9acf-028526952476.png)</br>


## Implement & Deployment

## Results
## Problems I faced
## Future Work
1. multi user
  use DB in memory, redis or mongoDB

2. using nlg module to generate better sentences

3. using pos tagger to replace nlp

## Refer
[1] Zhou Yu, Alexandros Papangelis, Alexander Rudnicky, TickTock: Engagement Awareness in a non-Goal-Oriented Multimodal Dialogue System, AAAI Spring Symposium on Turn-taking and Coordination in Human-Machine Interaction 2015.
