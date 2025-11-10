# 🎬 IMDB Top 250 Movies Visualization  
**Exploring Movie Trends through Interactive Visual Analytics**

---

## Overview  

This project visualizes data from the **IMDB Top 250 Movies Dataset**, exploring relationships between **movie ratings, genres, release years, and runtimes**.  

By creating interactive D3 visualizations, I aimed to uncover how movies across different decades compare in popularity, length, and audience reception — and how these characteristics have evolved over time.  

**Live Visualizations:**  
- [Scatter Plot: Rating vs. Runtime](#scatter-plot-rating-vs-runtime)  
- [Histogram: Runtime Distribution by Genre](#histogram-runtime-distribution-by-genre)  
- [Scatter Plot: Year vs. Rating](#scatter-plot-year-vs-rating)  
- [Genre Frequency Distribution](#genre-frequency-distribution)  
- [Movie Hierarchy Tree](#movie-hierarchy-tree)  

---

## Motivation  

Movies are cultural artifacts that reflect both audience taste and artistic trends.  
I wanted to explore **how genres, ratings, and runtimes have changed through decades**, and whether certain time periods consistently produce higher-rated films.  

This visualization project not only satisfies course objectives in **interactive data visualization** but also serves as a storytelling tool for film lovers and data enthusiasts alike.

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

### Week 12: IMDB Top 250 Movies Scatter Plot — Rating vs. Runtime  
[View on VizHub →](https://vizhub.com/Chloeliu16/c9975b18a46646839846cfb21ab9ff8a)

<img width="1718" height="888" alt="image" src="https://github.com/user-attachments/assets/804eac60-3db8-4ed6-89d7-903bae69981c" />

**Analysis:**  
Overall, high-rated movies tend to have runtimes between **80–180 minutes**, which also covers most films in the dataset.  
This pattern is **not strongly related to genre or release year**, suggesting that excellent movies across all decades share similar lengths.  

---

### Week 12: IMDB Top 250 Movies Histogram — Distribution of Movie Runtimes by Genre  
[View on VizHub →](https://vizhub.com/Chloeliu16/4ac30a89b604471d860d86ae1e510bb5)

<img width="1722" height="896" alt="image" src="https://github.com/user-attachments/assets/88466a36-93c1-416b-9883-6461f18b0ea1" />

**Analysis:**  
Most Top 250 movies fall within **120–140 minutes**, making this the most common range for popular films.  
This reinforces the observation that audience-preferred storytelling lengths tend to cluster around the two-hour mark.

---

### Week 12: IMDB Top 250 Movies Scatter Plot — Year vs. Rating  
[View on VizHub →](https://vizhub.com/Chloeliu16/b471e703263e45d1bf1ea740140a2497)

<img width="1720" height="890" alt="image" src="https://github.com/user-attachments/assets/9a059487-cb25-45d7-8c3c-c37c0290e7f3" />

**Analysis:**  
Movies rated above **9.0** appear only sporadically, while most ratings are concentrated between **8.1–8.4**.  
The scatter plot and **Average Rating Trends by Genre per Decade** line chart both reveal this consistent clustering pattern, suggesting stability in audience scoring behavior over time.  

---

### Week 12: IMDb Top 250 Movies — Genre Frequency Distribution  
[View on VizHub →](https://vizhub.com/Chloeliu16/04d4e2b7e9734b48853e142e2f04e441)

<img width="1726" height="822" alt="image" src="https://github.com/user-attachments/assets/f82565e6-67c2-46db-9153-12dca42b346b" />

**Analysis:**  
Among all genres, **Drama** overwhelmingly dominates the Top 250 list.  
It highlights that emotionally driven narratives have universal appeal and are consistently recognized for their storytelling quality.

---

### Week 7: IMDB Movie Hierarchy Tree  
[View on VizHub →](https://vizhub.com/Chloeliu16/ab019dd7f6704c7bafd73d80dc1c9e15)

<img width="1380" height="816" alt="image" src="https://github.com/user-attachments/assets/d6c55b97-d2ed-4c79-9bff-a2e01fcb1ee9" />

**Analysis:**  
This hierarchical visualization summarizes the **top ten years with the most movies** and their **corresponding genres**.  
It provides a high-level overview of how production output varies over time and which genres dominate each era.  

---

## Insights and Takeaways  

- **Drama** remains the most frequent and consistently high-rated genre.  
- Most acclaimed movies cluster between **80–180 minutes** in runtime.  
- Genre diversity increases significantly after the **1990s**.

---

## Next Steps  

- Incorporate **Rotten Tomatoes** or **Box Office Mojo** data for cross-platform analysis.  
- Create a unified **interactive dashboard** combining all five visualizations.  

---

## Credits  

**Author:** Xiaojun Liu  
**Course:** CS573 – Data Visualization  
**Tools:** D3.js, VizHub, JavaScript, HTML, CSS  
**Data Source:** Kaggle IMDB Top 250 Dataset  

---

## Short Demo Video  

> (https://www.youtube.com/watch?v=Daf6X2w5S1M) 
> In this 2-minute walkthrough, I introduce the dataset, highlight interactive features, and summarize the main findings from the IMDB Top 250 movie analysis.

---
