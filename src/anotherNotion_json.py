#Unlike our last file this file is going to read the data from a JSON file 
# instead of a dictionary defined in the code.

#This is a python package for working with JSON data
# This package provides functions to read, write, and manipulate JSON data.
#Right here we are physically importing all of the functions associated with the package
import json

json_FilePath = "./src/pseudoOutput.json"

#This function reads a JSON file and returns the data as a Python dictionary
#This is our pseudo API call function
#But instead of queuring an actual API we are fetching data from a local JSON file
#this is good practice because in real world applications APIs often return data in JSON format
def callAPI(file_path):
    #try block ensures "graceful" failure. it handles errors like 
    # "what if the file doesn't exist?"
    try:
        #the `with` statement ensures the file is properly opened and closed after its suite finishes
        #it also enures that the file is received before computing further operations
        #the arguments are the file path (where the JSON file exists) and the 
        # 'r' means read mode (we are only reading the file not writing to it)
        with open(file_path, 'r') as file:
            #read file
            #json.load() function returns a dictionary jusy like we worked with in
            # basicNotion.py
            data = json.load(file)
        return data
    #except block catches specific errors that may occur during file operations
    # FileNotFoundError handles the case where the specified file does not exist
    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return None
    # JSONDecodeError handles the case where the file content is not valid JSON
    except json.JSONDecodeError:
        print(f"Error: The file at {file_path} is not a valid JSON file.")
        return None
    #And None is the python equivalent of null in other languages such as java
    
    #paring data is the process of extracting and organizing relevant information from raw data
def parseJSON(data):
    #making sure our data parameter exists
    if data is None:
        print("No data passed")
        return None
    #try block to handle potential errors during parsing
    # part of our "fail gracefully" mindset
    try:
        for key, value in data.items():
            print(f"{key}: {value}")
    #broad exception handling just to catch any unexpected errors during parsing
    #there shouldn't be though because we iterating through a dictionary rather than
    # accessing specific keys like in basicNotion.py
    # e.g. data["userID"] if "userID" key didnt exist it would throw an error
    except Exception as e:
        print("An error occurred while parsing the JSON data:", str(e))

#Main Application Logic
#This is main function (e.g. main method in java) it is our 
# entry point for the application
def app():
    data = callAPI(json_FilePath)
    parseJSON(data)

# runs the code
app()

