## RF Gym
A more efficient gym experience

## Motivation
In the gym of the future, members can swipe an RFID tag on some equipment (e.g. bench press) and that will mark that equipment as busy. With sensors, equipment can then be marked as free when the member walks away from it. 

The purpose of this project is to provide gym members with the ability to check equipment status remotely (e.g. check if bench press currently in use) and to collect and curate equipment usage / workout history data.
 
## Screenshots
Login / Register Page
![Demo-01](https://github.com/justinjose7/rf-gym/blob/master/readme_assets/01-home-screen.png)

Live Equipment Status Page (implemented using websockets) 
![Demo-02](https://github.com/justinjose7/rf-gym/blob/master/readme_assets/02-equipment-status.png)

Equipment History Query Page (personal gym history)
![Demo-03](https://github.com/justinjose7/rf-gym/blob/master/readme_assets/03-equipment-history.png)

![Demo-04](https://github.com/justinjose7/rf-gym/blob/master/readme_assets/04-equipment-history-query.png)

Overall Equipment Statistics Page (all gym members' equipment usage) 
![Demo-05](https://github.com/justinjose7/rf-gym/blob/master/readme_assets/05-equipment-charts.png)

Live Demo
![RF Gym Demo](https://github.com/justinjose7/rf-gym/blob/master/RF%20Gym.gif)

## Tech / Frameworks used
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)

## Features
- Log in/Register/Sign out
- Queue user onto equipment / dequeue user from equipment (via API post request)
- View live status of equipment
- Query personal workout history (filter by equipment  name or date range)
- Query total time an equipment is used in a date range (data illustrated using charts)
- Query total time equipment is used grouped by day of the week (for a given date range)
- Query total time equipment is used grouped by  hour of the day (for a given date range)

## Requirements
- [Node](https://nodejs.org/)

## Installation
To test locally, clone the repo. Then in that folder call:
```
npm install
pm2 start npm -- start && pm2 start server/server.js
```
The website will then be available at http://localhost:3000/

## Creating fake data for gym history
Run the script found in the 'pseudo_data_script'. You will need to uncomment the database url.

Running this script will insert 25 fake users, 15 fake pieces of equipment, and approximately 4800 history entries (from one month ago until now).
```
node generatePseudoData.js
```

## How to use?
Follow steps in installation and then open http://localhost:3000/ on a browser.

## Credits
Project idea inspired by James Ngai, Cooper Union '18.
