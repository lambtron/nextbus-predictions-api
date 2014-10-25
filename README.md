Nextbus API
===========

Light-weight API to retrieve muni prediction times.

All pay loads are

Content-type: application/json

Endpoints:

/api/predictions/

Request:
```javascript
{
  stops: [
    { route: '2', stopTag: '6608' },
    { route: '3', stopTag: '6592' },
    { route: '38', stopTag: '4761' },
    { route: '38L', stopTag: '4294' }
  ]
}
// or
{
  stops: [
    { route: '2', stopTag: '6608' }
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