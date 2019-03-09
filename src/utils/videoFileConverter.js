
export const convertFileToFilters = (videoFile) => ({
    ...videoFile,
    categories: videoFile.categories.map(convertCategoryToFilter),
    series: videoFile.series.map(convertSeriesToFilter),
    stars: videoFile.stars.map(convertStarToFilter)
});

export const convertFiltersToFile = (videoFile) => ({
    ...videoFile,
    categories: videoFile.categories.map(convertFilterToCategory),
    series: videoFile.series.map(convertFilterToSeries),
    stars: videoFile.stars.map(convertFilterToStar)
});

export const convertCategoryToFilter = (category) => ({
    value: category.categoryId,
    label: category.categoryName
});

export const convertFilterToCategory = (category) => ({
    categoryId: category.value,
    categoryName: category.label
});

export const convertSeriesToFilter = (series) => ({
    value: series.seriesId,
    label: series.seriesName
});

export const convertFilterToSeries = (series) => ({
    seriesId: series.value,
    seriesName: series.label
});

export const convertStarToFilter = (star) => ({
    value: star.starId,
    label: star.starName
});

export const convertFilterToStar = (star) => ({
    starId: star.value,
    starName: star.label
});