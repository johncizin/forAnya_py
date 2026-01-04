# 🚨 READ THIS FIRST: skim through desc is cool but do the walkthrough I think it'll help you

## Table of Contents:
- [Quick Description](#quick-description)
- [Walkthrough](#-walkthrough)
    - [basicNotion.py](#basicnotionpy)


# Quick Description:
## File: <a href = "https://github.com/johncizin/forAnya_py/blob/main/src/basicNotion.py"> basicNotion.py </a>
- This file reads the data from a table created in the file. It simulates and API call from your computer to Notion's computer. **Notion is simply the example but all applications have an API (Application Programming Interface) that allows it to talk to other programs, while encapsulating its own data.**
## File: <a href = "https://github.com/johncizin/forAnya_py/blob/main/src/anotherNotion_json.py"> anotherNotion_json.py
- This python file reads data from an existing <a href="https://github.com/johncizin/forAnya_py/blob/main/src/pseudoOutput.json"> JSON file included in this repo. </a> **JSON (JavaScript Object Notion) is a human-readable text format commonly used when exhanging data, e.g. calling an API it returns a JSON formatted data. Just think of it as a specific language that some API's use to talk to each other.**

# 🟢 Walkthrough
## basicNotion.py
### Data Structure of File (Dictionary):
<p align="center">
    <img src="./imgs/basicNotion_DataModel.png" alt="basicNotion_DataModel Image"> 
</p>

> *This UML-style diagram models the nested dictionary structure returned by the simulated API call.*
In Python Code:
```python
    integers starting from 0
simplfifiedOutputTable = {
    "userID": 13456767, 
    "page" : {
         "pageID": "hdjkfswhefuewfhd343456564534465",
        "title" : "My Homework",
        "CreatedOn" : "2026-01-03",
        "LastEdited" : "2026-01-03",
        "content" : {
           "type" : "string",
           "content": "This is my First heading"
        }
    }
}
```


### Function Explanations:
#### getNotionData()
```python
def getNotionData():
    #This is where you would normally call the Notion API and get the data
    #But for this example, we will just return the simplifiedOutputTable
    return simplfifiedOutputTable
```







