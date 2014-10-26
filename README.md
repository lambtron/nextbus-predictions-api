Nextbus API
===========

Light-weight API to retrieve muni prediction times.

All pay loads are

Content-type: application/json

Endpoints:

/api/predictions/

Request:
```bash
curl -X POST -H "Content-type: application/json" -d '{"stops": [{"route": "2", "stopTag": "6608"}]}' http://nextbus-predictions.herokuapp.com/api/predictions
```


Response:
```javascript
[
  [
    {
      "timeUntilArrival": 15,
      "stopTitle": "Sutter St & Scott St",
      "routeTitle": "2-Clement"
    },
    {
      "timeUntilArrival": 33,
      "stopTitle": "Sutter St & Scott St",
      "routeTitle": "2-Clement"
    }
  ]
]
```