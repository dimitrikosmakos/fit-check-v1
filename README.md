# FitCheckV1 - Team 0311

## Release Notes

### Version 5.1 Software Features
1. FitCheck now has a social media component! Users can now "Get Connected" and add friends, see friends' fits, as well as view their own fits side by side.
2. When submitting an outfit to get advice, alongside their results, users will see 3 recommended outfits related to their submitted outfit.
3. The new outfit recommendations are linked to the fashion site they are from. With a click, users are taken to the site where they may purchase the article of clothing.

### Bug fixes since last
1. Fixed outfit rating algorithm to be more precise and accurate.
2. Added user feedback feature to notify them of incorrect username/password

### Known bugs/limitations
1. Non-fashion-related queries on the GetInspired page can lead to unexpected application behavior
2. Tags and descriptions on the GetAdvice page are required fields, else the rating of the outfit will not show
3. Outfit recommendations are limited to one site and is restricted in range.
4. Inability to edit profile and account settings

## Install Guide

### Prerequisites
1. Node.js (Version 10+) must be installed on your local machine. For instructions on how to download the latest version, visit: https://nodejs.org/en/download/
2. Python (Version 3+) must be installed on your local machine. For instructions on how to download Python, visit: https://www.python.org/downloads/ 
3. Conda must be installed on your local machine. For installation instructions, visit: https://conda.io/projects/conda/en/latest/user-guide/install/index.html
4. Flask must be installed. To do this, if you have `pip` on your machine (should be installed along with Python), run `pip install flask` 
5. pyTorch must be installed. To install pyTorch, after installing Conda on your machine, run `conda install pytorch torchvision torchaudio -c pytorch`

### Dependent Libraries
1. All additional dependencies for the frontend and backend of the application are listed under the requisite `package-json` files and can be installed by navigating to the required directories and running `npm install` (detailed in the run instructions)
2. For the AI system to run on a local machines, users will need a `dependencies.zip` file that can be obtained by contacting fitcheckteam@gmail.com separately

### Download Instructions
1. Users can download the application either by cloning the public repository under https://github.com/DeclanNelson178/fit-check-v1, or by extracting the repo as a zip file

### Installation/Run Instructions

#### Frontend
1. Navigate to the client directory by running `cd client`
2. To install the required dependencies (only needs to be performed on first time use), run `npm install`
3. From here, run `npm start` and the app should be running on http://localhost:3000

#### Backend
1. In a separate terminal, navigate to the server directory by running `cd server`
2. To install the required dependencies (only needs to be performed on first time use), run `npm install`
3. From here, run `node index.js` and the server should start listening on port 5000 and be connected to MongoDB

#### AI

##### First Time Setup
1. NOTE: This installation process requires Conda AND Flask installed on your machine. If you do not have this requirement, install both before proceeding
2. Download the `dependencies.zip` file provided separately (this may take some time) and place the extracted folder into the AI folder
3. Next, navigate into the AI folder by running `cd AI`
4. Now, run `conda create --name fitcheck`
5. Then, run `conda activate fitcheck` (or `source activate fitcheck`) to enter the virtual env
6. If pyTorch is not installed, run `conda install pytorch torchvision torchaudio -c pytorch`
7. After this, navigate to mmfashion by running `cd mmfashion`
8. Next, run `python setup.py install`
9. If you do not already have Flask installed, run `pip install flask`
10. Finally, to start the AI server, run `python app.py`

##### Run Each Time
1. `conda activate fitcheck`
2. `python app.py`

#### Troubleshooting
1. If the frontend does not render, make sure all React dependencies are properly installed by running `npm install depency_name`
2. If the backend is unresponsive, make sure that all required fields within request bodies are properly inputted from the client-side
3. If the AI is not running or returning responses correctly, make sure the dependencies.zip file is extracted and all the folders are in their correct location.
