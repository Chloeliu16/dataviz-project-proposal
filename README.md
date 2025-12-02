# 🎬 IMDB Top 250 Movies Visualization  
**Exploring Movie Trends through Interactive Visual Analytics**

---

## Overview  

This project visualizes data from **the IMDB Top 250 Movies dataset**, exploring patterns across multiple movie attributes, including **ratings, genres, release years, runtimes, and other relevant features**.

Through interactive D3 visualizations, the dashboard allows users to explore how movies across different decades compare in popularity, length, and audience reception — and how these characteristics have evolved over time.

Users can switch between five visualizations using tabs at the top. Each chart highlights a different perspective, supported by filters, tooltips, legends, and trend lines.


## Motivation  

Movies are cultural artifacts reflecting artistic trends and audience preferences. This project explores:

   · How ratings, genres, and runtimes vary across decades
   
   · Which eras produced the highest-rated films
   
   · Storytelling patterns within highly acclaimed movies

The goal is to create intuitive, interactive visual analytics for both film lovers and data enthusiasts.

---

## Dataset  

**Dataset:** [IMDB Top 250 Movies Dataset (Kaggle)](https://www.kaggle.com/datasets/rajugc/imdb-top-250-movies-dataset)  
**Original Source:** [IMDB Top 250 List](https://www.imdb.com/list/ls513400350/?sort=user_rating%2Cdesc)  

**Attributes:**  
- `title`, `year`, `rating`, `genre`, `runtime`, `director`, `writer`  
- ⚠️ The dataset also includes `budget` and `box_office`, but these are excluded due to inconsistent currency conversion.

---

## Process and Methods  

1. **Data Preparation**  
   - Cleaned missing values and normalized text formats.  
   - Removed unreliable numeric fields (`budget`, `box_office`).  

2. **Visualization Design**  
   - Used **D3.js** on [VizHub](https://vizhub.com) for creating interactive charts.  
   - Implemented hover tooltips, genre legends, and decade filtering for an intuitive exploration experience.  

3. **Deployment**  
   - Published each visualization directly on VizHub for interactive web viewing.  

---

## Key Visualizations and Analysis  

This dashboard presents five interactive visualizations based on the IMDb Top 250 Movies dataset. Users can switch between the charts using the tabs at the top of the page. Each visualization offers a different perspective on the data—from exploring relationships between ratings, runtimes, and release years, to examining genre distributions and identifying the most prominent years and films through a hierarchical tree. Interactive features such as filters, tooltips, legends, and trend lines allow users to explore the dataset in a detailed and intuitive way.

### Live Demo:
**Week 14: IMDB Top 250 Movies – Interactive Visualization Dashboard**
[View on VizHub →](https://vizhub.com/Chloeliu16/0eff415f8619464fa12ff1f995a8341d)

**Plot1: IMDB Top 250 Movies Scatter Plot: Rating vs. Runtime**

This scatter plot illustrates the relationship between movie ratings and runtimes within the IMDb Top 250 dataset. The horizontal axis represents the rating, while the vertical axis shows the runtime. A decade-based filter on the right allows users to explore how movies from different eras are distributed. The interactive legend highlights the distribution of each genre and displays its corresponding regression line when hovered over. Additionally, hovering over any data point reveals detailed information about the movie it represents, including the title, director, and release year, making the exploration more informative and intuitive.
<br>
<img width="1212" height="634" alt="image" src="https://github.com/user-attachments/assets/b2a9b3cf-64df-4134-909f-586bf76da080" />
<br>
<img width="1214" height="640" alt="image" src="https://github.com/user-attachments/assets/1340c8e7-8286-4a59-b48f-2c3513e2c98a" />
<br>
<img width="1218" height="640" alt="image" src="https://github.com/user-attachments/assets/8a894ab0-3859-4f44-ba99-d75fe6773344" />
<br>

**Plot2: IMDB Top 250 Movies Scatter Plot: Year vs. Rating**

This scatter plot shows how movie ratings in the IMDb Top 250 vary across different release years. The horizontal axis represents the release year, while the vertical axis shows the movie rating. A decade-based filter on the right allows users to explore the distribution of movies within each ten-year period. By clicking the “Show Trend Lines” button, users can display the average rating of each genre for every decade, providing a clear view of long-term trends. Additionally, hovering over any genre in the legend highlights the distribution of movies belonging to that genre, making it easier to compare how different genres perform over time.
<br>
<img width="1218" height="640" alt="image" src="https://github.com/user-attachments/assets/b77dd70e-7da6-4dd0-94c4-ee0f909530db" />
<br>
<img width="1220" height="634" alt="image" src="https://github.com/user-attachments/assets/6d818423-131e-45bc-bc8e-1fc9f94e0eea" />
<br>
<img width="1220" height="638" alt="image" src="https://github.com/user-attachments/assets/c260835a-db2a-4423-954d-e82f08b8c721" />
<br>

**Plot3: IMDB Top 250 Movies – Distribution of Movie Runtimes**

This stacked bar chart visualizes how movie runtimes are distributed within the IMDb Top 250. The horizontal axis represents runtime, while the vertical axis shows the number of movies. Each bar is divided into colored segments that correspond to different genres, allowing a clear comparison of genre composition across runtime ranges. Hovering over any segment reveals detailed information, including the specific genre and the number of movies it contributes. As with the other charts, the decade-based filter on the right enables users to explore how runtime distributions vary across different time periods.
<br>
<img width="1216" height="624" alt="image" src="https://github.com/user-attachments/assets/cb1a6110-57f9-4a89-9c20-fdf4489c6efd" />
<br>
<img width="1214" height="634" alt="image" src="https://github.com/user-attachments/assets/081d4f78-33f6-4c8d-9f15-c5d0cd824858" />
<br>

**Plot4: IMDB Top 250 Movies Bar Chart: Genre vs. Count**

This bar chart presents the number of movies in each genre within the IMDb Top 250 dataset. The horizontal axis shows the genres, while the vertical axis represents the movie count. When hovering over any bar, the chart displays both the exact number of movies and the percentage that genre contributes to the entire dataset. As with the other visualizations, a decade-based filter on the right allows users to explore how genre distributions shift across different ten-year periods.
<br>
<img width="1214" height="630" alt="image" src="https://github.com/user-attachments/assets/1aef14a8-3586-4001-9bd8-18850cd4a6c0" />
<br>
<img width="1218" height="634" alt="image" src="https://github.com/user-attachments/assets/6a874ff2-69ab-433d-a65a-a6d6d32283d3" />
<br>

**Plot5: IMDB Top 250 Movies – Hierarchy Tree**

This hierarchical tree visualization highlights the ten years with the highest number of movies in the IMDb Top 250. The first level displays the selected years, the second level breaks each year down by genre, and the third level lists individual movie titles within each genre. This structure allows users to quickly understand which years contribute most to the dataset and how genres and specific films are distributed within those peak years.
<br>
<img width="1196" height="642" alt="image" src="https://github.com/user-attachments/assets/f6256424-7f32-4dc5-887f-fbcdc4ca9983" />
<br>



## Insights and Takeaways  

Across all five visualizations, several consistent patterns emerge from the IMDb Top 250 dataset:

**1. Runtime Patterns Are Highly Consistent**
Most high-rated movies fall within 80–180 minutes, with the most common range around 120–140 minutes.
This trend remains stable across genres and decades, suggesting that the two-hour format is a universally preferred storytelling length.

**2. Ratings Show Strong Central Clustering**
The majority of films are tightly clustered between 8.1 and 8.4 on IMDb.
Ratings above 9.0 are rare and scattered across decades, indicating that exceptionally high ratings are outliers rather than tied to specific periods or genres.
Decade-based trend lines confirm that audience scoring behavior has remained consistent over time.

**3. Drama Dominates the Top 250**
Drama is by far the most frequent genre in the dataset.
This reflects the enduring appeal of emotionally driven, narrative-focused films and their consistent recognition in top movie rankings.

**4. Genre Diversity Expands After the 1990s**
Hierarchical and distribution visualizations show that movie genres become more varied in the late 20th century.
The post-1990 era features a broader mix of genres, reflecting evolving audience interests and film industry growth.

**5. Certain Years Contribute Disproportionately**
The hierarchy tree highlights the top ten most productive years, showing that certain periods (e.g., mid-90s and early 2000s) produced an unusually high number of highly rated films.
Within these peak years, genre dominance varies, with Drama remaining central but accompanied by increasingly diverse genres.

---

## Future Work  

- In future work, I plan to retrieve the country of origin for each movie and visualize the geographic distribution of the IMDb Top 250 on an interactive world map. This will allow users to explore which regions produce the most highly rated films.

---

## Credits  

**Author:** Xiaojun Liu  
**Course:** CS573 – Data Visualization  
**Tools:** D3.js, VizHub, JavaScript, HTML, CSS  
**Data Source:** Kaggle IMDB Top 250 Dataset  

---

## Short Demo Video  

> (https://youtu.be/lbzzqHFfRU0) 
> In this 6-minute walkthrough, I introduce the dataset, highlight interactive features, and summarize the main findings from the IMDB Top 250 movie analysis.

---
