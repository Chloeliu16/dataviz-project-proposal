# Data Visualization Project

## Data

The data I propose to visualize for my project is the **IMDB Top 250 Movies Dataset**.  

- **Source URL:** [IMDB Top 250 Movies Dataset](https://www.kaggle.com/datasets/rajugc/imdb-top-250-movies-dataset)  
- **Original Source URL:** [IMDB List of Top 250 Movies](https://www.imdb.com/list/ls513400350/?sort=user_rating%2Cdesc)  

The dataset contains attributes such as movie title, year, rating, genre, runtime, directors, and writers.  

⚠️ Note: Although the dataset includes `budget` and `box_office`, these values are not consistently converted to USD (some are synthetic or in other currencies). To avoid misleading results, I will not use these two fields. 

## Vizhub link
https://vizhub.com/Chloeliu16/68fd63ab31834932859af2b8ef7f4c02
https://vizhub.com/Chloeliu16/cb22bf5cab0a4d40b838d6356dfe102a
https://vizhub.com/Chloeliu16/685348dea1dc481888dd4a025803bfdb
https://vizhub.com/Chloeliu16/53bdc8f9875141c484467cac71e70844
https://vizhub.com/Chloeliu16/bb0c18ce5f3d466080a4248f3730b779

## Questions & Tasks

The following tasks and questions will drive the visualization and interaction decisions for this project:

 * How do IMDb movie ratings vary over time?  
 * Which genres are most common among the Top 250 movies?  
 * How are movie runtimes distributed across this dataset?  
 * How do runtime and rating trends evolve across years and genres?
   

## Sketches

<img width="1024" height="778" alt="image" src="https://github.com/user-attachments/assets/89230aac-6683-4284-a2c5-c1fa5d1cc850" />
I envision the following visualizations:  

- **Scatter Plot (Year vs Rating):** shows how ratings evolve over time, with colors indicating genres.
  
- **Bar Chart (Genre vs Count):** shows the frequency of each genre in the Top 250 list.
  
- **Histogram (Runtime distribution):** shows how movie runtimes are distributed.
  
- **Bubble Chart (Year vs Runtime):** shows runtime trends over time, bubble size for rating, and color for genre.  


## Prototypes

I’ve created several proof-of-concept visualizations of this data:  

1. **IMDB Top 250 Movies Scatter Plot: Year vs Rating**  
   - X-axis: Year  
   - Y-axis: Rating  
   - Color: Genre
     <img width="1718" height="856" alt="image" src="https://github.com/user-attachments/assets/27cd7052-cfd4-4040-a640-c0f6854b9985" />
     link: https://vizhub.com/Chloeliu16/07adca18fdb8474cbddca2cea8df100d


2. **Week 5: IMDB Top 250 Movies Bar Chart: Genre vs Count**  
   - X-axis: Genre  
   - Y-axis: Count of movies  
   - Color intensity: based on count
     <img width="1716" height="868" alt="image" src="https://github.com/user-attachments/assets/7c188fbf-929c-45c4-9fd4-137915e15b2c" />
     link: https://vizhub.com/Chloeliu16/5991cbc470794158af8cd92b26dc511f


3. **Week 5: IMDB Top 250 Movies Histogram: Distribution of Movie Runtimes by Genre**  
   - X-axis: Runtime (minutes)  
   - Y-axis: Frequency
    <img width="1708" height="880" alt="image" src="https://github.com/user-attachments/assets/4ac66a0e-1a4e-4617-b822-abdb19628dba" />
    link: https://vizhub.com/Chloeliu16/fbcf94f128854f17875256d9b27eda6a


4. **IMDB Top 250 Movies Bubble Chart: Runtime Trends Over Time**  
   - X-axis: Year  
   - Y-axis: Runtime (minutes)  
   - Bubble size: Rating  
   - Bubble color: Genre
     <img width="1710" height="886" alt="image" src="https://github.com/user-attachments/assets/356ce068-3b8c-4320-8215-29b10e440e6a" />
     link: https://vizhub.com/Chloeliu16/9a1bbc9656944370a6d436b22f083d94

**Week6 Updates:**

For this week’s progress, I refined the visualization of the IMDB Top 250 movies dataset.
Originally, the dataset contained too many genres, which made the color encoding overly crowded and difficult to interpret. To improve clarity, I simplified the genre representation by:
   - Keeping only the Top 6 most frequent genres
   - Grouping all remaining genres into a single “Other” category
   - Updating all plots that used color to represent genre accordingly

1. **IMDB Top 250 Movies Scatter Plot: Year vs Rating**  
   added a legend
   <img width="1722" height="890" alt="image" src="https://github.com/user-attachments/assets/a09d00ac-0686-42d9-95a6-0c2b2a3656b9" />

2. **MDB Top 250 Movies Bar Chart: Genre vs Count**    
   Made two improvements to the Genre Frequency Distribution bar chart:
      - Color Gradient – Adjusted the bar colors to a smooth gradient, which makes the visualization more visually appealing and easier to distinguish between genres.
      - Interactivity – Added tooltips so that when hovering over each bar, the chart displays the genre name, count, and percentage of total movies.
   <img width="1706" height="714" alt="image" src="https://github.com/user-attachments/assets/b50cc2b4-7991-49b0-b7ac-058905516daa" />

3. **IMDB Top 250 Movies Histogram: Movie Runtime Distribution**  
   Stacked histogram, where each bar is divided by genre. This allows us to see not only the overall distribution of runtimes but also how different genres contribute within each runtime interval.
   <img width="1600" height="898" alt="image" src="https://github.com/user-attachments/assets/1199effd-4394-4199-b3ca-3d158a4939ff" />

4. **IMDB Top 250 Movies Bubble Chart: Runtime Trends Over Time**  
   added a legend
   <img width="1720" height="896" alt="image" src="https://github.com/user-attachments/assets/f33183e7-7116-4144-a0d8-6ac6613da080" />

**Week7 Updates:**

This week, I implemented a hierarchical tree visualization to represent the structure of the IMDb Top 250 Movies dataset.
The visualization organizes movies by Year → Genre → Title, focusing on the Top 10 years with the most films in the list.

5. **IMDB Movie Hierarchy Tree**  
   <img width="2058" height="1594" alt="image" src="https://github.com/user-attachments/assets/088fb3a0-7322-4605-add4-fa3ce9bcd49b" />

**Week9 Updates:**

This week, I continued working on my visualization project and focused on improving the use of color based on this week’s class topic.
Specifically, I implemented an interactive color legend, which allows users to highlight or filter specific categories directly through the legend.
This enhancement makes the visualization more intuitive and engaging, helping viewers explore patterns more easily.

1. **Week 9: IMDB Top 250 Movies Movie Bubble Chart: Movie Runtime Trends Over Time**
   <img width="1712" height="890" alt="image" src="https://github.com/user-attachments/assets/fda675e1-bdcd-4067-bc7b-ad19dbaa30af" />
2. **Week 9: IMDB Top 250 Movies Histogram: Distribution of Movie Runtimes by Genre**
   <img width="1650" height="874" alt="image" src="https://github.com/user-attachments/assets/410d03d1-43a3-46ed-a494-1da014eab0df" />
3. **Week 9: IMDB Top 250 Movies Scatter Plot: Year VS Rating**
   <img width="1700" height="880" alt="image" src="https://github.com/user-attachments/assets/e04a3e81-a13d-4e7d-b4a3-3e9129e2c239" />

## Open Questions

- Should I enrich the dataset with additional attributes (e.g., continent of production, awards) to explore more diverse patterns?  
- How can I best design the legends and color schemes to avoid visual clutter, especially when using many genres?

  
## Milestones

- **Week 5:** create initial static charts (scatter, bar, histogram, bubble).  

