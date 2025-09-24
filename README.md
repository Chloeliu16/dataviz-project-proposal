# Data Visualization Project

## Data

The data I propose to visualize for my project is the **IMDB Top 250 Movies Dataset**.  

- **Source URL:** [IMDB Top 250 Movies Dataset](https://www.kaggle.com/datasets/rajugc/imdb-top-250-movies-dataset)  
- **Original Source URL:** [IMDB List of Top 250 Movies](https://www.imdb.com/list/ls513400350/?sort=user_rating%2Cdesc)  

The dataset contains attributes such as movie title, year, rating, genre, runtime, directors, and writers.  

⚠️ Note: Although the dataset includes `budget` and `box_office`, these values are not consistently converted to USD (some are synthetic or in other currencies). To avoid misleading results, I will not use these two fields.  

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


3. **Week 5: IMDB Top 250 Movies Histogram: Movie Runtime Distribution**  
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


## Open Questions

- Should I enrich the dataset with additional attributes (e.g., continent of production, awards) to explore more diverse patterns?  
- How can I best design the legends and color schemes to avoid visual clutter, especially when using many genres?

  
## Milestones

- **Week 5:** create initial static charts (scatter, bar, histogram, bubble).  

