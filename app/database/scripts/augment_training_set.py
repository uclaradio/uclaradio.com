
# coding: utf-8

# In[133]:


##### import json 
from string import punctuation
import collections
import numpy as np
from sklearn import datasets
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import LinearSVC
# !!! MAKE SURE TO USE SVC.decision_function(X), NOT SVC.predict(X) !!!
# (this makes ``continuous-valued'' predictions)
from sklearn.svm import SVC
from sklearn.cross_validation import StratifiedKFold
from sklearn import metrics

### START FUNCTIONS ##
def read_vector_file(fname):
    """
    Reads and returns a vector from a file.
    
    Parameters
    --------------------
        fname  -- string, filename
        
    Returns
    --------------------
        labels -- numpy array of shape (n,)
                    n is the number of non-blank lines in the text file
    """
    return np.genfromtxt(fname)
def extract_words(input_string):
    """
    Processes the input_string, separating it into "words" based on the presence
    of spaces, and separating punctuation marks into their own words.
    
    Parameters
    --------------------
        input_string -- string of characters
    
    Returns
    --------------------
        words        -- list of lowercase "words"
    """
    
    for c in punctuation :
        input_string = input_string.replace(c, ' ' + c + ' ')
    
    return input_string.lower().split()

def extract_dictionary(article_list):
    """
    Given a filename, reads the text file and builds a dictionary of unique
    words/punctuations.
    
    Parameters
    --------------------
        infile    -- string, filename
    
    Returns
    --------------------
        word_list -- dictionary, (key, value) pairs are (word, index)
    """
    
    word_list = {}

        ### ========== TODO : START ========== ###
        # part 1a: process each line to populate word_list
    index = 0
    for article in article_list: # for each tweet 
        for word in extract_words(article): # for each word in the tweet 
            if word not in word_list and (len(word)>2):
                word_list[word] = index # assign the index 
                index += 1
    pass
        ### ========== TODO : END ========== ###

    return word_list

def extract_feature_vectors(article_list, word_list):
    """
    Produces a bag-of-words representation of a text file specified by the
    filename infile based on the dictionary word_list.
    
    Parameters
    --------------------
        infile         -- string, filename
        word_list      -- dictionary, (key, value) pairs are (word, index)
    
    Returns
    --------------------
        feature_matrix -- numpy array of shape (n,d)
                          boolean (0,1) array indicating word presence in a string
                            n is the number of non-blank lines in the text file
                            d is the number of unique words in the text file
    """
    
    num_articles = len(article_list)
    num_words = len(word_list)
    feature_matrix = np.zeros((num_articles, num_words))
    

        ### ========== TODO : START ========== ###
        # part 1b: process each line to populate feature_matrix
    tweet_num = 0
    for tweet in article_list: # for each tweet 
        for word in extract_words(tweet): # for each word in the tweet 
            if (len(word)>2):
                feature_matrix[tweet_num][word_list[word]] = 1 #  if it's in there set it to 1
        tweet_num += 1
    pass
        ### ========== TODO : END ========== ###
        
    return feature_matrix

### END FUNCTIONS ###
## Extract articles and titles from "blogposts (1).json" 

# this file has ALL the blog posts 
with open("blogposts (1).json", encoding="utf-8") as read_file2:
    data_all = json.load(read_file2)
## extract full article list 
articles_all = [] 
articles_all_success_indices=[] 
for article in range(len(data_all)):
    articles_all.append(data_all[article]['content'])
# extract titles from json file with all the posts
titles_all = [] 
for title in range(len(data_all)):
    titles_all.append(data_all[title]['title'])
    
## in this script we put the correct labels on the articles that have certain keywords in their titles:
## "Show Review" or "Concert Review" --> 1
## "Album Review" or "Single Review" (?) --> 2
## "Interview" --> 3 
## "UCLA Radio Sports" --> 4
## "UCLA Radio News" --> 5
## "Film Review" , "TV," --> 6 (entertainment) 
## "UCLA Radio Comedy --> 7 Test how many of these there are. Merge with entertainment? 
## "Show of the Month" or "meet the dj" --> 8 

## Make a new list of dictionaries. 
data_new_train = [] 
data_new_test = []
## Make a new list of labels. 
new_y_train = [] 

