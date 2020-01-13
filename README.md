# Welcome to Spider Graph.

The following endpoints are available for use. This backend is designed to work with the data structure from [https://www.chartjs.org/docs/latest/charts/radar.html]

### Base URL = [https://spider-graph-bw.herokuapp.com/api]

### How to use:

| Request | Endpoint                   | Requires                          | Returns           |
| ------- | -------------------------- | --------------------------------- | ----------------- |
| GET     | `/graphs/:userid`          | N/A                               | All users' graphs |
| POST    | `/graphs/:userid`          | Full Object (See below)           | All users' graphs |
| DEL     | `/graphs/:userid/:graphid` | N/A                               | Remaining graphs  |
| POST    | `/auth/register`           | Username and Password             | Confirmation      |
| POST    | `/auth/login`              | Username and Password             | Token             |
| GET     | `/users/:userid`           | Authorization: Token (In headers) | All Users' graphs |

### Full Object Required by Endpoints

```javascript
{
    "title": "<Must be unique>",
    "description": "This is a description",
    "labels": [
      {
        "label": "Label 1"
      },
      {
        "label": "Label 2"
      },
      {
        "label": "Label 3"
      },
      {
        "label": "Label 4"
      },
      {
        "label": "Label 5"
      }
    ],
    "datasets": [
      {
        "dataset_label": "Dataset Label 1",
        "data": [
          {
            "value": 25
          },
          {
            "value": 55
          },
          {
            "value": 44
          },
          {
            "value": 32
          },
          {
            "value": 65
          },
          {
            "value": 22
          }
        ]
      },
      {
        "dataset_label": "Dataset Label 2",
        "data": [
          {
            "value": 68
          },
          {
            "value": 82
          },
          {
            "value": 36
          },
          {
            "value": 17
          },
          {
            "value": 49
          },
          {
            "value": 75
          }
        ]
      }
    ]
  }

```

### Todo:

Requires similar functionality as the ADD, but is not operational.
