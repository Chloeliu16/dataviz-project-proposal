# Data Visualization Project
# From Week 10
For older progress logs (Week 5 - Week 9), please see the [ARCHIVE.md](./ARCHIVE.md) file.
## Data

The data I propose to visualize for my project is the **IMDB Top 250 Movies Dataset**.  

- **Source URL:** [IMDB Top 250 Movies Dataset](https://www.kaggle.com/datasets/rajugc/imdb-top-250-movies-dataset)  
- **Original Source URL:** [IMDB List of Top 250 Movies](https://www.imdb.com/list/ls513400350/?sort=user_rating%2Cdesc)  

The dataset contains attributes such as movie title, year, rating, genre, runtime, directors, and writers.  

⚠️ Note: Although the dataset includes `budget` and `box_office`, these values are not consistently converted to USD (some are synthetic or in other currencies). To avoid misleading results, I will not use these two fields. 

## Vizhub link
https://vizhub.com/Chloeliu16/c9f5883d81b3488585f8b478b9bbfcdd
https://vizhub.com/Chloeliu16/cfa35d0c6f0a4453ac5300baf637f675
https://vizhub.com/Chloeliu16/7dcc7f3e9e814f5b94d91f0ebb401adc


## Prototypes

**Week10 Updates:**

This week, I continued developing my IMDB Top 250 Movies visualizations and focused on adding more interactive and analytical features based on this week’s theme of interaction.

**vizhub link:**
https://vizhub.com/Chloeliu16/c9f5883d81b3488585f8b478b9bbfcdd
https://vizhub.com/Chloeliu16/cfa35d0c6f0a4453ac5300baf637f675
1. **Week 10: IMDB Top 250 Movies Scatter Plot: Rating vs. Runtime**
This is a newly created visualization for Week 10.
Users can now hover over items in the legend to highlight the corresponding movie genre.
When hovering over individual circles in the chart, a tooltip appears showing the movie title, director, and release year.
This interaction makes the visualization more engaging and informative, allowing users to explore genre-specific runtime and rating patterns more intuitively.
<img width="1706" height="884" alt="image" src="https://github.com/user-attachments/assets/7de019f2-4ae9-4b7d-aa01-d65381c0b81d" />
<img width="1712" height="892" alt="image" src="https://github.com/user-attachments/assets/9fed5deb-1f0b-454d-b9d6-a14f8a816a70" />

2. **Week 10: IMDB Top 250 Movies Scatter Plot: Year vs. Rating (Updated)**
In this updated version, I added trend lines showing the average rating per genre by decade.
Each line can be clicked to highlight it, which also displays the average rating values for each decade.
<img width="1708" height="880" alt="image" src="https://github.com/user-attachments/assets/ac88ace5-42e8-4fe5-845c-5374255bf324" />

**Week11 Updates:**

During Week 11, I focused on enhancing the interactivity and usability of the IMDB Top 250 Movies visualizations. Two major improvements were made:
1. A decade-based filtering control was added to the scatter plot, allowing users to explore movie runtime and rating patterns across different time periods.
2. A numeric feedback feature was implemented in the histogram, where hovering over each genre in the legend now displays the corresponding number of movies in each bar.
These updates make the visualizations more dynamic and informative, enabling users to better understand temporal and categorical trends within the dataset.

**vizhub link:**

https://vizhub.com/Chloeliu16/b0f5116303cd4a01abb0209703eb4f63
https://vizhub.com/Chloeliu16/7dcc7f3e9e814f5b94d91f0ebb401adc

1. **Week 11: IMDB Top 250 Movies Scatter Plot: Rating vs. Runtime**
<img width="922" height="482" alt="image" src="https://github.com/user-attachments/assets/e8c71171-c4f1-4ddd-96e7-0a6cf65d21a9" />

In this scatter plot, I added a “Filter by Decade” dropdown menu (covering the 1920s–2020s).
When a user selects a specific decade, the visualization dynamically updates to show only movies released during that period.
This addition allows users to easily analyze how movie length and rating distributions have evolved over time.

2. **Week 11: IMDB Top 250 Movies Histogram: Distribution of Movie Runtimes by Genre**
<img width="900" height="478" alt="image" src="https://github.com/user-attachments/assets/f2bee0fe-9a6f-437f-8757-710ab4b73ce5" />

For the histogram, I enhanced the legend hover interaction to include real-time numeric information.
When hovering over a genre in the legend, the corresponding bars are highlighted, and each bar now displays the exact number of movies directly on top.
This provides a clearer understanding of how each genre contributes to different runtime intervals, improving both readability and analytical insight.

**Week13 Updates:**
During Week 13, I made significant improvements to my IMDB Top 250 Movies visualization project based on the feedback provided by a classmate. First, I consolidated all previously created visualizations into a single VizHub file to provide a more organized and cohesive presentation. This restructuring made the entire dashboard easier to navigate and more consistent in style.

For the Year vs Rating Scatter Plot, I added regression lines and enhanced the filter functionality to support more flexible and interactive exploration. I also refined the overall layout to ensure better spacing, alignment, and readability across all five visualizations. The user interaction experience has been improved through clearer hover effects, smoother transitions, and better color encoding.
      
The five visualizations included in the updated dashboard are:
      IMDB Top 250 Movies Scatter Plot: Rating vs Runtime
      IMDB Top 250 Movies Scatter Plot: Year vs Rating (with regression lines added)
      IMDB Top 250 Movies: Distribution of Movie Runtimes
      IMDB Top 250 Movies Bar Chart: Genre vs Count
      Hierarchy Tree: Year → Genre → Movie Structure
Overall, Week 13 focused on integration, refinement, and improved interactivity, resulting in a more polished and comprehensive data exploration tool.
<img width="1460" height="766" alt="image" src="https://github.com/user-attachments/assets/f4221f5b-8914-4885-b32a-6ed75e4a72dc" />

<img width="1462" height="754" alt="image" src="https://github.com/user-attachments/assets/045eb3c2-66bf-4c41-970a-92f8d0792fe7" />

<img width="1462" height="752" alt="image" src="https://github.com/user-attachments/assets/19e945db-85aa-48b2-b659-5debd4d5ec5e" />

<img width="1454" height="756" alt="image" src="https://github.com/user-attachments/assets/94a027ee-5cdd-4b33-92d1-65605cfe8cd8" />

<img width="1464" height="750" alt="image" src="https://github.com/user-attachments/assets/4075c448-862f-41e5-86f0-044864b4ab5b" />

## Open Questions

  
## Milestones
- **Week 10:** Enhanced interactivity by adding hover tooltips, legend highlighting, and clickable trend lines showing the average rating per genre by decade.  