for i in range(len(data_all)):
    if ("Show Review" in titles_all[i]) or ("Concert Review" in titles_all[i]) or ("Festival" in titles_all[i]) or     ("Show Preview" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(1)
    elif ("Album Review" in titles_all[i]) or ("Single Review" in titles_all[i]) or ("Album" in titles_all[i]) or     ("Song" in titles_all[i]) or ("Playlist" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(2) 
    elif ("Interview" in titles_all[i]) :
        data_new_train.append(data_all[i])
        new_y_train.append(3)
    elif ("UCLA Radio Sports" in titles_all[i]) :
        data_new_train.append(data_all[i])
        new_y_train.append(4)
    elif ("UCLA Radio News" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(5)
    elif ("film" in titles_all[i]) or ("Film" in titles_all[i]) or ("TV" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(6)
    elif ("UCLA Radio Comedy" in titles_all[i]) or ("comedy" in titles_all[i]) or ("Comedy" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(7) 
    ## If it doesn't fit into any of the obvious categories, put it in the test set 
    # Show of the Month,Spotlight of the Week, MEET THE DJS WEEK, UCLA Radio, 
    elif ("UCLA Radio" in titles_all[i]) or ("Show of the Month" in titles_all[i]) or     ("Spotlight of the Week" in titles_all[i]) or ("MEET THE DJs WEEK" in titles_all[i]) or ("Pledge Drive" in titles_all[i]):
        data_new_train.append(data_all[i])
        new_y_train.append(8)
    else :
        #print(titles_all[i])
        data_new_test.append(data_all[i])
        
## extract articles from training set 
articles_train = [] 
for article in range(len(data_new_train)):
    articles_train.append(data_new_train[article]['content'])
## extract articles and titles from the new test set 
articles_test = [] 
for article in range(len(data_new_test)):
    articles_test.append(data_new_test[article]['content'])

    
## extract dictionary from data_all
dictionary = extract_dictionary(articles_all) 
## extract feature vectors 
X_train = extract_feature_vectors(articles_train, dictionary)
X_test = extract_feature_vectors(articles_test, dictionary)

y_test=OneVsRestClassifier(LinearSVC(random_state=0)).fit(X_train, new_y_train).predict(X_test)

print(y_test)
## "Show Review" or "Concert Review" --> 1
## "Album Review" or "Single Review" (?) --> 2
## "Interview" --> 3
## "UCLA Radio Sports" --> 4
## "UCLA Radio News" --> 5
## "Film Review" , "TV," --> 6 (entertainment)
## "UCLA Radio Comedy --> 7 Test how many of these there are. Merge with entertainment?
## "Show of the Month" or "meet the dj" --> 8
category_list = ["Invalid Tag","Show Review", "Music Review", "Interview", "Sports", "News","Entertainment", "Comedy","UCLA Radio"] 
for article in range(len(data_new_test)):
    my_category = category_list[int(y_test[article])]
    data_new_test[article]['category']=my_category
    #print(str(article) + ". category --> " + data_new_test[article]['category'] + "  TITLE --> " + data_new_test[article]['title'])
for article in range(len(data_new_train)):
    my_category = category_list[int(new_y_train[article])]
    data_new_train[article]['category']=my_category    

    ## FORCIBLY CLASSIFY MISCLASSIFIED EXAMPLES 
data_new_test[17]['category'] = 5
data_new_test[18]['category'] = 5
data_new_test[20]['category'] = 5
data_new_test[21]['category'] = 5
data_new_test[26]['category'] = 5
data_new_test[31]['category'] = 5
data_new_test[27]['category'] = 2
data_new_test[35]['category'] = 8
data_new_test[36]['category'] = 1
data_new_test[41]['category'] = 5
data_new_test[42]['category'] = 1
data_new_test[49]['category'] = 4
data_new_test[54]['category'] = 8
data_new_test[85]['category'] = 4
data_new_test[97]['category'] = 4
data_new_test[100]['category'] = 2
data_new_test[101]['category'] = 1
data_new_test[103]['category'] = 5
data_new_test[108]['category'] = 2
data_new_test[112]['category'] = 2
data_new_test[117]['category'] = 2
data_new_test[128]['category'] = 5
data_new_test[134]['category'] = 6
data_new_test[137]['category'] = 1
data_new_test[138]['category'] = 5
data_new_test[139]['category'] = 4
data_new_test[145]['category'] = 6
data_new_test[146]['category'] = 1
data_new_test[147]['category'] = 6
data_new_test[149]['category'] = 5
data_new_test[153]['category'] = 8
data_new_test[161]['category'] = 1
data_new_test[162]['category'] = 6
data_new_test[163]['category'] = 6
data_new_test[167]['category'] = 8
data_new_test[169]['category'] = 4
data_new_test[170]['category'] = 4
data_new_test[171]['category'] = 5
data_new_test[180]['category'] = 5
data_new_test[181]['category'] = 1
data_new_test[192]['category'] = 1

## NOTES ON MISCLASSIFIED ONES 
# 26 is news, 31 is news, 27 is a music review, 35 is Ucla radio, 36 is concerts, 41 is  news,
# 42 is concert, 49 is sports, 54 is uclaradio, 85 is sports, 97 is sports, 100 music review, 101 show review,
# 103 is news, 108 music review, 112 music review, 117music, 128 news, 134 is entertainment, 
# 137 is a concert, 138 is news, 139 is sports, 145 entertainment, 146 is concert, 147 is entertainment, 
# 149 is news, 153 is ucla radio, 161 is concerts, 162 and 163 are entertainment, 167 is
# ucla radio, 169 is sports, 170 is sports, 171 is news, 180 is news, 181 is concert, 192 is concert 


## NOW COMBINE data_new_test and data_new_train
data_total = data_new_test + data_new_train
print(len(data_total))

# dump into json 
#with open('dump3.json', 'w') as f:  # writing JSON object
#    json.dump(data_total, f)

