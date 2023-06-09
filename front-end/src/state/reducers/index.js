import {combineReducers} from "redux";

const initialMarketList = {
    Items: [
        {"id": 1,
            "title": "Ielts Vocabulary",
            "cover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW4AAACKCAMAAAC93lCdAAAAyVBMVEX////HACsAAADFAB7ceojFABn87vHDAADGACLEAA/+9/nEAArWYnP24OPvys7EABPqs7vhk53GACfejpbvw8rNJkPPR1fTWGf39/fTT2POzs7j4+PV1dXRRlySkpKFhYVDQ0O5ubkSEhKsrKwhISHm5ubGxsaenp7x8fEoKChmZmaOjo44ODhAQEB2dna8vLwkJCTnqrKjo6MxMTFiYmJ+fn4PDw9PT0/JDjPacYHknafdf4z78PLz1NlxcXHPN1HLHjzWXnDNMUqwJ7wxAAAQDUlEQVR4nO2dfV+qPBjHcYaKVhrZCQUtNQTNk0et1J6s3v+LuvfEMxcgeH/Og/v9UUa7tmvfjYsx2JQkocyqnC8uTzq7qw3R1e56e7k4P/vdTv2Temtf9mpVRS7XVFUtEeHftbKsVMu9y/bb73bvn9LZxU5WMOhSnDB0pdxbVH63k/+I6ovvhhxP2lNNVjrtLLmdQNr62usFTJVD25ab79k2PU2MDuoO1yK+qMprOmtOvPHpd/oX4hrr+MccH5kiNJTKkKq+i8BXE0y2vxqXbr7nVSjNRRLu60O6wws8iSvo7aRazsSahRXl0+vhKID7iR2ZSKBxw4f7tJa90FSVfbgVII2ciPug7nCn4nC/yHvAJlIbHScm2La2RBPNtiUDc36WJF3g9jkVxX323cwWRvyqNbyIMsJ4sQy0WiET/7UWuF2nIrgX1f1hE1W3UdxPaIBDd1/gdp0K4z6p5s1K7tVDuCcDHLyHaCxwu06FcHeaBfK6qgdx35loYqKZLnC7TgVx9+QimdUYbw837tr36N4QuF2nArivC9HGuXVCuD/IiFDg9pzy436F3Mqs5msQ9wjj1gRuzykf7nbuq6SnajuAWydj7q7A7Trl4X4r5xsBBqTW6tKS3N0Q3IjcUj5g3Ejg5k55uE/3vJWMl3wi2bpO8tPIL1O38QdT4OZOubjfDxBKiBqxDx4yJT8m3LvUUOI8YEjJ8VTghp1ycJ8ndu6a3FBqm02ppjSa5RQvqnHdG0x9pLiv4bxVWT5dnL/Vid7OWpe9auJUePlV4Aad4rgr8JBbLr3Ug368LT4VGLgqC9ygUxz3AryfbMR1Vqm1gccxjZjHaXDio8TdgbJuQI/zTsHzIe6RBehAJty1ag553SQn7uuk3OHpDjnJjM1S16G+CtKWpBOoEurngXHXOlI9h4riTswbDAdyK9mQOtSIt40f1Tl0oDZSom9DFMVdSDlxJ6oFzVQ3E5/uM70AbaUkvSxV3wDXSyUavAVuv7bxFVWvchUZUwuB268f8f209pVsVgLMoiFI4PYLCAtpuE/io7f6I5JS4PYLsFW/c5UZMzQRuP2CJkzkeqLZWXw9VDViJnD7VIdwN4FXCLkq/OW7GpPqqClwJwrCrW4Su3f98vL19WS7PT39uu50er3d7vv7++rqsxR58Vvg9gt8u6SccrHMKoHbL+iGBXt0GN4Ct1/AuJuofHWIZTgCt1/bhMfCavWk+BocgduvReKrgeXmSdEeLnD7dQbMCLrAlR+t5CF4igTugK5SFz01q1+t/EFF4A7oMsPLmLVmo5N3YZ/AHVBaNHEqLiu7i/cc3gncQYEPK8NSZaX0mmktpV+FcJdKV/vr00P5B+Le5501tazIp629wkpB3Or+kgs/iU9UQdzS135vZOJA3nvJPjwE8/mDX3xIVFHcCS/2AMKB/OoiI3Ewk2PFLb3kWLugytWrlyxRBczhaHFLnVwveGPi1+lXTtD8eHGDLzKkqdb4DL9GGBZoe7y4pUrGTR6iUmX5NRE4aHnEuKWzAstz5MTdKkCzY8YtvdcK1Li5gWM4aHTUuKVKwovEqVLjd0chAm2OG7dU/8o2ewL4Dz36AS2OHDcZfxeotdo8j80UNDh63FKl08h/xVTj1i4I3Ml5bXJs2MOlNuImaMHkAjfRyyZhsVOy1EbMXT2YWuDm+e0aOUfhtZgXOcHEArej99dNIxeA5mUkLzCtwO3T+VbJc2MfXRefKenR46Z7k+5PPPoaPpg0E25V2V/VvxK3RHbe/Uxelh1VZF08mDILbnV33t5fXsZ/F26sd0y8ucepHlnJWgj3P/gkPlWVRUfOHlaaIWuBO4/fFz1ZyTQ8DC+tFLjz6a11giN5alwJRxOBO78qi+u0SB5eACtwF1P7Wkl8rVAOvr4pcBdV5TUppoQmqgRuV2+7Xqx2aYaVa/jVlFCpArerurMuMqQm+CjMFbyNqRxckSlwe4JWxF+nlwruaVIOTlMJ3J6ApQtxu+6E9QbiDp4aArcn6N3uaobFIcBOKKXaNpBM4Pb0CnTRImvWygI3JGhrpJhtYCJqA1UJbd4ocGdwR0lf3PcO2MovgWQCt6cKuJ1J8v4aSVVpioEgKGjrYrWUu9jQlKDA7RP41EqOPuQNCdiOKvy4UuD2Cd4BVklbRAlstka+FCCQ7M/E/ZJuDKgI7jNwlZ9aS155cwE0lLoLpvszcavf13vph9f5Cs0IfoNPaFQ1aW0ZuMl6eBPvQrhLmx/7a+f1XBA37k17qXog3FAnJR4lbP/VAl8lPOjDs1zLWJsZXnzYV8qBcCcuiVd28asSzk5Bq8iW6WDmv/W1nn11KNzJS+LVxlVkgXCl1avCNod98SGX/mjc7eQ1C6pcLV2/Llrt9nm73Vq8fm2SH1Ye9rWeXPqjcafvH0O+Hb5J3gZrNmXoy8wdRYcSYNIjxX2ILzxzVY2M1sGkR4pb6h2urnL0qRuY9lhxA9vn5lDcTqZg4mPFLb0UWeHnVzSUCNwxuj7IV/qVqnETEWDq48UtXR2iukrs1xqByY8Y99umeH2Bddpw+uPFLVUK867G9m2BO171XoHviSe780LTWaDJUeOWpJNqgS1NNuDDCNDmyHHjfHJWWq1u4Qf3oNWx45YqvTw7EKiN76TnbKDd0eOWpEVp35WUtQYwJy5wZ1D9Qt4DeK2pbON3MfmduLNsSrqvGv8Pbgz85bOaZYmZWm5WO4v0l61kSP6Z8a8GmGx/+VcNVw+Vp9erWlCe1ZyLRd4vPxUFntlW1ZqsKJttO9Ou9RVQvkRvcKoc8vyqHyxPKUOe+Xfxr7QvO5/lBnmiIJMvf2LfAVWWm81GQ/3+ujjPuXm6EKy3ynmrtbhg3/50ut2eXL602u8FGlFISEhISEhISEhISOgfkN51lZDKIP/Vul0zbKuFU46t5RjOx+x27byeBtXtGtkSGsGKGSPsYMTrwrIzVuwJuUpItSL/NRC6Dxy9Ryhc5zXJCK4NthiEj91k5OZlQgwQWmVLPfP7Y8xYVa09iySyErqRNEBojn9pHykteZMJ9y0aUtz9wNE+QnowHU6CbtdwPv0IbuMu0mTJ0idoL9y3PtyGW9ePvcokxc5QCm7873FSV6PCuK05VaTb+URxm30rGHCiuOcIjZJKi+KOOUOSZbFCLSuxIE9+3JjzbKwbpItltHa1RIm4Dauv03M7HbevuhpOrelOhKafyCGG25Gt8xQUt6n7gtbIxWk7uWg4A9NpFYabHJJ0dozgZi7quub6QAxowT5f+EfLNWByyw/67jrpw41NZ46bzyELv0+sOC9bDXu25NGCesV805invuo/ImRr7J9OopAwbq/LdnFVcP3R2uYk8Cca6HzBRHskJ+Oky+AZU/zHk2N/R09U3HEMXEk0XJJjCN303ZOX4b5D9wZJOuaxHtkUBU5J0gzRPTXAGeGTBd3R3vDg5OwY4KBFji+HJHwRSjquyJJ0X5NXHJuOg7gnbte6JbXGFmNS7KNGXb/BtUcr3aHCj+OWISGIxXwdO0cazKBQHtDMJvUkEZYGk2eSZmhwIGtaryjugU5k2BT3Lc13zWnTcoK41zz66RSeC1hiaNlfTox8osdWXgqGe8hLwe785L/77MCU4iYGA8nxhVxTnAt61zVA6KfbCpQihsdcW0mek6Yft836NJFFaoUtWG4zivun4xO1cT5j3LiVZtNY3BNW/TnHzd0d0mJwaY+xvZvLorjRUuvSgmxSO22OQrixj0t6TehTeDjJiHc0rDHOrT82cYHoXp8P6YmD00xGUzvYu9Gjaa9JI4xxPayBZOIa6fYHNcBmK2ygYcMH21yRYzY5zbQlKXSME5GwTXFjT4dzHfeLIcWN+rZOGWNPP2ztnrayh1tn3YgIV+uBWnyYxoomwz7NDHNKz0MSdLrkvH2kuNGNtTRww94PtBBufOqRUqYc9xyXNRrw+DyIGYRFcZMWmRKXR5Qr6eMB3PjHFGdmc3hL2jHcQQK7QM9Zv2a5If/FwcWt+ZpMZwGZnglPFDc5ozXWF5fUwh6b9MiDe6mkuB+Z2QPpYDrrpSw4mnON4rUA3GPCSKfNRH49Up9Memoh6jIx+ckxkFOO/O7S/wdwj6lXa6fij/RUZAPmaexQj/THAdHIoIAsdsx0rqHdEG6NnfRzDo+4MEETJ7cRPbOcy+8vYoX8xTq4n12v+jQt9nMwHndnpOGG7LKssaYf8EBkDp6GDm7Dwf3MGtogUV9nbWzxa5E+emBhNRb3gPRibsE85H2G9DSTE6YtPeLl85FJCLdNzW99uDWn/8XGkuDIpMvy7hPcD6wXGeHY3Q3EbmK7Qr+CuKesp5DuoUnIP6hxcE9CuNfuOebUyME9ZpfeX+y/Qdw2D2M676s3DEuXWjlnbCB2I88PGrvpbduM4f7JcZgGv2aPyck74gPAAO6ug5vk/BzBTfh12UgmBndgZOLiforv3YTpml+R+Lg7gvuJj8dXDPfEK83BvYritpaWtVxapEY/Oe6pg5uA6hsa7Y3+3s0HdjqPxC5unPWdpYeDCQkYvK4zQsfp3Xe+3o0RmjQ7iZ9YPIh4uFfMqSTcOIPRffxtI9i7RwzuUxi3SWdPfpGMIdw87Ju08zlj3UTcN+x8oCPvIeuyftysi9kObjd2z9jpbJE0ftw3NI0Rxt13mn5J+zm2+MUKuqXMbYnf8uPGIqmmxLUR58Nx31GTQTJuTGQ9YQEpBrc1pprbAdykRw1MKzwy6bPwvib+QrjpoEbS6NAjA+4xbecpRfsQi9ui2Vr037zeFDf+vNZoeNMCuB8oo6dQ7KbXnclcN8iwcsTGMrguH/TnnTMOWVPOT/TzSnJx0xiukebQaaPE4p7S2xzWnPE3ob45EyOAm4+7JzGXyvXDjNYNwu2MoumVKQX3iF0HcNNMpmygHIObjOOfyJ3L1DVg4+4JL4jBc3Hjyj/fkJB3kzRnort/afwObciGUbZHxMVNrwZdegOAM36Ox33Drj4sgzja/hlBF/c9O7WJ8UeXBgbfjKDOhvZTyZ3vuPOy5rg5b3ppRl5jODOC7OrJrkg2q4bG7ixYv11x3MSezcJQL/t0nGWzdCyVtnZo+0YmY35TuZyRoBCYEdR/updQ1kCPnCquxK3lZCXpK8Tcos1HcWvklnEuabT2LKx+sJxpf2IzgrQ5Cbo1NAnmm+/WyKytKXnz2Br+i7VAYL67O7JG9FJosnSGN/XsTvvaA2vEjgYmptl8NzPg2dkji7aQsbQGmt+g29W9HI3lUuflEQPNTaWPrIHNnKXp+Yz62BqZpB6R+W591Hfmu+n5MOal3mFohrV0ply6S+aVU0ec/4ilHOC7Mom6rrOcqSfcTX3Jpmlvkie0YjRGt6S3jPY2/GvEww/TnT/mFZUGxRJY5KR9IOOZtDnFv1b/F+7+/co3bZdVlncZ+jel+6E8Z31ckS56Pdj/GaFx87h+vNHTE/6lsvt9L07ie6xD5TtYr+8B2v8B6s8bKjwZfj8AAAAASUVORK5CYII=",
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
});

export default reducers;