Let's Celebrate Application 

When user opens application, render a home screen where user names parameter selections for country and month in order to find an international holiday, both displayed from dropdown menus. Then after making selection, home screen will feature a map, and the correspondng country will be highlighted/show some sort of indicator of country selection. (Map will be merely display/educational, not a link)

Then the user will submit these parameters via event listener.

Then the list of holidays associated with that country and month will populate below the home screen. These holidays will be displayed as buttons or any on-click event listener. 

When a holiday is selected via click, a parameter selection will append below that requires user to select relevant culture data in the form of recipes or restaurants from mealDB API and Zomato API (AJAX calls):

    If user selects recipes, 
    Then a list of recipes retrieved from API will display. The recipes will contain title of dishes and photos (any other available information). Each recipe will be contained in a card. 
    Then a user selects a chosen recipe by event listener added to image or title, the ingredients and cooking instructions will appear in a prepended div below.


    If user selects restaurants, 
    The user will be required to enter a city and state and gather restaurants within that cuisine.
    Then a list of restaurants retrieved from API will display in a list. Each restaurant listing will contain name, hours, rating, address, price range, link to restaurant. 

Createa toggle to switch to recipes if within restaurant view and another toggle to switch to restaurants if within recipe view. 

