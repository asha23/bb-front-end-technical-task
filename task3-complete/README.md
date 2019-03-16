# Method

Used ```create-react-app``` to get this built quickly

Run ```yarn``` To pull dependencies into place.

Used Bootstrap 4 for styling and react-router-dom for the paging - Axios was used to pull the data although fetch() could easily have been used - Something like:

```
fetch('./data.json')
      .then(response => response.json())
      .then(result => { ....
```

## To run the local server

```yarn start```

The production build is in the ```/build``` folder

This project took 5 hours to complete. Why? Because I needed to research the best way to pull in the json files supplied. Could have used fetch. But it wasn't quite working for me. So I thought I'd look into a better way. Axios. Which I'd not used before. 

Kind of wanted to teach myself the best way to approach it. Do it properly. Problem solve that s**t.

## Improvements

There could be a slightly nicer way of transitioning between page states, it's a bit FOUC-y... Also it would be good to have some form of loading notification as this is pulling content from an external source.

Add a comments form so that comments could be added to each post.

Text based search.

