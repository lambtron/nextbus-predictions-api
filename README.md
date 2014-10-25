Nextbus API
===========

Light-weight API to retrieve muni prediction times.

All pay loads are

Content-type: application/json

Endpoints:

/api/predictions/

Request:
```
{
  stopId: [6526]
}
// or
{
  stopId: [
    6524, 5837, 5839, 3472
  ]
}
```


Response:
```javascript
{
  stops: [
    id: 6462,
    route: 2,
    title: 2L,
    predictions: [
      8, 18, 28, 38
    ],
    id: 4762,
    route: 3,
    title: 3L,
    predictions: [
      2, 12, 22, 32
    ]
  ]
}
```