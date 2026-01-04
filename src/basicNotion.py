#basicNotion.py 
#jan 3 2026

#This is just an example of what an API would give you when you query Notion API. It pretty much just resembles JSON format

#This data structure is called a dictonary or some people call it an associatative array but they mean the same thing
#basics of a dictionary is that it has key value pairs. You can access the value by using the key
# An key can be anything in python like a string or an integer and you remember that array "keys" are just integers starting from 0
simplfifiedOutputTable = {
    "userID": 13456767, 
    #This is dictionary in a dictionary. Or you could say a nested dictionary
    # and this will be the made up structure and content of a Notion page
    "page" : {
         "pageID": "hdjkfswhefuewfhd343456564534465",
        "title" : "My Homework",
        "CreatedOn" : "2026-01-03",
        "LastEdited" : "2026-01-03",
        #Another nested dictionary
        "content" : {
           "type" : "string", #just a regular data type like you know str = "Hello"
           "content": "This is my First heading"
        }
    }
}

#alright thats enough for the dictonary dont want it to be too complicated now lets create a pseudo app type thing simplified from what i showed you yesterday
#____________________________________________________________________________________
# Helper Methods

#complete dummy method just to help u visualize what im doing in callAPI func
def getNotionData():
    #This is where you would normally call the Notion API and get the data
    #But for this example, we will just return the simplifiedOutputTable
    return simplfifiedOutputTable

def callAPI():
    try:
        #Simulate calling the Notion API
        data = getNotionData()
        print("Data retrieved successfully:")
        processData(data)
    except Exception as e: #bascially if an error occurs while calling the API
        #we "catch" the error so it doesnt break the whole program and we print why it failed so we can know and fix it later
        print("An error occurred while calling the Notion API:", str(e))

def processData(data):
    #This is where we'll process the data that we receieved from the Notion API
    print("Processing Data...")
    # For this example im just going to print out everything in the data dictionary and make it look clean
    #You can do this 1 of 2 ways either access each key value pair individually or loop through the dictionary
    #Imma do it individually for this example
    #data["key"] is used to access the value associated with "key" in the dictionary data
    #similar to array[0] returns the first element in an array
    print("User ID:", data["userID"])
    page = data["page"]
    print("Page ID:", page["pageID"])
    print("Title:", page["title"])
    print("Created On:", page["CreatedOn"])
    print("Last Edited:", page["LastEdited"])
    content = page["content"]
    print("Content Type:", content["type"])
    print("Content:", content["content"])


#____________________________________________________________________________________
#This will be our "main" function kinda like in Java. This will be our main injection point or in python its called an "Entry Point" (meaning u can start the program from only 1 place its this func lmao) I'm just tryna teach you terminology random ass saying yk and if ur even reading ts lmk fr
#Enough of that. What Im gonna do here is this: call all of my helper methods we made above 
def app():
    callAPI()
#Then we just call the app function to see the results and we done gng

app()



#if you want a challenge ig what id suggest is adding a "user" layer where youy can use the command line to take input from the user and output what they asked for. for exmapkle:  Press 0 for Page Heading :and it returns: My Homework 
