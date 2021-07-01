Fullstack Weather App

Will be using https://openweathermap.org/api to get current weather
Sign up for an api key. Click subscribe then choose the Free option.
Click API keys and copy the key. You will need the key for the Axios call.
Go to https://openweathermap.org/current and read how to make calls for one location by city name. Follow their format and Examples of API calls.
Use create-react-app and express-generator to setup skeleton for the frontend and backend
Use .env to hold important information! (API key should be in .env)
* In React's .env must use REACT_APP_

Frontend-
Similar setup to the todo app as a Weather App. Remember to make different components based on functionalities below:
1. Should have an input text to search for weather based on location

2. After you enter the location and search:
   * The current weather will display below with the name of the location searched, country, description and temperature in Fahrenheit or Celsius (API call will return in Kelvin unless you add the units parameter).
 <!-- For temperature in Fahrenheit use units=imperial
    
    api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
 
  -->


   * If the location does not exist, display and error message with location does not exist.


   * The location name will be saved to the backend and it will popup on the left or right side of the page under- Recently Searched Locations (list).

3. Each location in Recently Searched Locations :
   * Will have a delete option and removes the item off the list
Extra Credit: Each location under the recently searched locations are clickable and when you click on it, the weather will update to that location.