
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
It is wrote in Node.js. Although this is my first time writing Node.js project, I find Node.js is friendly and easy to use. It is non-blocking, event-driven I/O paradigm. Besides, it has a lot of package(like python's library) for us to use.</br>
I use wit.ai as my nlu/nlp module due to short time, which belongs to facebook. I input some sample data and train it to recognize the information I need.</br>
![image](https://user-images.githubusercontent.com/21259611/35221914-dd1993fc-ff30-11e7-9932-427e7bee8e86.png)</br>
![image](https://user-images.githubusercontent.com/21259611/35221977-1ba485be-ff31-11e7-9a4b-9aa08bfb13f9.png)</br>

I just use some templates to generate the response. The scenarios are as follows:</br>
![dialogsystem_flow_chart2](https://user-images.githubusercontent.com/21259611/35222850-2728bd94-ff34-11e7-806d-3e4e2e52c5b8.png)</br>

Firstly, I deployed it on glitch. However the Node.js version of it is too old. Then I tried DigitalOcean and AWS EC2(education), and I failed at all. Now, I use my local machine + ngrok to run the server.</br>
## Results
Results are as follows:
![411516628744_ pic_hd](https://user-images.githubusercontent.com/21259611/35223801-9019e7c6-ff37-11e7-9d91-63c76f8d534f.jpg)</br>
![421516628744_ pic_hd](https://user-images.githubusercontent.com/21259611/35223803-906c6b72-ff37-11e7-9327-65905cf5fa57.jpg)</br>
![431516628745_ pic_hd](https://user-images.githubusercontent.com/21259611/35223804-92f40562-ff37-11e7-93d6-28107f80ba52.jpg)</br>
![441516628746_ pic_hd](https://user-images.githubusercontent.com/21259611/35223808-95f1d820-ff37-11e7-85e8-003613565123.jpg)</br>
![451516628746_ pic](https://user-images.githubusercontent.com/21259611/35223812-9833413c-ff37-11e7-8dcf-336156ec46f5.jpg)</br>
The signial of ending the session is user send a bye greeting to bot.</br>
## Future Work
### 1. Support multi user;
  Use DB in memory, redis or mongoDB</br>

### 2. Use nlg module to generate better sentences;

### 3. Add more options for users to check weather details;

### 4.  Try design and implement nlu part;

## Refer
[1] Zhou Yu, Alexandros Papangelis, Alexander Rudnicky, TickTock: Engagement Awareness in a non-Goal-Oriented Multimodal Dialogue System, AAAI Spring Symposium on Turn-taking and Coordination in Human-Machine Interaction 2015.
