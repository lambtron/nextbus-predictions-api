Nextbus Predictions API
===========

Light-weight API to retrieve muni prediction times.

All pay loads are `Content-type: application/json`.

## Endpoint:

http://nextbus-predictions.herokuapp.com/api/predictions/

## Request:
```bash
curl -X POST
     -H "Content-type: application/json"
     -d '{"stops": [{"route": "2", "stopTag": "6608"}]}'
     http://nextbus-predictions.herokuapp.com/api/predictions
```

Or,
```javascript
{
  "stops": [
    {
      "route": "2",
      "stopTag": "6608"
    }
    // etc.
  ]
}
```

## Response:
```javascript
[
  {
    "timeUntilArrival": 15,   // In minutes.
    "stopTitle": "Sutter St & Scott St",
    "routeTitle": "2-Clement"
  },
  {
    "timeUntilArrival": 33,
    "stopTitle": "Sutter St & Scott St",
    "routeTitle": "2-Clement"
  }
]
```