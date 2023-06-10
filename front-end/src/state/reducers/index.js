import {combineReducers} from "redux";

const initialTagLibrary = {
    tagLibrary: [
        {"tagID": 0, "tagName": "none"},
        {"tagID": 1, "tagName": "English"},
        {"tagID": 2, "tagName": "Test_Preparation"},
        {"tagID": 3, "tagName": "Basic"},
        {"tagID": 4, "tagName": "Italian"},
    ]
}

const TagLibraryReducer = (state = initialTagLibrary) => {
    return state;
}

const initialMarketToolBarFields = {
    sortBy: "",
    tagsSelected: [
        {"tagID": 0, "tagName": "none"},
        {"tagID": 1, "tagName": "English"},
    ],
    newTag: "",
    searchBarContent: "",
}

const MarketToolBarFieldsReducer = (state = initialMarketToolBarFields) => {
    return state;
}

const initialMarketList = {
    items: [
        {"id": 1,
            "title": "Ielts Vocabulary",
            "cover": "data:image/jpeg;base64,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",
            "total": 20,
            "tags": [
                {"tagID": 1, "tagName": "English"},
                {"tagID": 2, "tagName": "Test_Preparation"},
                {"tagID": 3, "tagName": "Basic"}
            ],
            "description": "A set of deck containing many of the most basic words for the ielts exam.",
            "rating": 4.5,
        "import_count": 49
        },
        {"id": 2,"title": "Entry Level Italian",
            "cover": "https://media.timeout.com/images/105724594/750/422/image.jpg",
            "total": 249,
            "tags": [
                {"tagID": 4, "tagName": "Italian"},
                {"tagID": 3, "tagName": "Basic"}
            ],
            "description": "Let's learn Italian together!",
            "rating": 5,
        "import_count": 213}
    ]
}

const MarketDeckListReducer = (state = initialMarketList) => {
    return state;
}

const reducers = combineReducers({
    MarketDeckList: MarketDeckListReducer,
    TagLibrary: TagLibraryReducer,
    MarketToolBarFields: MarketToolBarFieldsReducer
});

export default reducers;